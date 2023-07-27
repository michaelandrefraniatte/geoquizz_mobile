<?php

namespace gq\mobile\mobjeu\error;

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

class UnauthorizedError{

    public static function error(Request $rq, Response $rs){

        $data = [
            'type' => "error",
            'error' => 401,
            'message' =>'no authorization header present'
        ];

        $resp = $rs
            ->withHeader('Content-type','application/json;charset=utf-8')
            ->withStatus(401);
        $resp->getBody()->write(json_encode($data));
        return $resp;


    }

}