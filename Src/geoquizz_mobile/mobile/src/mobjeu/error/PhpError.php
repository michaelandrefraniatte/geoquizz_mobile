<?php

namespace gq\mobile\mobjeu\error;

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

class PhpError{

    public static function error(Request $rq, Response $rs){

        $data = [
            'type' => "error",
            'error' => 500,
            'message' =>'Internal Server Error',
        ];

        $resp = $rs
            ->withHeader('Content-type','application/json;charset=utf-8')
            ->withStatus(500);
        $resp->getBody()->write(json_encode($data));
        return $resp;


    }

}