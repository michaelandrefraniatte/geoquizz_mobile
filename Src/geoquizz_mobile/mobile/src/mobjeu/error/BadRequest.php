<?php

namespace gq\mobile\mobjeu\error;

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;



class BadRequest {

    public static function error(Request $rq, Response $rs){
        $data = [
            'type' => "error",
            'error' => 400,
            'message' =>'Bad Request'
        ];

        $resp = $rs
            ->withHeader('Content-type','application/json;charset=utf-8')
            ->withStatus(400);
        $resp->getBody()->write(json_encode($data));
        return $resp;
    }
}