-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 05, 2024 at 04:11 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `basketball`
--

DELIMITER $$
--
-- Procedures
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `gemeResultSp` ()   BEGIN
SELECT
	g.gameId,
    g.gameDate,
    homeTeam.teamName AS homeTeam,
    g.scoreHomeTeam,
    awayTeam.teamName AS awayTeam,
    g.scoreAwayTeam
FROM
    games g
JOIN
    teams homeTeam ON g.homeTeamId = homeTeam.teamId
JOIN
    teams awayTeam ON g.awayTeamId = awayTeam.teamId;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `getCoachingStaffSp` ()   BEGIN
SELECT
    cs.staffId,
    t.teamName 'Team Name',
    u.username  'Coach username',
    cs.staffRole 'Staff Role'
FROM
    coaching_staff cs
JOIN
    teams t ON cs.teamId = t.teamId
JOIN
    users u ON cs.coachId = u.userId;

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `getTeamStandingSp` ()   BEGIN
SELECT
    ts.standingId,
    t.teamName,
    ts.seasonYear,
    ts.wins,
    ts.losses,
    ts.ties
FROM
    team_standings ts
JOIN
    teams t ON ts.teamId = t.teamId;

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `getUserAuthority` (IN `_userId` VARCHAR(14) CHARSET utf8)   BEGIN
SELECT category.id category_id, category.categoryName, category.categoryRole,
links.id, links.linkName 
FROM user_authority left JOIN links 
on user_authority.action = links.id LEFT JOIN category
on links.categoryId = category.id
WHERE user_authority.userId = _userId ORDER BY category.categoryRole, links.id;

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `getuserMenu` (IN `_userId` VARCHAR(11) CHARSET utf8)   BEGIN
SELECT category.id category_id, category.categoryName, category.categoryIcon, category.categoryRole,
links.id, links.linkName, links.link  
FROM user_authority left JOIN links 
on user_authority.action = links.id LEFT JOIN category
on links.categoryId = category.id
WHERE user_authority.userId = _userId GROUP BY links.id ORDER BY category.categoryRole, links.id;


END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `injuriesPlayersSp` ()   BEGIN
SELECT
    i.injuryId,
    p.playerName,
    p.image,
    i.injuryType,
    i.injuryDate,
    i.recoveryTime
FROM
    injuries i
JOIN
    players p ON i.playerId = p.playerId;

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `loginUserSp` (IN `_username` VARCHAR(11) CHARSET utf8, IN `_password` VARCHAR(11) CHARSET utf8)   BEGIN
    IF EXISTS (SELECT * FROM users WHERE users.username = _username AND users.password = _password) THEN
        IF EXISTS (SELECT * FROM users WHERE users.username = _username AND users.status = 'Active') THEN
        SELECT * FROM users WHERE users.username = _username;
        ELSE
            SELECT 'locked' as message;
        END IF;
    ELSE
        SELECT 'Deny' as message;
    END IF;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `playerContractsSp` ()   BEGIN
SELECT
    pc.contractId,
    p.playerName,
    p.image,
    pc.startDate,
    pc.endDate,
    pc.salary
FROM
    player_contracts pc
JOIN
    players p ON pc.playerId = p.playerId;


END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `playerStatsSp` ()   BEGIN
SELECT
    p.playerId,
    p.playerName,
    p.image,
    s.pointsScored,
    s.rebounds,
    s.assists,
    s.steals,
    s.blocks
FROM
    players p
JOIN
    stats s ON p.playerId = s.playerId;

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `scheduleReportSp` ()   BEGIN
SELECT
	g.gameId,
    g.gameDate,
    homeTeam.teamName AS homeTeam,
    g.scoreHomeTeam,
    awayTeam.teamName AS awayTeam,
    g.scoreAwayTeam
FROM
    games g
JOIN
    teams homeTeam ON g.homeTeamId = homeTeam.teamId
JOIN
    teams awayTeam ON g.awayTeamId = awayTeam.teamId;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `teamStatsSp` ()   BEGIN
SELECT
    t.teamId,
    t.teamName,
    SUM(s.pointsScored) AS totalPoints,
    SUM(s.rebounds) AS totalRebounds,
    SUM(s.assists) AS totalAssists,
    SUM(s.steals) AS totalSteals,
    SUM(s.blocks) AS totalBlocks
FROM
    teams t
JOIN
    players p ON t.teamId = p.teamId
JOIN
    stats s ON p.playerId = s.playerId
GROUP BY
    t.teamId;

END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `id` int(11) NOT NULL,
  `categoryName` varchar(250) NOT NULL,
  `categoryIcon` varchar(250) NOT NULL,
  `categoryRole` varchar(250) NOT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`id`, `categoryName`, `categoryIcon`, `categoryRole`, `date`) VALUES
(1, 'Dashboard', 'fa fa-home', 'Dashboard', '2023-12-29 07:38:44'),
(2, 'Subscriber', 'fa-solid fa-box', 'Subscriber', '2023-12-29 07:39:05'),
(3, 'Super Admin', 'fa fa-lock', 'Super Admin', '2023-12-29 07:41:13'),
(4, 'Reports', 'fa fa-bar-chart', 'Reports', '2023-12-29 07:42:18');

-- --------------------------------------------------------

--
-- Table structure for table `coaching_staff`
--

CREATE TABLE `coaching_staff` (
  `staffId` int(11) NOT NULL,
  `teamId` int(11) DEFAULT NULL,
  `coachId` varchar(20) DEFAULT NULL,
  `staffRole` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `coaching_staff`
--

INSERT INTO `coaching_staff` (`staffId`, `teamId`, `coachId`, `staffRole`) VALUES
(1, 1, 'USR003', 'Head Coach'),
(2, 2, 'USR002', 'Assitant Coach'),
(3, 1, 'USR003', 'Shooting Coach'),
(4, 5, 'USR005', 'Doctor Coach');

-- --------------------------------------------------------

--
-- Table structure for table `games`
--

CREATE TABLE `games` (
  `gameId` int(11) NOT NULL,
  `homeTeamId` int(11) DEFAULT NULL,
  `awayTeamId` int(11) DEFAULT NULL,
  `gameDate` date DEFAULT NULL,
  `result` varchar(50) DEFAULT NULL,
  `scoreHomeTeam` int(11) DEFAULT NULL,
  `scoreAwayTeam` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `games`
--

INSERT INTO `games` (`gameId`, `homeTeamId`, `awayTeamId`, `gameDate`, `result`, `scoreHomeTeam`, `scoreAwayTeam`) VALUES
(1, 1, 2, '2023-12-22', 'win', 1, 1),
(2, 5, 6, '2023-12-21', 'loss', 2, 3),
(3, 6, 5, '2024-01-04', 'win', 4, 4),
(4, 5, 6, '2024-01-12', 'win', 3, 2),
(5, 6, 10, '2024-01-06', 'draw', 0, 0),
(6, 10, 12, '2024-01-05', 'loss', 1, 3);

-- --------------------------------------------------------

--
-- Table structure for table `injuries`
--

CREATE TABLE `injuries` (
  `injuryId` int(11) NOT NULL,
  `playerId` varchar(20) DEFAULT NULL,
  `injuryType` varchar(100) DEFAULT NULL,
  `injuryDate` date DEFAULT NULL,
  `recoveryTime` varchar(250) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `injuries`
--

INSERT INTO `injuries` (`injuryId`, `playerId`, `injuryType`, `injuryDate`, `recoveryTime`) VALUES
(1, 'PRL001', 'hand Injury', '2023-12-22', 'beg Jan 2024'),
(2, 'PRL002', 'Leg Injury', '2023-12-23', 'mid Feb 2024'),
(3, 'PRL003', 'Muscle Injury', '2024-01-02', 'mid Feb 2024');

-- --------------------------------------------------------

--
-- Table structure for table `links`
--

CREATE TABLE `links` (
  `id` int(11) NOT NULL,
  `linkName` varchar(255) NOT NULL,
  `link` varchar(250) DEFAULT NULL,
  `categoryId` int(11) DEFAULT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `links`
--

INSERT INTO `links` (`id`, `linkName`, `link`, `categoryId`, `date`) VALUES
(1, 'Dashboard', 'dashboard.php', 1, '2023-12-26 05:53:45'),
(2, 'Coach Staff ', 'coachingStaff.php', 2, '2023-12-26 05:55:02'),
(3, 'Game', 'game.php', 2, '2023-12-26 05:55:17'),
(4, 'Injuries', 'injuries.php', 2, '2023-12-26 05:55:30'),
(5, 'Schedule', 'schedule.php', 2, '2023-12-26 05:56:05'),
(6, 'Team', 'team.php', 2, '2023-12-26 05:56:49'),
(7, 'Team Standing', 'teamStandings.php', 2, '2023-12-26 05:57:07'),
(8, 'Statistics', 'stats.php', 2, '2023-12-26 05:57:48'),
(9, 'Players', 'player.php', 3, '2023-12-26 05:58:37'),
(10, 'Users', 'user.php', 3, '2023-12-26 05:58:47'),
(11, 'Player Contract', 'playerContract.php', 3, '2023-12-26 05:59:03'),
(12, 'system Category', 'systemCategories.php', 3, '2023-12-26 05:59:26'),
(13, 'System Links', 'systemLinks.php', 3, '2023-12-26 05:59:44'),
(15, 'System Authorities', 'systemAuthoroties.php', 3, '2023-12-26 06:00:41'),
(16, 'Coach Report', 'coachstaffStat.php', 4, '2023-12-26 06:01:08'),
(17, 'Game Results', 'gameResultStat.php', 4, '2023-12-26 06:01:24'),
(18, 'Injuries Stats', 'injuriesStat.php', 4, '2023-12-26 06:01:41'),
(19, 'Player Contract Report', 'playerContractStat.php', 4, '2023-12-26 06:02:12'),
(20, 'Players Report', 'playerStat.php', 4, '2023-12-26 06:02:31'),
(21, 'Team Stats', 'teamStat.php', 4, '2023-12-26 06:02:58'),
(22, 'Team Standing Report', 'teamStandingStat.php', 4, '2023-12-26 06:03:18'),
(23, 'Schedule Report', 'scheduleStat.php', 4, '2023-12-26 06:10:03');

-- --------------------------------------------------------

--
-- Table structure for table `players`
--

CREATE TABLE `players` (
  `playerId` varchar(15) NOT NULL,
  `teamId` int(11) DEFAULT NULL,
  `playerName` varchar(250) NOT NULL,
  `address` varchar(100) DEFAULT NULL,
  `phone` int(15) DEFAULT NULL,
  `birthDate` date DEFAULT NULL,
  `image` varchar(250) NOT NULL,
  `position` varchar(50) DEFAULT NULL,
  `jerseyNumber` int(11) DEFAULT NULL,
  `joinDate` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `players`
--

INSERT INTO `players` (`playerId`, `teamId`, `playerName`, `address`, `phone`, `birthDate`, `image`, `position`, `jerseyNumber`, `joinDate`) VALUES
('PRL001', 1, 'M. Amiin', 'Nateeho', 619019805, '2004-01-01', 'PRL001.png', 'Center(C)', 6, '2023-12-22 18:18:14'),
('PRL002', 2, 'Khalif', 'Afgio', 618390115, '2003-05-19', 'PRL002.png', 'Center(C)', 8, '2023-12-22 15:32:31'),
('PRL003', 10, 'Omar (OJ)', 'Tarabuunka', 618211121, '2004-01-01', 'PRL003.png', 'Point Guard(PG)', 2, '2024-01-05 15:00:30'),
('PRL004', 6, 'Mascuud', 'Ceelsha', 617261412, '2003-02-01', 'PRL004.png', 'Center(C)', 5, '2024-01-05 15:00:18');

-- --------------------------------------------------------

--
-- Table structure for table `player_contracts`
--

CREATE TABLE `player_contracts` (
  `contractId` int(11) NOT NULL,
  `playerId` varchar(20) DEFAULT NULL,
  `startDate` date DEFAULT NULL,
  `endDate` date DEFAULT NULL,
  `salary` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `player_contracts`
--

INSERT INTO `player_contracts` (`contractId`, `playerId`, `startDate`, `endDate`, `salary`) VALUES
(2, 'PRL002', '2023-12-11', '2025-12-12', 50.00),
(4, 'PRL001', '2023-12-22', '2025-12-22', 300.00),
(5, 'PRL003', '2024-01-05', '2025-01-05', 200.00),
(6, 'PRL004', '2024-01-01', '2025-01-01', 190.00);

-- --------------------------------------------------------

--
-- Table structure for table `schedule`
--

CREATE TABLE `schedule` (
  `scheduleId` int(11) NOT NULL,
  `homeTeamId` int(11) DEFAULT NULL,
  `awayTeamId` int(11) DEFAULT NULL,
  `scheduledDate` date DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `schedule`
--

INSERT INTO `schedule` (`scheduleId`, `homeTeamId`, `awayTeamId`, `scheduledDate`, `location`) VALUES
(2, 1, 2, '2023-12-22', 'Stadium Koonis'),
(3, 2, 5, '2023-12-23', 'Afgoi stadium'),
(4, 5, 6, '2024-01-05', 'Stadium Koonis'),
(5, 10, 11, '2024-01-12', 'Afgio stadium'),
(6, 1, 11, '2024-01-07', 'Stadium Mogadishu');

-- --------------------------------------------------------

--
-- Table structure for table `stats`
--

CREATE TABLE `stats` (
  `statsId` int(11) NOT NULL,
  `playerId` varchar(15) DEFAULT NULL,
  `gameId` int(11) DEFAULT NULL,
  `pointsScored` int(11) DEFAULT NULL,
  `rebounds` int(11) DEFAULT NULL,
  `assists` int(11) DEFAULT NULL,
  `steals` int(11) DEFAULT NULL,
  `blocks` int(11) DEFAULT NULL,
  `registerDate` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `stats`
--

INSERT INTO `stats` (`statsId`, `playerId`, `gameId`, `pointsScored`, `rebounds`, `assists`, `steals`, `blocks`, `registerDate`) VALUES
(3, 'PRL001', 1, 3, 2, 0, 1, 0, '2023-12-22 18:23:56'),
(5, 'PRL002', 2, 9, 9, 8, 3, 2, '2023-12-22 18:25:10'),
(6, 'PRL003', 3, 3, 1, 2, 2, 0, '2024-01-05 14:52:25'),
(7, 'PRL004', 5, 8, 1, 1, 9, 0, '2024-01-05 14:58:24');

-- --------------------------------------------------------

--
-- Stand-in structure for view `systemauthview`
-- (See below for the actual view)
--
CREATE TABLE `systemauthview` (
`category_id` int(11)
,`categoryName` varchar(250)
,`categoryRole` varchar(250)
,`id` int(11)
,`linkName` varchar(255)
);

-- --------------------------------------------------------

--
-- Table structure for table `teams`
--

CREATE TABLE `teams` (
  `teamId` int(11) NOT NULL,
  `teamName` varchar(255) NOT NULL,
  `coachId` varchar(11) DEFAULT NULL,
  `foundedYear` int(11) DEFAULT NULL,
  `city` varchar(100) DEFAULT NULL,
  `registerDate` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `teams`
--

INSERT INTO `teams` (`teamId`, `teamName`, `coachId`, `foundedYear`, `city`, `registerDate`) VALUES
(1, 'CA201', 'USR002', 2010, 'Mogasishu', '2023-12-22 15:27:44'),
(2, 'CA202', 'USR003', 2017, 'Afgio', '2023-12-22 15:27:56'),
(5, 'CA203', 'USR002', 2022, 'Buulaburde', '2024-01-05 14:25:13'),
(6, 'CA204', 'USR003', 2017, 'Ceelsha', '2023-12-22 15:28:05'),
(10, 'CA205', 'USR002', 2024, 'Mogasishu', '2024-01-05 14:22:33'),
(11, 'CA206', 'USR005', 2020, 'Hodan', '2024-01-05 14:23:32'),
(12, 'CA207', 'USR003', 2021, 'Mogadishu', '2024-01-05 14:24:20');

-- --------------------------------------------------------

--
-- Table structure for table `team_standings`
--

CREATE TABLE `team_standings` (
  `standingId` int(11) NOT NULL,
  `teamId` int(11) DEFAULT NULL,
  `seasonYear` int(11) DEFAULT NULL,
  `wins` int(11) DEFAULT NULL,
  `losses` int(11) DEFAULT NULL,
  `ties` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `team_standings`
--

INSERT INTO `team_standings` (`standingId`, `teamId`, `seasonYear`, `wins`, `losses`, `ties`) VALUES
(1, 1, 2020, 7, 2, 1),
(3, 2, 2023, 6, 2, 1),
(4, 2, 2021, 5, 1, 2),
(6, 5, 2020, 10, 3, 1),
(7, 6, 2021, 5, 5, 5),
(8, 10, 2022, 10, 4, 4),
(10, 12, 2023, 7, 2, 1);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `userId` varchar(11) NOT NULL,
  `username` varchar(30) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(250) NOT NULL,
  `phone` int(11) NOT NULL,
  `role` varchar(15) NOT NULL,
  `image` varchar(250) NOT NULL,
  `status` varchar(10) NOT NULL DEFAULT '''Active''',
  `joinDate` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userId`, `username`, `email`, `password`, `phone`, `role`, `image`, `status`, `joinDate`) VALUES
('USR001', 'khalifa', 'khalif115@gmail.com', 'admin', 618390115, 'Admin', 'USR001.png', 'Active', '2023-12-21 17:33:11'),
('USR002', 'mohan', 'geedi@gmail.com', 'geedi123', 619019805, 'Coach', 'USR002.png', 'Active', '2023-12-21 18:56:06'),
('USR003', 'omar-tood', 'omarjibrilabdulkhadir@gamil.com', 'admin', 618121212, 'Coach', 'USR003.png', 'Active', '2023-12-25 00:20:20'),
('USR004', 'Iqro', 'iqruush@gmail.com', 'admin', 618968484, 'Super Admin', 'USR004.png', 'Active', '2024-01-03 09:39:38'),
('USR005', 'qadro', 'qardo@gmail.com', 'user123', 613445577, 'Coach', 'USR005.png', 'Active', '2024-01-05 14:23:03');

-- --------------------------------------------------------

--
-- Table structure for table `user_authority`
--

CREATE TABLE `user_authority` (
  `id` int(11) NOT NULL,
  `userId` varchar(15) NOT NULL,
  `action` int(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_authority`
--

INSERT INTO `user_authority` (`id`, `userId`, `action`) VALUES
(128, 'USR001', 1),
(129, 'USR001', 16),
(130, 'USR001', 17),
(131, 'USR001', 18),
(132, 'USR001', 19),
(133, 'USR001', 20),
(134, 'USR001', 21),
(135, 'USR001', 22),
(136, 'USR001', 23),
(137, 'USR001', 2),
(138, 'USR001', 3),
(139, 'USR001', 4),
(140, 'USR001', 5),
(141, 'USR001', 6),
(142, 'USR001', 7),
(143, 'USR001', 8),
(144, 'USR001', 9),
(145, 'USR001', 10),
(146, 'USR001', 11),
(147, 'USR001', 12),
(148, 'USR001', 13),
(149, 'USR001', 15),
(190, 'USR004', 1),
(191, 'USR004', 16),
(192, 'USR004', 17),
(193, 'USR004', 18),
(194, 'USR004', 19),
(195, 'USR004', 20),
(196, 'USR004', 21),
(197, 'USR004', 22),
(198, 'USR004', 23),
(199, 'USR004', 2),
(200, 'USR004', 3),
(201, 'USR004', 4),
(202, 'USR004', 5),
(203, 'USR004', 6),
(204, 'USR004', 7),
(205, 'USR004', 8),
(206, 'USR004', 9),
(207, 'USR004', 10),
(208, 'USR004', 11),
(209, 'USR004', 12),
(210, 'USR004', 13),
(211, 'USR004', 15),
(233, 'USR002', 1),
(234, 'USR002', 16),
(235, 'USR002', 17),
(236, 'USR002', 18),
(237, 'USR002', 19),
(238, 'USR002', 20),
(239, 'USR002', 21),
(240, 'USR002', 22),
(241, 'USR002', 23),
(242, 'USR002', 2),
(243, 'USR002', 3),
(244, 'USR002', 4),
(245, 'USR002', 5),
(246, 'USR002', 6),
(247, 'USR002', 7),
(248, 'USR002', 8),
(249, 'USR002', 10),
(250, 'USR002', 11),
(251, 'USR002', 12),
(252, 'USR002', 13),
(253, 'USR002', 15);

-- --------------------------------------------------------

--
-- Structure for view `systemauthview`
--
DROP TABLE IF EXISTS `systemauthview`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `systemauthview`  AS SELECT `category`.`id` AS `category_id`, `category`.`categoryName` AS `categoryName`, `category`.`categoryRole` AS `categoryRole`, `links`.`id` AS `id`, `links`.`linkName` AS `linkName` FROM (`category` left join `links` on(`category`.`id` = `links`.`categoryId`)) ORDER BY `category`.`categoryRole` ASC, `links`.`id` ASC ;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `coaching_staff`
--
ALTER TABLE `coaching_staff`
  ADD PRIMARY KEY (`staffId`),
  ADD KEY `teamId` (`teamId`),
  ADD KEY `coachId` (`coachId`);

--
-- Indexes for table `games`
--
ALTER TABLE `games`
  ADD PRIMARY KEY (`gameId`),
  ADD KEY `homeTeamId` (`homeTeamId`),
  ADD KEY `awayTeamId` (`awayTeamId`);

--
-- Indexes for table `injuries`
--
ALTER TABLE `injuries`
  ADD PRIMARY KEY (`injuryId`),
  ADD KEY `playerId` (`playerId`);

--
-- Indexes for table `links`
--
ALTER TABLE `links`
  ADD PRIMARY KEY (`id`),
  ADD KEY `system_links_category_id` (`categoryId`);

--
-- Indexes for table `players`
--
ALTER TABLE `players`
  ADD PRIMARY KEY (`playerId`),
  ADD KEY `teamId` (`teamId`);

--
-- Indexes for table `player_contracts`
--
ALTER TABLE `player_contracts`
  ADD PRIMARY KEY (`contractId`),
  ADD KEY `playerId` (`playerId`);

--
-- Indexes for table `schedule`
--
ALTER TABLE `schedule`
  ADD PRIMARY KEY (`scheduleId`),
  ADD KEY `homeTeamId` (`homeTeamId`),
  ADD KEY `awayTeamId` (`awayTeamId`);

--
-- Indexes for table `stats`
--
ALTER TABLE `stats`
  ADD PRIMARY KEY (`statsId`),
  ADD KEY `playerId` (`playerId`),
  ADD KEY `gameId` (`gameId`);

--
-- Indexes for table `teams`
--
ALTER TABLE `teams`
  ADD PRIMARY KEY (`teamId`),
  ADD KEY `coachId` (`coachId`);

--
-- Indexes for table `team_standings`
--
ALTER TABLE `team_standings`
  ADD PRIMARY KEY (`standingId`),
  ADD KEY `teamId` (`teamId`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userId`);

--
-- Indexes for table `user_authority`
--
ALTER TABLE `user_authority`
  ADD PRIMARY KEY (`id`),
  ADD KEY `system_action_link` (`action`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `coaching_staff`
--
ALTER TABLE `coaching_staff`
  MODIFY `staffId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `games`
--
ALTER TABLE `games`
  MODIFY `gameId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `injuries`
--
ALTER TABLE `injuries`
  MODIFY `injuryId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `links`
--
ALTER TABLE `links`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `player_contracts`
--
ALTER TABLE `player_contracts`
  MODIFY `contractId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `schedule`
--
ALTER TABLE `schedule`
  MODIFY `scheduleId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `stats`
--
ALTER TABLE `stats`
  MODIFY `statsId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `teams`
--
ALTER TABLE `teams`
  MODIFY `teamId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `team_standings`
--
ALTER TABLE `team_standings`
  MODIFY `standingId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `user_authority`
--
ALTER TABLE `user_authority`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=254;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `coaching_staff`
--
ALTER TABLE `coaching_staff`
  ADD CONSTRAINT `coaching_staff_ibfk_1` FOREIGN KEY (`teamId`) REFERENCES `teams` (`teamId`),
  ADD CONSTRAINT `coaching_staff_ibfk_2` FOREIGN KEY (`coachId`) REFERENCES `users` (`userId`);

--
-- Constraints for table `games`
--
ALTER TABLE `games`
  ADD CONSTRAINT `games_ibfk_1` FOREIGN KEY (`homeTeamId`) REFERENCES `teams` (`teamId`),
  ADD CONSTRAINT `games_ibfk_2` FOREIGN KEY (`awayTeamId`) REFERENCES `teams` (`teamId`);

--
-- Constraints for table `injuries`
--
ALTER TABLE `injuries`
  ADD CONSTRAINT `injuries_ibfk_1` FOREIGN KEY (`playerId`) REFERENCES `players` (`playerId`);

--
-- Constraints for table `links`
--
ALTER TABLE `links`
  ADD CONSTRAINT `system_links_category_id` FOREIGN KEY (`categoryId`) REFERENCES `category` (`id`);

--
-- Constraints for table `players`
--
ALTER TABLE `players`
  ADD CONSTRAINT `players_ibfk_1` FOREIGN KEY (`teamId`) REFERENCES `teams` (`teamId`);

--
-- Constraints for table `player_contracts`
--
ALTER TABLE `player_contracts`
  ADD CONSTRAINT `player_contracts_ibfk_1` FOREIGN KEY (`playerId`) REFERENCES `players` (`playerId`);

--
-- Constraints for table `schedule`
--
ALTER TABLE `schedule`
  ADD CONSTRAINT `schedule_ibfk_1` FOREIGN KEY (`homeTeamId`) REFERENCES `teams` (`teamId`),
  ADD CONSTRAINT `schedule_ibfk_2` FOREIGN KEY (`awayTeamId`) REFERENCES `teams` (`teamId`);

--
-- Constraints for table `stats`
--
ALTER TABLE `stats`
  ADD CONSTRAINT `stats_ibfk_1` FOREIGN KEY (`playerId`) REFERENCES `players` (`playerId`),
  ADD CONSTRAINT `stats_ibfk_2` FOREIGN KEY (`gameId`) REFERENCES `games` (`gameId`);

--
-- Constraints for table `teams`
--
ALTER TABLE `teams`
  ADD CONSTRAINT `teams_ibfk_1` FOREIGN KEY (`coachId`) REFERENCES `users` (`userId`);

--
-- Constraints for table `team_standings`
--
ALTER TABLE `team_standings`
  ADD CONSTRAINT `team_standings_ibfk_1` FOREIGN KEY (`teamId`) REFERENCES `teams` (`teamId`);

--
-- Constraints for table `user_authority`
--
ALTER TABLE `user_authority`
  ADD CONSTRAINT `system_action_link` FOREIGN KEY (`action`) REFERENCES `links` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
