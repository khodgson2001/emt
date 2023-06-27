-- phpMyAdmin SQL Dump
-- version 4.2.10
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: May 18, 2023 at 12:59 PM
-- Server version: 5.5.58-0+deb7u1-log
-- PHP Version: 5.6.31-1~dotdeb+7.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `unn_w20002249`
--

-- --------------------------------------------------------

--
-- Table structure for table `emt_answers`
--

CREATE TABLE IF NOT EXISTS `emt_answers` (
`id` int(11) NOT NULL,
  `emt_questions_id` int(11) NOT NULL,
  `answers` varchar(45) NOT NULL,
  `emt_completedForms_id` int(11) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=791 DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `emt_completedForms`
--

CREATE TABLE IF NOT EXISTS `emt_completedForms` (
`id` int(11) NOT NULL,
  `emt_study_id` int(11) NOT NULL,
  `emt_forms_id` int(11) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `emt_files`
--

CREATE TABLE IF NOT EXISTS `emt_files` (
  `fileName` varchar(100) NOT NULL,
  `emt_study_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `emt_forms`
--

CREATE TABLE IF NOT EXISTS `emt_forms` (
`id` int(11) NOT NULL,
  `formName` varchar(45) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `emt_investigators`
--

CREATE TABLE IF NOT EXISTS `emt_investigators` (
`id` int(11) NOT NULL,
  `first_name` varchar(45) DEFAULT NULL,
  `last_name` varchar(45) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `password` varchar(145) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `emt_questions`
--

CREATE TABLE IF NOT EXISTS `emt_questions` (
`id` int(11) NOT NULL,
  `emt_forms_id` int(11) NOT NULL,
  `question` varchar(45) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=90 DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `emt_statuses`
--

CREATE TABLE IF NOT EXISTS `emt_statuses` (
  `id` int(11) NOT NULL,
  `tag` varchar(45) DEFAULT NULL,
  `colour` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `emt_study`
--

CREATE TABLE IF NOT EXISTS `emt_study` (
`id` int(11) NOT NULL,
  `name` varchar(45) NOT NULL,
  `short_name` varchar(45) DEFAULT NULL COMMENT 'Acronym?',
  `principleInvestigator` int(11) NOT NULL DEFAULT '0',
  `researchLead` int(11) NOT NULL DEFAULT '0',
  `chiefInvestigator` int(11) NOT NULL DEFAULT '0',
  `description` varchar(250) DEFAULT NULL,
  `emt_statuses_id` int(11) NOT NULL DEFAULT '0',
  `lastEdit` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB AUTO_INCREMENT=116 DEFAULT CHARSET=latin1;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `emt_answers`
--
ALTER TABLE `emt_answers`
 ADD PRIMARY KEY (`id`), ADD UNIQUE KEY `id` (`id`), ADD KEY `fk_emt_answers_emt_completedForms1_idx` (`emt_completedForms_id`), ADD KEY `fk_emt_answers_emt_questions1_idx` (`emt_questions_id`);

--
-- Indexes for table `emt_completedForms`
--
ALTER TABLE `emt_completedForms`
 ADD PRIMARY KEY (`id`), ADD UNIQUE KEY `id_UNIQUE` (`id`), ADD KEY `fk_emt_completedForms_emt_study1_idx` (`emt_study_id`), ADD KEY `fk_emt_completedForms_emt_forms1_idx` (`emt_forms_id`);

--
-- Indexes for table `emt_files`
--
ALTER TABLE `emt_files`
 ADD PRIMARY KEY (`fileName`), ADD UNIQUE KEY `id_UNIQUE` (`fileName`), ADD KEY `fk_emt_files_emt_study1_idx` (`emt_study_id`);

--
-- Indexes for table `emt_forms`
--
ALTER TABLE `emt_forms`
 ADD PRIMARY KEY (`id`), ADD UNIQUE KEY `id_UNIQUE` (`id`);

--
-- Indexes for table `emt_investigators`
--
ALTER TABLE `emt_investigators`
 ADD PRIMARY KEY (`id`);

--
-- Indexes for table `emt_questions`
--
ALTER TABLE `emt_questions`
 ADD PRIMARY KEY (`id`), ADD UNIQUE KEY `id_UNIQUE` (`id`), ADD KEY `fk_emt_questions_emt_forms1_idx` (`emt_forms_id`);

--
-- Indexes for table `emt_statuses`
--
ALTER TABLE `emt_statuses`
 ADD PRIMARY KEY (`id`);

--
-- Indexes for table `emt_study`
--
ALTER TABLE `emt_study`
 ADD PRIMARY KEY (`id`,`researchLead`,`principleInvestigator`,`chiefInvestigator`,`emt_statuses_id`), ADD UNIQUE KEY `id_UNIQUE` (`id`), ADD KEY `fk_study_investigators1_idx` (`principleInvestigator`), ADD KEY `fk_study_investigators2_idx` (`researchLead`), ADD KEY `fk_study_investigators3_idx` (`chiefInvestigator`), ADD KEY `fk_emt_study_emt_statuses1_idx` (`emt_statuses_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `emt_answers`
--
ALTER TABLE `emt_answers`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=791;
--
-- AUTO_INCREMENT for table `emt_completedForms`
--
ALTER TABLE `emt_completedForms`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=45;
--
-- AUTO_INCREMENT for table `emt_forms`
--
ALTER TABLE `emt_forms`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `emt_investigators`
--
ALTER TABLE `emt_investigators`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT for table `emt_questions`
--
ALTER TABLE `emt_questions`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=90;
--
-- AUTO_INCREMENT for table `emt_study`
--
ALTER TABLE `emt_study`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=116;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `emt_answers`
--
ALTER TABLE `emt_answers`
ADD CONSTRAINT `fk_emt_answers_emt_completedForms1` FOREIGN KEY (`emt_completedForms_id`) REFERENCES `emt_completedForms` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
ADD CONSTRAINT `fk_emt_answers_emt_questions1` FOREIGN KEY (`emt_questions_id`) REFERENCES `emt_questions` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `emt_completedForms`
--
ALTER TABLE `emt_completedForms`
ADD CONSTRAINT `fk_emt_completedForms_emt_forms1` FOREIGN KEY (`emt_forms_id`) REFERENCES `emt_forms` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
ADD CONSTRAINT `fk_emt_completedForms_emt_study1` FOREIGN KEY (`emt_study_id`) REFERENCES `emt_study` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Constraints for table `emt_files`
--
ALTER TABLE `emt_files`
ADD CONSTRAINT `fk_emt_files_emt_study1` FOREIGN KEY (`emt_study_id`) REFERENCES `emt_study` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `emt_questions`
--
ALTER TABLE `emt_questions`
ADD CONSTRAINT `fk_emt_questions_emt_forms1` FOREIGN KEY (`emt_forms_id`) REFERENCES `emt_forms` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Constraints for table `emt_study`
--
ALTER TABLE `emt_study`
ADD CONSTRAINT `fk_study_investigators1` FOREIGN KEY (`principleInvestigator`) REFERENCES `emt_investigators` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
ADD CONSTRAINT `fk_emt_study_emt_statuses1` FOREIGN KEY (`emt_statuses_id`) REFERENCES `emt_statuses` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
ADD CONSTRAINT `fk_study_investigators2` FOREIGN KEY (`researchLead`) REFERENCES `emt_investigators` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
ADD CONSTRAINT `fk_study_investigators3` FOREIGN KEY (`chiefInvestigator`) REFERENCES `emt_investigators` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
