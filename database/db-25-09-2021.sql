-- MySQL dump 10.13  Distrib 8.0.23, for Win64 (x86_64)
--
-- Host: 80.85.142.207    Database: ecommerce_shop
-- ------------------------------------------------------
-- Server version	8.0.26

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
-- Table structure for table `cart`
--

DROP TABLE IF EXISTS `cart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `product_id` int DEFAULT NULL,
  `cost` decimal(12,2) DEFAULT NULL,
  `count` int DEFAULT NULL,
  `status` int DEFAULT '5',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart`
--

LOCK TABLES `cart` WRITE;
/*!40000 ALTER TABLE `cart` DISABLE KEYS */;
INSERT INTO `cart` VALUES (1,9,1,NULL,1,2);
/*!40000 ALTER TABLE `cart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` char(255) NOT NULL,
  `sub` int DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `percent` decimal(10,2) DEFAULT '0.00',
  `isActive` tinyint(1) DEFAULT '1',
  `created_on` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `isFoiz` decimal(10,2) DEFAULT '0.00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (1,'Erkaklar',0,9,10.00,1,'2021-08-25 06:39:24',1.00),(2,'Ayollar kiyimi',0,1,10.00,1,'2021-08-25 11:03:29',1000.00),(3,'Bolalar',0,1,15000.00,1,'2021-08-25 11:03:55',0.00),(4,'binolar',0,1,12.00,1,'2021-08-25 11:04:15',1.00),(5,'Mebellar',0,1,15.00,1,'2021-08-25 11:04:30',1.00),(6,'texnikalar',0,1,7.00,1,'2021-08-25 11:04:48',1.00),(7,'Avtomobillar',0,1,17.00,0,'2021-08-25 11:05:11',1.00),(8,'Kiyimlar',1,1,2.00,1,'2021-08-25 11:05:38',1.00),(9,'poyabzallar',1,1,2.00,1,'2021-08-25 11:05:53',1.00),(10,'bosh kiyim',1,1,5.00,1,'2021-08-25 11:06:21',1.00),(11,'Yozgi kiyimlar',8,1,12.00,1,'2021-08-25 11:06:49',1.00),(12,'qishki kiyimlar',8,1,50000.00,1,'2021-08-25 11:07:12',0.00),(13,'sumkalari',2,1,12000.00,1,'2021-08-25 11:10:38',0.00),(14,'tuflilar',2,1,12.00,1,'2021-08-25 11:11:36',1.00),(15,'atir upa',2,1,20.00,1,'2021-08-25 11:12:10',1.00),(16,'oyna',5,1,5000.00,1,'2021-08-25 11:12:44',0.00),(17,'pamada',5,1,1.00,1,'2021-08-25 11:12:58',1.00),(18,'Texnika',0,1,1000.00,1,'2021-09-20 11:08:18',0.00),(19,'Xo\'jalik buyumlari',0,1,1000.00,0,'2021-09-21 11:33:22',0.00);
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `category_properties`
--

DROP TABLE IF EXISTS `category_properties`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category_properties` (
  `id` int NOT NULL AUTO_INCREMENT,
  `category_id` int DEFAULT NULL,
  `field_name` char(255) NOT NULL,
  `type_id` int DEFAULT NULL,
  `isActive` tinyint(1) DEFAULT '1',
  `created_on` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category_properties`
--

LOCK TABLES `category_properties` WRITE;
/*!40000 ALTER TABLE `category_properties` DISABLE KEYS */;
INSERT INTO `category_properties` VALUES (1,8,'Rang',2,1,'2021-08-25 11:07:34'),(2,8,'razmer',1,1,'2021-08-25 11:07:54'),(3,8,'brend',2,1,'2021-08-25 11:08:08'),(4,1,'rangi',2,1,'2021-08-25 11:08:35'),(5,1,'do\'kon nomi',2,1,'2021-08-25 11:10:10'),(6,15,'rangi',2,1,'2021-08-25 11:13:35'),(7,15,'brend',2,1,'2021-08-25 11:13:57'),(8,2,'rangi',2,1,'2021-08-25 11:14:18'),(9,2,'do\'kon nomi',2,0,'2021-08-25 11:14:40'),(10,1,'Frontend 4',3,0,'2021-09-21 04:37:11'),(11,1,'Frontend 4',3,1,'2021-09-21 04:37:18'),(12,1,'Frontend 4',3,1,'2021-09-21 04:37:20'),(13,1,'Frontend 4',3,1,'2021-09-21 04:37:21'),(14,1,'Frontend 4',3,1,'2021-09-21 04:37:24'),(15,1,'Tizimlashtirish',2,1,'2021-09-21 04:39:22');
/*!40000 ALTER TABLE `category_properties` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `chats`
--

DROP TABLE IF EXISTS `chats`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `chats` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `texts` mediumtext,
  `isAdmin` tinyint(1) DEFAULT '0',
  `created_on` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `isNew` tinyint DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=76 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chats`
--

LOCK TABLES `chats` WRITE;
/*!40000 ALTER TABLE `chats` DISABLE KEYS */;
INSERT INTO `chats` VALUES (1,1,'Man Shaxzodman !',0,'2021-08-31 12:45:08',0),(2,5,'Man Shaxzodman !',0,'2021-08-31 12:45:08',1),(3,11,'Man Shaxzodman !',0,'2021-08-31 12:45:08',1),(4,12,'Man Shaxzodman !',0,'2021-08-31 12:45:08',1),(5,16,'Qanaysan Shaxzodman !',1,'2021-08-31 12:47:38',0),(6,1,'maqsadga o\'tamiz',0,'2021-08-31 14:30:14',0),(7,5,'maqsadga o\'tamiz',0,'2021-08-31 14:30:16',1),(8,11,'maqsadga o\'tamiz',0,'2021-08-31 14:30:17',1),(9,12,'maqsadga o\'tamiz',0,'2021-08-31 14:30:21',1),(10,1,'maqsadga o\'tamizsadasd',0,'2021-08-31 14:31:25',0),(11,5,'maqsadga o\'tamizsadasd',0,'2021-08-31 14:31:26',1),(12,11,'maqsadga o\'tamizsadasd',0,'2021-08-31 14:31:27',1),(13,12,'maqsadga o\'tamizsadasd',0,'2021-08-31 14:31:27',1),(14,1,'asfasdfgawertfwe',0,'2021-08-31 14:32:26',0),(15,5,'asfasdfgawertfwe',0,'2021-08-31 14:32:26',1),(16,11,'asfasdfgawertfwe',0,'2021-08-31 14:32:26',1),(17,12,'asfasdfgawertfwe',0,'2021-08-31 14:32:26',1),(18,1,'asdasda',0,'2021-08-31 14:36:23',0),(19,5,'asdasda',0,'2021-08-31 14:36:23',1),(20,11,'asdasda',0,'2021-08-31 14:36:23',1),(21,12,'asdasda',0,'2021-08-31 14:36:23',1),(22,1,'hi guys',0,'2021-08-31 14:40:40',0),(23,5,'hi guys',0,'2021-08-31 14:40:40',1),(24,11,'hi guys',0,'2021-08-31 14:40:40',1),(25,12,'hi guys',0,'2021-08-31 14:40:40',1),(26,1,'hi guysasaaaa',0,'2021-08-31 14:42:07',0),(27,5,'hi guysasaaaa',0,'2021-08-31 14:42:07',1),(28,11,'hi guysasaaaa',0,'2021-08-31 14:42:07',1),(29,12,'hi guysasaaaa',0,'2021-08-31 14:42:07',1),(30,1,'gfggggggggggggggggggggggg',0,'2021-08-31 14:44:04',0),(31,5,'gfggggggggggggggggggggggg',0,'2021-08-31 14:44:05',1),(32,11,'gfggggggggggggggggggggggg',0,'2021-08-31 14:44:05',1),(33,12,'gfggggggggggggggggggggggg',0,'2021-08-31 14:44:05',1),(34,1,'gfggggggggggggggggggggggg',0,'2021-08-31 14:46:09',0),(35,5,'gfggggggggggggggggggggggg',0,'2021-08-31 14:46:09',1),(36,11,'gfggggggggggggggggggggggg',0,'2021-08-31 14:46:10',1),(37,12,'gfggggggggggggggggggggggg',0,'2021-08-31 14:46:10',1),(38,1,'ghkggh',0,'2021-08-31 14:46:18',0),(39,5,'ghkggh',0,'2021-08-31 14:46:18',1),(40,11,'ghkggh',0,'2021-08-31 14:46:18',1),(41,12,'ghkggh',0,'2021-08-31 14:46:18',1),(42,1,'asssalomu aleykum admin janoblari',0,'2021-09-06 11:18:32',0),(43,5,'asssalomu aleykum admin janoblari',0,'2021-09-06 11:18:32',1),(44,11,'asssalomu aleykum admin janoblari',0,'2021-09-06 11:18:32',1),(45,12,'asssalomu aleykum admin janoblari',0,'2021-09-06 11:18:32',1),(46,1,'asdjasldkhasdlkasklhd',0,'2021-09-06 11:30:07',0),(47,5,'asdjasldkhasdlkasklhd',0,'2021-09-06 11:30:09',1),(48,11,'asdjasldkhasdlkasklhd',0,'2021-09-06 11:30:09',1),(49,12,'asdjasldkhasdlkasklhd',0,'2021-09-06 11:30:09',1),(50,1,'asdasdas',0,'2021-09-06 12:22:48',0),(51,5,'asdasdas',0,'2021-09-06 12:22:50',1),(52,11,'asdasdas',0,'2021-09-06 12:22:51',1),(53,12,'asdasdas',0,'2021-09-06 12:22:51',1),(54,1,'admin',0,'2021-09-07 05:18:23',0),(55,5,'admin',0,'2021-09-07 05:18:23',1),(56,11,'admin',0,'2021-09-07 05:18:23',1),(57,12,'admin',0,'2021-09-07 05:18:23',1),(58,5,'Shaxdev',1,'2021-09-08 11:39:11',1),(59,5,'Salom xush kleibsiz',1,'2021-09-08 11:39:25',1),(60,5,'assalom admin',1,'2021-09-08 11:40:00',1),(61,12,'qaytarish admin',1,'2021-09-08 11:41:41',1),(62,11,'qaytarish admin nomalum',1,'2021-09-08 11:42:40',1),(63,1,'yaxshi raxmat',0,'2021-09-09 03:24:09',0),(64,5,'yaxshi raxmat',0,'2021-09-09 03:24:09',1),(65,11,'yaxshi raxmat',0,'2021-09-09 03:24:09',1),(66,12,'yaxshi raxmat',0,'2021-09-09 03:24:10',1),(67,5,'javoblar varaqasi',1,'2021-09-15 17:10:30',1),(68,5,'javoblar varaqasi',1,'2021-09-15 17:10:38',1),(69,12,'javoblar',1,'2021-09-15 17:11:10',1),(70,9,'test dostavkachilar uchun',0,'2021-09-21 05:38:18',1),(71,14,'test dostavkachilar uchun',0,'2021-09-21 05:38:18',1),(72,17,'test dostavkachilar uchun',0,'2021-09-21 05:38:18',1),(73,9,'Dastur test rejimida ishlayapti',0,'2021-09-21 10:31:20',1),(74,14,'Dastur test rejimida ishlayapti',0,'2021-09-21 10:31:21',1),(75,17,'Dastur test rejimida ishlayapti',0,'2021-09-21 10:31:21',1);
/*!40000 ALTER TABLE `chats` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `click_order`
--

DROP TABLE IF EXISTS `click_order`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `click_order` (
  `id` int NOT NULL AUTO_INCREMENT,
  `service_id` int NOT NULL,
  `click_paydoc_id` varchar(255) NOT NULL,
  `order_id` int NOT NULL,
  `action` varchar(255) DEFAULT NULL,
  `sign_time` varchar(255) DEFAULT NULL,
  `error` int DEFAULT NULL,
  `error_note` varchar(255) DEFAULT NULL,
  `sign_string` varchar(255) DEFAULT NULL,
  `click_trans_id` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `click_order`
--

LOCK TABLES `click_order` WRITE;
/*!40000 ALTER TABLE `click_order` DISABLE KEYS */;
INSERT INTO `click_order` VALUES (1,19323,'1562102301',1,'1','2021-09-24 05:09:35',0,'Success','d2dec80598f59babb87a657bca564db0','1475489593');
/*!40000 ALTER TABLE `click_order` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `delivered`
--

DROP TABLE IF EXISTS `delivered`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `delivered` (
  `id` int NOT NULL AUTO_INCREMENT,
  `cart_id` int DEFAULT NULL,
  `comments` text,
  `mark` int DEFAULT '1',
  `status` tinyint DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `delivered`
--

LOCK TABLES `delivered` WRITE;
/*!40000 ALTER TABLE `delivered` DISABLE KEYS */;
/*!40000 ALTER TABLE `delivered` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dostavka_type`
--

DROP TABLE IF EXISTS `dostavka_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dostavka_type` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `cost` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dostavka_type`
--

LOCK TABLES `dostavka_type` WRITE;
/*!40000 ALTER TABLE `dostavka_type` DISABLE KEYS */;
INSERT INTO `dostavka_type` VALUES (1,'Free',0.00),(2,'Express',20000.00),(3,'Simple',5000.00);
/*!40000 ALTER TABLE `dostavka_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `main_order`
--

DROP TABLE IF EXISTS `main_order`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `main_order` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `dostavka_id` int DEFAULT NULL,
  `dostavka_sum` decimal(10,2) DEFAULT NULL,
  `sum` decimal(10,2) DEFAULT NULL,
  `state` int DEFAULT '0',
  `created_on` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `main_order`
--

LOCK TABLES `main_order` WRITE;
/*!40000 ALTER TABLE `main_order` DISABLE KEYS */;
/*!40000 ALTER TABLE `main_order` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `id` int NOT NULL AUTO_INCREMENT,
  `praduct_id` mediumtext,
  `amount` decimal(18,2) NOT NULL,
  `payme_state` int DEFAULT '0',
  `state` int DEFAULT '0',
  `phone` varchar(19) DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `sana` datetime DEFAULT CURRENT_TIMESTAMP,
  `isClick` tinyint DEFAULT '0',
  `fish` varchar(1023) DEFAULT NULL,
  `viloyat` varchar(225) DEFAULT NULL,
  `tuman` varchar(255) DEFAULT NULL,
  `mfy` varchar(255) DEFAULT NULL,
  `karta` varchar(255) DEFAULT NULL,
  `dostavka_id` int DEFAULT '1',
  `isNaqd` tinyint DEFAULT '0',
  `curyer` int DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (1,'{data:[{product_id:4,count:5,amount:15000},{product_id:3,count:4,amount:1000}]}',100000.00,1,2,'phone',NULL,'2021-09-24 05:07:53',1,'fish','viloyat','tuman','mfy','uzcard',NULL,0,0),(2,'4',15000.00,0,0,'994457816',NULL,'2021-09-24 05:14:06',0,'Mirazizjaaan','Buxoro','Buxoro','Saxovat',NULL,NULL,0,0),(3,'4',15000.00,0,0,'phone',NULL,'2021-09-24 05:14:36',0,'fish','viloyat','tuman','mfy',NULL,NULL,0,0),(4,NULL,5000.00,0,0,'212233123          ',NULL,'2021-09-25 10:20:25',1,'sda','13','158','wwr','uzcard',NULL,0,0),(5,NULL,244402.00,0,0,'999999999          ',NULL,'2021-09-25 19:23:35',0,'Burhon Baqoyev Botir o\'g\'li','13','159','dghdgf gfdhgh ghc',NULL,NULL,0,0);
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `comment` varchar(255) DEFAULT NULL,
  `cost` decimal(12,2) DEFAULT NULL,
  `count` int DEFAULT NULL,
  `discount` int DEFAULT '0',
  `user_id` int DEFAULT NULL,
  `isActive` tinyint(1) DEFAULT '1',
  `created_on` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `checked` int DEFAULT '2',
  `category_id` int NOT NULL DEFAULT '1',
  `isTop` tinyint DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES (1,'Futbolka','Turkiyada ishlab chiqarilgan',500.00,10,0,9,0,'2021-08-25 11:16:05',2,11,2),(2,'krasovka','Turkiyada ishlab chiqarilgan yolg\'on gap',500.00,100,0,7,0,'2021-08-25 11:16:42',2,9,2),(3,'Kompyuter','lenova',3700000.00,12,2,20,1,'2021-08-25 11:22:44',0,6,0),(4,'Malibu','GM Uzbekistan',500.00,10,0,9,0,'2021-08-25 11:23:25',2,7,0),(5,'Atir','coco chanel',22000.00,10,3,9,1,'2021-08-25 11:24:07',0,15,0),(6,'Dream house','Buxara city',500.00,10,0,9,0,'2021-08-25 11:24:46',2,4,2),(7,'Divan','Turkiyada ishlab chiqarilgan yolg\'on gap',500.00,10,0,9,0,'2021-08-25 11:25:20',1,5,0),(8,'Do\'ppi','Marg\'londa  ishlab chiqilgan',22000.00,10,2,9,1,'2021-08-25 11:26:11',0,10,2),(9,'Kurtka','Made in china',350000.00,6,10,9,1,'2021-08-25 11:26:51',0,12,1),(10,'partfel','qulay tak tak',500.00,17,0,9,0,'2021-08-25 11:27:54',1,13,0),(11,'Skavarotka','made in Uzbekistan',500.00,10,0,22,0,'2021-09-21 11:43:16',2,19,0),(12,'Jinsi Bruk','Turkiyada ishlab chiqarilgan',200000.00,10,0,22,1,'2021-09-23 04:26:41',2,8,1),(13,'Bruk','Turkiyada ishlab chiqarilgan',100000.00,10,10,9,1,'2021-09-25 09:01:14',1,8,0);
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_check`
--

DROP TABLE IF EXISTS `product_check`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_check` (
  `id` int NOT NULL AUTO_INCREMENT,
  `product_id` int DEFAULT NULL,
  `checked` tinyint(1) DEFAULT '0',
  `admin_id` int DEFAULT NULL,
  `comment` varchar(255) DEFAULT 'Izoh mavjud emas',
  `created_on` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_check`
--

LOCK TABLES `product_check` WRITE;
/*!40000 ALTER TABLE `product_check` DISABLE KEYS */;
INSERT INTO `product_check` VALUES (1,10,1,1,NULL,'2021-08-25 11:35:26'),(2,7,1,0,NULL,'2021-09-20 13:07:10'),(3,12,1,22,NULL,'2021-09-23 04:49:03'),(4,9,1,1,NULL,'2021-09-24 15:04:48'),(5,8,1,1,NULL,'2021-09-25 02:59:58'),(6,5,0,1,'rasmlari yoq','2021-09-25 05:24:17'),(7,5,0,1,'tezroq faqat','2021-09-25 05:27:25'),(8,9,0,1,'Rasmlari yoq','2021-09-25 05:28:10'),(9,8,0,1,'Rasmlari mavjud emas','2021-09-25 05:28:31'),(10,8,0,1,'Rasmlari mavjud emas','2021-09-25 05:28:54'),(11,3,0,1,'rasm yukla','2021-09-25 06:21:12'),(12,12,0,1,'sa','2021-09-25 08:44:43'),(13,13,1,1,NULL,'2021-09-25 09:04:04'),(14,12,2,9,NULL,'2021-09-25 09:18:41');
/*!40000 ALTER TABLE `product_check` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_image`
--

DROP TABLE IF EXISTS `product_image`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_image` (
  `id` int NOT NULL AUTO_INCREMENT,
  `product_id` int DEFAULT NULL,
  `img_url` char(255) NOT NULL,
  `isActive` tinyint(1) DEFAULT '1',
  `created_on` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_image`
--

LOCK TABLES `product_image` WRITE;
/*!40000 ALTER TABLE `product_image` DISABLE KEYS */;
INSERT INTO `product_image` VALUES (1,10,'a3451e0e49999121c4a47c51746185c5f88024f92206f42da6c0615f99e7126e.jpg',1,'2021-08-25 11:31:34'),(2,10,'4335d284e141633cbc08c58ed587e2512e9400d4bf4e5706a8fe33dddf97af7a.jpg',1,'2021-08-25 11:31:44'),(3,10,'cb67296afcc129091f76cd27ba70df397d4ccdf3c6a3230a81b313921c4a9afe.jpg',1,'2021-08-25 11:32:01'),(4,1,'a28a15d21f53ad6f419ed8ed273482fdd4e570340907254eccc2a22b6d05cc55.png',1,'2021-08-25 11:42:50'),(5,1,'85df93e9e7639faab88ff3b2f9a55c98642465f46d3c6617edc60afa5bf215b6.png',1,'2021-08-25 11:43:05'),(6,1,'b069b1fe3fb836036afd47bf79b21ab0ec2f6d56a5efd0b7cedc989569dccb1e.png',1,'2021-08-25 11:43:22'),(7,1,'1a3b02898917e3c62472b3430b4aca6ab320675b8af1691454c35cff983461ec.png',1,'2021-08-25 11:43:32'),(8,1,'7838c3174bea0dd4eabe944bb72990ec5821907b2427848ac34034f77968586d.png',1,'2021-08-25 11:43:50'),(9,2,'51daaf86bb4643e39f6f665ed1364c2994392006608054f607de7ed4d35c9430.jpg',1,'2021-08-27 04:57:43'),(10,2,'031ebdf2dc91d3a476b15930664a16059dc52d4c9fb2127943b791449848de75.jpg',1,'2021-08-27 04:57:51'),(11,3,'ffef701ed6ca5bad079b27c06a783144d8cad58c574d5b290270f63b6f498c61.jpg',1,'2021-08-27 04:58:27'),(12,3,'511f5809ec5b64d0482540134b24ee22d35e9e30646918ed5b16d5638468ed6c.jpg',1,'2021-08-27 04:58:48'),(13,3,'5ee5f862227039742a665bcc5dd3abd86aa4892d9749149613b11d4a64642275.jpg',1,'2021-08-27 04:58:59'),(14,4,'65bb6f5b47f396f57e0fb5d3254cb759fcd4d74077b49b2b21bf66c839bb860e.jpg',1,'2021-08-27 04:59:27'),(15,4,'d5393aad45fc3c57f8c49ae000d816651e9414ef581295bac71c41897821a7b8.png',1,'2021-08-27 04:59:39'),(16,4,'a58da5b9bc291fb8aaa16b2b49e65a1a2bb5b5b637cfa2aa70baa893dcf615db.jpg',1,'2021-08-27 04:59:48'),(17,4,'401ac3709a6f6010d4d031ba31111d006e2c7138c089db81382b278dadb869b9.jpg',1,'2021-08-27 04:59:57'),(18,6,'e04427fa0cd4432c668f629a543aebbb06d246921ea40bc37c011259b93f92ce.jpg',1,'2021-08-27 05:02:07'),(19,6,'da7e3e840fea87b632338393ce9d93c6fc554e32c957b031203afa38a549c16f.jpg',1,'2021-08-27 05:02:19'),(20,6,'a7ff3970e0aa5c85cb9ed749929ed143c5bf6cb25c0bda9be1640451c4a74f0f.jpg',1,'2021-08-27 05:02:40'),(21,6,'fbc4a82362490c01851b91167c6bcc6de5a6905b094933788ba8b1ea134c60fd.jpg',1,'2021-08-27 05:02:50'),(22,12,'f792bdd4d7ec9883622a89a8e248290e02a7e5b4e978d4c42f9a89eb689f3bc3.png',0,'2021-09-23 04:27:44'),(23,12,'69757dca3b1105b1d214a276eace455d3f82d10fb165785b0c655850b0b8645e.png',0,'2021-09-23 04:28:01'),(24,12,'08b987bbee20e2ab6ba6924dcaa969bd0f5fe25f9bc9f07f3aa0086143557574.png',1,'2021-09-25 08:31:57'),(25,13,'8b9ed1028ad3f12032777da07d1e54770aff469ea2bdb53d98efc204b96dcf3d.png',1,'2021-09-25 09:02:50'),(26,13,'7a66f361bac679d880af8a0e9f3c241f33a4270640af31aa52a27f2104dd8625.png',1,'2021-09-25 09:03:01');
/*!40000 ALTER TABLE `product_image` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_properties`
--

DROP TABLE IF EXISTS `product_properties`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_properties` (
  `id` int NOT NULL AUTO_INCREMENT,
  `product_id` int DEFAULT NULL,
  `cat_prop_id` int DEFAULT NULL,
  `values` char(255) NOT NULL,
  `isActive` tinyint(1) DEFAULT '1',
  `created_on` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_properties`
--

LOCK TABLES `product_properties` WRITE;
/*!40000 ALTER TABLE `product_properties` DISABLE KEYS */;
INSERT INTO `product_properties` VALUES (1,10,1,'qizil',1,'2021-08-25 11:32:50'),(2,10,3,'mxped',1,'2021-08-25 11:33:06'),(3,10,5,'AlmariShop',1,'2021-08-25 11:33:37'),(4,1,3,'Atlanta',1,'2021-08-26 11:46:16'),(5,1,3,'kulrang',1,'2021-08-26 11:46:31'),(6,1,3,'qora',1,'2021-08-26 11:46:40'),(7,1,2,'46',1,'2021-08-26 11:46:57'),(8,1,2,'48',1,'2021-08-26 11:47:05'),(9,1,2,'50',1,'2021-08-26 11:47:13'),(10,3,1,'qora',1,'2021-08-27 05:05:24'),(11,3,1,'oq',1,'2021-08-27 05:05:38'),(12,3,5,'Orzu Tech',1,'2021-08-27 05:06:20'),(13,3,3,'Lenovo',1,'2021-08-27 05:06:30'),(14,3,3,'acer',1,'2021-08-27 05:06:51'),(15,3,3,'hp',1,'2021-08-27 05:07:03'),(16,12,4,'qora',1,'2021-09-25 10:46:09'),(17,12,4,'qizil',1,'2021-09-25 10:47:56'),(18,12,4,'yashil',1,'2021-09-25 10:48:08'),(19,12,7,'Atlanta',1,'2021-09-25 10:48:49'),(20,12,7,'Texno Mark',1,'2021-09-25 10:49:11'),(21,12,7,'Indenim',1,'2021-09-25 10:49:20');
/*!40000 ALTER TABLE `product_properties` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_tags`
--

DROP TABLE IF EXISTS `product_tags`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_tags` (
  `id` int NOT NULL AUTO_INCREMENT,
  `product_id` int DEFAULT NULL,
  `tag_id` int DEFAULT NULL,
  `isActive` tinyint(1) DEFAULT '1',
  `created_on` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_tags`
--

LOCK TABLES `product_tags` WRITE;
/*!40000 ALTER TABLE `product_tags` DISABLE KEYS */;
/*!40000 ALTER TABLE `product_tags` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `promokod`
--

DROP TABLE IF EXISTS `promokod`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `promokod` (
  `id` int NOT NULL AUTO_INCREMENT,
  `token` varchar(10) DEFAULT NULL,
  `user_id` varchar(255) DEFAULT NULL,
  `isFoiz` tinyint DEFAULT NULL,
  `amount` decimal(12,2) DEFAULT '0.00',
  `deadline` datetime DEFAULT NULL,
  `count` int DEFAULT '0',
  `description` varchar(255) DEFAULT NULL,
  `created_on` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `isActive` tinyint DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE KEY `token_UNIQUE` (`token`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `promokod`
--

LOCK TABLES `promokod` WRITE;
/*!40000 ALTER TABLE `promokod` DISABLE KEYS */;
INSERT INTO `promokod` VALUES (5,'d408da1','9',1,19.00,'2021-10-07 00:00:00',5,NULL,'2021-09-24 14:39:05',0),(28,'d408da2','9',0,1222222.00,'2021-09-26 12:00:00',52,'jhdf','2021-09-24 14:39:05',1),(30,'d408da4','9',1,20.00,'2021-09-10 05:00:00',0,NULL,'2021-09-24 14:39:05',1),(32,'d408da8','9',1,1.00,'2021-09-22 00:00:00',0,NULL,'2021-09-24 14:39:05',1),(33,'h408da6','9',0,1000000.00,'2021-09-24 00:00:00',0,NULL,'2021-09-24 14:39:05',1),(34,'1962CE4','9',1,20.00,'2021-10-10 00:00:00',3,'Xushnudbekka','2021-09-24 16:10:17',1),(35,'36482EF','1',0,1000000.00,'2021-09-28 00:00:00',10,NULL,'2021-09-24 16:33:09',1);
/*!40000 ALTER TABLE `promokod` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `promokod_logs`
--

DROP TABLE IF EXISTS `promokod_logs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `promokod_logs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `promokod_id` int NOT NULL,
  `user_id` int DEFAULT NULL,
  `amount` decimal(10,2) DEFAULT NULL,
  `discount` decimal(10,2) DEFAULT NULL,
  `state` int DEFAULT '0',
  `order_id` int NOT NULL,
  `created_on` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `promokod_logs`
--

LOCK TABLES `promokod_logs` WRITE;
/*!40000 ALTER TABLE `promokod_logs` DISABLE KEYS */;
/*!40000 ALTER TABLE `promokod_logs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `regions`
--

DROP TABLE IF EXISTS `regions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `regions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `adres_name` varchar(255) DEFAULT NULL,
  `sub` int DEFAULT NULL,
  `finish` tinyint DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=764 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `regions`
--

LOCK TABLES `regions` WRITE;
/*!40000 ALTER TABLE `regions` DISABLE KEYS */;
INSERT INTO `regions` VALUES (1,'O`zbekiston',0,NULL),(2,'Andijon viloyati',1,NULL),(3,'Buxoro viloyati',1,NULL),(4,'Farg`ona viloyati',1,NULL),(5,'Namangan viloyati',1,NULL),(6,'Navoiy viloyati',1,NULL),(7,'Qashqadaryo viloyati',1,NULL),(8,'Qoraqalpog`iston Respublikasi',1,NULL),(9,'Samarqand viloyati',1,NULL),(10,'Sirdaryo viloyati',1,NULL),(11,'Surxondaryo viloyati',1,NULL),(12,'Toshkent viloyati',1,NULL),(13,'Toshkent shahri',1,NULL),(14,'Xorazm viloyati',1,NULL),(15,'Jizzax viloyati',1,NULL),(16,'Andijon (tuman)',2,NULL),(17,'Asaka tumani',2,NULL),(18,'Baliqchi tumani',2,NULL),(19,'Bo`z (tuman)',2,NULL),(20,'Buloqboshi tumani',2,NULL),(21,'Izboskan (tuman)',2,NULL),(22,'Jalaquduq (tuman)',2,NULL),(23,'Xo`jaobod tumani',2,NULL),(24,'Qo`rg`ontepa tumani',2,NULL),(25,'Marhamat tumani',2,NULL),(26,'Oltinko`l (tuman)',2,NULL),(27,'Paxtaobod tumani',2,NULL),(28,'Shahrixon (tuman)',2,NULL),(29,'Ulug`nor (tuman)',2,NULL),(45,'Oltiariq tumani',4,NULL),(46,'Bag`dod tumani',4,NULL),(47,'Beshariq tumani',4,NULL),(48,'Buvayda tumani',4,NULL),(49,'Dang`ara tumani',4,NULL),(50,'Farg`ona tumani',4,NULL),(51,'Furqat tumani',4,NULL),(52,'Qo`shtepa tumani',4,NULL),(53,'Quva tumani',4,NULL),(54,'Rishton tumani',4,NULL),(55,'So`x tumani',4,NULL),(56,'Toshloq tumani',4,NULL),(57,'Uchko`prik tumani',4,NULL),(58,'O`zbekiston tumani',4,NULL),(59,'Yozyovon tumani',4,NULL),(60,'Chortoq tumani',5,NULL),(61,'Chust tumani',5,NULL),(62,'Kosonsoy tumani',5,NULL),(63,'Mingbuloq tumani',5,NULL),(64,'Namangan tumani',5,NULL),(65,'Norin tumani (O`zbekiston)',5,NULL),(66,'Pop tumani',5,NULL),(67,'To`raqo`rg`on tumani',5,NULL),(68,'Uchqo`rg`on tumani',5,NULL),(69,'Uychi tumani',5,NULL),(70,'Yangiqo`rg`on tumani',5,NULL),(71,'Konimex tumani',6,NULL),(72,'Karmana tumani',6,NULL),(73,'Qiziltepa (tuman, Navoiy viloyati)',6,NULL),(74,'Xatirchi tumani',6,NULL),(75,'Navbahor tumani',6,NULL),(76,'Nurota tumani',6,NULL),(77,'Tomdi tumani',6,NULL),(78,'Uchquduq tumani',6,NULL),(79,'Bayot MFY',7,NULL),(80,'Ko`l chovdur MFY',7,NULL),(81,'Qirlishon MFY',7,NULL),(82,'Chiroqchi tumani',7,NULL),(83,'Dehqonobod tumani',7,NULL),(84,'G`uzor tumani',7,NULL),(85,'Qamashi tumani',7,NULL),(86,'Qarshi tumani',7,NULL),(87,'Koson tumani',7,NULL),(88,'Kasbi tumani',7,NULL),(89,'Kitob tumani',7,NULL),(90,'Mirishkor tumani',7,NULL),(91,'Muborak tumani',7,NULL),(92,'Nishon tumani',7,NULL),(93,'Shahrisabz tumani',7,NULL),(94,'Yakkabog` tumani',7,NULL),(95,'Amudaryo tumani',8,NULL),(96,'Beruniy tumani',8,NULL),(97,'Chimboy tumani',8,NULL),(98,'Ellikqal?a tumani',8,NULL),(99,'Kegeyli tumani',8,NULL),(100,'Mo`ynoq tumani',8,NULL),(101,'Nukus tumani',8,NULL),(102,'Qanliko`l tumani',8,NULL),(103,'Qo`ng`irot tumani',8,NULL),(104,'Qorao`zak tumani',8,NULL),(105,'Shumanay tumani',8,NULL),(106,'Taxtako`pir tumani',8,NULL),(107,'To`rtko`l tumani',8,NULL),(108,'Xo`jayli tumani',8,NULL),(109,'Bulung`ur tumani',9,NULL),(110,'Ishtixon tumani',9,NULL),(111,'Jomboy tumani',9,NULL),(112,'Kattaqo`rg`on tumani',9,NULL),(113,'Qo`shrabot tumani',9,NULL),(114,'Narpay tumani',9,NULL),(115,'Nurobod tumani',9,NULL),(116,'Oqdaryo tumani',9,NULL),(117,'Paxtachi tumani',9,NULL),(118,'Payariq tumani',9,NULL),(119,'Pastdarg`om tumani',9,NULL),(120,'Samarqand tumani',9,NULL),(121,'Toyloq tumani',9,NULL),(122,'Urgut tumani',9,NULL),(123,'Oqoltin tumani',10,NULL),(124,'Boyovut tumani',10,NULL),(125,'Guliston tumani',10,NULL),(126,'Xovos tumani',10,NULL),(127,'Mirzaobod tumani',10,NULL),(128,'Sayxunobod tumani',10,NULL),(129,'Sardoba tumani',10,NULL),(130,'Sirdaryo tumani',10,NULL),(131,'Angor tumani',11,NULL),(132,'Boysun tumani',11,NULL),(133,'Denov tumani',11,NULL),(134,'Jarqo`rg`on tumani',11,NULL),(135,'Qiziriq tumani',11,NULL),(136,'Qumqo`rg`on tumani',11,NULL),(137,'Muzrabot tumani',11,NULL),(138,'Oltinsoy tumani',11,NULL),(139,'Sariosiyo tumani',11,NULL),(140,'Sherobod tumani',11,NULL),(141,'Sho`rchi tumani',11,NULL),(142,'Termiz tumani',11,NULL),(143,'Uzun tumani',11,NULL),(144,'Bekobod tumani',12,NULL),(145,'Bo`stonliq tumani',12,NULL),(146,'Bo`ka tumani',12,NULL),(147,'Chinoz tumani',12,NULL),(148,'Qibray tumani',12,NULL),(149,'Ohangaron tumani',12,NULL),(150,'Oqqo`rg`on tumani',12,NULL),(151,'Parkent tumani',12,NULL),(152,'Piskent tumani',12,NULL),(153,'Quyi chirchiq tumani',12,NULL),(154,'O`rta Chirchiq tumani',12,NULL),(155,'Yangiyo`l tumani',12,NULL),(156,'Yuqori Chirchiq tumani',12,NULL),(157,'Zangiota tumani',12,NULL),(158,'Bektemir tumani',13,NULL),(159,'Chilonzor tumani',13,NULL),(160,'Hamza tumani',13,NULL),(161,'Mirobod tumani',13,NULL),(162,'Mirzo Ulug`bek tumani',13,NULL),(163,'Sergeli tumani',13,NULL),(164,'Shayxontohur tumani',13,NULL),(165,'Olmazor tumani',13,NULL),(166,'Uchtepa (Toshkent)',13,NULL),(167,'Yakkasaroy tumani',13,NULL),(168,'Yunusobod tumani',13,NULL),(169,'Bog`ot tumani',14,NULL),(170,'Gurlan tumani',14,NULL),(171,'Xonqa tumani',14,NULL),(172,'Hazorasp tumani',14,NULL),(173,'Xiva tumani',14,NULL),(174,'Qo`shko`pir tumani',14,NULL),(175,'Shovot tumani',14,NULL),(176,'Urganch tumani',14,NULL),(177,'Yangiariq tumani',14,NULL),(178,'Yangibozor tumani',14,NULL),(179,'Tuproqqal?a tumani',14,NULL),(180,'Arnasoy tumani',15,NULL),(181,'Baxmal tumani',15,NULL),(182,'Do`stlik tumani',15,NULL),(183,'Forish tumani',15,NULL),(184,'G`allaorol tumani',15,NULL),(185,'Sharof Rashidov tumani',15,NULL),(186,'Mirzacho`l tumani',15,NULL),(187,'Paxtakor tumani',15,NULL),(188,'Yangiobod tumani',15,NULL),(189,'Zomin tumani',15,NULL),(190,'Zafarobod tumani',15,NULL),(191,'Zarbdor tumani',15,NULL),(192,'Buxoro shahar',3,NULL),(193,'Kogon shahri',3,NULL),(194,'Buxoro tuman',3,NULL),(195,'Vobkent tuman',3,NULL),(196,'Jondor tuman',3,NULL),(197,'Kogon tuman',3,NULL),(198,'Olot tuman',3,NULL),(199,'Peshku tuman',3,NULL),(200,'Romitan tuman',3,NULL),(201,'Shofirkon tuman',3,NULL),(202,'Qorako`l tuman',3,NULL),(203,'Qorovulbozor tuman',3,NULL),(204,'G`ijduvon tuman',3,NULL),(205,'Avshormaxalla',192,NULL),(206,'M.Tarobiy',192,NULL),(207,'Losha',192,NULL),(208,'B.Nakshband',192,NULL),(209,'Sifatmuniy',192,NULL),(210,'Namozgox',192,NULL),(211,'Oybek',192,NULL),(212,'Navbaxor',192,NULL),(213,'Yoshlik',192,NULL),(214,'Bogidasht',192,NULL),(215,'Foshun',192,NULL),(216,'Tukimachi',192,NULL),(217,'Dustlik',192,NULL),(218,'Istiklol',192,NULL),(219,'Xujamushkin',192,NULL),(220,'S.Ayniy',192,NULL),(221,'M.Narshaxiy',192,NULL),(222,'Kukaldosh',192,NULL),(223,'A.Navoiy',192,NULL),(224,'J.Ikromiy',192,NULL),(225,'Nizomiy ',192,NULL),(226,'Navruz ',192,NULL),(227,'Bunyodkor ',192,NULL),(228,'Zarafshon ',192,NULL),(229,'A.Temur',192,NULL),(230,'I.Buxoriy',192,NULL),(231,'X.Olimjon',192,NULL),(232,'A.Fitrat ',192,NULL),(233,'M.Ulugbek ',192,NULL),(234,'Turki-jandi ',192,NULL),(235,'Bexishtiyon ',192,NULL),(236,'Jubor ',192,NULL),(237,'Xavzi-nav ',192,NULL),(238,'Piridastgir ',192,NULL),(239,'Shodlik ',192,NULL),(240,'Toshmachit ',192,NULL),(241,'X.Gunjoriy ',192,NULL),(242,'Shergiron ',192,NULL),(243,'R.Xamroev ',192,NULL),(244,'Gulshan ',192,NULL),(245,'Varaxsha ',192,NULL),(246,'O.Xujaev ',192,NULL),(247,'G.Gulom ',192,NULL),(248,'M.Ashrafiy ',192,NULL),(249,'F.Xujaev ',192,NULL),(250,'Chorbaxossa ',192,NULL),(251,'Yangiobod ',192,NULL),(252,'A.Donish ',192,NULL),(253,'Ibn-Sino ',192,NULL),(254,'Kuksaroy',192,NULL),(255,'Shayxul-olam',192,NULL),(256,'Moxi-xossa',192,NULL),(257,'Shark-yulduzi',192,NULL),(258,'M.Burxonov ',192,NULL),(259,'Shirbudin',192,NULL),(260,'S.Sheroziy ',192,NULL),(261,'S.Raximov ',192,NULL),(262,'Dilkusho ',192,NULL),(263,'Guliston',192,NULL),(264,'S.Boxarsiy',192,NULL),(265,'Furkat ',192,NULL),(266,'Gulchorbog ',192,NULL),(267,'A.Gijduvoniy ',192,NULL),(268,'Sheyxon ',192,NULL),(269,'Otbozor',192,NULL),(270,'A.Navoiy MFY',193,NULL),(271,'Amir Temur MFY',193,NULL),(272,'Bobur MFY',193,NULL),(273,'Bunyodkor MFY',193,NULL),(274,'Istiqlol MFY',193,NULL),(275,'Mirzo Ulug`bek MFY',193,NULL),(276,'A.Qodiriy MFY',193,NULL),(277,'Beruniy MFY',193,NULL),(278,'Buxoroi Sharif MFY',193,NULL),(279,'Vatanparvar MFY',193,NULL),(280,'Furqat MFY',193,NULL),(281,'Turkiston MFY',193,NULL),(282,'Adolat MFY',193,NULL),(283,'Arabxona MFY',193,NULL),(284,'Do`stlik MFY',193,NULL),(285,'Ziyokor MFY',193,NULL),(286,'Temiryo`lchi MFY',193,NULL),(287,'Mustaqillik MFY',193,NULL),(288,'Zirabod MFY',193,NULL),(289,'Mahtumquli MFY',193,NULL),(290,'Xo`jabargi MFY',193,NULL),(291,'Navzirabod Mfy',193,NULL),(292,'Kavola Mahmud MFY',194,NULL),(293,'Ko`chko`mar MFY',194,NULL),(294,'Bog`ikalon KFY',194,NULL),(295,'Qo`shxodim MFY',194,NULL),(296,'So`fikorgar QFY',194,NULL),(297,'Gala Osiyo MFY',194,NULL),(298,'Navro`z MFY',194,NULL),(299,'Oybek MFY',194,NULL),(300,'Do`stlik MFY',194,NULL),(301,'Mustaqillik MFY',194,NULL),(302,'Rabotak MFY',194,NULL),(303,'Rabotiqalmoq KFY',194,NULL),(304,'Madaniyat Rabot MFY',194,NULL),(305,'Podshoxi MFY',194,NULL),(306,'Arabxona MFY',194,NULL),(307,'Dehcha MFY',194,NULL),(308,'Shergiron MFY',194,NULL),(309,'Xonobod MFY',194,NULL),(310,'Rabotipoyon MFY',194,NULL),(311,'Amirobod Guliston MFY',194,NULL),(312,'Shexoncha KFY',194,NULL),(313,'Kunji qal’a KFY',194,NULL),(314,'Novmetan MFY',194,NULL),(315,'Zarmanoq MFI',194,NULL),(316,'Yangiobod MFY',194,NULL),(317,'Kulonxona MFY',194,NULL),(318,'Talaliyon MFY',194,NULL),(319,'Gulshanobod MFY',194,NULL),(320,'Bog`dasht MFY',194,NULL),(321,'Dilobod-Zafarobod MFY',194,NULL),(322,'Xumin MFI',194,NULL),(323,'Istiqbol KFY',194,NULL),(324,'Yangi turmush QFY',194,NULL),(325,'Turkom MFY',194,NULL),(326,'Sohibkor KFY',194,NULL),(327,'Saxovat MFY',194,NULL),(328,'Rozmoz MFY',195,NULL),(329,'Halvogaron',195,NULL),(330,'saraosiyo',195,NULL),(331,'xo`jarabot',195,NULL),(332,'Cho`rikalon',195,NULL),(333,'Ko`lxatib',195,NULL),(334,'Mirvoshi',195,NULL),(335,'Changaron',195,NULL),(336,'Teraklik',195,NULL),(337,'Istiqlol',195,NULL),(338,'So`fidexqon MFY',195,NULL),(339,'G`aribshox',195,NULL),(340,'Charmgaron MFY',195,NULL),(341,'Xajuvon ',195,NULL),(342,'Muminobod',195,NULL),(343,'Arabxona',195,NULL),(344,'Guliston',195,NULL),(345,'Shoxnigor',195,NULL),(346,'do`stlik',195,NULL),(347,'Beshrabot',195,NULL),(348,'Qo`qin',195,NULL),(349,'Chorbog`kent',195,NULL),(350,'Rabotoxun',195,NULL),(351,'Kosari',195,NULL),(352,'Shirin',195,NULL),(353,'katagan',195,NULL),(354,'diyor',195,NULL),(355,'shifokor',195,NULL),(356,'paxtakor',195,NULL),(357,'Kulolchi',195,NULL),(358,'Ponob',195,NULL),(359,'Shanba',195,NULL),(360,'O`zbakon MFY',195,NULL),(361,'Xalach',195,NULL),(362,'Nayman',195,NULL),(363,'Pushmon',195,NULL),(364,'Anjirbog`',195,NULL),(365,'Bozorjoyi',195,NULL),(366,'ko`lodina',195,NULL),(367,'Vobkent',195,NULL),(368,'Latifsobungar',195,NULL),(369,'Niyozxo`ja',195,NULL),(370,'Shakarkent',195,NULL),(371,'Quruvchi',195,NULL),(372,'Romish MFY',196,NULL),(373,'Oqtepa MFY',196,NULL),(374,'Oydin MFY',196,NULL),(375,'Mirzayon MFY',196,NULL),(376,'Yosh kuch MFY',196,NULL),(377,'Dalmunobod MFY',196,NULL),(378,'Jamiyat MFY',196,NULL),(379,'Luqmon MFY',196,NULL),(380,'Qazoqon MFY',196,NULL),(381,'Ibn-sino MFY',196,NULL),(382,'Samonchuq MFY',196,NULL),(383,'Murg`ak MFY',196,NULL),(384,'Xumdonak MFY',196,NULL),(385,'Ko`liyon MFY',196,NULL),(386,'Ushot MFY',196,NULL),(387,'Istiqlol MFY',196,NULL),(388,'Po`loti MFY',196,NULL),(389,'Sho`robod  MFY',196,NULL),(390,'Demun MFY',196,NULL),(391,'Qalmoq MFY',196,NULL),(392,'Zangi MFY',196,NULL),(393,'Denov MFY',196,NULL),(394,'Xazorman MFY',196,NULL),(395,'Qozikenti MFY',196,NULL),(396,'Xumin MFY',196,NULL),(397,'Boliob mfy',196,NULL),(398,'Chorzona MFY',196,NULL),(399,'Eronshox MFY',196,NULL),(400,'Darveshi MFY',196,NULL),(401,'Oytug`di MFY',196,NULL),(402,'Pochchoyi MFY',196,NULL),(403,'Baxoriston MFY',196,NULL),(404,'Paxlavon MFY',196,NULL),(405,'Qaroli MFY',196,NULL),(406,'Tobagar mfy',196,NULL),(407,'Nurafshon MFY',196,NULL),(408,'Xo`jaxayron MFY',196,NULL),(409,'Karavul MFY',196,NULL),(410,'Yangiobod MFY',196,NULL),(411,'Mustaqillik MFY',196,NULL),(412,'Dovut MFY',196,NULL),(413,'Aleli MFY',196,NULL),(414,'Obod MFY',196,NULL),(415,'Rabot MFY',196,NULL),(416,'Namgoni MFY',196,NULL),(417,'Tinchlik mfy',196,NULL),(418,'Navgadi MFY',196,NULL),(419,'Oxshix MFY',196,NULL),(420,' Paxtakor MFY',196,NULL),(421,'Qovchin MFY',196,NULL),(422,'Jondor MFY',196,NULL),(423,'Zarafshon MFY',196,NULL),(424,'B.Nakshband ',197,NULL),(425,'Niyoz Xoji ',197,NULL),(426,'Choloki',197,NULL),(427,'Suxor',197,NULL),(428,'Mustakillik',197,NULL),(429,'Yangi Xayot ',197,NULL),(430,'Beklar',197,NULL),(431,'Istikbol',197,NULL),(432,'Tutkunda',197,NULL),(433,'Nurafshon',197,NULL),(434,'Urta Chul',197,NULL),(435,'Taraqqiyot',197,NULL),(436,'Kogon ',197,NULL),(437,'Sorgun',197,NULL),(438,'Siyoz Poen',197,NULL),(439,'Navruz',197,NULL),(440,'Xuja Yakshaba',197,NULL),(441,'Tun irok',197,NULL),(442,'Sarayon',197,NULL),(443,'Geofizika',197,NULL),(444,'Uzbekiston',197,NULL),(445,'Xukumatobod',197,NULL),(446,'Uba Chuli',197,NULL),(447,'Qirtay MFY',198,NULL),(448,'Qumkashon MFY',198,NULL),(449,'Muxtor MFY',198,NULL),(450,'Xalыobod MFY',198,NULL),(451,'Paxtakor MFY',198,NULL),(452,'O`zbekiston MFY',198,NULL),(453,'Chovdur MFY',198,NULL),(454,'Asajam MFY',198,NULL),(455,'Baland machit MFY',198,NULL),(456,'Davlatboy MFY',198,NULL),(457,'Denov MFY',198,NULL),(458,'Yosh Botir MFY',198,NULL),(459,'Nurobod MFY',198,NULL),(460,'Navro`z MFY',198,NULL),(461,'Pichoqchi MFY',198,NULL),(462,'Usmonshayx MFY',198,NULL),(463,'Eski Olot MFY',198,NULL),(464,'Ma’rifat MFY',198,NULL),(465,'Arabxona MFY',198,NULL),(466,'Bo`ribek -Chandir MFY',198,NULL),(467,'Bo`ston MFY',198,NULL),(468,'G`anchi -Chandir MFY',198,NULL),(469,'Ok-Oltin MFY',198,NULL),(470,'Soyinqarovul MFY',198,NULL),(471,'Xidreyli MFY',198,NULL),(472,'Opshok MFY',198,NULL),(473,'Shayxlar MFY',198,NULL),(474,'Bunyodkor MFY',198,NULL),(475,'Xalifa MFY',198,NULL),(476,'Xosa bo`yi MFY',198,NULL),(477,'Salokaravul MFY',198,NULL),(478,'Kesakli MFY',198,NULL),(479,'Burjok MFY',198,NULL),(480,'Jayxunobod MFY',198,NULL),(481,'Dilkor MFY',198,NULL),(482,'Varaxsho',199,NULL),(483,'Kiyovxo`ja',199,NULL),(484,'Qa’la',199,NULL),(485,'Navgvhon',199,NULL),(486,'Navoiy',199,NULL),(487,'Obidxo`ja',199,NULL),(488,'Turkiston',199,NULL),(489,'O`g`lon',199,NULL),(490,'O`zbek',199,NULL),(491,'Xurram',199,NULL),(492,'Shavgon',199,NULL),(493,'Quchoq',199,NULL),(494,'Chibog`oni',199,NULL),(495,'Ibn Sino',199,NULL),(496,'Sadir',199,NULL),(497,'Deycha',199,NULL),(498,'Peshko`',199,NULL),(499,'Guliston',199,NULL),(500,'Kamolot',199,NULL),(501,'So`sana',199,NULL),(502,'Talisobun',199,NULL),(503,'Do`stlik',199,NULL),(504,'Zandane',199,NULL),(505,'Qaraqalpoq',199,NULL),(506,'M-Mirishkor',199,NULL),(507,'Xorkash',199,NULL),(508,'Xo`lbor',199,NULL),(509,'Yangiobod',199,NULL),(510,'Boboxoji',199,NULL),(511,'Jongeldi',199,NULL),(512,'Yangibozor',199,NULL),(513,'Mustaqillik',199,NULL),(514,'Chiqirchi',199,NULL),(515,'Malishoyak',199,NULL),(516,'Navbaxor',199,NULL),(517,'Bog`imuso',199,NULL),(518,'Valfajir',199,NULL),(519,'Azizon MFY',200,NULL),(520,'O`zbekiston MFY',200,NULL),(521,'Qo`rg`on MFY',200,NULL),(522,'Samosiy MFY',200,NULL),(523,'Baxtiyorchi MFY',200,NULL),(524,'Mug`oncha MFY',200,NULL),(525,'Qalaychorbog` MFY',200,NULL),(526,'Qizilravot MFY',200,NULL),(527,'Xosa',200,NULL),(528,'Decha',200,NULL),(529,'G`azberon',200,NULL),(530,'Chelong`u',200,NULL),(531,'Toshrabot',200,NULL),(532,'Chandir',200,NULL),(533,'Urganjiyon',200,NULL),(534,'Qahramon',200,NULL),(535,'Gazli',200,NULL),(536,'Baynalminal',200,NULL),(537,'Mirishkor',200,NULL),(538,'Tarnaut ',200,NULL),(539,'Attaron',200,NULL),(540,'O`ba',200,NULL),(541,'Romitan',200,NULL),(542,'Bog`cha',200,NULL),(543,'Zarafshon',200,NULL),(544,'Ibn-Sino ',200,NULL),(545,'Bobir',200,NULL),(546,'A.Navoiy',200,NULL),(547,'Guliston',200,NULL),(548,'Afrosiyob',200,NULL),(549,'Bog`iturkon',200,NULL),(550,'Bog`isaydon',200,NULL),(551,'Qumrabot',200,NULL),(552,'Xo`jaubbon',200,NULL),(553,'Marziya',200,NULL),(554,'Hazortut',200,NULL),(555,'Hofizrabot',200,NULL),(556,'Qoqishtuvon',200,NULL),(557,'Poyjo`y',200,NULL),(558,'Iftixor',200,NULL),(559,'Sho`rcha ',200,NULL),(560,'Istiqlol',200,NULL),(561,'Navbahor',200,NULL),(562,'Sho`robod',200,NULL),(563,'O`tabek',200,NULL),(564,'Qalmaqon MFY',201,NULL),(565,'Jo`ynav MFY',201,NULL),(566,'Iskogare  MFY',201,NULL),(567,'Sh.Rashidov MFY ',201,NULL),(568,'Talisafed MFY',201,NULL),(569,'G`ulomte  MFY ',201,NULL),(570,'Chuqurak MFY',201,NULL),(571,'Quyi Chuqurak MFY',201,NULL),(572,'Q.Vardonze MFY ',201,NULL),(573,'Yangiqishloq MFY ',201,NULL),(574,'Boboato MFY',201,NULL),(575,'Jo`sho`ra MFY',201,NULL),(576,'Jilvon MFY',201,NULL),(577,'Bobur MFY',201,NULL),(578,'Pashmon MFY',201,NULL),(579,'Chandir MFY',201,NULL),(580,'Shodlik MFY',201,NULL),(581,'Bog`iafzal MFY ',201,NULL),(582,'Mirzoqul MFY',201,NULL),(583,'Arabxona MFY',201,NULL),(584,'Chitkaron MFY ',201,NULL),(585,'Qayrag`och MFY',201,NULL),(586,'Zarchabek MFY',201,NULL),(587,'Temirchi MFY',201,NULL),(588,'Sultonobod MFY ',201,NULL),(589,'Shibirg`on  MFY ',201,NULL),(590,'Xorin MFY ',201,NULL),(591,'Ko`rishkent MFY ',201,NULL),(592,'Kalon MFY',201,NULL),(593,'Navbahor  MFY   ',201,NULL),(594,'Pattaxon MFY ',201,NULL),(595,'Mingchinor MFY',201,NULL),(596,'Nekkishi MFY',201,NULL),(597,'Maxallaqozi MFY',201,NULL),(598,'Do`rmon MFY',201,NULL),(599,'Denav MFY ',201,NULL),(600,'Jo`yrabod MFY ',201,NULL),(601,'Dorigar MFY ',201,NULL),(602,'Xorkash MFY',201,NULL),(603,'X.Orif MFY',201,NULL),(604,'Boboxaydar MFY',201,NULL),(605,'Kotiyon MFY',201,NULL),(606,'A.Navoiy MFY',201,NULL),(607,'Guliston MFY',201,NULL),(608,'Tezguzar MFY',201,NULL),(609,'Tinchlik  MFY',201,NULL),(610,'Paxtaobod MFY',201,NULL),(611,'Savrak MFY',201,NULL),(612,'Nurafshon MFY',201,NULL),(613,'Talsangobod MFY',201,NULL),(614,'Xo`jakon mfy',202,NULL),(615,'Mallaishayx mfy',202,NULL),(616,'Polvonlar mfy',202,NULL),(617,'Zarafshon mfy',202,NULL),(618,'Mirob MFY',202,NULL),(619,'Oq Oltin MFY',202,NULL),(620,'Eski Qal’a MFY',202,NULL),(621,'Qorahoji mfy',202,NULL),(622,'Kamolot mfy',202,NULL),(623,'Mustaqillik mfy',202,NULL),(624,'Chovli mfy',202,NULL),(625,'Mirzaqalьa MFY',202,NULL),(626,'Yangizamon MFY',202,NULL),(627,'Dexqonobod mfy',202,NULL),(628,'Arabxona mfy',202,NULL),(629,'Paxtakor MFY',202,NULL),(630,'Ziyorat mfy',202,NULL),(631,'Regihaydar mfy',202,NULL),(632,'Solur mfy',202,NULL),(633,'Chekirchi MFY',202,NULL),(634,'Bandboshi MFY',202,NULL),(635,'Tojikent mfy',202,NULL),(636,'Sho`robod MFY',202,NULL),(637,'Alika Xo`ja MFY',202,NULL),(638,'Sayyot mfy',202,NULL),(639,'Poykent MFY',202,NULL),(640,'Qulonchi mfy',202,NULL),(641,'Qorako`l mfy',202,NULL),(642,'Do`rman MFY',202,NULL),(643,'Qoraqulonchi mfy',202,NULL),(644,'Tinchlik mfy',202,NULL),(645,'Tayqir mfy',202,NULL),(646,'Osiyo MFY',202,NULL),(647,'Arna mfy',202,NULL),(648,'Yangi qa’la mfy',202,NULL),(649,'Chandirobod Mfy',202,NULL),(650,'Vaxim mfy',202,NULL),(651,'Jig`achi mfy',202,NULL),(652,'Yangibozor mfy',202,NULL),(653,'Quvvacha mfy',202,NULL),(654,'Ketmondugdi MFY',202,NULL),(655,'Darg`abog`i mfy',202,NULL),(656,'Xo`jalar mfy',202,NULL),(657,'Tashabbus mfy',202,NULL),(658,'Darg`ali MFY',202,NULL),(659,'Yangi turmush mfy',202,NULL),(660,'Qozon mfy',202,NULL),(661,'Istiqlol mfy',202,NULL),(662,'Shakarbek  mfy',202,NULL),(663,'Do`stlik mfy',202,NULL),(664,'Tinchlik MFY',203,NULL),(665,'Navbaxor MFY',203,NULL),(666,'Bo`zachi MFY',203,NULL),(667,'Bo`ston MFY',203,NULL),(668,'Jarqoq MFY',203,NULL),(669,'Imom Buxoriy MFY',203,NULL),(670,'Cho`lquvar MFY',203,NULL),(671,'Sarmijon m f y',204,NULL),(672,'Buktaroy m f y',204,NULL),(673,'Taxtaxon m f y',204,NULL),(674,'Chag`dari m f y',204,NULL),(675,'Vazirshox m f y',204,NULL),(676,'Ko`shk m f y',204,NULL),(677,'Obod m f y',204,NULL),(678,'Zarafshon m f y',204,NULL),(679,'Zargaron m f y',204,NULL),(680,'Soxibiyon m f y',204,NULL),(681,'Kassabon m f y',204,NULL),(682,'Shurcha m f y',204,NULL),(683,'Yangiobod m f y',204,NULL),(684,'Okgul m f y',204,NULL),(685,'Ko`lijabbor m f y',204,NULL),(686,'Labro`d m f y',204,NULL),(687,'Gajdumak m f y',204,NULL),(688,'Jovgari m f y',204,NULL),(689,'Gulistonobod m f y',204,NULL),(690,'Xavzak m f y',204,NULL),(691,'Armechan m f y',204,NULL),(692,'Denov m f y',204,NULL),(693,'Todon m f y',204,NULL),(694,'Cho`galon m f y',204,NULL),(695,'Soktari m f y',204,NULL),(696,'Tarxanon m f y',204,NULL),(697,'Mirakon m f y',204,NULL),(698,'Saidkent m f y',204,NULL),(699,'G`ovshun m f y',204,NULL),(700,'Xaticha m f y',204,NULL),(701,'Uzanon m f y',204,NULL),(702,'Mazragan m f y',204,NULL),(703,'Maxallamirzayon m f y',204,NULL),(704,'Biyosin m f y',204,NULL),(705,'Pozagari m f y',204,NULL),(706,'Karna m f y',204,NULL),(707,'Kumok m f y',204,NULL),(708,'Dodarak m f y',204,NULL),(709,'Ulfatbibi m f y',204,NULL),(710,'Baqqollar m f y',204,NULL),(711,'G`ishti m f y',204,NULL),(712,'Okrabot m f y',204,NULL),(713,'Beshtuvo m f y',204,NULL),(714,'Rostguy m f y',204,NULL),(715,'Baraka m f y',204,NULL),(716,'Ko`kcha m f y',204,NULL),(717,'Paxtaobod k f y',204,NULL),(718,'Ayrtom m f y',204,NULL),(719,'Toshloq mf y',204,NULL),(720,'Xalqobod m f y',204,NULL),(721,'Korabog` m f y',204,NULL),(722,'Ko`riq m f y',204,NULL),(723,'Olmazor m f y',204,NULL),(724,'Amirobod m f y',204,NULL),(725,'Degrezon m f y',204,NULL),(726,'Qurg`on m f y',204,NULL),(727,'Shark m f y',204,NULL),(728,'Guliston m f y',204,NULL),(729,'A.Qaxxor m f y',204,NULL),(730,'Zarangari m f y',204,NULL),(731,'Maxalla m f y',204,NULL),(732,'Bulakiyon m f y',204,NULL),(733,'Mustaqillik m f y',204,NULL),(734,'Sarvari m f y',204,NULL),(735,'Kallon m f y',204,NULL),(736,'Tavariyon m f y',204,NULL),(737,'A.Fijduvoniy m f y',204,NULL),(738,'Chorsu m f y',204,NULL),(739,'Sardor m f y',204,NULL),(740,'F.Yunusov m f y',204,NULL),(741,'Nodirabegim m f y',204,NULL),(742,'Bobur m f y',204,NULL),(743,'Pamuza m f y',204,NULL),(744,'F.Xujaev m f y',204,NULL),(745,'Dilkusho m f y',204,NULL),(746,'Samarqand shahar',9,NULL),(747,'Qarshi shahar',7,NULL),(748,'Andijon shahar',2,NULL),(749,'Farg`ona shahar',4,NULL),(750,'Namangan shahar',5,NULL),(751,'Nukus shahar',8,NULL),(752,'Guliston shahar',10,NULL),(753,'Chirchiq shahri',12,NULL),(754,'Zarafshon shahri',6,NULL),(755,'Navoiy shahri',6,NULL),(756,'Navoiy tumani',6,NULL),(757,'Turkmaniston',0,NULL),(758,'Tojikiston',0,NULL),(759,'Rossiya federatsiyasi',0,NULL),(760,'Qirg`iziston',0,NULL),(761,'Qozog`iston',0,NULL),(762,'Afg`oniston',0,NULL),(763,'Indonezia',0,NULL);
/*!40000 ALTER TABLE `regions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` char(255) NOT NULL,
  `isActive` tinyint(1) DEFAULT '1',
  `created_on` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'SuperAdmin',1,'2021-07-26 00:07:46'),(2,'Moderator',1,'2021-07-26 00:19:24'),(3,'User',1,'2021-07-26 00:20:10'),(4,'Sotuvchi',1,'2021-07-28 00:44:00'),(5,'Tekshirish',0,'2021-07-28 00:56:23');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `statuses`
--

DROP TABLE IF EXISTS `statuses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `statuses` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` char(255) NOT NULL,
  `isActive` tinyint(1) DEFAULT '1',
  `created_on` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `statuses`
--

LOCK TABLES `statuses` WRITE;
/*!40000 ALTER TABLE `statuses` DISABLE KEYS */;
INSERT INTO `statuses` VALUES (1,'Tekshi1uv',0,'2021-07-28 01:06:14'),(5,'new',1,'2021-08-05 09:33:26'),(6,'preparing',1,'2021-08-05 09:33:26'),(7,'accepted',1,'2021-08-05 09:33:26'),(8,'canceled',1,'2021-08-05 09:33:26');
/*!40000 ALTER TABLE `statuses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tags`
--

DROP TABLE IF EXISTS `tags`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tags` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` char(255) NOT NULL,
  `isActive` tinyint(1) DEFAULT '1',
  `created_on` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tags`
--

LOCK TABLES `tags` WRITE;
/*!40000 ALTER TABLE `tags` DISABLE KEYS */;
/*!40000 ALTER TABLE `tags` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transactions`
--

DROP TABLE IF EXISTS `transactions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `transactions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `time` varchar(155) DEFAULT NULL,
  `state` int DEFAULT NULL,
  `create_time` varchar(155) DEFAULT NULL,
  `order_id` int DEFAULT NULL,
  `transaction_id` varchar(155) DEFAULT NULL,
  `perform_time` varchar(155) DEFAULT NULL,
  `cancel_time` varchar(155) DEFAULT NULL,
  `reason` varchar(155) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transactions`
--

LOCK TABLES `transactions` WRITE;
/*!40000 ALTER TABLE `transactions` DISABLE KEYS */;
/*!40000 ALTER TABLE `transactions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `types`
--

DROP TABLE IF EXISTS `types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `types` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` char(255) NOT NULL,
  `isActive` tinyint(1) DEFAULT '1',
  `created_on` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `types`
--

LOCK TABLES `types` WRITE;
/*!40000 ALTER TABLE `types` DISABLE KEYS */;
INSERT INTO `types` VALUES (1,'son',1,'2021-07-28 01:01:36'),(2,'matn',1,'2021-08-04 03:59:23'),(3,'kasr',1,'2021-08-04 03:59:32');
/*!40000 ALTER TABLE `types` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `first_name` char(255) DEFAULT NULL,
  `last_name` char(255) DEFAULT NULL,
  `role_id` int DEFAULT NULL,
  `phone` char(100) NOT NULL,
  `password` char(200) NOT NULL,
  `isActive` tinyint(1) DEFAULT '1',
  `created_on` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `actived_on` timestamp NULL DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `phone_UNIQUE` (`phone`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Miraziz','Ergashev',1,'994457816','Admin*2021',1,'2021-07-26 01:06:56','2021-09-25 10:28:20',NULL),(5,'Oybek','Akramov',1,'906354138','1111',1,'2021-07-28 00:08:45','2021-08-25 05:45:15','Chilonzor'),(6,'Akmal aka','Sobirov',3,'906354139','12345678',1,'2021-07-28 03:40:49','2021-07-28 03:41:08','Dinamo bozorchani yaqini'),(7,'Samadov','Bobirjon',3,'914499345','1234',0,'2021-07-28 04:31:51','2021-08-02 06:33:36','Losha'),(8,'Oybek','Akramov',3,'916354138','1111',1,'2021-07-28 11:26:07',NULL,'Jondor tuman'),(9,'Shaxzod','Hamroyev',4,'995087623','1234',1,'2021-07-28 11:27:46','2021-09-25 12:33:13','Bukhara shaxar'),(10,'','',3,'934707623','1234',0,'2021-07-28 11:30:11',NULL,NULL),(11,'','',2,'995087622','1230',1,'2021-07-28 11:30:50',NULL,NULL),(12,'Shaxzod','Hamroyev',2,'','',1,'2021-07-28 12:01:20',NULL,NULL),(13,'Shaxzod2','Hamroyev2',3,'934507623','1234',1,'2021-07-30 03:50:10','2021-07-30 03:50:26','Shofirkon tuman'),(14,'asasdas','asdasdasdasd',4,'123344555','1234',0,'2021-07-30 03:52:41','2021-07-30 03:54:07','asdasdasdasdasdasdasda sdasd'),(15,'Shaxzod3','Hamroyev3',3,'995787878','1234',1,'2021-07-30 16:30:31','2021-08-03 04:33:24','Bukhara shaxar'),(16,'Shaxzodjon','Balki',3,'123344556','1234',1,'2021-07-31 04:06:24','2021-09-09 03:23:53','nomalum malum'),(17,'Yangiiiiiiiiii','Foydalanuv',4,'996666666','1234',1,'2021-08-04 05:38:52','2021-08-11 05:28:55','Tanidingmi??'),(18,'','',3,'934502701','2701',1,'2021-08-05 09:45:41','2021-08-05 09:49:08',NULL),(19,'','',3,'999999999','9999',1,'2021-08-10 14:51:25','2021-08-10 14:51:35',NULL),(20,'shahlo','Jumayeva',3,'997023650','1111',1,'2021-08-11 05:49:37','2021-08-11 05:52:03','Safedmo\'y 105'),(21,'','',3,'936831555','1555',1,'2021-08-23 10:39:19','2021-08-23 10:39:28',NULL),(22,'Talaba','Kantrak',3,'111111111','1111',1,'2021-09-06 09:05:14','2021-09-25 08:31:00','BDU'),(23,'','',3,'997023659','1111',1,'2021-09-15 05:59:19',NULL,NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'ecommerce_shop'
--
/*!50003 DROP PROCEDURE IF EXISTS `blok_user` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`admin`@`%` PROCEDURE `blok_user`(
in pid int(6),
in hol int(2)
)
BEGIN

    DECLARE  id_ int ;
	 
    SELECT id into id_ from users WHERE id=pid limit 1;
   
 IF(id_ is not null) THEN 
 update users
	set isActive=hol
	where id=pid;
	select hol as natija;
 else
	
    select 2 natija;
    
 
END IF ;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `cart_edit_insert` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`admin`@`%` PROCEDURE `cart_edit_insert`(
IN pid int(6),
IN puser_id int(6),
IN pproduct_id int(6),
IN pcount int(8),
IN pstatus int(2))
BEGIN
DECLARE prid numeric;
DECLARE uid numeric;
DECLARE tid numeric;
DECLARE nat numeric;
DECLARE pcost decimal(11,2);
declare xcount int(8);

select id INTO prid from product where id=prid and isActive=true ;  
select cost INTO pcost from product where id=prid and isActive=true ;
select count INTO xcount from product where id=prid and isActive=true ;  
select id INTO uid from users where id=puser_id  and isActive=true ;
select id INTO tid from cart where id=pid;
 
  IF(pid is null or pid=0) THEN 
		  if(uid is null)then set nat=3;
		  elseif(prid is null)then set nat=4;
          elseif(xcount<pcount)then set nat=6;else
		  INSERT INTO cart(user_id,product_id,cost,count)
		VALUES(puser_id,pproduct_id,pcost,pcount);
		  set nat=1;  
			end if; 
elseIF(tid is null) THEN  set nat=5;
else
   update  cart set status=pstatus where id=pid ; 
  set nat=2; 
    END IF;
  select nat as natija;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `category_edit_insert` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`admin`@`%` PROCEDURE `category_edit_insert`(
IN pid int(6),
IN nom VARCHAR(255),
IN psub int(6),
IN odam int(6),
IN foiz DECIMAL(10,2),
in hol int(2),
in pisFoiz DECIMAL(10,2)

)
BEGIN
DECLARE tid numeric;
DECLARE nat numeric;
DECLARE subcha numeric;
declare inson int(6);
declare ismi VARCHAR(100);
set nat=0;

  select id INTO tid from category where id=pid ;  
   select id INTO subcha from category where id=psub limit 1; 
 --  select name INTO ismi from category where name=nom ; 
     select id INTO inson from users where id=odam  and isActive=true ; 
 
 
  IF( (pid is null or pid=0) and inson is not null and (subcha is not null or psub=0)) THEN  
  insert into category(name,sub,user_id,percent,isActive,isFoiz) 
  values(nom,psub,odam,foiz,hol,pisFoiz);
  set nat=1;  
    else
    
    IF(tid is not null and inson is not null and (subcha is not null or psub=0)) THEN  
   update  category set name=nom,percent=foiz,isFoiz=pisFoiz where id=pid ; 
  
  set nat=2; 
  elseif(subcha is null) then
  -- sub topilmadi
  set nat=3;
  elseif(inson is null) then
  -- inson topilmadi
  set nat=4;
  else
     set nat=5;
     END IF;
    END IF;
  select nat as natija;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `category_properties_edit_insert` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`admin`@`%` PROCEDURE `category_properties_edit_insert`(
IN pid int(6),
IN nom VARCHAR(255),
IN kateg int(6),
IN tip int(6),
in hol int(2)
)
BEGIN
DECLARE tid numeric;
DECLARE nat numeric;
DECLARE cat numeric;
declare ty int(6);
declare ismi VARCHAR(100);
set nat=0;

  select id INTO cat from category where id=kateg and isActive=true ;  
   select id INTO tid from category_properties where id=pid limit 1; 
     select id INTO ty from `types` where id=tip  and isActive=true ; 
 
 
  IF( tid is null and cat is not null and ty is not null) THEN  
  insert into category_properties(category_id,field_name,type_id,isActive) 
  values(kateg,nom,tip,hol);
  set nat=1;  
    else
    
    IF(tid is not null and cat is not null and ty is not null) THEN  
   update  category_properties set field_name=nom,isActive=hol where id=pid ; 
  
  set nat=2; 
  elseif(cat is null) then
  -- kategoriya topilmadi
  set nat=3;
  elseif(ty is null) then
  -- tip topilmadi
  set nat=4;
  else
     set nat=5;
     END IF;
    END IF;
  select nat as natija;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `change_user` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`admin`@`%` PROCEDURE `change_user`(
IN pid int(6),
IN ism VARCHAR(100),
IN fam VARCHAR(100),
IN ptel VARCHAR(15),
in paddress VARCHAR(255))
BEGIN
DECLARE tid numeric;
DECLARE nat numeric;
declare tele int(6);
set nat=0;

  select id INTO tid from users where id=pid ;  
   select id INTO tele from users where phone=ptel ; 
 
 
  IF(tid is null) THEN  set nat=3;
    elseIF(tele=tid or tele is null) THEN  
   update  users set first_name=ism,last_name=fam,address=paddress,phone=ptel where id=pid ; 
    set nat=2; 
  else
  -- telefon avval mavjud
  set nat=4;
    END IF;
  select nat as natija;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `chatStop` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`admin`@`%` PROCEDURE `chatStop`(

in puser_id int(11)
)
BEGIN
declare tid numeric;
declare nat numeric;
select id INTO tid from users where id=puser_id; 

if(tid is not null ) then
update chats set isNew=0 where user_id=puser_id;
    set nat=1;

else
  set nat=2;
end if;

select nat as natija;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `chat_edit_insert` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`admin`@`%` PROCEDURE `chat_edit_insert`(
in puser_id int(11),
in ptexts mediumtext,
pisAdmin bool
)
BEGIN
declare odam numeric;
declare nat numeric;
select id INTO odam from users where id=puser_id; 

if(odam is not null) then
insert into chats(user_id,texts,isAdmin) values(puser_id,ptexts,1);
    set nat=1;
else
  set nat=2;

end if;

select nat as natija;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `check_product` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`admin`@`%` PROCEDURE `check_product`(
in pid int(6),
in hol int(2),
in admincha int(6),
in izoh varchar(255)
)
BEGIN

    DECLARE  tid int ;
	 
    SELECT id into tid from product WHERE id=pid limit 1;
   
 IF(tid is not null) THEN 
 update product
	set checked=hol
	where id=pid;
    insert into product_check(product_id,checked,admin_id,`comment`) values(tid,hol,admincha,izoh);
	select hol as natija;
 else
	
    select 3 natija;
    
 
END IF ;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `delivered_edit_insert` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`admin`@`%` PROCEDURE `delivered_edit_insert`(
IN pid int(6),
IN pcart_id int(6),
IN pcomments text,
IN pmark int(3),
IN pstatus boolean)
BEGIN
DECLARE cid numeric;
DECLARE tid numeric;
DECLARE nat numeric;

select id INTO tid from delivered where id=pid;
select id INTO cid from cart where id=pcart_id;
 
  IF(pid is null or pid=0) THEN 
		  if(cid is null)then set nat=3;
          else
		INSERT INTO delivered(cart_id,comments,mark,status)
		VALUES(cart_id,comments,mark,true);
		  set nat=1;  
			end if; 
elseIF(tid is null) THEN  set nat=4;
else
   update  delivered set status=pstatus where id=pid ; 
  set nat=2; 
    END IF;
  select nat as natija;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `getPropertiesByCat` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`admin`@`%` PROCEDURE `getPropertiesByCat`(in pid int)
BEGIN
declare tid numeric;
declare cid numeric;
declare x int default 0;
SELECT cp.*,t.name type FROM category_properties cp inner join types t on t.id=cp.type_id
    and t.isActive=1  where cp.category_id=pid;
    
select id into cid from category_properties where category_id=pid  limit x,1;

while cid is not null do
SELECT pp.id,pp.values,count(pp.product_id) count 
    FROM product_properties pp
    where pp.cat_prop_id=cid
    group by pp.values;
set x=x+1,cid=null;
select id into cid from category_properties where category_id=pid  limit x,1;
end while;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `img_del` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`admin`@`%` PROCEDURE `img_del`(
in rasm varchar(255)
)
BEGIN

    DECLARE  id_ int ;
	 
    SELECT id into id_ from product_image WHERE img_url=rasm limit 1;
   
 IF(id_ is not null) THEN 
 update product_image
	set isActive=0
	where img_url=rasm;
	select 1 as natija;
 else
	
    select 2 natija;
    
 
END IF ;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `login_check` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`admin`@`%` PROCEDURE `login_check`(
IN pphone VARCHAR(20), 
IN ppassword VARCHAR(64)
)
BEGIN
  declare nat numeric;
  declare user_id numeric;
  declare prole_id numeric;
    select id into user_id from users where phone=pphone and password=ppassword and isActive=true;

if(user_id is not null) THEN
update  users set actived_on=CURRENT_TIMESTAMP() where id=user_id ; 
      set nat=user_id;
      select role_id into prole_id from users where id=user_id;
    else
    set nat=0;
END IF;
  select nat as natija,prole_id role_id;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `password_edit` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`admin`@`%` PROCEDURE `password_edit`(
IN pid int(6),
IN oldPass VARCHAR(255),
in newPass VARCHAR(255))
BEGIN
DECLARE tid numeric;
DECLARE nat numeric;

  select id INTO tid from users where id=pid and  password=oldPass;  
  IF( tid is null) THEN  set nat=3;
  else
   update  users set password=newPass where id=pid ; 
   set nat=2;  
END IF;
  select nat as natija;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `product_edit_insert` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`admin`@`%` PROCEDURE `product_edit_insert`(
IN pid int(6),
IN nom VARCHAR(255),
IN izoh text, 
IN narx decimal(11,2),
IN son int(8),
IN odam int(6),
in hol bool,
IN xcategory_id int(6),
IN skidka int(3))
BEGIN
DECLARE tid numeric;
DECLARE cid numeric;
DECLARE nat numeric;
declare inson int(6);
set nat=0;

  select id INTO tid from product where id=pid ;  
 select id INTO cid from category where id=xcategory_id;  
     select id INTO inson from users where id=odam  and isActive=true ; 
 
 if(cid is null) then set nat=6; 
  elseIF( (pid is null or pid=0) and inson is not null ) THEN  
  insert into product(`name`,`comment`,cost,count,discount,user_id,isActive,category_id) 
  values(nom,izoh,narx,son,skidka,odam,1,cid);
  set nat=1;  
    else
    
    IF(tid is not null and inson is not null) THEN  
   update  product set `name`=nom,`comment`=izoh,cost=narx,
   count=son,discount=skidka,isActive=hol,category_id=cid where id=pid ; 
  
  set nat=2; 

  elseif(inson is null) then
  -- inson topilmadi
  set nat=3;
  else
     set nat=4;
     END IF;
    END IF;
  select nat as natija;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `product_image` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`admin`@`%` PROCEDURE `product_image`(
in pid int(6),
in prod int(6),
in url varchar(255),
in hol bool
)
BEGIN
declare nat numeric;
declare maxs numeric;
declare tid numeric;

select id into tid from product_image where id=pid;
select id into maxs from product where id=prod and isActive=1;

if((pid is null or pid=0) and maxs is not null) then
	insert into product_image(product_id,img_url,isActive) values(prod,url,hol);
    set nat=1;
elseif(tid is not null  and maxs is not null) then
update product_image set isActive=hol where id=pid;
	set nat=2;   
else	
	set nat=3;
end if;

select nat as natija;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `product_properties_edit_insert` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`admin`@`%` PROCEDURE `product_properties_edit_insert`(
IN pid int(6),
IN prod int(6),
IN xusus int(6),
IN qiymat VARCHAR(255),
in hol bool
)
BEGIN
DECLARE tid numeric;
DECLARE nat numeric;
DECLARE maxs numeric;
declare xus int(6);
set nat=0;

  select id INTO maxs from product where id=prod and isActive=true ;  
   select id INTO xus from category_properties where id=xusus limit 1; 
   select id INTO tid from product_properties where id=pid limit 1;
     
 
 
  IF( (pid is null or pid=0) and maxs is not null and xus is not null) THEN  
  insert into product_properties(product_id,cat_prop_id,`values`,isActive) 
  values(maxs,xus,qiymat,hol);
  set nat=1;  
    else
    
    IF(tid is not null and maxs is not null and xus is not null) THEN  
   update  product_properties set `values`=qiymat,isActive=hol where id=pid ; 
  
  set nat=2; 
  elseif(maxs is null) then
  -- maxsulot topilmadi
  set nat=3;
  elseif(xus is null) then
  -- kat_ xuusiyat topilmadi
  set nat=4;
  else
     set nat=5;
     END IF;
    END IF;
  select nat as natija;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `promokod_checker` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`admin`@`%` PROCEDURE `promokod_checker`(ptoken varchar(10))
BEGIN
declare nat numeric;
declare tid numeric;
declare dt datetime;
declare xcount numeric;

select id into tid from promokod where token=ptoken;
select deadline into dt from promokod where id=tid;
select count into xcount from promokod where id=tid;

if(tid is null) then set nat=3;/* promokod topilmadi */
elseif(dt<now())then set nat=4;/* promokod eskirgan */
elseif(xcount<=0)then set nat=5;/* promokodning qo'llanish miqdori tugagan */
else
select *,date_format(deadline,'%Y-%m-%d, %h:%i:%s') deadline,date_format(created_on,'%Y-%m-%d, %h:%i:%s') created_on from promokod where id=tid;
set nat=1;  
end if;
if(nat!=1) then select 1 as error; end if;
select nat as natija;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `promokod_edit` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`admin`@`%` PROCEDURE `promokod_edit`(
pid int,
pamount DECIMAL(12,2),
in pisFoiz int(1),
in pdeadline datetime,
isDelete boolean
)
BEGIN
declare nat numeric;
declare tid numeric;
declare uid numeric;
select id into tid from promokod where id=pid;
select user_id into uid from promokod where id=tid;

if(tid is null) then set nat=3;
elseif(uid is not null) then set nat=4;
elseif(isDelete=1)then delete from promokod where id=tid; set nat=11;
else
update promokod set isFoiz=pisFoiz,amount=pamount,deadline=pdeadline where id=tid;
	set nat=2;  
end if;

select nat as natija;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `promokod_edit_insert` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`admin`@`%` PROCEDURE `promokod_edit_insert`(
in pid int,
puser_id int,
pamount DECIMAL(12,2),
in pisFoiz int(1),
in pdeadline datetime,
pcount int,
pdescription varchar(255)
)
BEGIN
declare nat numeric;
declare tid numeric;
declare uid numeric;
declare u2id numeric;
declare tk varchar(10) default right(upper(MD5(RAND())),7);

select id into tid from promokod where id=pid;
select id into u2id from users where id=puser_id;

if(pid=0 or pid is null) then
	if(pdeadline<now())then set nat=10;
    elseif(u2id is  null) then set nat=5;
    else
		insert into promokod(token,amount,isFoiz,deadline,count,description,user_id)
		values(tk,pamount,pisFoiz,pdeadline,pcount,pdescription,puser_id);
		set nat=1;
    end if;
elseif(tid is null) then set nat=3;
    else
update promokod set amount=pamount,isFoiz=pisFoiz,count=pcount,description=pdescription,deadline=pdeadline where id=tid;
	set nat=2;  
end if;

select nat as natija,tk token;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `rol_edit_insert` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`admin`@`%` PROCEDURE `rol_edit_insert`(
in pid int(6),
in pname varchar(200),
in hol bool
)
BEGIN
declare nat numeric;
declare tid numeric;

select id into tid from roles where id=pid;

if(pid is null or pid=0) then
	insert into roles(name,isActive) values(pname,hol);
    set nat=1;
elseif(tid is not null) then
update roles set name=pname,isActive=hol where id=pid;
	set nat=2;   
else	
	set nat=3;
end if;

select nat as natija;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `smsAdmin` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`admin`@`%` PROCEDURE `smsAdmin`(in ptexts mediumtext)
BEGIN
declare tid numeric;
declare uid numeric;
declare x int default 0;

select id into uid from users where role_id in (1,2) limit x,1;

while uid is not null do
insert into chats(user_id,texts) values(uid,ptexts);
set x=x+1,uid=null;
select id into uid from users where role_id in (1,2) limit x,1;
end while;

select 1 as natija;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `smsToSalesmen` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`admin`@`%` PROCEDURE `smsToSalesmen`(in ptexts mediumtext)
BEGIN
declare tid numeric;
declare uid numeric;
declare x int default 0;

select id into uid from users where role_id in (4) limit x,1;

while uid is not null do
insert into chats(user_id,texts) values(uid,ptexts);
set x=x+1,uid=null;
select id into uid from users where role_id in (4) limit x,1;
end while;

select 1 as natija;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `status_edit_insert` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`admin`@`%` PROCEDURE `status_edit_insert`(
in pid int(6),
in pname varchar(200),
in hol bool
)
BEGIN
declare nat numeric;
declare tid numeric;

select id into tid from `statuses` where id=pid;

if(pid is null or pid=0) then
	insert into statuses(name,isActive) values(pname,hol);
    set nat=1;
elseif(tid is not null) then
update `statuses` set name=pname,isActive=hol where id=pid;
	set nat=2;   
else	
	set nat=3;
end if;

select nat as natija;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `tag_edit_insert` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`admin`@`%` PROCEDURE `tag_edit_insert`(
in pid int(6),
in pname varchar(200),
in hol bool
)
BEGIN
declare nat numeric;
declare tid numeric;

select id into tid from `tags` where id=pid;

if(pid is null or pid=0) then
	insert into tags(name,isActive) values(pname,hol);
    set nat=1;
elseif(tid is not null) then
update `tags` set name=pname,isActive=hol where id=pid;
	set nat=2;   
else	
	set nat=3;
end if;

select nat as natija;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `type_edit_insert` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`admin`@`%` PROCEDURE `type_edit_insert`(
in pid int(6),
in pname varchar(200),
in hol bool
)
BEGIN
declare nat numeric;
declare tid numeric;

select id into tid from `types` where id=pid;

if(pid is null or pid=0) then
	insert into types(name,isActive) values(pname,hol);
    set nat=1;
elseif(tid is not null) then
update `types` set name=pname,isActive=hol where id=pid;
	set nat=2;   
else	
	set nat=3;
end if;

select nat as natija;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `user_edit_insert` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`admin`@`%` PROCEDURE `user_edit_insert`(
IN pid int(6),
IN prol int(6),
IN ism VARCHAR(100),
IN fam VARCHAR(100),
IN ptel VARCHAR(15),
IN pparol VARCHAR(255),
in paddress VARCHAR(255))
BEGIN
DECLARE tid numeric;
DECLARE nat numeric;
DECLARE rol_ numeric;
declare tele int(6);
declare nomer VARCHAR(100);
set nat=0;

  select id INTO tid from users where id=pid ;  
   select id INTO tele from users where phone=ptel ; 
   select phone INTO nomer from users where phone=ptel ; 
  select id INTO rol_ from roles where id=prol  and isActive=true ; 
 
 
  IF( tid is null and tele is null and rol_ is not null) THEN  
  insert into users(first_name,last_name,role_id,phone,password) values(ism,fam,prol,ptel,pparol);
  set nat=1;  
    else
    
    IF(tid is not null) THEN  
   update  users set first_name=ism,last_name=fam,address=paddress where id=pid ; 
  
  set nat=2; 
  elseif(rol_ is null) then
  -- rol topilmadi
  set nat=3;
  elseif(tele is not null) then
  -- telefon avval mavjud
  set nat=4;
  else
     set nat=5;
     END IF;
    END IF;
  select nat as natija;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `user_role_edit` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`admin`@`%` PROCEDURE `user_role_edit`(
IN pid int(6),
IN prol int(6),
holat bool)
BEGIN
DECLARE tid numeric;
DECLARE nat numeric;
DECLARE rol_ numeric;

  select id INTO tid from users where id=pid ;
  select id INTO rol_ from roles where id=prol  and isActive=true and prol!=1 ; 
 
  IF(tid is null)then
  set nat=3;
  elseif(rol_ is null) then set nat=4;
  else
    update  users set role_id=rol_,isActive=holat where id=pid ; 
    set nat=2; 
   END IF;
  select nat as natija;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `use_promokod` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`admin`@`%` PROCEDURE `use_promokod`(
ptoken varchar(10),
porder_id int,
pamount DECIMAL(12,2),
in pisFoiz int(1),
in pdeadline datetime,
pcount int,
pdescription varchar(255)
)
BEGIN
declare nat numeric;
declare tid numeric;
declare uid numeric;
declare oid numeric;

select id into tid from promokod where token=ptoken;
select id into oid from orders where id=puser_id;

if(pid=0 or pid is null) then
	if(pdeadline<now())then set nat=10;
    elseif(u2id is  null) then set nat=5;
    else
		insert into promokod(token,amount,isFoiz,deadline,count,description,user_id)
		values(tk,pamount,pisFoiz,pdeadline,pcount,pdescription,puser_id);
		set nat=1;
    end if;
elseif(tid is null) then set nat=3;
    else
update promokod set amount=pamount,isFoiz=pisFoiz,count=pcount,description=pdescription,deadline=pdeadline where id=tid;
	set nat=2;  
end if;

select nat as natija,tk token;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-09-25 19:23:36
