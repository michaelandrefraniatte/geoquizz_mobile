<?php

namespace gq\mobile\mobjeu\error;

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

class NotFound{

    public static function error(Request $rq, Response $rs){

        $data = [
            'type' => "error",
            'error' => 404,
            'message' =>'Not Found',
        ];

        $resp = $rs
            ->withHeader('Content-type','application/json;charset=utf-8')
            ->withStatus(404);
        $resp->getBody()->write(json_encode($data));
        return $resp;

    }

}