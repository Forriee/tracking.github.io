-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 20, 2022 at 03:18 AM
-- Server version: 10.4.21-MariaDB
-- PHP Version: 8.0.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `equip`
--

-- --------------------------------------------------------

--
-- Table structure for table `doctor`
--

CREATE TABLE `doctor` (
  `Doctor_id` varchar(100) NOT NULL,
  `Fname` varchar(125) NOT NULL,
  `Mname` varchar(125) DEFAULT NULL,
  `Lname` varchar(125) NOT NULL,
  `Email` varchar(125) NOT NULL,
  `Pass` varchar(100) NOT NULL,
  `Gender` varchar(20) NOT NULL,
  `Specialization` varchar(40) NOT NULL,
  `Consultation_fee` int(11) DEFAULT NULL,
  `Verified` tinyint(1) DEFAULT 0,
  `Licensed` varchar(50) DEFAULT NULL,
  `Signature` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `doctor`
--

INSERT INTO `doctor` (`Doctor_id`, `Fname`, `Mname`, `Lname`, `Email`, `Pass`, `Gender`, `Specialization`, `Consultation_fee`, `Verified`, `Licensed`, `Signature`) VALUES
('a55ffa84-f41b-4870-bf5c-532ae1a8a80c', 'John', 'M', 'Doe', 'admin', '$2b$10$/0gyySLgStJvsfvfkQOYk.SZCHOr6ZflNIQfhr.ALhT32xUn4FNPy', '', 'Surgeon', NULL, 0, '234123', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `hadmin`
--

CREATE TABLE `hadmin` (
  `Admin_id` varchar(37) NOT NULL,
  `Fname` varchar(125) NOT NULL,
  `Mname` varchar(125) DEFAULT NULL,
  `Lname` varchar(125) NOT NULL,
  `Email` varchar(125) NOT NULL,
  `Pass` varchar(125) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `hadmin`
--

INSERT INTO `hadmin` (`Admin_id`, `Fname`, `Mname`, `Lname`, `Email`, `Pass`) VALUES
('e2937722-7238-43eb-ad1c-5fc48847a51e', 'Marlo', 'M', 'Aquino', 'admin@gmail.com', '$2b$10$39R2bPBuNL8JaXo4fFSrUe3qsdIfpS8Aic.LhX4Vd.cqir9M0wpuq');

-- --------------------------------------------------------

--
-- Table structure for table `item`
--

CREATE TABLE `item` (
  `Item_id` varchar(50) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `brand` varchar(100) DEFAULT NULL,
  `cond` varchar(100) DEFAULT NULL,
  `price` varchar(100) DEFAULT NULL,
  `location` varchar(100) DEFAULT NULL,
  `lifespan` varchar(100) DEFAULT NULL,
  `Not_pending` tinyint(1) NOT NULL DEFAULT 0,
  `Doctor_id` varchar(37) DEFAULT NULL,
  `Appointment_Time` datetime DEFAULT NULL,
  `Maintenance` tinyint(1) NOT NULL DEFAULT 0,
  `image` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `item`
--

INSERT INTO `item` (`Item_id`, `name`, `brand`, `cond`, `price`, `location`, `lifespan`, `Not_pending`, `Doctor_id`, `Appointment_Time`, `Maintenance`, `image`) VALUES
('febe3787-d5d6-400e-94f1-688e39c0e389', 'Node', 'local', 'good', '2022-01-14', 'instructor', '2022-01-14', 1, 'a55ffa84-f41b-4870-bf5c-532ae1a8a80c', '2022-01-19 18:27:00', 1, NULL),
('46a97dc5-1c54-43b2-aa59-085f7c2a631e', 'Node', 'local', 'good', '2022-01-13', 'Instructor', '2022-01-13', 0, 'a55ffa84-f41b-4870-bf5c-532ae1a8a80c', '2022-01-12 14:26:45', 1, NULL),
('0ba07176-dcc6-4da4-abd8-4eb692b6c61a', 'Screen', 'local', 'good', '2022-01-15', 'Instructor', '2022-01-21', 0, NULL, NULL, 0, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `patient`
--

CREATE TABLE `patient` (
  `Patient_id` varchar(37) NOT NULL,
  `username` varchar(125) NOT NULL,
  `password` varchar(50) NOT NULL,
  `name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int(10) UNSIGNED NOT NULL,
  `data` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`session_id`, `expires`, `data`) VALUES
('C56YDJmnwP4v0TQc0a5u7BAj-sctSdRJ', 1642690802, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2022-01-20T15:00:01.530Z\",\"httpOnly\":true,\"path\":\"/\"},\"flash\":{},\"passport\":{\"user\":{\"Doctor_id\":\"a55ffa84-f41b-4870-bf5c-532ae1a8a80c\"}}}'),
('drs-ZVGpgns8uvJ_UtyVhyCTuSqhLBLF', 1642665724, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2022-01-20T08:01:50.835Z\",\"httpOnly\":true,\"path\":\"/\"},\"flash\":{},\"passport\":{\"user\":{\"Doctor_id\":\"a55ffa84-f41b-4870-bf5c-532ae1a8a80c\"}}}'),
('jdbycWdPX8n5RjAzC94DL1KxjhvN0mrS', 1642695256, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2022-01-20T16:14:04.146Z\",\"httpOnly\":true,\"path\":\"/\"},\"flash\":{},\"passport\":{\"user\":{\"Doctor_id\":\"a55ffa84-f41b-4870-bf5c-532ae1a8a80c\"}}}');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `doctor`
--
ALTER TABLE `doctor`
  ADD PRIMARY KEY (`Doctor_id`),
  ADD UNIQUE KEY `Email` (`Email`);

--
-- Indexes for table `hadmin`
--
ALTER TABLE `hadmin`
  ADD PRIMARY KEY (`Admin_id`),
  ADD UNIQUE KEY `Email` (`Email`);

--
-- Indexes for table `patient`
--
ALTER TABLE `patient`
  ADD PRIMARY KEY (`username`),
  ADD UNIQUE KEY `Email` (`username`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`session_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
