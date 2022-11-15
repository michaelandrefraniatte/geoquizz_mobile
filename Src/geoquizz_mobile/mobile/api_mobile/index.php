<?php

/* 
LP CIASIE : Dev. Applications & Services Web / Serveur
A l'intention de Gérôme Canals : gerome.canals@univ-lorraine.fr
Rendu Atelier 2 : Réalisation d'une application web
Pauline Monteil : monteilpauline65@gmail.com
Adrien Costa : crywarch@gmail.com
Mike Kaiser : mike.kaiser-parisot8@etu.univ-lorraine.fr
Michael Franiatte : michael.franiatte@gmail.com
*/


/**
 * File:  index.php
 * Creation Date: 17/10/2018
 * name: GéoQuizz / api mobile
 * description: api pour intéragir avec l'app mobile
 * type: API POUR MOBILE
 *
 * @author: Canals, Monteil, Costa, Kaiser, Franiatte
 */

use gq\mobile\mobjeu\control\MobjeuController;
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;
use Illuminate\Database\Capsule\Manager;
use gq\mobile\mobjeu\error\NotAllowed;
use Slim\App;
use Slim\Container;

require __DIR__ . '/../src/vendor/autoload.php';
ini_set('display_errors', 1);

$db = new Manager();
$var = parse_ini_file(__DIR__ . '/../src/conf/config.ini');

$db->addConnection($var); /* configuration avec nos paramètres */
$db->setAsGlobal();            /* visible de tout fichier */
$db->bootEloquent();           /* établir la connexion */

$c = new Container();      /* Create container */

$conf = [
    'settings' => [
        'displayErrorDetails'=>true,
        'dbconf'=>__DIR__ . '/../src/conf/config.ini',
        'determineRouteBeforeRouteMiddleware'=> true,
        'cors'=>[
            "methods"=> ["GET","POST","PUT","OPTIONS","DELETE"],
            "header.allow" =>['Content-Type','Authorization','X-gq-token'],
            "header.expose"=>[],
            "max.age"=> 60+60,
            "credential"=> true
        ]
    ],
    'notFoundHandler' => function ($c){
        return function (Request $rq, Response $rs){
            return NotAllowed::error($rq,$rs);
        };
    }
];

$app = new App($conf);

$app->options('/{routes:.+}', function (Request $request, Response $response, $args) {
    return $response;
});

$app->add(function (Request $req, Response $res, $next) {
    $response = $next($req, $res);
    return $response
        ->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
});

/**
 * @api {get} /parties/{id} Récupére les informations d'une partie à titre de test
 * @apiName getParties
 * @apiGroup Parties
 * @apiVersion 1.0.0
 * @apiDescription Retourne toutes les informations d'une partie;
 *
 * @apiParam {String} nom_joueur Nom du joueur
 * 
 * @apiSuccess {int} difficulte Difficulte de la partie
 * @apiSuccess {String} id_partie Id de la partie
 * @apiSuccess {String} token Token correspondant a l'id de la partie
 * @apiSuccess {Object} serie Serie correspondant a l'id_serie fourni en paramètre
 * @apiSuccess {String} serie.ville Nom de la ville
 * @apiSuccess {Decimal} serie.latitude Latitude de la ville
 * @apiSuccess {Decimal} serie.longitude Longitude de la ville
 * @apiSuccess {int} serie.zoom Zoom correspondant à la ville
 * @apiSuccess {Object} photos Tableau de 10 photos
 * @apiSuccess {String} photos.photo Id de la photo
 * @apiSuccess {Decimal} photos.latitude Latitude de la photo
 * @apiSuccess {Decimal} photos.longitude Longitude de la photo
 * @apiSuccess {String} photos.description Description de la photo
 * @apiSuccess {String} photos.url Url de la photo
 * 
 * @apiError (Réponse : 404) NotFound La partie correspondant à l'id n'a pas été trouvé
 * @apiError (Réponse : 500) InternalServerError Une erreur est survenue lors du traitement de la requete
 */
$app->get('/parties/{id}[/]', function(Request $req, Response $resp, $args){
    $c = new MobjeuController($this);
    return $c->getPartie($req, $resp, $args);
})->setName('getPartie');

/**
 * @api {post} /photo/ Upload d'une photo sur le serveur
 * @apiName receivePhoto
 * @apiGroup Photo
 * @apiVersion 1.0.0
 * @apiDescription Initialisation d'une photo, Envoie d'une photo dans le dossier images
 * Retourne le nom de la photo uploadée
 *
 * @apiSuccess {String} uploaded nom de la photo;
 *
 * @apiError (Réponse : 422) MissingDataException Une ou plusieurs données sont manquantes dans la requete
 * @apiError (Réponse : 500) InternalServerError Une erreur est survenue lors du traitement de la requete
 */
$app->post('/photo[/]', function(Request $req, Response $resp, $args){
    $c = new MobjeuController($this);
    return $c->receivePhoto($req, $resp, $args);
})->setName('receivePhoto');

/**
 * @api {post} /photos/ Upload de plusieurs photos sur le serveur
 * @apiName receivePhotos
 * @apiGroup Photos
 * @apiVersion 1.0.0
 * @apiDescription Initialisation de photos, Envoie de photos dans le dossier images
 * Retourne les noms des photos uploadées
 *
 * @apiSuccess {String} uploaded tableau des noms des photos;
 *
 * @apiError (Réponse : 422) MissingDataException Une ou plusieurs données sont manquantes dans la requete
 * @apiError (Réponse : 500) InternalServerError Une erreur est survenue lors du traitement de la requete
 */
$app->post('/photos[/]', function(Request $req, Response $resp, $args){
    $c = new MobjeuController($this);
    return $c->receivePhotos($req, $resp, $args);
})->setName('receivePhotos');

/**
 * @api {put} /geolocalisation/ Recuperation de la description, des coordonnées latitude et longitude d'une photo
 * @apiName receiveGeolocalisation
 * @apiGroup Geolocalisation
 * @apiVersion 1.0.0
 * @apiDescription Permet d'obtenir la photo uploadée sur le serveur Cloudordinary '
 * Retourne la latitude, la longitude et la description, Permet de mettre à jour la BDD avec l'url de Cloudordinary
 *
 * @apiSuccess {Decimal} latitude de la photo;
 * @apiSuccess {Decimal} longitude de la photo;
 * @apiSuccess {String} description de la photo;
 * 
 * @apiError (Réponse : 422) MissingDataException Une ou plusieurs données sont manquantes dans la requete
 * @apiError (Réponse : 500) InternalServerError Une erreur est survenue lors du traitement de la requete
 */
$app->put('/geolocalisation[/]', function(Request $req, Response $resp, $args){
    $c = new MobjeuController($this);
    return $c->receiveGeolocalisation($req, $resp, $args);
})->setName('receiveGeolocalisation');

$app->map(['GET', 'POST', 'PUT'], '/{routes:.+}', function(Request $req, Response $res) {
    $handler = $this->notFoundHandler; // handle using the default Slim page not found handler
    return $handler($req, $res);
});

$app->run();

