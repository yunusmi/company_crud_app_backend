-- MySQL dump 10.13  Distrib 8.0.35, for Linux (x86_64)
--
-- Host: localhost    Database: company
-- ------------------------------------------------------
-- Server version	8.0.35-0ubuntu0.22.04.1

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
-- Table structure for table `Branches`
--

DROP TABLE IF EXISTS `Branches`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Branches` (
  `branch_id` int NOT NULL AUTO_INCREMENT,
  `branch_name` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`branch_id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Branches`
--

LOCK TABLES `Branches` WRITE;
/*!40000 ALTER TABLE `Branches` DISABLE KEYS */;
INSERT INTO `Branches` VALUES (1,'Филиал 1'),(2,'Филиал 2'),(3,'Филиал 3'),(4,'Филиал 4'),(5,'Филиал 5'),(12,'Филиал 6'),(13,'Филиал 7');
/*!40000 ALTER TABLE `Branches` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Employees`
--

DROP TABLE IF EXISTS `Employees`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Employees` (
  `employee_id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(50) DEFAULT NULL,
  `last_name` varchar(50) DEFAULT NULL,
  `branch_id` int DEFAULT NULL,
  PRIMARY KEY (`employee_id`)
) ENGINE=InnoDB AUTO_INCREMENT=66 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Employees`
--

LOCK TABLES `Employees` WRITE;
/*!40000 ALTER TABLE `Employees` DISABLE KEYS */;
INSERT INTO `Employees` VALUES (24,'Вероника','Стасчук',1),(25,'Влада','Кириенко',1),(27,'Юнус','Ашыров',5),(28,'Марина','Светлакова',1),(29,'Алина','Светлакова',1),(30,'Сергей','Алексеев',1),(31,'Александра','Минина',2),(32,'Тельман','Гасанов',2),(33,'Диана','Сергеенко',2),(34,'Екатерина','Мельникова',2),(35,'Илона','Минаева',3),(36,'Анна','Ткаченко',3),(37,'Анастасия','Светлакова',4),(42,'Алина','Михалкова',3),(44,'Сергей','Петросов',3),(45,'София','Станиславова',3),(46,'Арсен','Вартанянц',4),(47,'Сергей','Топунков',4),(48,'Павел','Каньшин',4),(49,'Степана','Кириенко',4),(50,'Александра','Якименко',4),(51,'Елизваета','Щенкова',5),(52,'Андре','Станиславич',5),(53,'Владилен','Минин',5),(54,'Евгения','Якименко',5),(55,'Кирилл','Владов',5),(56,'Евгений','Габаренков',12),(57,'Иван','Иванов',12),(58,'Николай','Петровский',12),(59,'Глеб','Шарапов',12),(60,'Зинаида','Орлова',12),(61,'Владислава','Фролова',12),(63,'Сусанна','Григорянц',12),(64,'Александр','Эчушин',2),(65,'Владимир','Степанянц',4);
/*!40000 ALTER TABLE `Employees` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Inventory`
--

DROP TABLE IF EXISTS `Inventory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Inventory` (
  `inventory_id` int NOT NULL AUTO_INCREMENT,
  `product_id` int DEFAULT NULL,
  `quantity_in_stock` int DEFAULT NULL,
  PRIMARY KEY (`inventory_id`)
) ENGINE=InnoDB AUTO_INCREMENT=71 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Inventory`
--

LOCK TABLES `Inventory` WRITE;
/*!40000 ALTER TABLE `Inventory` DISABLE KEYS */;
INSERT INTO `Inventory` VALUES (38,50,180),(39,51,200),(40,52,200),(41,53,500),(42,54,300),(43,55,100),(44,56,180),(45,57,5),(46,58,500),(47,59,100),(48,60,150),(49,61,400),(50,62,200),(51,63,500),(52,64,400),(53,65,500),(54,66,170),(55,67,150),(56,68,50),(57,69,5),(58,70,5),(59,71,50),(60,72,200),(61,73,500),(62,74,400),(63,75,900),(64,76,600),(65,77,50),(66,78,45),(67,79,20),(68,80,500),(69,81,20),(70,82,6);
/*!40000 ALTER TABLE `Inventory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Products`
--

DROP TABLE IF EXISTS `Products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Products` (
  `product_id` int NOT NULL AUTO_INCREMENT,
  `product_name` varchar(100) DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `branch_id` int DEFAULT NULL,
  PRIMARY KEY (`product_id`)
) ENGINE=InnoDB AUTO_INCREMENT=83 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Products`
--

LOCK TABLES `Products` WRITE;
/*!40000 ALTER TABLE `Products` DISABLE KEYS */;
INSERT INTO `Products` VALUES (50,'Полотенце для кухни',250.00,1),(51,'Чайник',500.00,1),(52,'Чашки (5 шт./упаковка)',2500.00,1),(54,'Ножи (5 шт./кор)',1000.00,1),(55,'Вилки (5 шт./кор)',1000.00,1),(56,'Тарелки (10 шт./упаковка)',2000.00,1),(57,'Мангал',5000.00,1),(58,'Огурцы (1 кг.)',200.00,2),(59,'Помидоры (1 кг.)',250.00,2),(60,'Грибы (500 гр.)',500.00,2),(61,'Болгарский перец (1 кг.)',150.00,2),(62,'Шоколад',500.00,3),(63,'Печенье',200.00,3),(64,'Энергетические батончики',300.00,3),(65,'Сникерсы',600.00,3),(66,'шоколад марки \"Белисимо\"',1200.00,3),(67,'Французское вино (0,5 л.)',750.00,3),(68,'Стол для кухни',5000.00,4),(69,'Диван',2000.00,4),(70,'Мебель для дома',10000.00,4),(71,'Матрас для спальни',1500.00,4),(72,'Апельсиновый сок (1 л.)',500.00,5),(73,'Сок марки \"Добрый\" яблочный',500.00,5),(74,'Сок марки \"Добрый\" кокосовый',550.00,5),(75,'Сок марки \"Добрый\" мультифрукт',600.00,5),(76,'Ананасовый сок (микс) 1 уп.',350.00,5),(77,'Майка',500.00,12),(78,'Спортивки (коллекция)',3000.00,12),(79,'Худи (мерч бренда)',5000.00,12),(80,'Кепка',200.00,12),(81,'Одеяло',500.00,4),(82,'Кружка стеклянная',150.00,4);
/*!40000 ALTER TABLE `Products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Sales`
--

DROP TABLE IF EXISTS `Sales`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Sales` (
  `sale_id` int NOT NULL AUTO_INCREMENT,
  `product_id` int DEFAULT NULL,
  `employee_id` int DEFAULT NULL,
  `sale_date` varchar(50) DEFAULT NULL,
  `quantity` int DEFAULT NULL,
  PRIMARY KEY (`sale_id`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Sales`
--

LOCK TABLES `Sales` WRITE;
/*!40000 ALTER TABLE `Sales` DISABLE KEYS */;
INSERT INTO `Sales` VALUES (23,60,55,'2023-10-22',50),(24,50,24,'2023-02-20',20),(25,56,25,'2020-02-22',35),(26,67,35,'2023-10-12',50),(27,66,45,'2023-11-04',15),(28,78,55,'2023-09-25',5),(29,82,64,'2023-10-23',4),(30,60,27,'2023-10-27',100);
/*!40000 ALTER TABLE `Sales` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `UpdateInventoryAfterSale` AFTER INSERT ON `Sales` FOR EACH ROW BEGIN
    UPDATE Inventory
    SET quantity_in_stock = quantity_in_stock - NEW.quantity
    WHERE product_id = NEW.product_id;
END */;;
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

-- Dump completed on 2023-11-20 13:23:15
