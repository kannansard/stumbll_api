CREATE DATABASE  IF NOT EXISTS `stumbll` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `stumbll`;
-- MySQL dump 10.13  Distrib 8.0.21, for Win64 (x86_64)
--
-- Host: localhost    Database: stumbll
-- ------------------------------------------------------
-- Server version	8.0.21

--
-- Table structure for table `identify_yourself`
--

DROP TABLE IF EXISTS `identify_yourself`;
CREATE TABLE `identify_yourself` (
  `identify_yourself_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(512) DEFAULT NULL,
  PRIMARY KEY (`identify_yourself_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */

--
-- Table structure for table `interest`
--

DROP TABLE IF EXISTS `interest`;
CREATE TABLE `interest` (
  `interest_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `image_uri` varchar(1000) DEFAULT NULL,
  PRIMARY KEY (`interest_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Table structure for table `login_with`
--

DROP TABLE IF EXISTS `login_with`;
CREATE TABLE `login_with` (
  `login_with_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  PRIMARY KEY (`login_with_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `user_name` varchar(256) NOT NULL,
  `email` varchar(256) NOT NULL,
  `password` varchar(100) NOT NULL,
  `login_with_id` tinyint NOT NULL,
  `verification_code` int DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Table structure for table `user_activity`
--

DROP TABLE IF EXISTS `user_activity`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_activity` (
  `user_activity_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `is_online` tinyint(1) NOT NULL,
  `last_seen` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`user_activity_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `user_info`
--

DROP TABLE IF EXISTS `user_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_info` (
  `user_info_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `first_name` varchar(100) DEFAULT NULL,
  `last_name` varchar(100) DEFAULT NULL,
  `profile_uri` varchar(1000) DEFAULT NULL,
  `dob` datetime DEFAULT NULL,
  `phone_number` varchar(20) DEFAULT NULL,
  `identify_yourself_id` tinyint NOT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`user_info_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `user_interest`
--

DROP TABLE IF EXISTS `user_interest`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_interest` (
  `user_interest_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `interest_id` tinyint NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`user_interest_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;




ALTER TABLE `user` 
ADD UNIQUE INDEX `user_name_UNIQUE` (`user_name` ASC) VISIBLE,
ADD UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE;


INSERT INTO login_with (name) VALUES("Stumbll");
INSERT INTO login_with (name) VALUES("Google");
INSERT INTO login_with (name) VALUES("Facebook");
INSERT INTO login_with (name) VALUES("Apple");


