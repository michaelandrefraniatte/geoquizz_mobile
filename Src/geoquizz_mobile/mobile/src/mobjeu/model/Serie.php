<?php
namespace gq\mobile\mobjeu\model;

class Serie extends \Illuminate\Database\Eloquent\Model{
    protected $table = 'serie';
    protected $primaryKey = 'id';
    public $timestamps = false;
    
    public function photos(){
        return $this->hasMany('\gq\mobile\mobjeu\model\Photo','id_serie');
    }

    public function parties(){
        return $this->hasMany('\gq\mobile\mobjeu\model\Partie','id_serie');
    }
}