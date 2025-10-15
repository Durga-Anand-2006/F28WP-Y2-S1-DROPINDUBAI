-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 15, 2025 at 12:17 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `bookingsystemdb`
--

-- --------------------------------------------------------

--
-- Table structure for table `attractions`
--

CREATE TABLE `attractions` (
  `ID` int(11) NOT NULL,
  `Name` varchar(100) NOT NULL,
  `Description` text DEFAULT NULL,
  `Location` varchar(150) DEFAULT NULL,
  `Rating` decimal(2,1) DEFAULT NULL,
  `Price` decimal(6,2) DEFAULT NULL,
  `Category` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `attractions`
--

INSERT INTO `attractions` (`ID`, `Name`, `Description`, `Location`, `Rating`, `Price`, `Category`) VALUES
(1, 'Museum of the Future', 'Immersive exhibits on science, tech and future scenarios; iconic torus-shaped building', 'Jumeirah / Emirates Towers', 4.7, 159.00, 'Museum'),
(2, 'At The Top, Burj Khalifa', 'Observation deck with panoramic city and desert views; indoor + outdoor terraces', 'Burj Khalifa, Downtown Dubai', 4.7, 259.00, 'Sightseeing'),
(3, 'Dubai Aquarium & Underwater Zoo', 'Massive indoor aquarium with a walk-through tunnel and underwater zoo exhibits', 'The Dubai Mall, Downtown Dubai', 4.6, 199.00, 'Zoo'),
(4, 'IMG Worlds of Adventure', 'Huge indoor theme park with zones themed to Marvel, Cartoon Network and more', 'City of Arabia', 4.5, 365.00, 'Theme park'),
(5, 'Motiongate Dubai', 'Hollywood-themed theme park with rides and live shows', 'Dubai Parks & Resorts, Jebel Ali', 4.4, 275.00, 'Theme park'),
(6, 'Aquaventure Waterpark', 'Large waterpark with slides, private beach and shark lagoon experiences', 'Atlantis The Palm, Palm Jumeirah', 4.6, 320.00, 'Theme park'),
(7, 'Ski Dubai', 'Indoor snow park offering ski slopes, tobogganing and penguin encounters', 'Mall of the Emirates', 4.5, 220.00, 'Theme park'),
(8, 'Dubai Miracle Garden', 'Seasonal massive themed flower displays and sculptural floral installations', 'Al Barsha South', 4.6, 55.00, 'Sightseeing'),
(9, 'Dubai Frame', 'Giant picture-frame landmark with observation gallery linking old/new Dubai views', 'Zabeel Park', 4.3, 50.00, 'Sightseeing'),
(10, 'The Green Planet', 'Bio-dome rainforest with tropical flora, fauna and interactive exhibits', 'City Walk', 4.4, 100.00, 'Zoo');

-- --------------------------------------------------------

--
-- Table structure for table `events`
--

CREATE TABLE `events` (
  `ID` int(11) NOT NULL,
  `Name` varchar(100) NOT NULL,
  `Description` text DEFAULT NULL,
  `Location` varchar(150) DEFAULT NULL,
  `Start_Date` date DEFAULT NULL,
  `End_Date` date DEFAULT NULL,
  `Price` varchar(50) DEFAULT NULL,
  `Category` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `events`
--

INSERT INTO `events` (`ID`, `Name`, `Description`, `Location`, `Start_Date`, `End_Date`, `Price`, `Category`) VALUES
(1, 'UNTOLD Dubai', 'Mega electronic music festival with international DJs', 'Dubai Parks & Resorts', '2025-11-06', '2025-11-09', '475+', 'Festival'),
(2, 'Dubai Design Week 2025', 'Showcasing architecture, installations, design talks & exhibitions', 'Dubai Design District (d3)', '2025-11-04', '2025-11-09', 'Free', 'Festival'),
(3, 'Al Habtoor Tennis Challenge 2025', 'Women\'s professional tennis tournament', 'Al Habtoor Grand Resort', '2025-12-01', '2025-12-07', '100+', 'Sports'),
(4, 'Global Village - Season 30', 'Year-long multicultural festival with live performances, rides, food & pavilions', 'Dubailand, Dubai', '2025-10-15', '2026-05-10', '25-30', 'Festival'),
(5, 'Dubai Fitness Challenge 2025', 'Month-long community fitness & sports events', 'Across Dubai (various venues)', '2025-11-01', '2025-11-30', 'Free', 'Sports'),
(6, 'Dubai Marathon (25th Edition)', 'International road race with elite athletes & public participation', 'Umm Sequim / Jumeirah Beach', '2026-02-01', '2026-02-01', '500', 'Sports'),
(7, 'Dubai Basketball vs Olympiacos & Real Madrid', 'Euroleague basketball matches', 'Coca-Cola Arena', '2026-02-03', '2026-02-05', '125+', 'Sports'),
(8, 'Dubai Open Swimming Championship', 'Competitive swimming competition for regional & international athletes', 'Hamdan Sports Complex', '2026-02-06', '2026-02-08', '90+', 'Sports'),
(9, 'World Sports Summit 2025', 'Gathering of sports industry leaders, athletes & experts to discuss future of sports', 'Madinat Jumeirah, Dubai', '2025-12-29', '2025-12-30', '125+', 'Sports'),
(10, 'Dubai Shopping Festival', 'Mega retail & entertainment festival with massive discounts, nightly fireworks & drone shows', 'Dubai (various malls + outdoor venues)', '2025-12-05', '2026-01-11', 'Free', 'Festival');

-- --------------------------------------------------------

--
-- Table structure for table `hotels`
--

CREATE TABLE `hotels` (
  `ID` int(11) NOT NULL,
  `Name` varchar(100) NOT NULL,
  `Room_Type` varchar(20) NOT NULL,
  `Description` text DEFAULT NULL,
  `Location` varchar(150) DEFAULT NULL,
  `Price_Per_Night` decimal(10,2) DEFAULT NULL,
  `Stars` varchar(10) DEFAULT NULL,
  `Capacity` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `hotels`
--

INSERT INTO `hotels` (`ID`, `Name`, `Room_Type`, `Description`, `Location`, `Price_Per_Night`, `Stars`, `Capacity`) VALUES
(1, 'Burj Al Arab', 'Double', 'Spacious double room with luxury amenities and Gulf view', 'Jumeirah Beach, Dubai', 4000.00, '*****', '3 people'),
(2, 'Atlantis The Palm', 'Suite', 'Luxury suite with private balcony and full Gulf view', 'Palm Jumeirah, Dubai', 6000.00, '*****', '4 adults, 2 children'),
(3, 'The Ritz-Carlton', 'Double', 'Spacious double room with balcony and partial sea view', 'JBR, Dubai', 2200.00, '****', '2 adults, 1 child'),
(3, 'The Ritz-Carlton', 'Single', 'Elegant single room near JBR beach with luxurious amenities', 'JBR, Dubai', 1200.00, '****', '1 adult'),
(4, 'Address Downtown', 'Double', 'Comfortable double room with Burj Khalifa view', 'Downtown Dubai', 2400.00, '*****', '2 adults, 1 child'),
(4, 'Address Downtown', 'Suite', 'Luxurious suite with living area and skyline view', 'Downtown Dubai', 5000.00, '****', '4 adults, 2 children'),
(5, 'Jumeirah Beach Hotel', 'Suite', 'Luxury suite with balcony and full sea view', 'Jumeirah Beach, Dubai', 5500.00, '*****', '4 adults, 2 children'),
(6, 'Palace Downtown', 'Suite', 'Luxury suite with living area and fountain views', 'Downtown Dubai', 5200.00, '*****', '4 adults, 2 children'),
(7, 'Rove Downtown', 'Single', 'Modern budget-friendly single room in Downtown Dubai', 'Downtown Dubai', 500.00, '***', '1 adult'),
(8, 'Rove Downtown', 'Double', 'Cozy double room with modern amenities', 'Downtown Dubai', 900.00, '***', '2 adults'),
(9, 'Waldorf Astoria', 'Suite', 'Luxurious suite with full sea view and private balcony', 'Palm Jumeirah, Dubai', 7000.00, '*****', '4 adults, 2 children'),
(10, 'Waldorf Astoria', 'Single', 'Elegant single room with premium amenities', 'Palm Jumeirah, Dubai', 2000.00, '****', '1 adult');

-- --------------------------------------------------------

--
-- Table structure for table `restaurants`
--

CREATE TABLE `restaurants` (
  `ID` int(11) NOT NULL,
  `Name` varchar(100) NOT NULL,
  `Description` text DEFAULT NULL,
  `Location` varchar(150) DEFAULT NULL,
  `Cuisine` varchar(50) DEFAULT NULL,
  `Price_Range` varchar(50) DEFAULT NULL,
  `Rating` decimal(2,1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `restaurants`
--

INSERT INTO `restaurants` (`ID`, `Name`, `Description`, `Location`, `Cuisine`, `Price_Range`, `Rating`) VALUES
(1, 'Ossiano', 'Luxurious underwater restaurant offering refined French seafood dishes', 'Atlantis, The Palm', 'European, Seafood', '250', 5.0),
(2, 'Zuma Dubai', 'Trendy urban Japanese dining with lively izakaya vibes', 'DIFC', 'Japanese', '200', 4.2),
(3, 'Nobu', 'World-famous restaurant blending Japanese flavors with modern innovation', 'Atlantis, Palm Jumeirah', 'Japanese', '350', 3.8),
(4, 'Fi\'lia', 'Female-led Italian restaurant with homestyle cooking and skyline views', 'SLS Dubai Hotel, Business Bay', 'Italian', '250-400', 4.5),
(5, 'Al Nafoorah', 'Luxurious Lebanese dining experience featuring rich Middle Eastern flavors', 'Jumeirah Al Naseem, Madinat Jumeirah', 'Lebanese', '300-500', 4.8),
(6, 'The Meat Co', 'Upscale steakhouse offering premium cuts and African-inspired cuisine', 'Souk Al Bahar, Downtown Dubai', 'Steakhouse', '300-600', 3.6),
(7, 'Pierchic', 'Iconic overwater restaurant serving gourmet seafood with panoramic views', 'Al Qasr, Madinat Jumeirah', 'Seafood', '400+', 5.0),
(8, 'High Joint', 'Small burger joint crafting gourmet burgers with creative toppings', 'Motor City', 'American', '50-100', 3.5),
(9, 'Sticky Rice', 'Family-run Thai eatery serving authentic street-style dishes', 'Jumeirah Lake Towers', 'Thai', '40-100', 4.7),
(10, 'LLLA Wood-fired Taqueria', 'Artisanal Mexican taqueria using locally sourced seasonal produce', 'Al Wasi Road', 'Mexican', '150-300', 4.8);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `attractions`
--
ALTER TABLE `attractions`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `events`
--
ALTER TABLE `events`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `hotels`
--
ALTER TABLE `hotels`
  ADD PRIMARY KEY (`ID`,`Room_Type`);

--
-- Indexes for table `restaurants`
--
ALTER TABLE `restaurants`
  ADD PRIMARY KEY (`ID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
