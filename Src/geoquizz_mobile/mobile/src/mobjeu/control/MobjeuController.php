<?php

namespace gq\mobile\mobjeu\control;

use Firebase\JWT\JWT;
use gq\mobile\mobjeu\error\UnauthorizedError;
use gq\mobile\mobjeu\model\Partie;
use gq\mobile\mobjeu\model\Photo;
use gq\mobile\mobjeu\model\Serie;
use GuzzleHttp\Client;
use gq\mobile\mobjeu\error\MissingDataException;
use gq\mobile\mobjeu\error\NotFound;
use gq\mobile\mobjeu\error\PhpError;
use gq\mobile\mobjeu\error\BadRequest;
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;
use Ramsey\Uuid\Uuid;
use DateTime;
use Slim\Http\UploadedFile;

class MobjeuController extends AbstractController {

    /*
     *
     * FONCTION GET PARTIE
     *
     */
    public function getPartie(Request $req, Response $resp, array $args): Response
    {
        $id = $args['id']; 
        $partie = Partie::select('token', 'nom_joueur', 'score','photo_etat','id_serie')->where('id','=', $id)->get();
        if(!empty($partie)){
            $data = [
                'type' => 'resource',
                'links' => [
                    'self' => ['href' => $this->c['router']->pathFor('getPartie', ['id'=>"$id"])],
                    'partie' => ['href' => '/partie/'.$id]
                ],
                'partie' => $partie,
            ];
            $resp = $resp->withStatus(201)
                ->withHeader('Content-Type', 'application/json; charset=utf-8')
                ->withHeader('Location', $this->c['router']->pathFor('getPartie', ['id'=>"$id"]));
            $resp->getBody()->write(json_encode($data));
            return $resp;
        }
        else{
            return NotFound::error($req,$resp);
        }
    }

    public function receivePhoto(Request $req, Response $resp, array $args): Response
    {
        try{
            $directory = $this->dir;
            $filenames = array();
            $uploadedFile = $req->getUploadedFiles()['fileToUpload'];
            if ($uploadedFile->getError() === UPLOAD_ERR_OK) {
                $uuid4 = Uuid::uuid4();
                $extension = pathinfo($uploadedFile->getClientFilename(), PATHINFO_EXTENSION);
                $filename = $uuid4 . '.' . $extension;
                $uploadedFile->moveTo($directory . DIRECTORY_SEPARATOR . $filename);
                $photo = new Photo();
                $photo->description = 'ceci est une description';
                $photo->latitude = '0';
                $photo->longitude = '0';
                $photo->url = $filename;
                $photo->id_serie = 0;
                $photo->save();
                $filenames[] = $filename;
                $resp->write('uploaded ' . $filenames . '<br/>');
                return $resp;
            }
        }
        catch (\Exception $e) {
            return PhpError::error($req,$resp);
        }
    }

    public function receivePhotos(Request $req, Response $resp, array $args): Response
    {
        try{
            $directory = $this->dir;
            $uploadedFiles = $req->getUploadedFiles()['fileToUpload'];
            $filenames = array();
            foreach($uploadedFiles as $uploadedFile){
                if ($uploadedFile->getError() === UPLOAD_ERR_OK) {
                    $uuid4 = Uuid::uuid4();
                    $extension = pathinfo($uploadedFile->getClientFilename(), PATHINFO_EXTENSION);
                    $filename = $uuid4 . '.' . $extension;
                    $uploadedFile->moveTo($directory . DIRECTORY_SEPARATOR . $filename);
                    $photo = new Photo();
                    $photo->description = 'ceci est une description';
                    $photo->latitude = '0';
                    $photo->longitude = '0';
                    $photo->url = $filename;
                    $photo->id_serie = 0;
                    $photo->save();
                    $filenames[] = $filename;
                }
            }
            $resp->write('uploaded ' . $filenames . '<br/>');
            return $resp;
        } 
        catch (\Exception $e) {
            return PhpError::error($req,$resp);
        }
    }

    public function receiveGeolocalisation(Request $req, Response $resp, array $args): Response
    {
        try{
            $directory = $this->dir;
            $data = $req->getParsedBody();
            $photos = Photo::All();
            foreach($photos as $photo){
                $id = $photo['id'];
                $filename = $photo['url'];
            }
            \Cloudinary::config(array( 
              "cloud_name" => "cocn", 
              "api_key" => "489392441496229", 
              "api_secret" => "SU40xtnqlHjoDyR1tw3IJLH19yI" 
            ));
            $public_id = str_replace(".jpg", "", "$filename");
            $public_id = str_replace(".jpeg", "", "$public_id");
            $public_id = str_replace(".png", "", "$public_id");
            $public_id = str_replace(".gif", "", "$public_id");
            \Cloudinary\Uploader::upload($directory . '/' . $filename, array("public_id"=>$public_id));
            $photo = Photo::find($id);
            $photo->url = "http://res.cloudinary.com/cocn/image/upload/v1553053106/" . $filename;
            $photo->latitude = filter_var($data['latitude'], FILTER_SANITIZE_STRING);
            $photo->longitude = filter_var($data['longitude'], FILTER_SANITIZE_STRING);
            $photo->description = filter_var($data['description'], FILTER_SANITIZE_STRING);
            $photo->save();
            $resp->write(json_encode($data));
            return $resp;
        } 
        catch (\Exception $e) {
            return PhpError::error($req,$resp);
        }
    }
}