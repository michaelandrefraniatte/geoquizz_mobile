<?php
namespace gq\mobile\mobjeu\model;

class Partie extends \Illuminate\Database\Eloquent\Model{
    protected $table = 'partie';
    protected $primaryKey = 'id';
    public $timestamps = false;

    public function serie() {
        return $this->belongsTo('\gq\mobile\mobjeu\model\Serie', 'id_serie');
        }
}