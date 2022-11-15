-- Adminer 4.7.1 MySQL dump

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

DROP TABLE IF EXISTS `etat`;
CREATE TABLE `etat` (
  `id_partie` int(11) NOT NULL,
  `id_photo` varchar(128) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `partie`;
CREATE TABLE `partie` (
  `id` varchar(128) NOT NULL,
  `nom_joueur` varchar(128) NOT NULL,
  `token` varchar(128) NOT NULL,
  `difficulte` int(11) NOT NULL,
  `score` int(11) NOT NULL,
  `status` int(1) NOT NULL,
  `photo_etat` varchar(128) DEFAULT NULL,
  `id_serie` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `partie` (`id`, `nom_joueur`, `token`, `difficulte`, `score`, `status`, `photo_etat`, `id_serie`) VALUES
('e084872b-6328-46af-97fc-6cb909bf4f72',	'franck',	'3bd092bd94c85103c85faba1f41c2b7c4292f86406ed185138d73b4d75a3cb3e',	0,	0,	0,	'0',	1);

DROP TABLE IF EXISTS `photo`;
CREATE TABLE `photo` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `description` varchar(128) NOT NULL,
  `latitude` decimal(10,7) NOT NULL,
  `longitude` decimal(10,7) NOT NULL,
  `url` varchar(128) NOT NULL,
  `id_serie` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `serie`;
CREATE TABLE `serie` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `ville` varchar(128) NOT NULL,
  `latitude` decimal(11,7) NOT NULL,
  `longitude` decimal(11,7) NOT NULL,
  `zoom` int(2) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `serie` (`id`, `ville`, `latitude`, `longitude`, `zoom`) VALUES
(1,	'Nancy',	45.0000000,	50.0000000,	3);

DROP TABLE IF EXISTS `utilisateur`;
CREATE TABLE `utilisateur` (
  `id` varchar(128) NOT NULL,
  `email` varchar(128) NOT NULL,
  `mdp` varchar(128) NOT NULL,
  `token` varchar(128) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


-- 2019-03-22 13:50:18

