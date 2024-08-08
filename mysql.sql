-- ilcs.todo definition

CREATE TABLE `todo` (
  `ID` int unsigned NOT NULL AUTO_INCREMENT,
  `unique_id` varchar(40) NOT NULL,
  `title` varchar(100) NOT NULL,
  `description` varchar(1000) NOT NULL,
  `status` varchar(10) NOT NULL,
  `createdAt` varchar(31) DEFAULT NULL,
  `updatedAt` varchar(31) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `unique_id_UNIQUE` (`unique_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;