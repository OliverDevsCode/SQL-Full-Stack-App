-- MySQL dump 10.13  Distrib 8.0.42, for Win64 (x86_64)
--
-- Host: localhost    Database: school
-- ------------------------------------------------------
-- Server version	8.0.42

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `lessons`
--

DROP TABLE IF EXISTS `lessons`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `lessons` (
  `LessonId` int NOT NULL AUTO_INCREMENT,
  `title` varchar(100) NOT NULL,
  `location` text,
  `SubjectId` int NOT NULL,
  `TeacherId` int NOT NULL,
  `Period` int DEFAULT NULL,
  `Day` varchar(45) DEFAULT NULL,
  `ClassId` int DEFAULT NULL,
  PRIMARY KEY (`LessonId`),
  KEY `ClassId_idx` (`ClassId`),
  KEY `SubjectId` (`SubjectId`),
  KEY `TeachId` (`TeacherId`),
  CONSTRAINT `ClassId` FOREIGN KEY (`ClassId`) REFERENCES `classes` (`ClassId`),
  CONSTRAINT `SubjectId` FOREIGN KEY (`SubjectId`) REFERENCES `subjects` (`SubjectId`),
  CONSTRAINT `TeachId` FOREIGN KEY (`TeacherId`) REFERENCES `users` (`UserId`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lessons`
--

LOCK TABLES `lessons` WRITE;
/*!40000 ALTER TABLE `lessons` DISABLE KEYS */;
INSERT INTO `lessons` VALUES (3,'Mathematics','C93',1,4,1,'Monday',1),(4,'Computer Science','C77',3,3,2,'Monday',2),(5,'Business','T55',4,5,3,'Monday',3),(6,'Physics','S3',3,6,4,'Monday',4),(9,'Mathematics','C77',1,4,5,'Monday',1),(10,'Computer Science','C78',3,3,1,'Tuesday',2),(11,'Mathematics','C77',1,4,2,'Tuesday',1),(12,'Computer Science','C76',3,3,3,'Tuesday',2);
/*!40000 ALTER TABLE `lessons` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-05-07 20:13:41
