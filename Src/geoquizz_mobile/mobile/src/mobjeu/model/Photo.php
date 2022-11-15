<?php
namespace gq\mobile\mobjeu\model;

class Photo extends \Illuminate\Database\Eloquent\Model{
    protected $table = 'photo';
    protected $primaryKey = 'id';
    public $timestamps = false;

    public function partie() {
        return $this->belongsToMany('\gq\mobile\mobjeu\model\Partie', 'ordre','id_partie','id_photo');
    }
}