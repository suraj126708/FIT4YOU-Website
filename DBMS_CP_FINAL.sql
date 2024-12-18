-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: localhost    Database: DBMS_CP_FINAL
-- ------------------------------------------------------
-- Server version	8.0.38

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `admins`
--

DROP TABLE IF EXISTS `admins`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admins` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `role` enum('superadmin','admin') NOT NULL,
  `profile_pic` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admins`
--

LOCK TABLES `admins` WRITE;
/*!40000 ALTER TABLE `admins` DISABLE KEYS */;
/*!40000 ALTER TABLE `admins` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contact_us`
--

DROP TABLE IF EXISTS `contact_us`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `contact_us` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `message` text,
  `submitted_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `answered` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contact_us`
--

LOCK TABLES `contact_us` WRITE;
/*!40000 ALTER TABLE `contact_us` DISABLE KEYS */;
INSERT INTO `contact_us` VALUES (27,'Shital Namdev gitte','sumedhagitte6708@gmail.com','message from website','2024-11-17 06:36:32',1),(28,'suraj gitte','johndoe@example.com','This is a test message.','2024-11-17 06:36:57',1),(37,'suraj gitte','surak@gmail.com','postman question ','2024-11-17 12:20:45',1),(38,'Shital Namdev gitte','sumedhagitte6708@gmail.com','this is message from website ','2024-11-17 12:21:03',0),(39,'Shital Namdev gitte','sumedhagitte6708@gmail.com','this is a message for testing navigation','2024-11-17 12:23:11',0),(40,'Shital Namdev gitte','sumedhagitte6708@gmail.com','timeout ','2024-11-17 12:24:00',0),(41,'roahn humbe','rohan@gmail.com','he is a prostitue ','2024-11-18 06:38:09',1);
/*!40000 ALTER TABLE `contact_us` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `faq_answers`
--

DROP TABLE IF EXISTS `faq_answers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `faq_answers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `contact_us_id` int DEFAULT NULL,
  `answer` text NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `contact_us_id` (`contact_us_id`),
  CONSTRAINT `faq_answers_ibfk_1` FOREIGN KEY (`contact_us_id`) REFERENCES `contact_us` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `faq_answers`
--

LOCK TABLES `faq_answers` WRITE;
/*!40000 ALTER TABLE `faq_answers` DISABLE KEYS */;
INSERT INTO `faq_answers` VALUES (1,NULL,'its a good question ','2024-11-17 10:19:39','2024-11-17 10:19:39'),(2,NULL,'this is anwer from website','2024-11-17 10:27:16','2024-11-17 10:27:16'),(3,NULL,'ans from website','2024-11-17 10:28:51','2024-11-17 10:28:51'),(4,27,'this is answered','2024-11-17 10:36:31','2024-11-17 10:36:31'),(5,28,'this is the answer from website admin ','2024-11-17 10:41:48','2024-11-17 10:41:48'),(6,37,'asns s ','2024-11-17 13:42:05','2024-11-17 13:42:05'),(7,41,'be a prostitue ','2024-11-18 06:38:45','2024-11-18 06:38:45');
/*!40000 ALTER TABLE `faq_answers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subscription_plans`
--

DROP TABLE IF EXISTS `subscription_plans`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `subscription_plans` (
  `id` int NOT NULL AUTO_INCREMENT,
  `plan_name` varchar(100) NOT NULL,
  `description` text,
  `duration` enum('Monthly','Quarterly','Annually') NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `access_level` enum('Basic','Premium','VIP','Elite') NOT NULL,
  `includes` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subscription_plans`
--

LOCK TABLES `subscription_plans` WRITE;
/*!40000 ALTER TABLE `subscription_plans` DISABLE KEYS */;
INSERT INTO `subscription_plans` VALUES (1,'Basic Membership','Access to gym facilities only.','Monthly',29.99,'Basic','Gym access','2024-11-14 06:43:36','2024-11-14 06:43:36'),(2,'Premium Membership','Includes group classes and personal training.','Monthly',49.99,'Premium','Gym access, unlimited group classes, 1 personal training session','2024-11-14 06:43:36','2024-11-14 06:43:36'),(3,'VIP Membership','All-inclusive access with additional perks.','Annually',499.99,'VIP','Gym access, unlimited group classes, 5 personal training sessions, guest passes','2024-11-14 06:43:36','2024-11-14 06:43:36'),(4,'Basic Membership','Access to gym facilities for three months.','Quarterly',79.99,'Basic','Gym access','2024-11-14 06:53:43','2024-11-14 06:53:43'),(5,'Basic Membership','Access to gym facilities for one year.','Annually',299.99,'Basic','Gym access','2024-11-14 06:53:43','2024-11-14 06:53:43'),(6,'Premium Membership','Includes group classes and personal training for three months.','Quarterly',139.99,'Premium','Gym access, unlimited group classes, 3 personal training sessions','2024-11-14 06:53:43','2024-11-14 06:53:43'),(7,'Premium Membership','All-inclusive access with additional perks for one year.','Annually',499.99,'Premium','Gym access, unlimited group classes, 5 personal training sessions, guest passes','2024-11-14 06:53:43','2024-11-14 06:53:43'),(8,'VIP Membership','All-inclusive access with additional perks.','Monthly',79.99,'VIP','Gym access, unlimited group classes, 2 personal training sessions, guest passes','2024-11-14 06:53:43','2024-11-14 06:53:43'),(9,'VIP Membership','All-inclusive access with additional perks for three months.','Quarterly',219.99,'VIP','Gym access, unlimited group classes, 6 personal training sessions, guest passes','2024-11-14 06:53:43','2024-11-14 06:53:43'),(10,'Elite Membership','Exclusive access with premium perks and VIP services.','Monthly',99.99,'VIP','Gym access, priority booking, personal training, guest passes, wellness coaching','2024-11-17 04:51:38','2024-11-17 04:51:38'),(11,'Elite Membership','Exclusive access with premium perks and VIP services.','Quarterly',269.99,'VIP','Gym access, priority booking, personal training, guest passes, wellness coaching','2024-11-17 04:51:38','2024-11-17 04:51:38'),(12,'Elite Membership','Exclusive access with premium perks and VIP services.','Annually',999.99,'VIP','Gym access, priority booking, personal training, guest passes, wellness coaching','2024-11-17 04:51:38','2024-11-17 04:51:38');
/*!40000 ALTER TABLE `subscription_plans` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `team`
--

DROP TABLE IF EXISTS `team`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `team` (
  `id` int NOT NULL AUTO_INCREMENT,
  `profile_pic` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `position` varchar(100) NOT NULL,
  `description` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `team`
--

LOCK TABLES `team` WRITE;
/*!40000 ALTER TABLE `team` DISABLE KEYS */;
INSERT INTO `team` VALUES (1,'Team/suraj_gitte.png','Suraj Gitte','Lead Developer','Suraj Gitte led the development of the Gym Website, focusing on backend integration and user experience design.','2024-11-17 11:27:15','2024-11-17 11:46:20'),(2,'Team/aditya.jpg','Aditya Inamdar','Full Stack Developer','Aditya Inamdar developed the full-stack features for the Gym Website, including the frontend and backend integration.','2024-11-17 11:27:15','2024-11-18 06:54:29'),(3,'Team/dev.jpg','Dev Jangam','Data Analyst','Dev Jangam handled the data analytics and implemented features related to user data analysis for the Gym Website.','2024-11-17 11:27:15','2024-11-18 06:54:30'),(4,'Team/rohan.jpg','Rohan Humbe','AI Specialist','Rohan Humbe contributed AI-based features to the Gym Website, enhancing its capabilities with machine learning.','2024-11-17 11:27:15','2024-11-18 06:54:30');
/*!40000 ALTER TABLE `team` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `trainer_details`
--

DROP TABLE IF EXISTS `trainer_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `trainer_details` (
  `id` int NOT NULL AUTO_INCREMENT,
  `trainer_id` int NOT NULL,
  `description` text,
  `profilePic` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `trainer_id` (`trainer_id`),
  CONSTRAINT `trainer_details_ibfk_1` FOREIGN KEY (`trainer_id`) REFERENCES `trainers` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trainer_details`
--

LOCK TABLES `trainer_details` WRITE;
/*!40000 ALTER TABLE `trainer_details` DISABLE KEYS */;
INSERT INTO `trainer_details` VALUES (1,1,'Experienced fitness trainer specializing in strength training and nutrition.','trainers/suraj.svg'),(2,2,'Yoga instructor with over 10 years of experience in various yoga styles.','trainers/dev.svg'),(3,3,'Expert in high-intensity interval training (HIIT) and endurance coaching.','trainers/rohan.svg'),(4,4,'Specializes in Pilates and rehabilitation exercises.','trainers/anna.svg'),(5,5,'Nutritionist and fitness consultant with a holistic approach.','trainers/payal.svg');
/*!40000 ALTER TABLE `trainer_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `trainer_users`
--

DROP TABLE IF EXISTS `trainer_users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `trainer_users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `trainer_id` int NOT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `trainer_id` (`trainer_id`,`user_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `trainer_users_ibfk_1` FOREIGN KEY (`trainer_id`) REFERENCES `trainers` (`id`) ON DELETE CASCADE,
  CONSTRAINT `trainer_users_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trainer_users`
--

LOCK TABLES `trainer_users` WRITE;
/*!40000 ALTER TABLE `trainer_users` DISABLE KEYS */;
/*!40000 ALTER TABLE `trainer_users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `trainers`
--

DROP TABLE IF EXISTS `trainers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `trainers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `contactNumber` varchar(15) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `qualifications` text,
  `experienceYears` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trainers`
--

LOCK TABLES `trainers` WRITE;
/*!40000 ALTER TABLE `trainers` DISABLE KEYS */;
INSERT INTO `trainers` VALUES (1,'Suraj','1234567890','suraj@example.com','Certified Personal Trainer',5,'2024-11-14 06:20:33'),(2,'Dev','0987654321','dev@example.com','Yoga Alliance Certified',10,'2024-11-14 06:20:33'),(3,'Rohan','1122334455','rohan@example.com','Certified Fitness Coach',7,'2024-11-14 06:20:33'),(4,'Anna','2233445566','anna@example.com','Pilates Instructor Certification',4,'2024-11-14 06:20:33'),(5,'Payal','3344556677','payal@example.com','Registered Dietitian Nutritionist',8,'2024-11-14 06:20:33');
/*!40000 ALTER TABLE `trainers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_logs`
--

DROP TABLE IF EXISTS `user_logs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_logs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `password` varchar(255) NOT NULL,
  `change_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `user_logs_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_logs`
--

LOCK TABLES `user_logs` WRITE;
/*!40000 ALTER TABLE `user_logs` DISABLE KEYS */;
INSERT INTO `user_logs` VALUES (1,6,'$2b$10$Fq7AdWUIL0FI6vVUnO.LXeFCY6YSlujEx0RdF/gFJoTpORp6t6.ru','2024-11-18 08:03:28'),(2,6,'$2b$10$W0Vez7Mt7VAW4pKwQMk2HOrWj4TJxI5Lhg3PcLEnLBTZXUhgAhMEi','2024-11-18 08:09:01'),(3,6,'$2b$10$KqasT10HzavnP3FtAB5BYOdhDbdrdXmbPcunXnIT2CCH3TIKC4n6u','2024-11-18 08:19:10');
/*!40000 ALTER TABLE `user_logs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_workouts`
--

DROP TABLE IF EXISTS `user_workouts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_workouts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `exercise_name` varchar(255) NOT NULL,
  `duration` int NOT NULL,
  `burnt_calories` int NOT NULL,
  `description` text,
  `workout_date` date NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `user_workouts_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_workouts`
--

LOCK TABLES `user_workouts` WRITE;
/*!40000 ALTER TABLE `user_workouts` DISABLE KEYS */;
INSERT INTO `user_workouts` VALUES (2,6,'push ups ',50,1200,'done good work','2024-11-17','2024-11-17 13:28:57'),(3,6,'legs',45,65652,'23 some akjdf','2024-11-17','2024-11-17 13:30:47'),(4,6,'Push-ups',120,1200,'best ....','2024-11-17','2024-11-17 13:44:52'),(5,6,'sapate making',2,250,'enjoyment ','2024-11-17','2024-11-17 16:34:57'),(6,6,'Push-upsssssss',30,300,'30000','2024-11-17','2024-11-17 18:20:51'),(7,6,'Sit-upss',3,30,'300','2024-11-17','2024-11-17 18:26:05'),(8,6,'adadf',3,32,'3232','2024-11-17','2024-11-17 18:27:16'),(9,6,'Jumping Jacks',23,333,'sdfaf','2024-11-17','2024-11-17 18:28:12'),(10,6,'last ',30,230,'last one','2024-11-17','2024-11-17 18:45:40'),(11,6,'new date',21,230,'new date ','2024-11-17','2024-11-17 18:47:35'),(12,6,'Push-upssssssssssssssss',10,100,'3 sets of 50 pushups','2024-11-18','2024-11-18 06:37:16');
/*!40000 ALTER TABLE `user_workouts` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = cp850 */ ;
/*!50003 SET character_set_results = cp850 */ ;
/*!50003 SET collation_connection  = cp850_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `check_workout_duration` BEFORE INSERT ON `user_workouts` FOR EACH ROW BEGIN
    IF NEW.duration <= 0 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Duration must be greater than zero';
    END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Temporary view structure for view `userexercisessortedbydate`
--

DROP TABLE IF EXISTS `userexercisessortedbydate`;
/*!50001 DROP VIEW IF EXISTS `userexercisessortedbydate`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `userexercisessortedbydate` AS SELECT 
 1 AS `UserName`,
 1 AS `ExerciseName`,
 1 AS `Duration`,
 1 AS `BurntCalories`,
 1 AS `WorkoutDate`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `fullName` varchar(255) NOT NULL,
  `dob` date DEFAULT NULL,
  `gender` enum('Male','Female','Other') DEFAULT NULL,
  `contactNumber` varchar(15) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `profilePic` varchar(255) DEFAULT NULL,
  `address` text,
  `date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `subscription_plan_id` int DEFAULT NULL,
  `trainer_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `username` (`username`),
  KEY `subscription_plan_id` (`subscription_plan_id`),
  KEY `fk_trainer` (`trainer_id`),
  CONSTRAINT `fk_trainer` FOREIGN KEY (`trainer_id`) REFERENCES `trainers` (`id`) ON DELETE SET NULL,
  CONSTRAINT `users_ibfk_1` FOREIGN KEY (`subscription_plan_id`) REFERENCES `subscription_plans` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'suraj gittte','1990-01-01','Male','9860126708','suraj@gmail.com','suraj6708','$2b$10$0aPrZYbsiVv14uGpDjQPuuCIZZKHpGftg8KQFBSSOo3fcY0Ygbry.','C:\\web_development\\database\\Gym Website\\server\\uploads\\1731671012026-175983533.png','password123','2024-11-15 11:43:32',1,3),(2,'suraj gittte','1990-01-01','Male','9860126708','surajgitte@gmail.com','surajgitte6708','$2b$10$xpg1ch9h3pxEgBzGimNIROLWuYhsTFVqVLOFhwZezKC7F2TFH9ZmK','C:\\web_development\\database\\Gym Website\\server\\uploads\\1731692439190-637475697.png','password123','2024-11-15 17:40:39',1,3),(3,'suraj gittte','1990-01-01','Male','9860126708','surajgsditte@gmail.com','surajgitte6708sd','$2b$10$Rb9CiuZBpGe7AK8v.O10uOEBzEBDUJrIFF/gmGrqQbx7fshD7aS/a','C:\\web_development\\database\\Gym Website\\server\\uploads\\1731692619259-823840601.png','password123','2024-11-15 17:43:39',1,3),(4,'Shital Namdev gitte','2024-11-11','Female','9860126708','sumedhagitte6708@gmail.com','sumedhagitte6708','$2b$10$5TzK9jybxY/CA8JT.svdJuUxE8DAMsdT.LxBhSs6eMC0U5VfDHFEe','C:\\web_development\\database\\Gym Website\\server\\uploads\\1731693913189-291631136.png','Jirewadi , kanherwadi , parli.v','2024-11-15 18:05:14',1,3),(5,'Shital Namdev gitte','2024-11-14','Male','9860126708','sumedhagittsde6708@gmail.com','sumedhagitteddfs6708','$2b$10$8Gnx.DvpKns7BuT4WIou4.lK5zBMdk1ofJZ9VP.bDXUZD/MAKHbt2','C:\\web_development\\database\\Gym Website\\server\\uploads\\1731694356451-196287525.jpg','Jirewadi , kanherwadi , parli.v','2024-11-15 18:12:36',1,3),(6,'dev jangam','1990-01-01','Male','9860126708','dev@gmail.com','dev123','$2b$10$rZ6HGGI7Wn.UqfvnwpxW9OCEkIoDh7MMmVFm.PpeOs69US3XtzkHO','C:\\web_development\\database\\Gym Website\\server\\uploads\\1731695906373-156653280.png','password123','2024-11-15 18:38:26',1,3),(7,'Aditya Inamdar','2005-04-13','Male','7410536280','adityainamdar089@gmail.com','adiiiiiii.000.2.cim','$2b$10$AFUJosOlxHfApTRutzYHNu1JT7X1pgZx99lfq7J2gx8cQSQ8FUJPS','C:\\web_development\\database\\Gym Website\\server\\uploads\\1731911445311-914360866.jpg','budhwar peth','2024-11-18 06:30:45',1,1),(8,'Suraj Gitte','2005-05-18','Male','9860126708','surajgitte126708@gmail.com','suraj126708','$2b$10$za/4Ib8xfv7Hx7GG39stp.DgFlgchqg0jlUdTdYch4RZZoq.7VWb6','C:\\web_development\\database\\Gym Website\\server\\uploads\\1731945384983-351041968.jpg','upper indiranargar ','2024-11-18 15:56:25',1,1),(9,'Shital Namdev gitte','2024-11-07','Male','9860126708','sumedhagitte11236708@gmail.com','sumedhagitte11236708','$2b$10$iditdhcgJha/0tk4pQD11uirf31klKdd15tfLjltxW599eBVsKVFu','C:\\web_development\\database\\Gym Website\\server\\uploads\\1731945637811-994361713.png','Jirewadi , kanherwadi , parli.v','2024-11-18 16:00:38',1,1);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `usertrainerplanview`
--

DROP TABLE IF EXISTS `usertrainerplanview`;
/*!50001 DROP VIEW IF EXISTS `usertrainerplanview`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `usertrainerplanview` AS SELECT 
 1 AS `UserID`,
 1 AS `UserName`,
 1 AS `TrainerName`,
 1 AS `SubscriptionPlan`*/;
SET character_set_client = @saved_cs_client;

--
-- Final view structure for view `userexercisessortedbydate`
--

/*!50001 DROP VIEW IF EXISTS `userexercisessortedbydate`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = cp850 */;
/*!50001 SET character_set_results     = cp850 */;
/*!50001 SET collation_connection      = cp850_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `userexercisessortedbydate` AS select `u`.`username` AS `UserName`,`uw`.`exercise_name` AS `ExerciseName`,`uw`.`duration` AS `Duration`,`uw`.`burnt_calories` AS `BurntCalories`,`uw`.`workout_date` AS `WorkoutDate` from (`users` `u` join `user_workouts` `uw` on((`u`.`id` = `uw`.`user_id`))) order by `uw`.`workout_date` desc */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `usertrainerplanview`
--

/*!50001 DROP VIEW IF EXISTS `usertrainerplanview`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = cp850 */;
/*!50001 SET character_set_results     = cp850 */;
/*!50001 SET collation_connection      = cp850_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `usertrainerplanview` AS select `u`.`id` AS `UserID`,`u`.`username` AS `UserName`,`t`.`name` AS `TrainerName`,`sp`.`plan_name` AS `SubscriptionPlan` from ((`users` `u` left join `trainers` `t` on((`u`.`trainer_id` = `t`.`id`))) left join `subscription_plans` `sp` on((`u`.`subscription_plan_id` = `sp`.`id`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-11-18 22:56:11
