<?php

namespace gq\mobile\mobjeu\middlewares;

use gq\mobile\mobjeu\error\MissingDataException;
use gq\mobile\mobjeu\error\NotFound;
use\Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

class CheckTokenMiddleware
{

    public function __invoke(Request $request, Response $response, callable $next)
    {

        $token = $request->getQueryParam('token', null);
        if(is_null($token))
        {
            $token= $request->getHeader('X-lbs-token');
        }
        if(empty($token)){
            $method = $request->getMethod();
            return MissingDataException::MissingDataException($request,$response, $method);
        }

        $id = $request->getAttribute('route')->getArgument('id');

        try{
            \gq\mobile\mobjeu\model\Partie::where('id','=',$id)->where('token','=',$token)->firstOrFail();
        }
        catch(\Illuminate\Database\Eloquent\ModelNotFoundException $e){
            $method = $request->getMethod();
            return NotFound::error($request,$response, $method);
        };
        return $next($request,$response);
    }

}
