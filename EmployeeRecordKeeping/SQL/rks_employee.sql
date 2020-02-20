CREATE DATABASE  IF NOT EXISTS `rks` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `rks`;
-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: localhost    Database: rks
-- ------------------------------------------------------
-- Server version	8.0.19

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
-- Table structure for table `employee`
--

DROP TABLE IF EXISTS `employee`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employee` (
  `employeeid` int NOT NULL AUTO_INCREMENT,
  `full_name` varchar(250) NOT NULL,
  `address` varchar(250) DEFAULT NULL,
  `notes` text,
  `age` int DEFAULT NULL,
  `position` varchar(100) DEFAULT NULL,
  `department` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`employeeid`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employee`
--

LOCK TABLES `employee` WRITE;
/*!40000 ALTER TABLE `employee` DISABLE KEYS */;
INSERT INTO `employee` VALUES (12,'Ike Quizoz','714 Gorordo street, Talisay City, 6003','basil',43,'Web Developer','Department of Labor and Employment'),(13,'David Weiss','256 Tabura street, Cebu City, 6005','ginseng',23,'Software Engineer','Department of Environment and Natural Resources'),(14,'Carl Vail','232 Tabura street, Cebu City, 6003','bay leaves',30,'Information Security Analyst','Department of Foreign Affairs'),(15,'David Kaskel','232 Colon street, Naga City, 6003','cinnamon',45,'IT Manager','Department of Social Welfare and Development'),(16,'Steve Jones','531 Sesame street, Mandaue City, 6001','allspice',27,'DevOps Engineer','Department of the Interior and Local Government'),(17,'Ty Uflan','934 Colon street, LapuLapu City, 6004','bay leaves',56,'Computer Programmer','Executive Office'),(18,'Walter Ingram','634 Gorordo street, LapuLapu City, 6002','turmeric',43,'Web Developer','Department of Budget and Management'),(19,'Frank Quizoz','531 Tabura street, Talisay City, 6000','sage',46,'IT Professional','Department of National Defense'),(20,'Mark Vader','634 Gorordo street, Mandaue City, 6004','cumin',50,'Network Administrator','Office of the Vice President'),(21,'Roger Dugelman','232 Sesame street, Mandaue City, 6002','mace',50,'Web Developer','Department of Labor and Employment'),(22,'Ty Moody','714 Gorordo street, LapuLapu City, 6005','dill weed',45,'Chief Technology Officer (CTO)','Department of Science and Technology'),(23,'Frank Hylan','934 Colon street, LapuLapu City, 6004','marjoram',51,'Cloud Architect','Department of Agrarian Reform'),(24,'David Reamer','934 Escario street, Naga City, 6001','marjoram',56,'Information Security Analyst','Department of Foreign Affairs');
/*!40000 ALTER TABLE `employee` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-02-20 16:52:27
