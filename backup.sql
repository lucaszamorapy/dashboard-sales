-- MySQL dump 10.13  Distrib 8.0.42, for Win64 (x86_64)
--
-- Host: localhost    Database: deia
-- ------------------------------------------------------
-- Server version	8.0.42

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
-- Table structure for table `clients`
--

DROP TABLE IF EXISTS `clients`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `clients` (
  `client_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `cep` varchar(9) NOT NULL,
  `street` varchar(255) NOT NULL,
  `neighborhood` varchar(255) NOT NULL,
  `tel` varchar(14) DEFAULT NULL,
  `cel` varchar(15) DEFAULT NULL,
  `regidh` date NOT NULL,
  `regiusu` int NOT NULL,
  `regadh` date DEFAULT NULL,
  `regausu` int DEFAULT NULL,
  PRIMARY KEY (`client_id`),
  UNIQUE KEY `client_id_UNIQUE` (`client_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clients`
--

LOCK TABLES `clients` WRITE;
/*!40000 ALTER TABLE `clients` DISABLE KEYS */;
INSERT INTO `clients` VALUES (1,'Leleco','11320-140','Rua Pero Correa','Itararé','','','2025-06-23',2,NULL,NULL),(2,'Lucas Zamora','11370-140','Rua Adolfo Cavalcanti','Vila Cascatinha','139913367722','139913367722','2025-06-24',2,NULL,NULL),(3,'Andrea Zamora','11370-120','Rua Aviador Bittencourt','Vila Cascatinha','(13) 3378-6319','(13) 99133-6772','2025-06-24',2,NULL,NULL),(4,'Emerson Zamora','11370-140','Rua Adolfo Cavalcanti','Vila Cascatinha','(13) 3689-3183','(13) 99133-6772','2025-06-24',2,NULL,NULL),(5,'Julia Zamora','11370-130','Rua Cidade de Guarujá','Vila Cascatinha','(13) 4631-8399','(13) 99133-6772','2025-06-24',2,NULL,NULL);
/*!40000 ALTER TABLE `clients` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `order_id` int NOT NULL AUTO_INCREMENT,
  `client_id` int NOT NULL,
  `payment_method` enum('Pix','Cartão','Dinheiro') NOT NULL,
  `delivery_date` date NOT NULL,
  `delivery_time` varchar(45) DEFAULT NULL,
  `total` double NOT NULL,
  `obs` varchar(500) DEFAULT NULL,
  `regidh` date NOT NULL,
  `regiusu` int NOT NULL,
  `regadh` date DEFAULT NULL,
  `regausu` int DEFAULT NULL,
  PRIMARY KEY (`order_id`),
  UNIQUE KEY `order_id_UNIQUE` (`order_id`),
  KEY `fk_orders_client_idx` (`client_id`),
  CONSTRAINT `fk_orders_client` FOREIGN KEY (`client_id`) REFERENCES `clients` (`client_id`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (5,1,'Pix','2025-05-13','12:30',160,NULL,'2025-06-23',2,'2025-06-24',2),(6,1,'Pix','2025-06-24','13:00',4,NULL,'2025-06-23',2,'2025-06-23',2),(7,1,'Pix','2025-06-24','',4,NULL,'2025-06-23',2,NULL,NULL),(8,1,'Pix','2025-06-23','',4,NULL,'2025-06-23',2,NULL,NULL),(9,1,'Pix','2025-06-23','',4,NULL,'2025-06-23',2,NULL,NULL),(10,1,'Pix','2025-04-23','13:00',400,NULL,'2025-06-23',2,NULL,NULL),(11,1,'Pix','2003-02-20','',4,NULL,'2025-06-24',2,'2025-06-24',2),(13,1,'Pix','2025-06-24','13:00',4,NULL,'2025-06-24',2,NULL,NULL),(14,1,'Pix','2025-06-24','',4,NULL,'2025-06-24',2,NULL,NULL),(17,1,'Pix','2025-06-24','',4,NULL,'2025-06-24',2,NULL,NULL),(18,1,'Pix','2025-06-24','13:00',400,NULL,'2025-06-24',2,'2025-06-24',2),(19,1,'Dinheiro','2025-06-24','14:00',4,NULL,'2025-06-24',2,NULL,NULL),(20,1,'Cartão','2025-06-24','',4,NULL,'2025-06-24',2,NULL,NULL),(21,2,'Cartão','2025-06-24','',4,NULL,'2025-06-24',2,NULL,NULL),(22,3,'Dinheiro','2025-06-01','13:00',800,NULL,'2025-06-24',2,'2025-06-24',2),(23,1,'Pix','2025-06-24','',4,NULL,'2025-06-24',2,NULL,NULL),(24,1,'Pix','2025-06-24','',4,NULL,'2025-06-24',2,NULL,NULL),(25,1,'Pix','2025-06-24','',4,NULL,'2025-06-24',2,NULL,NULL),(26,1,'Pix','2025-06-24','',4,NULL,'2025-06-24',2,NULL,NULL),(27,1,'Pix','2025-06-24','',4,NULL,'2025-06-24',2,NULL,NULL),(28,1,'Pix','2025-06-24','',4,NULL,'2025-06-24',2,NULL,NULL),(29,1,'Pix','2025-06-24','',4,NULL,'2025-06-24',2,NULL,NULL),(30,1,'Pix','8000-06-24','',4,NULL,'2025-06-24',2,NULL,NULL),(31,1,'Pix','2025-06-24','12:00',4,NULL,'2025-06-24',2,NULL,NULL);
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders_products`
--

DROP TABLE IF EXISTS `orders_products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders_products` (
  `order_product_id` int NOT NULL AUTO_INCREMENT,
  `order_id` int NOT NULL,
  `product_id` int NOT NULL,
  `quantity` int NOT NULL,
  `regidh` date NOT NULL,
  `regiusu` int NOT NULL,
  `regadh` date DEFAULT NULL,
  `regausu` int DEFAULT NULL,
  PRIMARY KEY (`order_product_id`),
  UNIQUE KEY `order_product_id_UNIQUE` (`order_product_id`),
  KEY `fk_orders_products_product_idx` (`product_id`),
  KEY `fk_orders_products_order_idx` (`order_id`),
  CONSTRAINT `fk_orders_products_order` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_orders_products_product` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders_products`
--

LOCK TABLES `orders_products` WRITE;
/*!40000 ALTER TABLE `orders_products` DISABLE KEYS */;
INSERT INTO `orders_products` VALUES (5,5,1,20,'2025-06-23',2,'2025-06-24',2),(6,6,1,1,'2025-06-23',2,'2025-06-23',2),(7,7,1,1,'2025-06-23',2,NULL,NULL),(8,8,1,1,'2025-06-23',2,NULL,NULL),(9,9,1,1,'2025-06-23',2,NULL,NULL),(10,10,1,100,'2025-06-23',2,NULL,NULL),(11,11,1,1,'2025-06-24',2,'2025-06-24',2),(13,13,1,1,'2025-06-24',2,NULL,NULL),(14,14,1,1,'2025-06-24',2,NULL,NULL),(17,17,1,1,'2025-06-24',2,NULL,NULL),(18,18,1,100,'2025-06-24',2,'2025-06-24',2),(19,5,1,20,'2025-06-24',2,'2025-06-24',2),(20,19,1,1,'2025-06-24',2,NULL,NULL),(21,20,1,1,'2025-06-24',2,NULL,NULL),(22,21,1,1,'2025-06-24',2,NULL,NULL),(23,22,1,100,'2025-06-24',2,'2025-06-24',2),(24,22,1,100,'2025-06-24',2,'2025-06-24',2),(25,23,1,1,'2025-06-24',2,NULL,NULL),(26,24,1,1,'2025-06-24',2,NULL,NULL),(27,25,1,1,'2025-06-24',2,NULL,NULL),(28,26,1,1,'2025-06-24',2,NULL,NULL),(29,27,1,1,'2025-06-24',2,NULL,NULL),(30,28,1,1,'2025-06-24',2,NULL,NULL),(31,29,1,1,'2025-06-24',2,NULL,NULL),(32,30,1,1,'2025-06-24',2,NULL,NULL),(33,31,1,1,'2025-06-24',2,NULL,NULL);
/*!40000 ALTER TABLE `orders_products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `product_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `price` double NOT NULL,
  `regidh` date NOT NULL,
  `regiusu` int NOT NULL,
  `regadh` date DEFAULT NULL,
  `regausu` int DEFAULT NULL,
  PRIMARY KEY (`product_id`),
  UNIQUE KEY `product_id_UNIQUE` (`product_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'Coxinha de Frango',4,'2025-06-23',2,'2025-06-24',2);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `user_id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `regidh` date NOT NULL,
  `regiusu` int NOT NULL,
  `regadh` date DEFAULT NULL,
  `regausu` int DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (2,'Lucas Zamora','avellar.dev@gmail.com','$2b$10$8Y2yjLbU1aZPwhvJDIz0Ze1OyzAmTBnl2wIE5JX3WCiSMK3jh1ziS','2025-06-23',2,NULL,NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-06-25 12:34:28
