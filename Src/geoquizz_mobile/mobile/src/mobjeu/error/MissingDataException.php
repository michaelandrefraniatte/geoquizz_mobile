<?php

namespace gq\mobile\mobjeu\error;

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;


class MissingDataException extends \Exception{
    public static function MissingDataException(Request $rq, Response $rs){
        $data = [
            'type' => "error",
            'error' => 422,
            'message' =>'Missing Data Exception',
        ];

        $resp = $rs
            ->withHeader('Content-type','application/json;charset=utf-8')
            ->withStatus(422);
        $resp->getBody()->write(json_encode($data));
        return $resp;
    }
}