<?php

namespace gq\mobile\mobjeu\middlewares;

use Firebase\JWT\JWT;
use Firebase\JWT\ExpiredException;
use Firebase\JWT\SignatureInvalidException;
use Firebase\JWT\BeforeValidException;

use gq\mobile\mobjeu\error\UnauthorizedError;
use Psr\Http\Message\StreamInterface;
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

class CheckJWTMiddleware
{

    public function __invoke(Request $request, Response $response, callable $next)
    {
        $secret = "This_quiz_is_fuckin_ez";

        try {
            $h = $request->getHeader('Authorization')[0] ;
            $tokenstring= sscanf($h, "Bearer %s")[0];
            $token = JWT::decode($tokenstring, $secret, ['HS512'] ) ;
            $token = json_decode(json_encode($token), true);
            $request = $request->withAttributes($token);
        } catch (ExpiredException $e)
        {
            return UnauthorizedError::error($request,$response);
        }
          catch (SignatureInvalidException $e) {
              return UnauthorizedError::error($request,$response);
          }
          catch (BeforeValidException $e) {
              return UnauthorizedError::error($request,$response);
          }
          catch (\UnexpectedValueException $e) {
              return UnauthorizedError::error($request,$response);
          }

      return $next($request,$response);
    }

}
