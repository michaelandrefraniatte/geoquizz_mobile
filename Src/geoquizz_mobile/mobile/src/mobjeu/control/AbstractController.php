<?php

namespace gq\mobile\mobjeu\control;

abstract class AbstractController {

  protected $c;
  protected $dir;

  public function __construct(\Slim\Container $container){
    $this->c = $container;
    $container['upload_directory'] = __DIR__ . '/../../../images';
    $this->dir = $container->get('upload_directory');
  }
  
}


  
