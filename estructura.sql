DROP DATABASE IF EXISTS prodemundial;
CREATE DATABASE prodemundial;
USE prodemundial;
DROP TABLE IF EXISTS `equipos`;
CREATE TABLE `equipos` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `pais` varchar(255) NOT NULL,
  `color` varchar(255) DEFAULT NULL,
  `imagen` varchar(255) DEFAULT NULL,
  `createdAt` varchar(255) DEFAULT NULL,
  `updatedAt` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARSET = utf8 COLLATE = utf8_unicode_ci;

CREATE TABLE `grupos` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `createdAt` varchar(255) DEFAULT NULL,
  `updatedAt` varchar(255) DEFAULT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `activo` tinyint(4) DEFAULT NULL,
  `KnockStage` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARSET = utf8 COLLATE = utf8_unicode_ci;
DROP TABLE IF EXISTS `partidos`;
CREATE TABLE `partidos` (
  `game_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `fecha` date DEFAULT NULL,
  `equipo1` int(10) unsigned DEFAULT NULL,
  `equipo2` int(10) unsigned DEFAULT NULL,
  `createdAt` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `updatedAt` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `goles1` int(11) DEFAULT NULL,
  `goles2` int(11) DEFAULT NULL,
  `grupo` int(10) unsigned NOT NULL,
  PRIMARY KEY (`game_id`),
  KEY `partidos_relation_1` (`equipo1`),
  KEY `partidos_relation_2` (`equipo2`),
  CONSTRAINT `partidos_relation_1` FOREIGN KEY (`equipo1`) REFERENCES `equipos` (`id`) ON DELETE NO ACTION ON
  UPDATE
    NO ACTION,
    CONSTRAINT `partidos_relation_2` FOREIGN KEY (`equipo2`) REFERENCES `equipos` (`id`) ON DELETE NO ACTION ON
  UPDATE
    NO ACTION
) ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARSET = utf8 COLLATE = utf8_unicode_ci;
DROP TABLE IF EXISTS `usuarios`;
CREATE TABLE `usuarios` (
  `user_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `user_name` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `admin` tinyint(4) DEFAULT NULL,
   `confirm` tinyint(4) DEFAULT NULL,
  `updatedAt` varchar(255) DEFAULT NULL,
  `createdAt` varchar(255) DEFAULT NULL,
  `puntos` int(11) NOT NULL,
  `plenos` int(11) NOT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARSET = utf8 COLLATE = utf8_unicode_ci;
DROP TABLE IF EXISTS `pronostico`;
CREATE TABLE `pronostico` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `game_id` int(10) unsigned NOT NULL,
  `user_id` int(10) unsigned NOT NULL,
  `equipo1` int(11) DEFAULT NULL,
  `equipo2` int(11) DEFAULT NULL,
  `puntos` int(11) DEFAULT NULL,
  `createdAt` varchar(255) DEFAULT NULL,
  `updatedAt` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `pronostico_relation_1` (`game_id`),
  KEY `pronostico_relation_2` (`user_id`),
  CONSTRAINT `pronostico_relation_1` FOREIGN KEY (`game_id`) REFERENCES `partidos` (`game_id`) ON DELETE NO ACTION ON
  UPDATE
    NO ACTION,
    CONSTRAINT `pronostico_relation_2` FOREIGN KEY (`user_id`) REFERENCES `usuarios` (`user_id`) ON DELETE NO ACTION ON
  UPDATE
    NO ACTION
) ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARSET = utf8 COLLATE = utf8_unicode_ci;
insert into `equipos` (`color`, `createdAt`, `id`, `imagen`, `pais`, `updatedAt`) values (NULL, NULL, 1, NULL, 'Qatar', NULL);
insert into `equipos` (`color`, `createdAt`, `id`, `imagen`, `pais`, `updatedAt`) values (NULL, NULL, 2, NULL, 'Ecuador', NULL);
insert into `equipos` (`color`, `createdAt`, `id`, `imagen`, `pais`, `updatedAt`) values (NULL, NULL, 3, NULL, 'Senegal', NULL);
insert into `equipos` (`color`, `createdAt`, `id`, `imagen`, `pais`, `updatedAt`) values (NULL, NULL, 4, NULL, 'Paises Bajos', NULL);
insert into `equipos` (`color`, `createdAt`, `id`, `imagen`, `pais`, `updatedAt`) values (NULL, NULL, 5, NULL, 'Inglaterra', NULL);
insert into `equipos` (`color`, `createdAt`, `id`, `imagen`, `pais`, `updatedAt`) values (NULL, NULL, 6, NULL, 'Iran', NULL);
insert into `equipos` (`color`, `createdAt`, `id`, `imagen`, `pais`, `updatedAt`) values (NULL, NULL, 7, NULL, 'Usa', NULL);
insert into `equipos` (`color`, `createdAt`, `id`, `imagen`, `pais`, `updatedAt`) values (NULL, NULL, 8, NULL, 'Gales', NULL);
insert into `equipos` (`color`, `createdAt`, `id`, `imagen`, `pais`, `updatedAt`) values (NULL, NULL, 9, NULL, 'Argentina', NULL);
insert into `equipos` (`color`, `createdAt`, `id`, `imagen`, `pais`, `updatedAt`) values (NULL, NULL, 10, NULL, 'Arabia saudita', NULL);
insert into `equipos` (`color`, `createdAt`, `id`, `imagen`, `pais`, `updatedAt`) values (NULL, NULL, 11, NULL, 'Mexico', NULL);
insert into `equipos` (`color`, `createdAt`, `id`, `imagen`, `pais`, `updatedAt`) values (NULL, NULL, 12, NULL, 'Polonia', NULL);
insert into `equipos` (`color`, `createdAt`, `id`, `imagen`, `pais`, `updatedAt`) values (NULL, NULL, 13, NULL, 'Francia', NULL);
insert into `equipos` (`color`, `createdAt`, `id`, `imagen`, `pais`, `updatedAt`) values (NULL, NULL, 14, NULL, 'Australia', NULL);
insert into `equipos` (`color`, `createdAt`, `id`, `imagen`, `pais`, `updatedAt`) values (NULL, NULL, 15, NULL, 'Dinamarca', NULL);
insert into `equipos` (`color`, `createdAt`, `id`, `imagen`, `pais`, `updatedAt`) values (NULL, NULL, 16, NULL, 'Tunez', NULL);
insert into `equipos` (`color`, `createdAt`, `id`, `imagen`, `pais`, `updatedAt`) values (NULL, NULL, 17, NULL, 'España', NULL);
insert into `equipos` (`color`, `createdAt`, `id`, `imagen`, `pais`, `updatedAt`) values (NULL, NULL, 18, NULL, 'Costa Rica', NULL);
insert into `equipos` (`color`, `createdAt`, `id`, `imagen`, `pais`, `updatedAt`) values (NULL, NULL, 19, NULL, 'Alemania', NULL);
insert into `equipos` (`color`, `createdAt`, `id`, `imagen`, `pais`, `updatedAt`) values (NULL, NULL, 20, NULL, 'Japon', NULL);
insert into `equipos` (`color`, `createdAt`, `id`, `imagen`, `pais`, `updatedAt`) values (NULL, NULL, 21, NULL, 'Belgica', NULL);
insert into `equipos` (`color`, `createdAt`, `id`, `imagen`, `pais`, `updatedAt`) values (NULL, NULL, 22, NULL, 'Canada', NULL);
insert into `equipos` (`color`, `createdAt`, `id`, `imagen`, `pais`, `updatedAt`) values (NULL, NULL, 23, NULL, 'Marruecos', NULL);
insert into `equipos` (`color`, `createdAt`, `id`, `imagen`, `pais`, `updatedAt`) values (NULL, NULL, 24, NULL, 'Croacia', NULL);
insert into `equipos` (`color`, `createdAt`, `id`, `imagen`, `pais`, `updatedAt`) values (NULL, NULL, 25, NULL, 'Brasil', NULL);
insert into `equipos` (`color`, `createdAt`, `id`, `imagen`, `pais`, `updatedAt`) values (NULL, NULL, 26, NULL, 'Serbia', NULL);
insert into `equipos` (`color`, `createdAt`, `id`, `imagen`, `pais`, `updatedAt`) values (NULL, NULL, 27, NULL, 'Suiza', NULL);
insert into `equipos` (`color`, `createdAt`, `id`, `imagen`, `pais`, `updatedAt`) values (NULL, NULL, 28, NULL, 'Camerun', NULL);
insert into `equipos` (`color`, `createdAt`, `id`, `imagen`, `pais`, `updatedAt`) values (NULL, NULL, 29, NULL, 'Portugal', NULL);
insert into `equipos` (`color`, `createdAt`, `id`, `imagen`, `pais`, `updatedAt`) values (NULL, NULL, 30, NULL, 'Ghana', NULL);
insert into `equipos` (`color`, `createdAt`, `id`, `imagen`, `pais`, `updatedAt`) values (NULL, NULL, 31, NULL, 'Uruguay', NULL);
insert into `equipos` (`color`, `createdAt`, `id`, `imagen`, `pais`, `updatedAt`) values (NULL, NULL, 32, NULL, 'Corea del Sur', NULL);
insert into `grupos` (`KnockStage`, `activo`, `createdAt`, `id`, `nombre`, `updatedAt`) values (0, 1, '', 1, 'A', NULL);
insert into `grupos` (`KnockStage`, `activo`, `createdAt`, `id`, `nombre`, `updatedAt`) values (0, 1, NULL, 2, 'B', NULL);
insert into `grupos` (`KnockStage`, `activo`, `createdAt`, `id`, `nombre`, `updatedAt`) values (0, 1, NULL, 3, 'C', NULL);
insert into `grupos` (`KnockStage`, `activo`, `createdAt`, `id`, `nombre`, `updatedAt`) values (0, 1, NULL, 4, 'D', NULL);
insert into `grupos` (`KnockStage`, `activo`, `createdAt`, `id`, `nombre`, `updatedAt`) values (0, 1, NULL, 5, 'E', NULL);
insert into `grupos` (`KnockStage`, `activo`, `createdAt`, `id`, `nombre`, `updatedAt`) values (0, 1, NULL, 6, 'F', NULL);
insert into `grupos` (`KnockStage`, `activo`, `createdAt`, `id`, `nombre`, `updatedAt`) values (0, 1, NULL, 7, 'G', NULL);
insert into `grupos` (`KnockStage`, `activo`, `createdAt`, `id`, `nombre`, `updatedAt`) values (0, 1, NULL, 8, 'H', NULL);
insert into `grupos` (`KnockStage`, `activo`, `createdAt`, `id`, `nombre`, `updatedAt`) values (1, 0, NULL, 9, 'Octavos de Final', NULL);
insert into `grupos` (`KnockStage`, `activo`, `createdAt`, `id`, `nombre`, `updatedAt`) values (1, 0, NULL, 10, 'Cuartos de Final', NULL);
insert into `grupos` (`KnockStage`, `activo`, `createdAt`, `id`, `nombre`, `updatedAt`) values (1, 0, NULL, 11, 'Semi Final', NULL);
insert into `grupos` (`KnockStage`, `activo`, `createdAt`, `id`, `nombre`, `updatedAt`) values (1, 0, NULL, 12, '3er Puesto', NULL);
insert into `grupos` (`KnockStage`, `activo`, `createdAt`, `id`, `nombre`, `updatedAt`) values (1, 0, NULL, 13, 'Final', NULL);
insert into `partidos` (`createdAt`, `equipo1`, `equipo2`, `fecha`, `game_id`, `goles1`, `goles2`, `grupo`, `updatedAt`) values (NULL, 1, 2, '2022-11-20', 1, NULL, NULL, 1, NULL);
insert into `partidos` (`createdAt`, `equipo1`, `equipo2`, `fecha`, `game_id`, `goles1`, `goles2`, `grupo`, `updatedAt`) values (NULL, 3, 4, '2022-11-21', 2, NULL, NULL, 1, NULL);
insert into `partidos` (`createdAt`, `equipo1`, `equipo2`, `fecha`, `game_id`, `goles1`, `goles2`, `grupo`, `updatedAt`) values (NULL, 5, 6, '2022-11-21', 3, NULL, NULL, 2, NULL);
insert into `partidos` (`createdAt`, `equipo1`, `equipo2`, `fecha`, `game_id`, `goles1`, `goles2`, `grupo`, `updatedAt`) values (NULL, 7, 8, '2022-11-21', 4, NULL, NULL, 2, NULL);
insert into `partidos` (`createdAt`, `equipo1`, `equipo2`, `fecha`, `game_id`, `goles1`, `goles2`, `grupo`, `updatedAt`) values (NULL, 9, 10, '2022-11-22', 5, NULL, NULL, 3, NULL);
insert into `partidos` (`createdAt`, `equipo1`, `equipo2`, `fecha`, `game_id`, `goles1`, `goles2`, `grupo`, `updatedAt`) values (NULL, 11, 12, '2022-11-22', 6, NULL, NULL, 3, NULL);
insert into `partidos` (`createdAt`, `equipo1`, `equipo2`, `fecha`, `game_id`, `goles1`, `goles2`, `grupo`, `updatedAt`) values (NULL, 13, 14, '2022-11-22', 7, NULL, NULL, 4, NULL);
insert into `partidos` (`createdAt`, `equipo1`, `equipo2`, `fecha`, `game_id`, `goles1`, `goles2`, `grupo`, `updatedAt`) values (NULL, 15, 16, '2022-11-22', 8, NULL, NULL, 4, NULL);
insert into `partidos` (`createdAt`, `equipo1`, `equipo2`, `fecha`, `game_id`, `goles1`, `goles2`, `grupo`, `updatedAt`) values (NULL, 17, 18, '2022-11-23', 9, NULL, NULL, 5, NULL);
insert into `partidos` (`createdAt`, `equipo1`, `equipo2`, `fecha`, `game_id`, `goles1`, `goles2`, `grupo`, `updatedAt`) values (NULL, 19, 20, '2022-11-23', 10, NULL, NULL, 5, NULL);
insert into `partidos` (`createdAt`, `equipo1`, `equipo2`, `fecha`, `game_id`, `goles1`, `goles2`, `grupo`, `updatedAt`) values (NULL, 21, 22, '2022-11-23', 11, NULL, NULL, 6, NULL);
insert into `partidos` (`createdAt`, `equipo1`, `equipo2`, `fecha`, `game_id`, `goles1`, `goles2`, `grupo`, `updatedAt`) values (NULL, 23, 24, '2022-11-23', 12, NULL, NULL, 6, NULL);
insert into `partidos` (`createdAt`, `equipo1`, `equipo2`, `fecha`, `game_id`, `goles1`, `goles2`, `grupo`, `updatedAt`) values (NULL, 25, 26, '2022-11-24', 13, NULL, NULL, 7, NULL);
insert into `partidos` (`createdAt`, `equipo1`, `equipo2`, `fecha`, `game_id`, `goles1`, `goles2`, `grupo`, `updatedAt`) values (NULL, 27, 28, '2022-11-24', 14, NULL, NULL, 7, NULL);
insert into `partidos` (`createdAt`, `equipo1`, `equipo2`, `fecha`, `game_id`, `goles1`, `goles2`, `grupo`, `updatedAt`) values (NULL, 29, 30, '2022-11-24', 15, NULL, NULL, 8, NULL);
insert into `partidos` (`createdAt`, `equipo1`, `equipo2`, `fecha`, `game_id`, `goles1`, `goles2`, `grupo`, `updatedAt`) values (NULL, 31, 32, '2022-11-24', 16, NULL, NULL, 8, NULL);
insert into `partidos` (`createdAt`, `equipo1`, `equipo2`, `fecha`, `game_id`, `goles1`, `goles2`, `grupo`, `updatedAt`) values (NULL, 1, 3, '2022-11-25', 17, NULL, NULL, 1, NULL);
insert into `partidos` (`createdAt`, `equipo1`, `equipo2`, `fecha`, `game_id`, `goles1`, `goles2`, `grupo`, `updatedAt`) values (NULL, 2, 4, '2022-11-25', 18, NULL, NULL, 1, NULL);
insert into `partidos` (`createdAt`, `equipo1`, `equipo2`, `fecha`, `game_id`, `goles1`, `goles2`, `grupo`, `updatedAt`) values (NULL, 6, 8, '2022-11-25', 19, NULL, NULL, 2, NULL);
insert into `partidos` (`createdAt`, `equipo1`, `equipo2`, `fecha`, `game_id`, `goles1`, `goles2`, `grupo`, `updatedAt`) values (NULL, 5, 7, '2022-11-25', 20, NULL, NULL, 2, NULL);
insert into `partidos` (`createdAt`, `equipo1`, `equipo2`, `fecha`, `game_id`, `goles1`, `goles2`, `grupo`, `updatedAt`) values (NULL, 10, 12, '2022-11-26', 21, NULL, NULL, 3, NULL);
insert into `partidos` (`createdAt`, `equipo1`, `equipo2`, `fecha`, `game_id`, `goles1`, `goles2`, `grupo`, `updatedAt`) values (NULL, 9, 11, '2022-11-26', 22, NULL, NULL, 3, NULL);
insert into `partidos` (`createdAt`, `equipo1`, `equipo2`, `fecha`, `game_id`, `goles1`, `goles2`, `grupo`, `updatedAt`) values (NULL, 13, 15, '2022-11-26', 23, NULL, NULL, 4, NULL);
insert into `partidos` (`createdAt`, `equipo1`, `equipo2`, `fecha`, `game_id`, `goles1`, `goles2`, `grupo`, `updatedAt`) values (NULL, 14, 16, '2022-11-26', 24, NULL, NULL, 4, NULL);
insert into `partidos` (`createdAt`, `equipo1`, `equipo2`, `fecha`, `game_id`, `goles1`, `goles2`, `grupo`, `updatedAt`) values (NULL, 17, 19, '2022-11-27', 25, NULL, NULL, 5, NULL);
insert into `partidos` (`createdAt`, `equipo1`, `equipo2`, `fecha`, `game_id`, `goles1`, `goles2`, `grupo`, `updatedAt`) values (NULL, 18, 20, '2022-11-27', 26, NULL, NULL, 5, NULL);
insert into `partidos` (`createdAt`, `equipo1`, `equipo2`, `fecha`, `game_id`, `goles1`, `goles2`, `grupo`, `updatedAt`) values (NULL, 21, 23, '2022-11-27', 27, NULL, NULL, 6, NULL);
insert into `partidos` (`createdAt`, `equipo1`, `equipo2`, `fecha`, `game_id`, `goles1`, `goles2`, `grupo`, `updatedAt`) values (NULL, 22, 24, '2022-11-27', 28, NULL, NULL, 6, NULL);
insert into `partidos` (`createdAt`, `equipo1`, `equipo2`, `fecha`, `game_id`, `goles1`, `goles2`, `grupo`, `updatedAt`) values (NULL, 25, 27, '2022-11-28', 29, NULL, NULL, 7, NULL);
insert into `partidos` (`createdAt`, `equipo1`, `equipo2`, `fecha`, `game_id`, `goles1`, `goles2`, `grupo`, `updatedAt`) values (NULL, 26, 28, '2022-11-28', 30, NULL, NULL, 7, NULL);
insert into `partidos` (`createdAt`, `equipo1`, `equipo2`, `fecha`, `game_id`, `goles1`, `goles2`, `grupo`, `updatedAt`) values (NULL, 29, 31, '2022-11-28', 31, NULL, NULL, 8, NULL);
insert into `partidos` (`createdAt`, `equipo1`, `equipo2`, `fecha`, `game_id`, `goles1`, `goles2`, `grupo`, `updatedAt`) values (NULL, 30, 32, '2022-11-28', 32, NULL, NULL, 8, NULL);
insert into `partidos` (`createdAt`, `equipo1`, `equipo2`, `fecha`, `game_id`, `goles1`, `goles2`, `grupo`, `updatedAt`) values (NULL, 1, 4, '2022-11-29', 33, NULL, NULL, 1, NULL);
insert into `partidos` (`createdAt`, `equipo1`, `equipo2`, `fecha`, `game_id`, `goles1`, `goles2`, `grupo`, `updatedAt`) values (NULL, 2, 3, '2022-11-29', 34, NULL, NULL, 1, NULL);
insert into `partidos` (`createdAt`, `equipo1`, `equipo2`, `fecha`, `game_id`, `goles1`, `goles2`, `grupo`, `updatedAt`) values (NULL, 5, 8, '2022-11-29', 35, NULL, NULL, 2, NULL);
insert into `partidos` (`createdAt`, `equipo1`, `equipo2`, `fecha`, `game_id`, `goles1`, `goles2`, `grupo`, `updatedAt`) values (NULL, 6, 7, '2022-11-29', 36, NULL, NULL, 2, NULL);
insert into `partidos` (`createdAt`, `equipo1`, `equipo2`, `fecha`, `game_id`, `goles1`, `goles2`, `grupo`, `updatedAt`) values (NULL, 9, 12, '2022-11-30', 37, NULL, NULL, 3, NULL);
insert into `partidos` (`createdAt`, `equipo1`, `equipo2`, `fecha`, `game_id`, `goles1`, `goles2`, `grupo`, `updatedAt`) values (NULL, 10, 11, '2022-11-30', 38, NULL, NULL, 3, NULL);
insert into `partidos` (`createdAt`, `equipo1`, `equipo2`, `fecha`, `game_id`, `goles1`, `goles2`, `grupo`, `updatedAt`) values (NULL, 13, 16, '2022-11-30', 39, NULL, NULL, 4, NULL);
insert into `partidos` (`createdAt`, `equipo1`, `equipo2`, `fecha`, `game_id`, `goles1`, `goles2`, `grupo`, `updatedAt`) values (NULL, 14, 15, '2022-11-30', 40, NULL, NULL, 4, NULL);
insert into `partidos` (`createdAt`, `equipo1`, `equipo2`, `fecha`, `game_id`, `goles1`, `goles2`, `grupo`, `updatedAt`) values (NULL, 17, 20, '2022-12-01', 41, NULL, NULL, 5, NULL);
insert into `partidos` (`createdAt`, `equipo1`, `equipo2`, `fecha`, `game_id`, `goles1`, `goles2`, `grupo`, `updatedAt`) values (NULL, 18, 19, '2022-12-01', 42, NULL, NULL, 5, NULL);
insert into `partidos` (`createdAt`, `equipo1`, `equipo2`, `fecha`, `game_id`, `goles1`, `goles2`, `grupo`, `updatedAt`) values (NULL, 21, 24, '2022-12-01', 43, NULL, NULL, 6, NULL);
insert into `partidos` (`createdAt`, `equipo1`, `equipo2`, `fecha`, `game_id`, `goles1`, `goles2`, `grupo`, `updatedAt`) values (NULL, 22, 23, '2022-12-01', 44, NULL, NULL, 6, NULL);
insert into `partidos` (`createdAt`, `equipo1`, `equipo2`, `fecha`, `game_id`, `goles1`, `goles2`, `grupo`, `updatedAt`) values (NULL, 25, 28, '2022-12-02', 45, NULL, NULL, 7, NULL);
insert into `partidos` (`createdAt`, `equipo1`, `equipo2`, `fecha`, `game_id`, `goles1`, `goles2`, `grupo`, `updatedAt`) values (NULL, 26, 27, '2022-12-02', 46, NULL, NULL, 7, NULL);
insert into `partidos` (`createdAt`, `equipo1`, `equipo2`, `fecha`, `game_id`, `goles1`, `goles2`, `grupo`, `updatedAt`) values (NULL, 29, 32, '2022-12-02', 47, NULL, NULL, 8, NULL);
insert into `partidos` (`createdAt`, `equipo1`, `equipo2`, `fecha`, `game_id`, `goles1`, `goles2`, `grupo`, `updatedAt`) values (NULL, 30, 31, '2022-12-02', 48, NULL, NULL, 8, NULL);
insert into `partidos` (`createdAt`, `equipo1`, `equipo2`, `fecha`, `game_id`, `goles1`, `goles2`, `grupo`, `updatedAt`) values (NULL, NULL, NULL, '2022-12-03', 49, NULL, NULL, 9, NULL);
insert into `partidos` (`createdAt`, `equipo1`, `equipo2`, `fecha`, `game_id`, `goles1`, `goles2`, `grupo`, `updatedAt`) values (NULL, NULL, NULL, '2022-12-03', 50, NULL, NULL, 9, NULL);
insert into `partidos` (`createdAt`, `equipo1`, `equipo2`, `fecha`, `game_id`, `goles1`, `goles2`, `grupo`, `updatedAt`) values (NULL, NULL, NULL, '2022-12-04', 51, NULL, NULL, 9, NULL);
insert into `partidos` (`createdAt`, `equipo1`, `equipo2`, `fecha`, `game_id`, `goles1`, `goles2`, `grupo`, `updatedAt`) values (NULL, NULL, NULL, '2022-12-04', 52, NULL, NULL, 9, NULL);
insert into `partidos` (`createdAt`, `equipo1`, `equipo2`, `fecha`, `game_id`, `goles1`, `goles2`, `grupo`, `updatedAt`) values (NULL, NULL, NULL, '2022-12-05', 53, NULL, NULL, 9, NULL);
insert into `partidos` (`createdAt`, `equipo1`, `equipo2`, `fecha`, `game_id`, `goles1`, `goles2`, `grupo`, `updatedAt`) values (NULL, NULL, NULL, '2022-12-05', 54, NULL, NULL, 9, NULL);
insert into `partidos` (`createdAt`, `equipo1`, `equipo2`, `fecha`, `game_id`, `goles1`, `goles2`, `grupo`, `updatedAt`) values (NULL, NULL, NULL, '2022-12-06', 55, NULL, NULL, 9, NULL);
insert into `partidos` (`createdAt`, `equipo1`, `equipo2`, `fecha`, `game_id`, `goles1`, `goles2`, `grupo`, `updatedAt`) values (NULL, NULL, NULL, '2022-12-06', 56, NULL, NULL, 9, NULL);
insert into `partidos` (`createdAt`, `equipo1`, `equipo2`, `fecha`, `game_id`, `goles1`, `goles2`, `grupo`, `updatedAt`) values (NULL, NULL, NULL, '2022-12-09', 57, NULL, NULL, 10, NULL);
insert into `partidos` (`createdAt`, `equipo1`, `equipo2`, `fecha`, `game_id`, `goles1`, `goles2`, `grupo`, `updatedAt`) values (NULL, NULL, NULL, '2022-12-09', 58, NULL, NULL, 10, NULL);
insert into `partidos` (`createdAt`, `equipo1`, `equipo2`, `fecha`, `game_id`, `goles1`, `goles2`, `grupo`, `updatedAt`) values (NULL, NULL, NULL, '2022-12-10', 59, NULL, NULL, 10, NULL);
insert into `partidos` (`createdAt`, `equipo1`, `equipo2`, `fecha`, `game_id`, `goles1`, `goles2`, `grupo`, `updatedAt`) values (NULL, NULL, NULL, '2022-12-10', 60, NULL, NULL, 10, NULL);
insert into `partidos` (`createdAt`, `equipo1`, `equipo2`, `fecha`, `game_id`, `goles1`, `goles2`, `grupo`, `updatedAt`) values (NULL, NULL, NULL, '2022-12-13', 61, NULL, NULL, 11, NULL);
insert into `partidos` (`createdAt`, `equipo1`, `equipo2`, `fecha`, `game_id`, `goles1`, `goles2`, `grupo`, `updatedAt`) values (NULL, NULL, NULL, '2022-12-14', 62, NULL, NULL, 11, NULL);
insert into `partidos` (`createdAt`, `equipo1`, `equipo2`, `fecha`, `game_id`, `goles1`, `goles2`, `grupo`, `updatedAt`) values (NULL, NULL, NULL, '2022-12-17', 63, NULL, NULL, 12, NULL);
insert into `partidos` (`createdAt`, `equipo1`, `equipo2`, `fecha`, `game_id`, `goles1`, `goles2`, `grupo`, `updatedAt`) values (NULL, NULL, NULL, '2022-12-18', 64, NULL, NULL, 13, NULL);