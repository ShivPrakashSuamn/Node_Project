-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 23, 2023 at 07:25 AM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `xmail`
--

-- --------------------------------------------------------

--
-- Table structure for table `compaign`
--

CREATE TABLE `compaign` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `template_id` varchar(255) NOT NULL,
  `repo_path` varchar(255) NOT NULL,
  `index_path` varchar(255) NOT NULL,
  `thumbnail_path` varchar(255) NOT NULL,
  `draft_path` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL,
  `created` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `compaign`
--

INSERT INTO `compaign` (`id`, `title`, `template_id`, `repo_path`, `index_path`, `thumbnail_path`, `draft_path`, `status`, `created`) VALUES
(1, 'New Body Building Template', '1', '/uploads/userTemplates/1', '/uploads/userTemplates/1/index.html', '/uploads/userTemplates/1/thumbnail.jpg', '/uploads/userTemplates/1/draft.html', '1', '2023-05-31 15:32:55'),
(5, 'Postman', '2', '/uploads/userTemplates/5', '/uploads/userTemplates/5/index.html', '/uploads/userTemplates/5/thumbnail.png', '/uploads/userTemplates/5/draft.html', '1', '2023-06-21 16:46:42'),
(6, 'Admin', '2', '/uploads/userTemplates/6', '/uploads/userTemplates/6/index.html', '/uploads/userTemplates/6/thumbnail.jpg', '/uploads/userTemplates/6/draft.html', '1', '2023-07-26 10:16:14');

-- --------------------------------------------------------

--
-- Table structure for table `contact`
--

CREATE TABLE `contact` (
  `id` int(11) NOT NULL,
  `fname` varchar(255) NOT NULL,
  `lname` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `dob` date NOT NULL,
  `phone` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `address` longtext NOT NULL,
  `city` varchar(255) NOT NULL,
  `pin_code` varchar(255) NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 0,
  `create` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `contact`
--

INSERT INTO `contact` (`id`, `fname`, `lname`, `email`, `dob`, `phone`, `image`, `address`, `city`, `pin_code`, `status`, `create`) VALUES
(1, 'ravindra', 'saini', 'ravindra825@yopmail.com', '2008-11-08', '9588942355', 'file-1683285915424.jpg', 'nayakheda kote [raj.]', 'kota', '325001', 0, '2023-06-04 04:20:11'),
(2, 'Kalu Don', 'malinga', 'kalu88@yopmail.com', '2023-05-25', '8003534882', 'null', 'bhimpura kaithoon', 'kota', '325001', 0, '2023-06-04 04:20:00'),
(3, 'Sonu', 'suman', 'sonu@yopmail.com', '2023-05-10', '9602345684', 'null', 'kaithoon', 'Kota', '3205001', 0, '2023-06-03 18:55:17'),
(4, 'Kamal', 'suman', 'kamal4@yopmail.com', '2002-08-06', '9602975315', 'null', 'kaithon', 'kota', '325001', 0, '2023-06-04 04:20:19'),
(5, 'Alex', 'saini', 'alex44@yopmail.com', '0000-00-00', '9057760469', 'null', 'kaithoon', 'kota', '50031', 1, '2023-06-04 04:20:29'),
(6, 'Hanuman', 'Pandit', 'hanuman55@yopmail.com', '2023-05-24', '900108108', 'file-1683360553894.jpg', 'Bhagawan pura , Inderlok ', 'Showla Pur', '500001', 0, '2023-06-04 04:20:42'),
(7, 'Bhagya', 'Suman', 'bhagya888@yopmail.com', '2018-05-20', '108108108', 'file-1685511896084.jpg', 'Bhagvan pura, swarg lok ', 'Swarg', '10000010', 0, '2023-06-04 04:21:15'),
(9, 'Yeshu', 'Suman', 'yeshu996@yopmail.com', '2023-05-21', '9865555456', 'null', 'Nayakheda Kota ', 'Kota', '3250001', 0, '2023-06-04 04:21:23'),
(10, 'Dev', 'Saini', 'dev777@yopmail.com', '2023-06-09', '65855482', 'null', 'kota', 'Raj', '500012', 0, '2023-06-09 18:37:34'),
(11, 'Ayush', 'shrma', 'ayush5454@yopmail.com', '2023-05-04', '969656530', 'null', 'Rampura  kota ', 'Bundi', '31020', 0, '2023-06-04 04:21:35'),
(12, 'Subham ', 'gill', 'subhamgill45@yopmail.com', '2006-02-12', '9659483612', 'file-1685632530860.webp', 'chadni chock , pune', 'Pune', '220004', 0, '2023-06-04 04:21:41'),
(13, 'Mohit', 'Saini ', 'mohit98@yopmail.com', '2010-02-01', '9588942355', 'file-1685776115226.jpg', 'Nayakheda Nanta Kota  ', 'Kota  ', '50032', 0, '2023-06-04 04:21:54'),
(14, 'Deepk', 'Saini', 'deepk45@yopmail.com', '2010-01-10', '911437214', 'file-1686336171918.webp', 'sanjay nagar , Barana ', 'Barana', '302541', 0, '2023-06-09 18:42:51'),
(15, 'Subham ', 'shrma', 'subham@yopmail.com', '2023-06-29', '9588942355', 'null', 'Bhagvan pura, swarg lok ', 'Bundi', '31020', 0, '2023-06-10 17:52:46'),
(16, 'Govind', 'Saini', 'govind33@yopmail.com', '2015-05-29', '889965623', 'file-1686468039116.jpg', 'Bhata Pada , gali no. 15 , kota ', 'Kota', '556465', 0, '2023-06-11 07:20:39'),
(17, 'Vicky', ' Koshal', 'vicky966@yopmail.com', '1995-01-14', '9000155858', 'null', 'chadni chock , New Delhi', 'Delhi', '000101', 0, '2023-06-11 07:15:11'),
(18, 'Dev', 'Saini', 'dev777@gmail.com', '0000-00-00', '65855482', 'null', 'kota', 'Raj', '500012', 1, '2023-06-12 14:06:46'),
(20, 'Dev', 'Saini', 'dev777@gmail.com', '0000-00-00', '65855482', 'null', 'kota', 'Raj', '500012', 1, '2023-06-12 14:06:46'),
(21, 'Dev', 'Saini', 'dev777@gmail.com', '0000-00-00', '65855482', 'null', 'kota', 'Raj', '500012', 1, '2023-06-12 14:06:46'),
(22, 'rahul', 'saini', 'rahulsaini37242@yopmail.com.', '2003-07-21', '7976918836', 'null', 'kunhari balita road', ' kota', '320014', 0, '2023-06-12 14:11:47');

-- --------------------------------------------------------

--
-- Table structure for table `features`
--

CREATE TABLE `features` (
  `id` int(11) NOT NULL,
  `plan_id` int(11) NOT NULL,
  `feature_name` varchar(255) NOT NULL,
  `feature_value` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL,
  `created` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `features`
--

INSERT INTO `features` (`id`, `plan_id`, `feature_name`, `feature_value`, `status`, `created`) VALUES
(30, 2, 'Audiences', '200', '1', '2023-05-22 08:04:26'),
(37, 2, 'Monthly Email Sends', '10000', '0', '2023-05-20 18:00:38'),
(39, 3, 'Monthly Email Sends', '50000', '1', '2023-05-20 18:04:44'),
(40, 3, 'Audiences', 'Unlimited', '0', '2023-05-20 18:00:58'),
(57, 1, 'Audiences', '20', '0', '2023-05-29 07:17:48'),
(58, 1, 'Monthly Email Sends', '100', '0', '2023-05-29 07:17:48');

-- --------------------------------------------------------

--
-- Table structure for table `list`
--

CREATE TABLE `list` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `total_contacts` int(11) NOT NULL,
  `create` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `list`
--

INSERT INTO `list` (`id`, `title`, `total_contacts`, `create`) VALUES
(1, 'Friends ', 3, '2023-05-05 16:25:48'),
(2, 'Family', 3, '2023-05-21 07:04:34'),
(3, 'Dost', 5, '2023-05-21 06:49:07'),
(4, 'birthday partty', 7, '2023-06-12 14:13:34'),
(5, 'admin', 7, '2023-07-26 10:15:44');

-- --------------------------------------------------------

--
-- Table structure for table `list_contacts`
--

CREATE TABLE `list_contacts` (
  `id` int(11) NOT NULL,
  `list_id` int(11) NOT NULL,
  `contact_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `list_contacts`
--

INSERT INTO `list_contacts` (`id`, `list_id`, `contact_id`) VALUES
(9, 1, 3),
(10, 1, 4),
(11, 1, 2),
(12, 3, 2),
(13, 3, 3),
(14, 3, 10),
(15, 3, 7),
(16, 3, 6),
(19, 2, 2),
(20, 2, 3),
(21, 2, 5),
(22, 4, 22),
(23, 4, 14),
(24, 4, 13),
(25, 4, 16),
(26, 4, 11),
(27, 4, 12),
(28, 4, 4),
(29, 5, 1),
(30, 5, 10),
(31, 5, 7),
(32, 5, 11),
(33, 5, 9),
(34, 5, 4),
(35, 5, 3);

-- --------------------------------------------------------

--
-- Table structure for table `mail_queue`
--

CREATE TABLE `mail_queue` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `from_mail` varchar(255) NOT NULL,
  `to_mail` varchar(255) NOT NULL,
  `subject` varchar(255) NOT NULL,
  `content` longtext NOT NULL,
  `schedule` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL,
  `error` longtext NOT NULL,
  `created` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `send_date` varchar(255) DEFAULT NULL,
  `send_time` varchar(255) DEFAULT NULL,
  `compaign_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `mail_queue`
--

INSERT INTO `mail_queue` (`id`, `user_id`, `from_mail`, `to_mail`, `subject`, `content`, `schedule`, `status`, `error`, `created`, `send_date`, `send_time`, `compaign_id`) VALUES
(5, 6, 'sumanshivprakash742@gmail.com', 'kamal4@yopmail.com', 'gdfgfdg', ' html ', 'TimeSet', 'true', 'Error: Invalid login: 535-5.7.8 Username and Password not accepted. Learn more at\n535 5.7.8  https://support.google.com/mail/?p=BadCredentials c18-20020a170902b69200b001ae59169f05sm6643144pls.182 - gsmtp', '2023-06-16 08:29:21', '2023-6-12', '23:03', 0),
(45, 6, 'sumanshivprakash742@gmail.com', 'kalu88@yopmail.com', 'Postman', '<table width=\"100\\%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"m_4449668701611399010container\" style=\"border-collapse:collapse;width:100\\%;min-width:100\\%;height:auto\"><tbody><tr><td width=\"100\\%\" valign=\"top\" bgcolor=\"#ffffff\" style=\"padding-top:20px\"><table width=\"580\" class=\"m_4449668701611399010deviceWidth\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" bgcolor=\"#ffffff\" style=\"border-collapse:collapse;margin:0 auto\"><tbody><tr><td valign=\"top\" align=\"center\" style=\"padding:0\" bgcolor=\"#ffffff\"><a href=\"https://links.getpostman.com/ls/click?upn=3y7nOEZSJOF1v-2Fv7UyshsA0slPDVAWp38fB5IEChtheu3bOEbgreuzlgz5zViNwH8xZ9_Ok13fD09FJNSr5My2iE2o6TOtFlJamVAkBBRlAIaekfKHvmA7SMTWELU4G21lRyXsXfqH3M8IZinE8o1ftpuGUQlDrQ9AwNZL7wbEYH0XszilvnNFPvA0p-2B0Dg14n9I-2FvV-2Fkm8o41NSr-2FZJo-2Bqsds3C6iUvBci6uDov6R854TsWYhM9ncIQcniyAoOlqYK2fwgZgzN7sRLDKjVe-2BNU2U6zKgy7koBqN75N0kogwrrOedM2ReskL96iFiFTwOZFk1lqmnRtvWwL3clPWdPZe9irmlbVKz5CVLn68eXCiPkrbD3M0pFDskaZGDRPuS4mhFGPNwdC3yyBR9cb2VEw9C9K80t-2BWTx7gZcOWXcOf-2BzBkAy6gzE7qnAUBCENHx3yLE\" target=\"_blank\" data-saferedirecturl=\"https://www.google.com/url?q=https://links.getpostman.com/ls/click?upn\\%3D3y7nOEZSJOF1v-2Fv7UyshsA0slPDVAWp38fB5IEChtheu3bOEbgreuzlgz5zViNwH8xZ9_Ok13fD09FJNSr5My2iE2o6TOtFlJamVAkBBRlAIaekfKHvmA7SMTWELU4G21lRyXsXfqH3M8IZinE8o1ftpuGUQlDrQ9AwNZL7wbEYH0XszilvnNFPvA0p-2B0Dg14n9I-2FvV-2Fkm8o41NSr-2FZJo-2Bqsds3C6iUvBci6uDov6R854TsWYhM9ncIQcniyAoOlqYK2fwgZgzN7sRLDKjVe-2BNU2U6zKgy7koBqN75N0kogwrrOedM2ReskL96iFiFTwOZFk1lqmnRtvWwL3clPWdPZe9irmlbVKz5CVLn68eXCiPkrbD3M0pFDskaZGDRPuS4mhFGPNwdC3yyBR9cb2VEw9C9K80t-2BWTx7gZcOWXcOf-2BzBkAy6gzE7qnAUBCENHx3yLE&amp;source=gmail&amp;ust=1685864307216000&amp;usg=AOvVaw2Kahkwcp6xWZWuw8HaZbTa\"><img class=\"m_4449668701611399010deviceWidth CToWUd\" src=\"https://ci6.googleusercontent.com/proxy/cbLkq9b3rrQO0cgPhXrrjcrlLLhKJSWzVagEd49My6fHYkwEfjjaHkwVVBDqgnFVBMl__oFR4ZrIPaztu1mQtUHazbnsaipriZ-DHpdeOh34zrs6SNWtibheKhs=s0-d-e1-ft#https://pages.getpostman.com/rs/067-UMD-991/images/pm-logo-horiz\\%402x.png\" alt=\"\" border=\"0\" width=\"125\" style=\"display:block\" data-bit=\"iit\"></a></td></tr><tr><td valign=\"top\" align=\"center\" style=\"padding:0\" bgcolor=\"#ffffff\"><a href=\"https://links.getpostman.com/ls/click?upn=3y7nOEZSJOF1v-2Fv7UyshsA0slPDVAWp38fB5IEChtheu3bOEbgreuzlgz5zViNwHsQp2_Ok13fD09FJNSr5My2iE2o6TOtFlJamVAkBBRlAIaekfKHvmA7SMTWELU4G21lRyXsXfqH3M8IZinE8o1ftpuGUQlDrQ9AwNZL7wbEYH0XszilvnNFPvA0p-2B0Dg14n9I-2FvV-2Fkm8o41NSr-2FZJo-2Bqsds3C6iUvBci6uDov6R854TsUPFd4A61l5cI665IU4qTW8hDtrIOUuHFAo7VMPcFqgSmoVg0svy9WJmVAlU-2FO2tO-2B2Kf71e8hLwiSTmqslZsTk1Ju3xthDD1-2F072JOD04MSSzZNnKFO0MZ5WuWRLgEquhS-2B14dynJubXPWbQVM4Jb1inLqKxYRa1XmsVmM20PQyuUo4AknKxc0dyLaNQhNEMVVJ3uP-2Biq7KvILg-2BYOiUEP\" target=\"_blank\" data-saferedirecturl=\"https://www.google.com/url?q=https://links.getpostman.com/ls/click?upn\\%3D3y7nOEZSJOF1v-2Fv7UyshsA0slPDVAWp38fB5IEChtheu3bOEbgreuzlgz5zViNwHsQp2_Ok13fD09FJNSr5My2iE2o6TOtFlJamVAkBBRlAIaekfKHvmA7SMTWELU4G21lRyXsXfqH3M8IZinE8o1ftpuGUQlDrQ9AwNZL7wbEYH0XszilvnNFPvA0p-2B0Dg14n9I-2FvV-2Fkm8o41NSr-2FZJo-2Bqsds3C6iUvBci6uDov6R854TsUPFd4A61l5cI665IU4qTW8hDtrIOUuHFAo7VMPcFqgSmoVg0svy9WJmVAlU-2FO2tO-2B2Kf71e8hLwiSTmqslZsTk1Ju3xthDD1-2F072JOD04MSSzZNnKFO0MZ5WuWRLgEquhS-2B14dynJubXPWbQVM4Jb1inLqKxYRa1XmsVmM20PQyuUo4AknKxc0dyLaNQhNEMVVJ3uP-2Biq7KvILg-2BYOiUEP&amp;source=gmail&amp;ust=1685864307216000&amp;usg=AOvVaw2CPvjfMp1shOLv8ekPIdm_\"><img class=\"m_4449668701611399010deviceWidth CToWUd\" src=\"https://ci5.googleusercontent.com/proxy/pDGWk03BqKkh63AxQc-d15HEeL5IOBZpAwlyX-4De7rDW56QxQ4RV-_0LNG9chGBQ3fnckiJ8DueBwiRqMp8EK3rib-SIuE9oFKLf5xMRDNaNdiOigozxdg=s0-d-e1-ft#https://pages.getpostman.com/rs/067-UMD-991/images/wave-hello\\%403x.png\" alt=\"\" border=\"0\" width=\"200\" style=\"display:block;margin-top:30px\" data-bit=\"iit\"></a></td></tr><tr><td style=\"font-size:13px;color:#282828;font-weight:400;text-align:left;font-family:\'Open Sans\',sans-serif;line-height:24px;vertical-align:top;padding:15px 8px 10px 8px\" bgcolor=\"#ffffff\"><h1 style=\"font-weight:600;margin:30px 0 50px 0;text-align:center\">Welcome to Postman!</h1><p>You’re just one click away from getting started with Postman. All you need to do is verify your email address to activate your Postman account.</p><a href=\"https://links.getpostman.com/ls/click?upn=3y7nOEZSJOF1v-2Fv7UyshsClw6pSPp9j71m85zYfrmPeMkrjqit7zxHzsvknXb2TWV-2Flti2JHfwZCEvZZI4kGT5YLeJfmlsf-2BkLAkpXxOg535VAcwcpYq3Y995dPrNv7OxoEd_Ok13fD09FJNSr5My2iE2o6TOtFlJamVAkBBRlAIaekfKHvmA7SMTWELU4G21lRyXsXfqH3M8IZinE8o1ftpuGUQlDrQ9AwNZL7wbEYH0XszilvnNFPvA0p-2B0Dg14n9I-2FvV-2Fkm8o41NSr-2FZJo-2Bqsds3C6iUvBci6uDov6R854TsWpgJpxQsnYqM63ENMC6uKAmiXeyrzepymXFiR5fDsZcQ4NJijUybZMXFOgqLB-2Fo8nctrA0S4hLC9wAfpxmsUrkaut2vfWe9sDJaPGKOaTTuW8riA92xOTBK7cel67AOx4EB2Vmtf0zraL52lVB9o0-2FQkbaJ9HA4zx5kGL4uRU3nGBedNGjQz7Aa0OAh2wzcjIbohjjn-2FN9nFbsjXp7EQIh\" style=\"padding:10px;width:300px;display:block;text-decoration:none;border:1px solid #ff6c37;font-weight:700;font-size:14px;font-family:\'Open Sans\',sans-serif;color:#fff;background:#ff6c37;border-radius:5px;line-height:17px;margin:0 auto;text-align:center\" target=\"_blank\" data-saferedirecturl=\"https://www.google.com/url?q=https://links.getpostman.com/ls/click?upn\\%3D3y7nOEZSJOF1v-2Fv7UyshsClw6pSPp9j71m85zYfrmPeMkrjqit7zxHzsvknXb2TWV-2Flti2JHfwZCEvZZI4kGT5YLeJfmlsf-2BkLAkpXxOg535VAcwcpYq3Y995dPrNv7OxoEd_Ok13fD09FJNSr5My2iE2o6TOtFlJamVAkBBRlAIaekfKHvmA7SMTWELU4G21lRyXsXfqH3M8IZinE8o1ftpuGUQlDrQ9AwNZL7wbEYH0XszilvnNFPvA0p-2B0Dg14n9I-2FvV-2Fkm8o41NSr-2FZJo-2Bqsds3C6iUvBci6uDov6R854TsWpgJpxQsnYqM63ENMC6uKAmiXeyrzepymXFiR5fDsZcQ4NJijUybZMXFOgqLB-2Fo8nctrA0S4hLC9wAfpxmsUrkaut2vfWe9sDJaPGKOaTTuW8riA92xOTBK7cel67AOx4EB2Vmtf0zraL52lVB9o0-2FQkbaJ9HA4zx5kGL4uRU3nGBedNGjQz7Aa0OAh2wzcjIbohjjn-2FN9nFbsjXp7EQIh&amp;source=gmail&amp;ust=1685864307216000&amp;usg=AOvVaw1gSa9sYEI6WYlLy0-sbx4J\">Confirm My Email</a><p>Once your account is activated, you can start using all of Postman’s features to organize, test, monitor, and share your API requests.</p><p>You’re receiving this email because you recently created a new Postman account or added a new email address. If this wasn’t you, please ignore this email.</p></td></tr></tbody></table></td></tr></tbody></table>', 'Now', 'true', 'Error: Invalid login: 535-5.7.8 Username and Password not accepted. Learn more at\n535 5.7.8  https://support.google.com/mail/?p=BadCredentials l63-20020a632542000000b00551df489590sm2210582pgl.12 - gsmtp', '2023-06-16 11:45:52', '2023-6-16', '17:15', 5),
(46, 6, 'sumanshivprakash742@gmail.com', 'sonu@yopmail.com', 'Postman', '<table width=\"100\\%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"m_4449668701611399010container\" style=\"border-collapse:collapse;width:100\\%;min-width:100\\%;height:auto\"><tbody><tr><td width=\"100\\%\" valign=\"top\" bgcolor=\"#ffffff\" style=\"padding-top:20px\"><table width=\"580\" class=\"m_4449668701611399010deviceWidth\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" bgcolor=\"#ffffff\" style=\"border-collapse:collapse;margin:0 auto\"><tbody><tr><td valign=\"top\" align=\"center\" style=\"padding:0\" bgcolor=\"#ffffff\"><a href=\"https://links.getpostman.com/ls/click?upn=3y7nOEZSJOF1v-2Fv7UyshsA0slPDVAWp38fB5IEChtheu3bOEbgreuzlgz5zViNwH8xZ9_Ok13fD09FJNSr5My2iE2o6TOtFlJamVAkBBRlAIaekfKHvmA7SMTWELU4G21lRyXsXfqH3M8IZinE8o1ftpuGUQlDrQ9AwNZL7wbEYH0XszilvnNFPvA0p-2B0Dg14n9I-2FvV-2Fkm8o41NSr-2FZJo-2Bqsds3C6iUvBci6uDov6R854TsWYhM9ncIQcniyAoOlqYK2fwgZgzN7sRLDKjVe-2BNU2U6zKgy7koBqN75N0kogwrrOedM2ReskL96iFiFTwOZFk1lqmnRtvWwL3clPWdPZe9irmlbVKz5CVLn68eXCiPkrbD3M0pFDskaZGDRPuS4mhFGPNwdC3yyBR9cb2VEw9C9K80t-2BWTx7gZcOWXcOf-2BzBkAy6gzE7qnAUBCENHx3yLE\" target=\"_blank\" data-saferedirecturl=\"https://www.google.com/url?q=https://links.getpostman.com/ls/click?upn\\%3D3y7nOEZSJOF1v-2Fv7UyshsA0slPDVAWp38fB5IEChtheu3bOEbgreuzlgz5zViNwH8xZ9_Ok13fD09FJNSr5My2iE2o6TOtFlJamVAkBBRlAIaekfKHvmA7SMTWELU4G21lRyXsXfqH3M8IZinE8o1ftpuGUQlDrQ9AwNZL7wbEYH0XszilvnNFPvA0p-2B0Dg14n9I-2FvV-2Fkm8o41NSr-2FZJo-2Bqsds3C6iUvBci6uDov6R854TsWYhM9ncIQcniyAoOlqYK2fwgZgzN7sRLDKjVe-2BNU2U6zKgy7koBqN75N0kogwrrOedM2ReskL96iFiFTwOZFk1lqmnRtvWwL3clPWdPZe9irmlbVKz5CVLn68eXCiPkrbD3M0pFDskaZGDRPuS4mhFGPNwdC3yyBR9cb2VEw9C9K80t-2BWTx7gZcOWXcOf-2BzBkAy6gzE7qnAUBCENHx3yLE&amp;source=gmail&amp;ust=1685864307216000&amp;usg=AOvVaw2Kahkwcp6xWZWuw8HaZbTa\"><img class=\"m_4449668701611399010deviceWidth CToWUd\" src=\"https://ci6.googleusercontent.com/proxy/cbLkq9b3rrQO0cgPhXrrjcrlLLhKJSWzVagEd49My6fHYkwEfjjaHkwVVBDqgnFVBMl__oFR4ZrIPaztu1mQtUHazbnsaipriZ-DHpdeOh34zrs6SNWtibheKhs=s0-d-e1-ft#https://pages.getpostman.com/rs/067-UMD-991/images/pm-logo-horiz\\%402x.png\" alt=\"\" border=\"0\" width=\"125\" style=\"display:block\" data-bit=\"iit\"></a></td></tr><tr><td valign=\"top\" align=\"center\" style=\"padding:0\" bgcolor=\"#ffffff\"><a href=\"https://links.getpostman.com/ls/click?upn=3y7nOEZSJOF1v-2Fv7UyshsA0slPDVAWp38fB5IEChtheu3bOEbgreuzlgz5zViNwHsQp2_Ok13fD09FJNSr5My2iE2o6TOtFlJamVAkBBRlAIaekfKHvmA7SMTWELU4G21lRyXsXfqH3M8IZinE8o1ftpuGUQlDrQ9AwNZL7wbEYH0XszilvnNFPvA0p-2B0Dg14n9I-2FvV-2Fkm8o41NSr-2FZJo-2Bqsds3C6iUvBci6uDov6R854TsUPFd4A61l5cI665IU4qTW8hDtrIOUuHFAo7VMPcFqgSmoVg0svy9WJmVAlU-2FO2tO-2B2Kf71e8hLwiSTmqslZsTk1Ju3xthDD1-2F072JOD04MSSzZNnKFO0MZ5WuWRLgEquhS-2B14dynJubXPWbQVM4Jb1inLqKxYRa1XmsVmM20PQyuUo4AknKxc0dyLaNQhNEMVVJ3uP-2Biq7KvILg-2BYOiUEP\" target=\"_blank\" data-saferedirecturl=\"https://www.google.com/url?q=https://links.getpostman.com/ls/click?upn\\%3D3y7nOEZSJOF1v-2Fv7UyshsA0slPDVAWp38fB5IEChtheu3bOEbgreuzlgz5zViNwHsQp2_Ok13fD09FJNSr5My2iE2o6TOtFlJamVAkBBRlAIaekfKHvmA7SMTWELU4G21lRyXsXfqH3M8IZinE8o1ftpuGUQlDrQ9AwNZL7wbEYH0XszilvnNFPvA0p-2B0Dg14n9I-2FvV-2Fkm8o41NSr-2FZJo-2Bqsds3C6iUvBci6uDov6R854TsUPFd4A61l5cI665IU4qTW8hDtrIOUuHFAo7VMPcFqgSmoVg0svy9WJmVAlU-2FO2tO-2B2Kf71e8hLwiSTmqslZsTk1Ju3xthDD1-2F072JOD04MSSzZNnKFO0MZ5WuWRLgEquhS-2B14dynJubXPWbQVM4Jb1inLqKxYRa1XmsVmM20PQyuUo4AknKxc0dyLaNQhNEMVVJ3uP-2Biq7KvILg-2BYOiUEP&amp;source=gmail&amp;ust=1685864307216000&amp;usg=AOvVaw2CPvjfMp1shOLv8ekPIdm_\"><img class=\"m_4449668701611399010deviceWidth CToWUd\" src=\"https://ci5.googleusercontent.com/proxy/pDGWk03BqKkh63AxQc-d15HEeL5IOBZpAwlyX-4De7rDW56QxQ4RV-_0LNG9chGBQ3fnckiJ8DueBwiRqMp8EK3rib-SIuE9oFKLf5xMRDNaNdiOigozxdg=s0-d-e1-ft#https://pages.getpostman.com/rs/067-UMD-991/images/wave-hello\\%403x.png\" alt=\"\" border=\"0\" width=\"200\" style=\"display:block;margin-top:30px\" data-bit=\"iit\"></a></td></tr><tr><td style=\"font-size:13px;color:#282828;font-weight:400;text-align:left;font-family:\'Open Sans\',sans-serif;line-height:24px;vertical-align:top;padding:15px 8px 10px 8px\" bgcolor=\"#ffffff\"><h1 style=\"font-weight:600;margin:30px 0 50px 0;text-align:center\">Welcome to Postman!</h1><p>You’re just one click away from getting started with Postman. All you need to do is verify your email address to activate your Postman account.</p><a href=\"https://links.getpostman.com/ls/click?upn=3y7nOEZSJOF1v-2Fv7UyshsClw6pSPp9j71m85zYfrmPeMkrjqit7zxHzsvknXb2TWV-2Flti2JHfwZCEvZZI4kGT5YLeJfmlsf-2BkLAkpXxOg535VAcwcpYq3Y995dPrNv7OxoEd_Ok13fD09FJNSr5My2iE2o6TOtFlJamVAkBBRlAIaekfKHvmA7SMTWELU4G21lRyXsXfqH3M8IZinE8o1ftpuGUQlDrQ9AwNZL7wbEYH0XszilvnNFPvA0p-2B0Dg14n9I-2FvV-2Fkm8o41NSr-2FZJo-2Bqsds3C6iUvBci6uDov6R854TsWpgJpxQsnYqM63ENMC6uKAmiXeyrzepymXFiR5fDsZcQ4NJijUybZMXFOgqLB-2Fo8nctrA0S4hLC9wAfpxmsUrkaut2vfWe9sDJaPGKOaTTuW8riA92xOTBK7cel67AOx4EB2Vmtf0zraL52lVB9o0-2FQkbaJ9HA4zx5kGL4uRU3nGBedNGjQz7Aa0OAh2wzcjIbohjjn-2FN9nFbsjXp7EQIh\" style=\"padding:10px;width:300px;display:block;text-decoration:none;border:1px solid #ff6c37;font-weight:700;font-size:14px;font-family:\'Open Sans\',sans-serif;color:#fff;background:#ff6c37;border-radius:5px;line-height:17px;margin:0 auto;text-align:center\" target=\"_blank\" data-saferedirecturl=\"https://www.google.com/url?q=https://links.getpostman.com/ls/click?upn\\%3D3y7nOEZSJOF1v-2Fv7UyshsClw6pSPp9j71m85zYfrmPeMkrjqit7zxHzsvknXb2TWV-2Flti2JHfwZCEvZZI4kGT5YLeJfmlsf-2BkLAkpXxOg535VAcwcpYq3Y995dPrNv7OxoEd_Ok13fD09FJNSr5My2iE2o6TOtFlJamVAkBBRlAIaekfKHvmA7SMTWELU4G21lRyXsXfqH3M8IZinE8o1ftpuGUQlDrQ9AwNZL7wbEYH0XszilvnNFPvA0p-2B0Dg14n9I-2FvV-2Fkm8o41NSr-2FZJo-2Bqsds3C6iUvBci6uDov6R854TsWpgJpxQsnYqM63ENMC6uKAmiXeyrzepymXFiR5fDsZcQ4NJijUybZMXFOgqLB-2Fo8nctrA0S4hLC9wAfpxmsUrkaut2vfWe9sDJaPGKOaTTuW8riA92xOTBK7cel67AOx4EB2Vmtf0zraL52lVB9o0-2FQkbaJ9HA4zx5kGL4uRU3nGBedNGjQz7Aa0OAh2wzcjIbohjjn-2FN9nFbsjXp7EQIh&amp;source=gmail&amp;ust=1685864307216000&amp;usg=AOvVaw1gSa9sYEI6WYlLy0-sbx4J\">Confirm My Email</a><p>Once your account is activated, you can start using all of Postman’s features to organize, test, monitor, and share your API requests.</p><p>You’re receiving this email because you recently created a new Postman account or added a new email address. If this wasn’t you, please ignore this email.</p></td></tr></tbody></table></td></tr></tbody></table>', 'Now', 'true', 'Error: Invalid login: 535-5.7.8 Username and Password not accepted. Learn more at\n535 5.7.8  https://support.google.com/mail/?p=BadCredentials w15-20020a63474f000000b0054fdb351718sm4185512pgk.29 - gsmtp', '2023-06-16 11:45:56', '2023-6-16', '17:15', 5),
(47, 6, 'sumanshivprakash742@gmail.com', 'alex44@yopmail.com', 'Postman', '<table width=\"100\\%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"m_4449668701611399010container\" style=\"border-collapse:collapse;width:100\\%;min-width:100\\%;height:auto\"><tbody><tr><td width=\"100\\%\" valign=\"top\" bgcolor=\"#ffffff\" style=\"padding-top:20px\"><table width=\"580\" class=\"m_4449668701611399010deviceWidth\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" bgcolor=\"#ffffff\" style=\"border-collapse:collapse;margin:0 auto\"><tbody><tr><td valign=\"top\" align=\"center\" style=\"padding:0\" bgcolor=\"#ffffff\"><a href=\"https://links.getpostman.com/ls/click?upn=3y7nOEZSJOF1v-2Fv7UyshsA0slPDVAWp38fB5IEChtheu3bOEbgreuzlgz5zViNwH8xZ9_Ok13fD09FJNSr5My2iE2o6TOtFlJamVAkBBRlAIaekfKHvmA7SMTWELU4G21lRyXsXfqH3M8IZinE8o1ftpuGUQlDrQ9AwNZL7wbEYH0XszilvnNFPvA0p-2B0Dg14n9I-2FvV-2Fkm8o41NSr-2FZJo-2Bqsds3C6iUvBci6uDov6R854TsWYhM9ncIQcniyAoOlqYK2fwgZgzN7sRLDKjVe-2BNU2U6zKgy7koBqN75N0kogwrrOedM2ReskL96iFiFTwOZFk1lqmnRtvWwL3clPWdPZe9irmlbVKz5CVLn68eXCiPkrbD3M0pFDskaZGDRPuS4mhFGPNwdC3yyBR9cb2VEw9C9K80t-2BWTx7gZcOWXcOf-2BzBkAy6gzE7qnAUBCENHx3yLE\" target=\"_blank\" data-saferedirecturl=\"https://www.google.com/url?q=https://links.getpostman.com/ls/click?upn\\%3D3y7nOEZSJOF1v-2Fv7UyshsA0slPDVAWp38fB5IEChtheu3bOEbgreuzlgz5zViNwH8xZ9_Ok13fD09FJNSr5My2iE2o6TOtFlJamVAkBBRlAIaekfKHvmA7SMTWELU4G21lRyXsXfqH3M8IZinE8o1ftpuGUQlDrQ9AwNZL7wbEYH0XszilvnNFPvA0p-2B0Dg14n9I-2FvV-2Fkm8o41NSr-2FZJo-2Bqsds3C6iUvBci6uDov6R854TsWYhM9ncIQcniyAoOlqYK2fwgZgzN7sRLDKjVe-2BNU2U6zKgy7koBqN75N0kogwrrOedM2ReskL96iFiFTwOZFk1lqmnRtvWwL3clPWdPZe9irmlbVKz5CVLn68eXCiPkrbD3M0pFDskaZGDRPuS4mhFGPNwdC3yyBR9cb2VEw9C9K80t-2BWTx7gZcOWXcOf-2BzBkAy6gzE7qnAUBCENHx3yLE&amp;source=gmail&amp;ust=1685864307216000&amp;usg=AOvVaw2Kahkwcp6xWZWuw8HaZbTa\"><img class=\"m_4449668701611399010deviceWidth CToWUd\" src=\"https://ci6.googleusercontent.com/proxy/cbLkq9b3rrQO0cgPhXrrjcrlLLhKJSWzVagEd49My6fHYkwEfjjaHkwVVBDqgnFVBMl__oFR4ZrIPaztu1mQtUHazbnsaipriZ-DHpdeOh34zrs6SNWtibheKhs=s0-d-e1-ft#https://pages.getpostman.com/rs/067-UMD-991/images/pm-logo-horiz\\%402x.png\" alt=\"\" border=\"0\" width=\"125\" style=\"display:block\" data-bit=\"iit\"></a></td></tr><tr><td valign=\"top\" align=\"center\" style=\"padding:0\" bgcolor=\"#ffffff\"><a href=\"https://links.getpostman.com/ls/click?upn=3y7nOEZSJOF1v-2Fv7UyshsA0slPDVAWp38fB5IEChtheu3bOEbgreuzlgz5zViNwHsQp2_Ok13fD09FJNSr5My2iE2o6TOtFlJamVAkBBRlAIaekfKHvmA7SMTWELU4G21lRyXsXfqH3M8IZinE8o1ftpuGUQlDrQ9AwNZL7wbEYH0XszilvnNFPvA0p-2B0Dg14n9I-2FvV-2Fkm8o41NSr-2FZJo-2Bqsds3C6iUvBci6uDov6R854TsUPFd4A61l5cI665IU4qTW8hDtrIOUuHFAo7VMPcFqgSmoVg0svy9WJmVAlU-2FO2tO-2B2Kf71e8hLwiSTmqslZsTk1Ju3xthDD1-2F072JOD04MSSzZNnKFO0MZ5WuWRLgEquhS-2B14dynJubXPWbQVM4Jb1inLqKxYRa1XmsVmM20PQyuUo4AknKxc0dyLaNQhNEMVVJ3uP-2Biq7KvILg-2BYOiUEP\" target=\"_blank\" data-saferedirecturl=\"https://www.google.com/url?q=https://links.getpostman.com/ls/click?upn\\%3D3y7nOEZSJOF1v-2Fv7UyshsA0slPDVAWp38fB5IEChtheu3bOEbgreuzlgz5zViNwHsQp2_Ok13fD09FJNSr5My2iE2o6TOtFlJamVAkBBRlAIaekfKHvmA7SMTWELU4G21lRyXsXfqH3M8IZinE8o1ftpuGUQlDrQ9AwNZL7wbEYH0XszilvnNFPvA0p-2B0Dg14n9I-2FvV-2Fkm8o41NSr-2FZJo-2Bqsds3C6iUvBci6uDov6R854TsUPFd4A61l5cI665IU4qTW8hDtrIOUuHFAo7VMPcFqgSmoVg0svy9WJmVAlU-2FO2tO-2B2Kf71e8hLwiSTmqslZsTk1Ju3xthDD1-2F072JOD04MSSzZNnKFO0MZ5WuWRLgEquhS-2B14dynJubXPWbQVM4Jb1inLqKxYRa1XmsVmM20PQyuUo4AknKxc0dyLaNQhNEMVVJ3uP-2Biq7KvILg-2BYOiUEP&amp;source=gmail&amp;ust=1685864307216000&amp;usg=AOvVaw2CPvjfMp1shOLv8ekPIdm_\"><img class=\"m_4449668701611399010deviceWidth CToWUd\" src=\"https://ci5.googleusercontent.com/proxy/pDGWk03BqKkh63AxQc-d15HEeL5IOBZpAwlyX-4De7rDW56QxQ4RV-_0LNG9chGBQ3fnckiJ8DueBwiRqMp8EK3rib-SIuE9oFKLf5xMRDNaNdiOigozxdg=s0-d-e1-ft#https://pages.getpostman.com/rs/067-UMD-991/images/wave-hello\\%403x.png\" alt=\"\" border=\"0\" width=\"200\" style=\"display:block;margin-top:30px\" data-bit=\"iit\"></a></td></tr><tr><td style=\"font-size:13px;color:#282828;font-weight:400;text-align:left;font-family:\'Open Sans\',sans-serif;line-height:24px;vertical-align:top;padding:15px 8px 10px 8px\" bgcolor=\"#ffffff\"><h1 style=\"font-weight:600;margin:30px 0 50px 0;text-align:center\">Welcome to Postman!</h1><p>You’re just one click away from getting started with Postman. All you need to do is verify your email address to activate your Postman account.</p><a href=\"https://links.getpostman.com/ls/click?upn=3y7nOEZSJOF1v-2Fv7UyshsClw6pSPp9j71m85zYfrmPeMkrjqit7zxHzsvknXb2TWV-2Flti2JHfwZCEvZZI4kGT5YLeJfmlsf-2BkLAkpXxOg535VAcwcpYq3Y995dPrNv7OxoEd_Ok13fD09FJNSr5My2iE2o6TOtFlJamVAkBBRlAIaekfKHvmA7SMTWELU4G21lRyXsXfqH3M8IZinE8o1ftpuGUQlDrQ9AwNZL7wbEYH0XszilvnNFPvA0p-2B0Dg14n9I-2FvV-2Fkm8o41NSr-2FZJo-2Bqsds3C6iUvBci6uDov6R854TsWpgJpxQsnYqM63ENMC6uKAmiXeyrzepymXFiR5fDsZcQ4NJijUybZMXFOgqLB-2Fo8nctrA0S4hLC9wAfpxmsUrkaut2vfWe9sDJaPGKOaTTuW8riA92xOTBK7cel67AOx4EB2Vmtf0zraL52lVB9o0-2FQkbaJ9HA4zx5kGL4uRU3nGBedNGjQz7Aa0OAh2wzcjIbohjjn-2FN9nFbsjXp7EQIh\" style=\"padding:10px;width:300px;display:block;text-decoration:none;border:1px solid #ff6c37;font-weight:700;font-size:14px;font-family:\'Open Sans\',sans-serif;color:#fff;background:#ff6c37;border-radius:5px;line-height:17px;margin:0 auto;text-align:center\" target=\"_blank\" data-saferedirecturl=\"https://www.google.com/url?q=https://links.getpostman.com/ls/click?upn\\%3D3y7nOEZSJOF1v-2Fv7UyshsClw6pSPp9j71m85zYfrmPeMkrjqit7zxHzsvknXb2TWV-2Flti2JHfwZCEvZZI4kGT5YLeJfmlsf-2BkLAkpXxOg535VAcwcpYq3Y995dPrNv7OxoEd_Ok13fD09FJNSr5My2iE2o6TOtFlJamVAkBBRlAIaekfKHvmA7SMTWELU4G21lRyXsXfqH3M8IZinE8o1ftpuGUQlDrQ9AwNZL7wbEYH0XszilvnNFPvA0p-2B0Dg14n9I-2FvV-2Fkm8o41NSr-2FZJo-2Bqsds3C6iUvBci6uDov6R854TsWpgJpxQsnYqM63ENMC6uKAmiXeyrzepymXFiR5fDsZcQ4NJijUybZMXFOgqLB-2Fo8nctrA0S4hLC9wAfpxmsUrkaut2vfWe9sDJaPGKOaTTuW8riA92xOTBK7cel67AOx4EB2Vmtf0zraL52lVB9o0-2FQkbaJ9HA4zx5kGL4uRU3nGBedNGjQz7Aa0OAh2wzcjIbohjjn-2FN9nFbsjXp7EQIh&amp;source=gmail&amp;ust=1685864307216000&amp;usg=AOvVaw1gSa9sYEI6WYlLy0-sbx4J\">Confirm My Email</a><p>Once your account is activated, you can start using all of Postman’s features to organize, test, monitor, and share your API requests.</p><p>You’re receiving this email because you recently created a new Postman account or added a new email address. If this wasn’t you, please ignore this email.</p></td></tr></tbody></table></td></tr></tbody></table>', 'Now', 'true', 'Error: Invalid login: 535-5.7.8 Username and Password not accepted. Learn more at\n535 5.7.8  https://support.google.com/mail/?p=BadCredentials f11-20020aa782cb000000b00571cdbd0771sm13428369pfn.102 - gsmtp', '2023-06-16 11:46:02', '2023-6-16', '17:15', 5),
(48, 11, 'sumanshivprakash742@gmail.com', 'ravindra825@yopmail.com', 'Admin', '<table width=\"100\\%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"m_4449668701611399010container\" style=\"border-collapse:collapse;width:100\\%;min-width:100\\%;height:auto\"><tbody><tr><td width=\"100\\%\" valign=\"top\" bgcolor=\"#ffffff\" style=\"padding-top:20px\"><table width=\"580\" class=\"m_4449668701611399010deviceWidth\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" bgcolor=\"#ffffff\" style=\"border-collapse:collapse;margin:0 auto\"><tbody><tr><td valign=\"top\" align=\"center\" style=\"padding:0\" bgcolor=\"#ffffff\"><a href=\"https://links.getpostman.com/ls/click?upn=3y7nOEZSJOF1v-2Fv7UyshsA0slPDVAWp38fB5IEChtheu3bOEbgreuzlgz5zViNwH8xZ9_Ok13fD09FJNSr5My2iE2o6TOtFlJamVAkBBRlAIaekfKHvmA7SMTWELU4G21lRyXsXfqH3M8IZinE8o1ftpuGUQlDrQ9AwNZL7wbEYH0XszilvnNFPvA0p-2B0Dg14n9I-2FvV-2Fkm8o41NSr-2FZJo-2Bqsds3C6iUvBci6uDov6R854TsWYhM9ncIQcniyAoOlqYK2fwgZgzN7sRLDKjVe-2BNU2U6zKgy7koBqN75N0kogwrrOedM2ReskL96iFiFTwOZFk1lqmnRtvWwL3clPWdPZe9irmlbVKz5CVLn68eXCiPkrbD3M0pFDskaZGDRPuS4mhFGPNwdC3yyBR9cb2VEw9C9K80t-2BWTx7gZcOWXcOf-2BzBkAy6gzE7qnAUBCENHx3yLE\" target=\"_blank\" data-saferedirecturl=\"https://www.google.com/url?q=https://links.getpostman.com/ls/click?upn\\%3D3y7nOEZSJOF1v-2Fv7UyshsA0slPDVAWp38fB5IEChtheu3bOEbgreuzlgz5zViNwH8xZ9_Ok13fD09FJNSr5My2iE2o6TOtFlJamVAkBBRlAIaekfKHvmA7SMTWELU4G21lRyXsXfqH3M8IZinE8o1ftpuGUQlDrQ9AwNZL7wbEYH0XszilvnNFPvA0p-2B0Dg14n9I-2FvV-2Fkm8o41NSr-2FZJo-2Bqsds3C6iUvBci6uDov6R854TsWYhM9ncIQcniyAoOlqYK2fwgZgzN7sRLDKjVe-2BNU2U6zKgy7koBqN75N0kogwrrOedM2ReskL96iFiFTwOZFk1lqmnRtvWwL3clPWdPZe9irmlbVKz5CVLn68eXCiPkrbD3M0pFDskaZGDRPuS4mhFGPNwdC3yyBR9cb2VEw9C9K80t-2BWTx7gZcOWXcOf-2BzBkAy6gzE7qnAUBCENHx3yLE&amp;source=gmail&amp;ust=1685864307216000&amp;usg=AOvVaw2Kahkwcp6xWZWuw8HaZbTa\"><img class=\"m_4449668701611399010deviceWidth CToWUd\" src=\"https://ci6.googleusercontent.com/proxy/cbLkq9b3rrQO0cgPhXrrjcrlLLhKJSWzVagEd49My6fHYkwEfjjaHkwVVBDqgnFVBMl__oFR4ZrIPaztu1mQtUHazbnsaipriZ-DHpdeOh34zrs6SNWtibheKhs=s0-d-e1-ft#https://pages.getpostman.com/rs/067-UMD-991/images/pm-logo-horiz\\%402x.png\" alt=\"\" border=\"0\" width=\"125\" style=\"display:block\" data-bit=\"iit\"></a></td></tr><tr><td valign=\"top\" align=\"center\" style=\"padding:0\" bgcolor=\"#ffffff\"><a href=\"https://links.getpostman.com/ls/click?upn=3y7nOEZSJOF1v-2Fv7UyshsA0slPDVAWp38fB5IEChtheu3bOEbgreuzlgz5zViNwHsQp2_Ok13fD09FJNSr5My2iE2o6TOtFlJamVAkBBRlAIaekfKHvmA7SMTWELU4G21lRyXsXfqH3M8IZinE8o1ftpuGUQlDrQ9AwNZL7wbEYH0XszilvnNFPvA0p-2B0Dg14n9I-2FvV-2Fkm8o41NSr-2FZJo-2Bqsds3C6iUvBci6uDov6R854TsUPFd4A61l5cI665IU4qTW8hDtrIOUuHFAo7VMPcFqgSmoVg0svy9WJmVAlU-2FO2tO-2B2Kf71e8hLwiSTmqslZsTk1Ju3xthDD1-2F072JOD04MSSzZNnKFO0MZ5WuWRLgEquhS-2B14dynJubXPWbQVM4Jb1inLqKxYRa1XmsVmM20PQyuUo4AknKxc0dyLaNQhNEMVVJ3uP-2Biq7KvILg-2BYOiUEP\" target=\"_blank\" data-saferedirecturl=\"https://www.google.com/url?q=https://links.getpostman.com/ls/click?upn\\%3D3y7nOEZSJOF1v-2Fv7UyshsA0slPDVAWp38fB5IEChtheu3bOEbgreuzlgz5zViNwHsQp2_Ok13fD09FJNSr5My2iE2o6TOtFlJamVAkBBRlAIaekfKHvmA7SMTWELU4G21lRyXsXfqH3M8IZinE8o1ftpuGUQlDrQ9AwNZL7wbEYH0XszilvnNFPvA0p-2B0Dg14n9I-2FvV-2Fkm8o41NSr-2FZJo-2Bqsds3C6iUvBci6uDov6R854TsUPFd4A61l5cI665IU4qTW8hDtrIOUuHFAo7VMPcFqgSmoVg0svy9WJmVAlU-2FO2tO-2B2Kf71e8hLwiSTmqslZsTk1Ju3xthDD1-2F072JOD04MSSzZNnKFO0MZ5WuWRLgEquhS-2B14dynJubXPWbQVM4Jb1inLqKxYRa1XmsVmM20PQyuUo4AknKxc0dyLaNQhNEMVVJ3uP-2Biq7KvILg-2BYOiUEP&amp;source=gmail&amp;ust=1685864307216000&amp;usg=AOvVaw2CPvjfMp1shOLv8ekPIdm_\"><img class=\"m_4449668701611399010deviceWidth CToWUd\" src=\"https://ci5.googleusercontent.com/proxy/pDGWk03BqKkh63AxQc-d15HEeL5IOBZpAwlyX-4De7rDW56QxQ4RV-_0LNG9chGBQ3fnckiJ8DueBwiRqMp8EK3rib-SIuE9oFKLf5xMRDNaNdiOigozxdg=s0-d-e1-ft#https://pages.getpostman.com/rs/067-UMD-991/images/wave-hello\\%403x.png\" alt=\"\" border=\"0\" width=\"200\" style=\"display:block;margin-top:30px\" data-bit=\"iit\"></a></td></tr><tr><td style=\"font-size:13px;color:#282828;font-weight:400;text-align:left;font-family:\'Open Sans\',sans-serif;line-height:24px;vertical-align:top;padding:15px 8px 10px 8px\" bgcolor=\"#ffffff\"><h1 style=\"font-weight:600;margin:30px 0 50px 0;text-align:center\">Welcome to Postman!</h1><p>You’re just one click away from getting started with Postman. All you need to do is verify your email address to activate your Postman account.</p><a href=\"https://links.getpostman.com/ls/click?upn=3y7nOEZSJOF1v-2Fv7UyshsClw6pSPp9j71m85zYfrmPeMkrjqit7zxHzsvknXb2TWV-2Flti2JHfwZCEvZZI4kGT5YLeJfmlsf-2BkLAkpXxOg535VAcwcpYq3Y995dPrNv7OxoEd_Ok13fD09FJNSr5My2iE2o6TOtFlJamVAkBBRlAIaekfKHvmA7SMTWELU4G21lRyXsXfqH3M8IZinE8o1ftpuGUQlDrQ9AwNZL7wbEYH0XszilvnNFPvA0p-2B0Dg14n9I-2FvV-2Fkm8o41NSr-2FZJo-2Bqsds3C6iUvBci6uDov6R854TsWpgJpxQsnYqM63ENMC6uKAmiXeyrzepymXFiR5fDsZcQ4NJijUybZMXFOgqLB-2Fo8nctrA0S4hLC9wAfpxmsUrkaut2vfWe9sDJaPGKOaTTuW8riA92xOTBK7cel67AOx4EB2Vmtf0zraL52lVB9o0-2FQkbaJ9HA4zx5kGL4uRU3nGBedNGjQz7Aa0OAh2wzcjIbohjjn-2FN9nFbsjXp7EQIh\" style=\"padding:10px;width:300px;display:block;text-decoration:none;border:1px solid #ff6c37;font-weight:700;font-size:14px;font-family:\'Open Sans\',sans-serif;color:#fff;background:#ff6c37;border-radius:5px;line-height:17px;margin:0 auto;text-align:center\" target=\"_blank\" data-saferedirecturl=\"https://www.google.com/url?q=https://links.getpostman.com/ls/click?upn\\%3D3y7nOEZSJOF1v-2Fv7UyshsClw6pSPp9j71m85zYfrmPeMkrjqit7zxHzsvknXb2TWV-2Flti2JHfwZCEvZZI4kGT5YLeJfmlsf-2BkLAkpXxOg535VAcwcpYq3Y995dPrNv7OxoEd_Ok13fD09FJNSr5My2iE2o6TOtFlJamVAkBBRlAIaekfKHvmA7SMTWELU4G21lRyXsXfqH3M8IZinE8o1ftpuGUQlDrQ9AwNZL7wbEYH0XszilvnNFPvA0p-2B0Dg14n9I-2FvV-2Fkm8o41NSr-2FZJo-2Bqsds3C6iUvBci6uDov6R854TsWpgJpxQsnYqM63ENMC6uKAmiXeyrzepymXFiR5fDsZcQ4NJijUybZMXFOgqLB-2Fo8nctrA0S4hLC9wAfpxmsUrkaut2vfWe9sDJaPGKOaTTuW8riA92xOTBK7cel67AOx4EB2Vmtf0zraL52lVB9o0-2FQkbaJ9HA4zx5kGL4uRU3nGBedNGjQz7Aa0OAh2wzcjIbohjjn-2FN9nFbsjXp7EQIh&amp;source=gmail&amp;ust=1685864307216000&amp;usg=AOvVaw1gSa9sYEI6WYlLy0-sbx4J\">Confirm My Email</a><p>Once your account is activated, you can start using all of Postman’s features to organize, test, monitor, and share your API requests.</p><p>You’re receiving this email because you recently created a new Postman account or added a new email address. If this wasn’t you, please ignore this email.</p></td></tr></tbody></table></td></tr></tbody></table>', 'TimeSet', 'true', '', '2023-07-26 10:16:31', '2023-7-26', '15:46', NULL),
(49, 11, 'sumanshivprakash742@gmail.com', 'ayush5454@yopmail.com', 'Admin', '<table width=\"100\\%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"m_4449668701611399010container\" style=\"border-collapse:collapse;width:100\\%;min-width:100\\%;height:auto\"><tbody><tr><td width=\"100\\%\" valign=\"top\" bgcolor=\"#ffffff\" style=\"padding-top:20px\"><table width=\"580\" class=\"m_4449668701611399010deviceWidth\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" bgcolor=\"#ffffff\" style=\"border-collapse:collapse;margin:0 auto\"><tbody><tr><td valign=\"top\" align=\"center\" style=\"padding:0\" bgcolor=\"#ffffff\"><a href=\"https://links.getpostman.com/ls/click?upn=3y7nOEZSJOF1v-2Fv7UyshsA0slPDVAWp38fB5IEChtheu3bOEbgreuzlgz5zViNwH8xZ9_Ok13fD09FJNSr5My2iE2o6TOtFlJamVAkBBRlAIaekfKHvmA7SMTWELU4G21lRyXsXfqH3M8IZinE8o1ftpuGUQlDrQ9AwNZL7wbEYH0XszilvnNFPvA0p-2B0Dg14n9I-2FvV-2Fkm8o41NSr-2FZJo-2Bqsds3C6iUvBci6uDov6R854TsWYhM9ncIQcniyAoOlqYK2fwgZgzN7sRLDKjVe-2BNU2U6zKgy7koBqN75N0kogwrrOedM2ReskL96iFiFTwOZFk1lqmnRtvWwL3clPWdPZe9irmlbVKz5CVLn68eXCiPkrbD3M0pFDskaZGDRPuS4mhFGPNwdC3yyBR9cb2VEw9C9K80t-2BWTx7gZcOWXcOf-2BzBkAy6gzE7qnAUBCENHx3yLE\" target=\"_blank\" data-saferedirecturl=\"https://www.google.com/url?q=https://links.getpostman.com/ls/click?upn\\%3D3y7nOEZSJOF1v-2Fv7UyshsA0slPDVAWp38fB5IEChtheu3bOEbgreuzlgz5zViNwH8xZ9_Ok13fD09FJNSr5My2iE2o6TOtFlJamVAkBBRlAIaekfKHvmA7SMTWELU4G21lRyXsXfqH3M8IZinE8o1ftpuGUQlDrQ9AwNZL7wbEYH0XszilvnNFPvA0p-2B0Dg14n9I-2FvV-2Fkm8o41NSr-2FZJo-2Bqsds3C6iUvBci6uDov6R854TsWYhM9ncIQcniyAoOlqYK2fwgZgzN7sRLDKjVe-2BNU2U6zKgy7koBqN75N0kogwrrOedM2ReskL96iFiFTwOZFk1lqmnRtvWwL3clPWdPZe9irmlbVKz5CVLn68eXCiPkrbD3M0pFDskaZGDRPuS4mhFGPNwdC3yyBR9cb2VEw9C9K80t-2BWTx7gZcOWXcOf-2BzBkAy6gzE7qnAUBCENHx3yLE&amp;source=gmail&amp;ust=1685864307216000&amp;usg=AOvVaw2Kahkwcp6xWZWuw8HaZbTa\"><img class=\"m_4449668701611399010deviceWidth CToWUd\" src=\"https://ci6.googleusercontent.com/proxy/cbLkq9b3rrQO0cgPhXrrjcrlLLhKJSWzVagEd49My6fHYkwEfjjaHkwVVBDqgnFVBMl__oFR4ZrIPaztu1mQtUHazbnsaipriZ-DHpdeOh34zrs6SNWtibheKhs=s0-d-e1-ft#https://pages.getpostman.com/rs/067-UMD-991/images/pm-logo-horiz\\%402x.png\" alt=\"\" border=\"0\" width=\"125\" style=\"display:block\" data-bit=\"iit\"></a></td></tr><tr><td valign=\"top\" align=\"center\" style=\"padding:0\" bgcolor=\"#ffffff\"><a href=\"https://links.getpostman.com/ls/click?upn=3y7nOEZSJOF1v-2Fv7UyshsA0slPDVAWp38fB5IEChtheu3bOEbgreuzlgz5zViNwHsQp2_Ok13fD09FJNSr5My2iE2o6TOtFlJamVAkBBRlAIaekfKHvmA7SMTWELU4G21lRyXsXfqH3M8IZinE8o1ftpuGUQlDrQ9AwNZL7wbEYH0XszilvnNFPvA0p-2B0Dg14n9I-2FvV-2Fkm8o41NSr-2FZJo-2Bqsds3C6iUvBci6uDov6R854TsUPFd4A61l5cI665IU4qTW8hDtrIOUuHFAo7VMPcFqgSmoVg0svy9WJmVAlU-2FO2tO-2B2Kf71e8hLwiSTmqslZsTk1Ju3xthDD1-2F072JOD04MSSzZNnKFO0MZ5WuWRLgEquhS-2B14dynJubXPWbQVM4Jb1inLqKxYRa1XmsVmM20PQyuUo4AknKxc0dyLaNQhNEMVVJ3uP-2Biq7KvILg-2BYOiUEP\" target=\"_blank\" data-saferedirecturl=\"https://www.google.com/url?q=https://links.getpostman.com/ls/click?upn\\%3D3y7nOEZSJOF1v-2Fv7UyshsA0slPDVAWp38fB5IEChtheu3bOEbgreuzlgz5zViNwHsQp2_Ok13fD09FJNSr5My2iE2o6TOtFlJamVAkBBRlAIaekfKHvmA7SMTWELU4G21lRyXsXfqH3M8IZinE8o1ftpuGUQlDrQ9AwNZL7wbEYH0XszilvnNFPvA0p-2B0Dg14n9I-2FvV-2Fkm8o41NSr-2FZJo-2Bqsds3C6iUvBci6uDov6R854TsUPFd4A61l5cI665IU4qTW8hDtrIOUuHFAo7VMPcFqgSmoVg0svy9WJmVAlU-2FO2tO-2B2Kf71e8hLwiSTmqslZsTk1Ju3xthDD1-2F072JOD04MSSzZNnKFO0MZ5WuWRLgEquhS-2B14dynJubXPWbQVM4Jb1inLqKxYRa1XmsVmM20PQyuUo4AknKxc0dyLaNQhNEMVVJ3uP-2Biq7KvILg-2BYOiUEP&amp;source=gmail&amp;ust=1685864307216000&amp;usg=AOvVaw2CPvjfMp1shOLv8ekPIdm_\"><img class=\"m_4449668701611399010deviceWidth CToWUd\" src=\"https://ci5.googleusercontent.com/proxy/pDGWk03BqKkh63AxQc-d15HEeL5IOBZpAwlyX-4De7rDW56QxQ4RV-_0LNG9chGBQ3fnckiJ8DueBwiRqMp8EK3rib-SIuE9oFKLf5xMRDNaNdiOigozxdg=s0-d-e1-ft#https://pages.getpostman.com/rs/067-UMD-991/images/wave-hello\\%403x.png\" alt=\"\" border=\"0\" width=\"200\" style=\"display:block;margin-top:30px\" data-bit=\"iit\"></a></td></tr><tr><td style=\"font-size:13px;color:#282828;font-weight:400;text-align:left;font-family:\'Open Sans\',sans-serif;line-height:24px;vertical-align:top;padding:15px 8px 10px 8px\" bgcolor=\"#ffffff\"><h1 style=\"font-weight:600;margin:30px 0 50px 0;text-align:center\">Welcome to Postman!</h1><p>You’re just one click away from getting started with Postman. All you need to do is verify your email address to activate your Postman account.</p><a href=\"https://links.getpostman.com/ls/click?upn=3y7nOEZSJOF1v-2Fv7UyshsClw6pSPp9j71m85zYfrmPeMkrjqit7zxHzsvknXb2TWV-2Flti2JHfwZCEvZZI4kGT5YLeJfmlsf-2BkLAkpXxOg535VAcwcpYq3Y995dPrNv7OxoEd_Ok13fD09FJNSr5My2iE2o6TOtFlJamVAkBBRlAIaekfKHvmA7SMTWELU4G21lRyXsXfqH3M8IZinE8o1ftpuGUQlDrQ9AwNZL7wbEYH0XszilvnNFPvA0p-2B0Dg14n9I-2FvV-2Fkm8o41NSr-2FZJo-2Bqsds3C6iUvBci6uDov6R854TsWpgJpxQsnYqM63ENMC6uKAmiXeyrzepymXFiR5fDsZcQ4NJijUybZMXFOgqLB-2Fo8nctrA0S4hLC9wAfpxmsUrkaut2vfWe9sDJaPGKOaTTuW8riA92xOTBK7cel67AOx4EB2Vmtf0zraL52lVB9o0-2FQkbaJ9HA4zx5kGL4uRU3nGBedNGjQz7Aa0OAh2wzcjIbohjjn-2FN9nFbsjXp7EQIh\" style=\"padding:10px;width:300px;display:block;text-decoration:none;border:1px solid #ff6c37;font-weight:700;font-size:14px;font-family:\'Open Sans\',sans-serif;color:#fff;background:#ff6c37;border-radius:5px;line-height:17px;margin:0 auto;text-align:center\" target=\"_blank\" data-saferedirecturl=\"https://www.google.com/url?q=https://links.getpostman.com/ls/click?upn\\%3D3y7nOEZSJOF1v-2Fv7UyshsClw6pSPp9j71m85zYfrmPeMkrjqit7zxHzsvknXb2TWV-2Flti2JHfwZCEvZZI4kGT5YLeJfmlsf-2BkLAkpXxOg535VAcwcpYq3Y995dPrNv7OxoEd_Ok13fD09FJNSr5My2iE2o6TOtFlJamVAkBBRlAIaekfKHvmA7SMTWELU4G21lRyXsXfqH3M8IZinE8o1ftpuGUQlDrQ9AwNZL7wbEYH0XszilvnNFPvA0p-2B0Dg14n9I-2FvV-2Fkm8o41NSr-2FZJo-2Bqsds3C6iUvBci6uDov6R854TsWpgJpxQsnYqM63ENMC6uKAmiXeyrzepymXFiR5fDsZcQ4NJijUybZMXFOgqLB-2Fo8nctrA0S4hLC9wAfpxmsUrkaut2vfWe9sDJaPGKOaTTuW8riA92xOTBK7cel67AOx4EB2Vmtf0zraL52lVB9o0-2FQkbaJ9HA4zx5kGL4uRU3nGBedNGjQz7Aa0OAh2wzcjIbohjjn-2FN9nFbsjXp7EQIh&amp;source=gmail&amp;ust=1685864307216000&amp;usg=AOvVaw1gSa9sYEI6WYlLy0-sbx4J\">Confirm My Email</a><p>Once your account is activated, you can start using all of Postman’s features to organize, test, monitor, and share your API requests.</p><p>You’re receiving this email because you recently created a new Postman account or added a new email address. If this wasn’t you, please ignore this email.</p></td></tr></tbody></table></td></tr></tbody></table>', 'TimeSet', 'true', '', '2023-07-26 10:16:31', '2023-7-26', '15:46', NULL),
(50, 11, 'sumanshivprakash742@gmail.com', 'bhagya888@yopmail.com', 'Admin', '<table width=\"100\\%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"m_4449668701611399010container\" style=\"border-collapse:collapse;width:100\\%;min-width:100\\%;height:auto\"><tbody><tr><td width=\"100\\%\" valign=\"top\" bgcolor=\"#ffffff\" style=\"padding-top:20px\"><table width=\"580\" class=\"m_4449668701611399010deviceWidth\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" bgcolor=\"#ffffff\" style=\"border-collapse:collapse;margin:0 auto\"><tbody><tr><td valign=\"top\" align=\"center\" style=\"padding:0\" bgcolor=\"#ffffff\"><a href=\"https://links.getpostman.com/ls/click?upn=3y7nOEZSJOF1v-2Fv7UyshsA0slPDVAWp38fB5IEChtheu3bOEbgreuzlgz5zViNwH8xZ9_Ok13fD09FJNSr5My2iE2o6TOtFlJamVAkBBRlAIaekfKHvmA7SMTWELU4G21lRyXsXfqH3M8IZinE8o1ftpuGUQlDrQ9AwNZL7wbEYH0XszilvnNFPvA0p-2B0Dg14n9I-2FvV-2Fkm8o41NSr-2FZJo-2Bqsds3C6iUvBci6uDov6R854TsWYhM9ncIQcniyAoOlqYK2fwgZgzN7sRLDKjVe-2BNU2U6zKgy7koBqN75N0kogwrrOedM2ReskL96iFiFTwOZFk1lqmnRtvWwL3clPWdPZe9irmlbVKz5CVLn68eXCiPkrbD3M0pFDskaZGDRPuS4mhFGPNwdC3yyBR9cb2VEw9C9K80t-2BWTx7gZcOWXcOf-2BzBkAy6gzE7qnAUBCENHx3yLE\" target=\"_blank\" data-saferedirecturl=\"https://www.google.com/url?q=https://links.getpostman.com/ls/click?upn\\%3D3y7nOEZSJOF1v-2Fv7UyshsA0slPDVAWp38fB5IEChtheu3bOEbgreuzlgz5zViNwH8xZ9_Ok13fD09FJNSr5My2iE2o6TOtFlJamVAkBBRlAIaekfKHvmA7SMTWELU4G21lRyXsXfqH3M8IZinE8o1ftpuGUQlDrQ9AwNZL7wbEYH0XszilvnNFPvA0p-2B0Dg14n9I-2FvV-2Fkm8o41NSr-2FZJo-2Bqsds3C6iUvBci6uDov6R854TsWYhM9ncIQcniyAoOlqYK2fwgZgzN7sRLDKjVe-2BNU2U6zKgy7koBqN75N0kogwrrOedM2ReskL96iFiFTwOZFk1lqmnRtvWwL3clPWdPZe9irmlbVKz5CVLn68eXCiPkrbD3M0pFDskaZGDRPuS4mhFGPNwdC3yyBR9cb2VEw9C9K80t-2BWTx7gZcOWXcOf-2BzBkAy6gzE7qnAUBCENHx3yLE&amp;source=gmail&amp;ust=1685864307216000&amp;usg=AOvVaw2Kahkwcp6xWZWuw8HaZbTa\"><img class=\"m_4449668701611399010deviceWidth CToWUd\" src=\"https://ci6.googleusercontent.com/proxy/cbLkq9b3rrQO0cgPhXrrjcrlLLhKJSWzVagEd49My6fHYkwEfjjaHkwVVBDqgnFVBMl__oFR4ZrIPaztu1mQtUHazbnsaipriZ-DHpdeOh34zrs6SNWtibheKhs=s0-d-e1-ft#https://pages.getpostman.com/rs/067-UMD-991/images/pm-logo-horiz\\%402x.png\" alt=\"\" border=\"0\" width=\"125\" style=\"display:block\" data-bit=\"iit\"></a></td></tr><tr><td valign=\"top\" align=\"center\" style=\"padding:0\" bgcolor=\"#ffffff\"><a href=\"https://links.getpostman.com/ls/click?upn=3y7nOEZSJOF1v-2Fv7UyshsA0slPDVAWp38fB5IEChtheu3bOEbgreuzlgz5zViNwHsQp2_Ok13fD09FJNSr5My2iE2o6TOtFlJamVAkBBRlAIaekfKHvmA7SMTWELU4G21lRyXsXfqH3M8IZinE8o1ftpuGUQlDrQ9AwNZL7wbEYH0XszilvnNFPvA0p-2B0Dg14n9I-2FvV-2Fkm8o41NSr-2FZJo-2Bqsds3C6iUvBci6uDov6R854TsUPFd4A61l5cI665IU4qTW8hDtrIOUuHFAo7VMPcFqgSmoVg0svy9WJmVAlU-2FO2tO-2B2Kf71e8hLwiSTmqslZsTk1Ju3xthDD1-2F072JOD04MSSzZNnKFO0MZ5WuWRLgEquhS-2B14dynJubXPWbQVM4Jb1inLqKxYRa1XmsVmM20PQyuUo4AknKxc0dyLaNQhNEMVVJ3uP-2Biq7KvILg-2BYOiUEP\" target=\"_blank\" data-saferedirecturl=\"https://www.google.com/url?q=https://links.getpostman.com/ls/click?upn\\%3D3y7nOEZSJOF1v-2Fv7UyshsA0slPDVAWp38fB5IEChtheu3bOEbgreuzlgz5zViNwHsQp2_Ok13fD09FJNSr5My2iE2o6TOtFlJamVAkBBRlAIaekfKHvmA7SMTWELU4G21lRyXsXfqH3M8IZinE8o1ftpuGUQlDrQ9AwNZL7wbEYH0XszilvnNFPvA0p-2B0Dg14n9I-2FvV-2Fkm8o41NSr-2FZJo-2Bqsds3C6iUvBci6uDov6R854TsUPFd4A61l5cI665IU4qTW8hDtrIOUuHFAo7VMPcFqgSmoVg0svy9WJmVAlU-2FO2tO-2B2Kf71e8hLwiSTmqslZsTk1Ju3xthDD1-2F072JOD04MSSzZNnKFO0MZ5WuWRLgEquhS-2B14dynJubXPWbQVM4Jb1inLqKxYRa1XmsVmM20PQyuUo4AknKxc0dyLaNQhNEMVVJ3uP-2Biq7KvILg-2BYOiUEP&amp;source=gmail&amp;ust=1685864307216000&amp;usg=AOvVaw2CPvjfMp1shOLv8ekPIdm_\"><img class=\"m_4449668701611399010deviceWidth CToWUd\" src=\"https://ci5.googleusercontent.com/proxy/pDGWk03BqKkh63AxQc-d15HEeL5IOBZpAwlyX-4De7rDW56QxQ4RV-_0LNG9chGBQ3fnckiJ8DueBwiRqMp8EK3rib-SIuE9oFKLf5xMRDNaNdiOigozxdg=s0-d-e1-ft#https://pages.getpostman.com/rs/067-UMD-991/images/wave-hello\\%403x.png\" alt=\"\" border=\"0\" width=\"200\" style=\"display:block;margin-top:30px\" data-bit=\"iit\"></a></td></tr><tr><td style=\"font-size:13px;color:#282828;font-weight:400;text-align:left;font-family:\'Open Sans\',sans-serif;line-height:24px;vertical-align:top;padding:15px 8px 10px 8px\" bgcolor=\"#ffffff\"><h1 style=\"font-weight:600;margin:30px 0 50px 0;text-align:center\">Welcome to Postman!</h1><p>You’re just one click away from getting started with Postman. All you need to do is verify your email address to activate your Postman account.</p><a href=\"https://links.getpostman.com/ls/click?upn=3y7nOEZSJOF1v-2Fv7UyshsClw6pSPp9j71m85zYfrmPeMkrjqit7zxHzsvknXb2TWV-2Flti2JHfwZCEvZZI4kGT5YLeJfmlsf-2BkLAkpXxOg535VAcwcpYq3Y995dPrNv7OxoEd_Ok13fD09FJNSr5My2iE2o6TOtFlJamVAkBBRlAIaekfKHvmA7SMTWELU4G21lRyXsXfqH3M8IZinE8o1ftpuGUQlDrQ9AwNZL7wbEYH0XszilvnNFPvA0p-2B0Dg14n9I-2FvV-2Fkm8o41NSr-2FZJo-2Bqsds3C6iUvBci6uDov6R854TsWpgJpxQsnYqM63ENMC6uKAmiXeyrzepymXFiR5fDsZcQ4NJijUybZMXFOgqLB-2Fo8nctrA0S4hLC9wAfpxmsUrkaut2vfWe9sDJaPGKOaTTuW8riA92xOTBK7cel67AOx4EB2Vmtf0zraL52lVB9o0-2FQkbaJ9HA4zx5kGL4uRU3nGBedNGjQz7Aa0OAh2wzcjIbohjjn-2FN9nFbsjXp7EQIh\" style=\"padding:10px;width:300px;display:block;text-decoration:none;border:1px solid #ff6c37;font-weight:700;font-size:14px;font-family:\'Open Sans\',sans-serif;color:#fff;background:#ff6c37;border-radius:5px;line-height:17px;margin:0 auto;text-align:center\" target=\"_blank\" data-saferedirecturl=\"https://www.google.com/url?q=https://links.getpostman.com/ls/click?upn\\%3D3y7nOEZSJOF1v-2Fv7UyshsClw6pSPp9j71m85zYfrmPeMkrjqit7zxHzsvknXb2TWV-2Flti2JHfwZCEvZZI4kGT5YLeJfmlsf-2BkLAkpXxOg535VAcwcpYq3Y995dPrNv7OxoEd_Ok13fD09FJNSr5My2iE2o6TOtFlJamVAkBBRlAIaekfKHvmA7SMTWELU4G21lRyXsXfqH3M8IZinE8o1ftpuGUQlDrQ9AwNZL7wbEYH0XszilvnNFPvA0p-2B0Dg14n9I-2FvV-2Fkm8o41NSr-2FZJo-2Bqsds3C6iUvBci6uDov6R854TsWpgJpxQsnYqM63ENMC6uKAmiXeyrzepymXFiR5fDsZcQ4NJijUybZMXFOgqLB-2Fo8nctrA0S4hLC9wAfpxmsUrkaut2vfWe9sDJaPGKOaTTuW8riA92xOTBK7cel67AOx4EB2Vmtf0zraL52lVB9o0-2FQkbaJ9HA4zx5kGL4uRU3nGBedNGjQz7Aa0OAh2wzcjIbohjjn-2FN9nFbsjXp7EQIh&amp;source=gmail&amp;ust=1685864307216000&amp;usg=AOvVaw1gSa9sYEI6WYlLy0-sbx4J\">Confirm My Email</a><p>Once your account is activated, you can start using all of Postman’s features to organize, test, monitor, and share your API requests.</p><p>You’re receiving this email because you recently created a new Postman account or added a new email address. If this wasn’t you, please ignore this email.</p></td></tr></tbody></table></td></tr></tbody></table>', 'TimeSet', 'true', '', '2023-07-26 10:16:31', '2023-7-26', '15:46', NULL),
(51, 11, 'sumanshivprakash742@gmail.com', 'dev777@yopmail.com', 'Admin', '<table width=\"100\\%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"m_4449668701611399010container\" style=\"border-collapse:collapse;width:100\\%;min-width:100\\%;height:auto\"><tbody><tr><td width=\"100\\%\" valign=\"top\" bgcolor=\"#ffffff\" style=\"padding-top:20px\"><table width=\"580\" class=\"m_4449668701611399010deviceWidth\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" bgcolor=\"#ffffff\" style=\"border-collapse:collapse;margin:0 auto\"><tbody><tr><td valign=\"top\" align=\"center\" style=\"padding:0\" bgcolor=\"#ffffff\"><a href=\"https://links.getpostman.com/ls/click?upn=3y7nOEZSJOF1v-2Fv7UyshsA0slPDVAWp38fB5IEChtheu3bOEbgreuzlgz5zViNwH8xZ9_Ok13fD09FJNSr5My2iE2o6TOtFlJamVAkBBRlAIaekfKHvmA7SMTWELU4G21lRyXsXfqH3M8IZinE8o1ftpuGUQlDrQ9AwNZL7wbEYH0XszilvnNFPvA0p-2B0Dg14n9I-2FvV-2Fkm8o41NSr-2FZJo-2Bqsds3C6iUvBci6uDov6R854TsWYhM9ncIQcniyAoOlqYK2fwgZgzN7sRLDKjVe-2BNU2U6zKgy7koBqN75N0kogwrrOedM2ReskL96iFiFTwOZFk1lqmnRtvWwL3clPWdPZe9irmlbVKz5CVLn68eXCiPkrbD3M0pFDskaZGDRPuS4mhFGPNwdC3yyBR9cb2VEw9C9K80t-2BWTx7gZcOWXcOf-2BzBkAy6gzE7qnAUBCENHx3yLE\" target=\"_blank\" data-saferedirecturl=\"https://www.google.com/url?q=https://links.getpostman.com/ls/click?upn\\%3D3y7nOEZSJOF1v-2Fv7UyshsA0slPDVAWp38fB5IEChtheu3bOEbgreuzlgz5zViNwH8xZ9_Ok13fD09FJNSr5My2iE2o6TOtFlJamVAkBBRlAIaekfKHvmA7SMTWELU4G21lRyXsXfqH3M8IZinE8o1ftpuGUQlDrQ9AwNZL7wbEYH0XszilvnNFPvA0p-2B0Dg14n9I-2FvV-2Fkm8o41NSr-2FZJo-2Bqsds3C6iUvBci6uDov6R854TsWYhM9ncIQcniyAoOlqYK2fwgZgzN7sRLDKjVe-2BNU2U6zKgy7koBqN75N0kogwrrOedM2ReskL96iFiFTwOZFk1lqmnRtvWwL3clPWdPZe9irmlbVKz5CVLn68eXCiPkrbD3M0pFDskaZGDRPuS4mhFGPNwdC3yyBR9cb2VEw9C9K80t-2BWTx7gZcOWXcOf-2BzBkAy6gzE7qnAUBCENHx3yLE&amp;source=gmail&amp;ust=1685864307216000&amp;usg=AOvVaw2Kahkwcp6xWZWuw8HaZbTa\"><img class=\"m_4449668701611399010deviceWidth CToWUd\" src=\"https://ci6.googleusercontent.com/proxy/cbLkq9b3rrQO0cgPhXrrjcrlLLhKJSWzVagEd49My6fHYkwEfjjaHkwVVBDqgnFVBMl__oFR4ZrIPaztu1mQtUHazbnsaipriZ-DHpdeOh34zrs6SNWtibheKhs=s0-d-e1-ft#https://pages.getpostman.com/rs/067-UMD-991/images/pm-logo-horiz\\%402x.png\" alt=\"\" border=\"0\" width=\"125\" style=\"display:block\" data-bit=\"iit\"></a></td></tr><tr><td valign=\"top\" align=\"center\" style=\"padding:0\" bgcolor=\"#ffffff\"><a href=\"https://links.getpostman.com/ls/click?upn=3y7nOEZSJOF1v-2Fv7UyshsA0slPDVAWp38fB5IEChtheu3bOEbgreuzlgz5zViNwHsQp2_Ok13fD09FJNSr5My2iE2o6TOtFlJamVAkBBRlAIaekfKHvmA7SMTWELU4G21lRyXsXfqH3M8IZinE8o1ftpuGUQlDrQ9AwNZL7wbEYH0XszilvnNFPvA0p-2B0Dg14n9I-2FvV-2Fkm8o41NSr-2FZJo-2Bqsds3C6iUvBci6uDov6R854TsUPFd4A61l5cI665IU4qTW8hDtrIOUuHFAo7VMPcFqgSmoVg0svy9WJmVAlU-2FO2tO-2B2Kf71e8hLwiSTmqslZsTk1Ju3xthDD1-2F072JOD04MSSzZNnKFO0MZ5WuWRLgEquhS-2B14dynJubXPWbQVM4Jb1inLqKxYRa1XmsVmM20PQyuUo4AknKxc0dyLaNQhNEMVVJ3uP-2Biq7KvILg-2BYOiUEP\" target=\"_blank\" data-saferedirecturl=\"https://www.google.com/url?q=https://links.getpostman.com/ls/click?upn\\%3D3y7nOEZSJOF1v-2Fv7UyshsA0slPDVAWp38fB5IEChtheu3bOEbgreuzlgz5zViNwHsQp2_Ok13fD09FJNSr5My2iE2o6TOtFlJamVAkBBRlAIaekfKHvmA7SMTWELU4G21lRyXsXfqH3M8IZinE8o1ftpuGUQlDrQ9AwNZL7wbEYH0XszilvnNFPvA0p-2B0Dg14n9I-2FvV-2Fkm8o41NSr-2FZJo-2Bqsds3C6iUvBci6uDov6R854TsUPFd4A61l5cI665IU4qTW8hDtrIOUuHFAo7VMPcFqgSmoVg0svy9WJmVAlU-2FO2tO-2B2Kf71e8hLwiSTmqslZsTk1Ju3xthDD1-2F072JOD04MSSzZNnKFO0MZ5WuWRLgEquhS-2B14dynJubXPWbQVM4Jb1inLqKxYRa1XmsVmM20PQyuUo4AknKxc0dyLaNQhNEMVVJ3uP-2Biq7KvILg-2BYOiUEP&amp;source=gmail&amp;ust=1685864307216000&amp;usg=AOvVaw2CPvjfMp1shOLv8ekPIdm_\"><img class=\"m_4449668701611399010deviceWidth CToWUd\" src=\"https://ci5.googleusercontent.com/proxy/pDGWk03BqKkh63AxQc-d15HEeL5IOBZpAwlyX-4De7rDW56QxQ4RV-_0LNG9chGBQ3fnckiJ8DueBwiRqMp8EK3rib-SIuE9oFKLf5xMRDNaNdiOigozxdg=s0-d-e1-ft#https://pages.getpostman.com/rs/067-UMD-991/images/wave-hello\\%403x.png\" alt=\"\" border=\"0\" width=\"200\" style=\"display:block;margin-top:30px\" data-bit=\"iit\"></a></td></tr><tr><td style=\"font-size:13px;color:#282828;font-weight:400;text-align:left;font-family:\'Open Sans\',sans-serif;line-height:24px;vertical-align:top;padding:15px 8px 10px 8px\" bgcolor=\"#ffffff\"><h1 style=\"font-weight:600;margin:30px 0 50px 0;text-align:center\">Welcome to Postman!</h1><p>You’re just one click away from getting started with Postman. All you need to do is verify your email address to activate your Postman account.</p><a href=\"https://links.getpostman.com/ls/click?upn=3y7nOEZSJOF1v-2Fv7UyshsClw6pSPp9j71m85zYfrmPeMkrjqit7zxHzsvknXb2TWV-2Flti2JHfwZCEvZZI4kGT5YLeJfmlsf-2BkLAkpXxOg535VAcwcpYq3Y995dPrNv7OxoEd_Ok13fD09FJNSr5My2iE2o6TOtFlJamVAkBBRlAIaekfKHvmA7SMTWELU4G21lRyXsXfqH3M8IZinE8o1ftpuGUQlDrQ9AwNZL7wbEYH0XszilvnNFPvA0p-2B0Dg14n9I-2FvV-2Fkm8o41NSr-2FZJo-2Bqsds3C6iUvBci6uDov6R854TsWpgJpxQsnYqM63ENMC6uKAmiXeyrzepymXFiR5fDsZcQ4NJijUybZMXFOgqLB-2Fo8nctrA0S4hLC9wAfpxmsUrkaut2vfWe9sDJaPGKOaTTuW8riA92xOTBK7cel67AOx4EB2Vmtf0zraL52lVB9o0-2FQkbaJ9HA4zx5kGL4uRU3nGBedNGjQz7Aa0OAh2wzcjIbohjjn-2FN9nFbsjXp7EQIh\" style=\"padding:10px;width:300px;display:block;text-decoration:none;border:1px solid #ff6c37;font-weight:700;font-size:14px;font-family:\'Open Sans\',sans-serif;color:#fff;background:#ff6c37;border-radius:5px;line-height:17px;margin:0 auto;text-align:center\" target=\"_blank\" data-saferedirecturl=\"https://www.google.com/url?q=https://links.getpostman.com/ls/click?upn\\%3D3y7nOEZSJOF1v-2Fv7UyshsClw6pSPp9j71m85zYfrmPeMkrjqit7zxHzsvknXb2TWV-2Flti2JHfwZCEvZZI4kGT5YLeJfmlsf-2BkLAkpXxOg535VAcwcpYq3Y995dPrNv7OxoEd_Ok13fD09FJNSr5My2iE2o6TOtFlJamVAkBBRlAIaekfKHvmA7SMTWELU4G21lRyXsXfqH3M8IZinE8o1ftpuGUQlDrQ9AwNZL7wbEYH0XszilvnNFPvA0p-2B0Dg14n9I-2FvV-2Fkm8o41NSr-2FZJo-2Bqsds3C6iUvBci6uDov6R854TsWpgJpxQsnYqM63ENMC6uKAmiXeyrzepymXFiR5fDsZcQ4NJijUybZMXFOgqLB-2Fo8nctrA0S4hLC9wAfpxmsUrkaut2vfWe9sDJaPGKOaTTuW8riA92xOTBK7cel67AOx4EB2Vmtf0zraL52lVB9o0-2FQkbaJ9HA4zx5kGL4uRU3nGBedNGjQz7Aa0OAh2wzcjIbohjjn-2FN9nFbsjXp7EQIh&amp;source=gmail&amp;ust=1685864307216000&amp;usg=AOvVaw1gSa9sYEI6WYlLy0-sbx4J\">Confirm My Email</a><p>Once your account is activated, you can start using all of Postman’s features to organize, test, monitor, and share your API requests.</p><p>You’re receiving this email because you recently created a new Postman account or added a new email address. If this wasn’t you, please ignore this email.</p></td></tr></tbody></table></td></tr></tbody></table>', 'TimeSet', 'true', '', '2023-07-26 10:16:31', '2023-7-26', '15:46', NULL);
INSERT INTO `mail_queue` (`id`, `user_id`, `from_mail`, `to_mail`, `subject`, `content`, `schedule`, `status`, `error`, `created`, `send_date`, `send_time`, `compaign_id`) VALUES
(52, 11, 'sumanshivprakash742@gmail.com', 'yeshu996@yopmail.com', 'Admin', '<table width=\"100\\%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"m_4449668701611399010container\" style=\"border-collapse:collapse;width:100\\%;min-width:100\\%;height:auto\"><tbody><tr><td width=\"100\\%\" valign=\"top\" bgcolor=\"#ffffff\" style=\"padding-top:20px\"><table width=\"580\" class=\"m_4449668701611399010deviceWidth\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" bgcolor=\"#ffffff\" style=\"border-collapse:collapse;margin:0 auto\"><tbody><tr><td valign=\"top\" align=\"center\" style=\"padding:0\" bgcolor=\"#ffffff\"><a href=\"https://links.getpostman.com/ls/click?upn=3y7nOEZSJOF1v-2Fv7UyshsA0slPDVAWp38fB5IEChtheu3bOEbgreuzlgz5zViNwH8xZ9_Ok13fD09FJNSr5My2iE2o6TOtFlJamVAkBBRlAIaekfKHvmA7SMTWELU4G21lRyXsXfqH3M8IZinE8o1ftpuGUQlDrQ9AwNZL7wbEYH0XszilvnNFPvA0p-2B0Dg14n9I-2FvV-2Fkm8o41NSr-2FZJo-2Bqsds3C6iUvBci6uDov6R854TsWYhM9ncIQcniyAoOlqYK2fwgZgzN7sRLDKjVe-2BNU2U6zKgy7koBqN75N0kogwrrOedM2ReskL96iFiFTwOZFk1lqmnRtvWwL3clPWdPZe9irmlbVKz5CVLn68eXCiPkrbD3M0pFDskaZGDRPuS4mhFGPNwdC3yyBR9cb2VEw9C9K80t-2BWTx7gZcOWXcOf-2BzBkAy6gzE7qnAUBCENHx3yLE\" target=\"_blank\" data-saferedirecturl=\"https://www.google.com/url?q=https://links.getpostman.com/ls/click?upn\\%3D3y7nOEZSJOF1v-2Fv7UyshsA0slPDVAWp38fB5IEChtheu3bOEbgreuzlgz5zViNwH8xZ9_Ok13fD09FJNSr5My2iE2o6TOtFlJamVAkBBRlAIaekfKHvmA7SMTWELU4G21lRyXsXfqH3M8IZinE8o1ftpuGUQlDrQ9AwNZL7wbEYH0XszilvnNFPvA0p-2B0Dg14n9I-2FvV-2Fkm8o41NSr-2FZJo-2Bqsds3C6iUvBci6uDov6R854TsWYhM9ncIQcniyAoOlqYK2fwgZgzN7sRLDKjVe-2BNU2U6zKgy7koBqN75N0kogwrrOedM2ReskL96iFiFTwOZFk1lqmnRtvWwL3clPWdPZe9irmlbVKz5CVLn68eXCiPkrbD3M0pFDskaZGDRPuS4mhFGPNwdC3yyBR9cb2VEw9C9K80t-2BWTx7gZcOWXcOf-2BzBkAy6gzE7qnAUBCENHx3yLE&amp;source=gmail&amp;ust=1685864307216000&amp;usg=AOvVaw2Kahkwcp6xWZWuw8HaZbTa\"><img class=\"m_4449668701611399010deviceWidth CToWUd\" src=\"https://ci6.googleusercontent.com/proxy/cbLkq9b3rrQO0cgPhXrrjcrlLLhKJSWzVagEd49My6fHYkwEfjjaHkwVVBDqgnFVBMl__oFR4ZrIPaztu1mQtUHazbnsaipriZ-DHpdeOh34zrs6SNWtibheKhs=s0-d-e1-ft#https://pages.getpostman.com/rs/067-UMD-991/images/pm-logo-horiz\\%402x.png\" alt=\"\" border=\"0\" width=\"125\" style=\"display:block\" data-bit=\"iit\"></a></td></tr><tr><td valign=\"top\" align=\"center\" style=\"padding:0\" bgcolor=\"#ffffff\"><a href=\"https://links.getpostman.com/ls/click?upn=3y7nOEZSJOF1v-2Fv7UyshsA0slPDVAWp38fB5IEChtheu3bOEbgreuzlgz5zViNwHsQp2_Ok13fD09FJNSr5My2iE2o6TOtFlJamVAkBBRlAIaekfKHvmA7SMTWELU4G21lRyXsXfqH3M8IZinE8o1ftpuGUQlDrQ9AwNZL7wbEYH0XszilvnNFPvA0p-2B0Dg14n9I-2FvV-2Fkm8o41NSr-2FZJo-2Bqsds3C6iUvBci6uDov6R854TsUPFd4A61l5cI665IU4qTW8hDtrIOUuHFAo7VMPcFqgSmoVg0svy9WJmVAlU-2FO2tO-2B2Kf71e8hLwiSTmqslZsTk1Ju3xthDD1-2F072JOD04MSSzZNnKFO0MZ5WuWRLgEquhS-2B14dynJubXPWbQVM4Jb1inLqKxYRa1XmsVmM20PQyuUo4AknKxc0dyLaNQhNEMVVJ3uP-2Biq7KvILg-2BYOiUEP\" target=\"_blank\" data-saferedirecturl=\"https://www.google.com/url?q=https://links.getpostman.com/ls/click?upn\\%3D3y7nOEZSJOF1v-2Fv7UyshsA0slPDVAWp38fB5IEChtheu3bOEbgreuzlgz5zViNwHsQp2_Ok13fD09FJNSr5My2iE2o6TOtFlJamVAkBBRlAIaekfKHvmA7SMTWELU4G21lRyXsXfqH3M8IZinE8o1ftpuGUQlDrQ9AwNZL7wbEYH0XszilvnNFPvA0p-2B0Dg14n9I-2FvV-2Fkm8o41NSr-2FZJo-2Bqsds3C6iUvBci6uDov6R854TsUPFd4A61l5cI665IU4qTW8hDtrIOUuHFAo7VMPcFqgSmoVg0svy9WJmVAlU-2FO2tO-2B2Kf71e8hLwiSTmqslZsTk1Ju3xthDD1-2F072JOD04MSSzZNnKFO0MZ5WuWRLgEquhS-2B14dynJubXPWbQVM4Jb1inLqKxYRa1XmsVmM20PQyuUo4AknKxc0dyLaNQhNEMVVJ3uP-2Biq7KvILg-2BYOiUEP&amp;source=gmail&amp;ust=1685864307216000&amp;usg=AOvVaw2CPvjfMp1shOLv8ekPIdm_\"><img class=\"m_4449668701611399010deviceWidth CToWUd\" src=\"https://ci5.googleusercontent.com/proxy/pDGWk03BqKkh63AxQc-d15HEeL5IOBZpAwlyX-4De7rDW56QxQ4RV-_0LNG9chGBQ3fnckiJ8DueBwiRqMp8EK3rib-SIuE9oFKLf5xMRDNaNdiOigozxdg=s0-d-e1-ft#https://pages.getpostman.com/rs/067-UMD-991/images/wave-hello\\%403x.png\" alt=\"\" border=\"0\" width=\"200\" style=\"display:block;margin-top:30px\" data-bit=\"iit\"></a></td></tr><tr><td style=\"font-size:13px;color:#282828;font-weight:400;text-align:left;font-family:\'Open Sans\',sans-serif;line-height:24px;vertical-align:top;padding:15px 8px 10px 8px\" bgcolor=\"#ffffff\"><h1 style=\"font-weight:600;margin:30px 0 50px 0;text-align:center\">Welcome to Postman!</h1><p>You’re just one click away from getting started with Postman. All you need to do is verify your email address to activate your Postman account.</p><a href=\"https://links.getpostman.com/ls/click?upn=3y7nOEZSJOF1v-2Fv7UyshsClw6pSPp9j71m85zYfrmPeMkrjqit7zxHzsvknXb2TWV-2Flti2JHfwZCEvZZI4kGT5YLeJfmlsf-2BkLAkpXxOg535VAcwcpYq3Y995dPrNv7OxoEd_Ok13fD09FJNSr5My2iE2o6TOtFlJamVAkBBRlAIaekfKHvmA7SMTWELU4G21lRyXsXfqH3M8IZinE8o1ftpuGUQlDrQ9AwNZL7wbEYH0XszilvnNFPvA0p-2B0Dg14n9I-2FvV-2Fkm8o41NSr-2FZJo-2Bqsds3C6iUvBci6uDov6R854TsWpgJpxQsnYqM63ENMC6uKAmiXeyrzepymXFiR5fDsZcQ4NJijUybZMXFOgqLB-2Fo8nctrA0S4hLC9wAfpxmsUrkaut2vfWe9sDJaPGKOaTTuW8riA92xOTBK7cel67AOx4EB2Vmtf0zraL52lVB9o0-2FQkbaJ9HA4zx5kGL4uRU3nGBedNGjQz7Aa0OAh2wzcjIbohjjn-2FN9nFbsjXp7EQIh\" style=\"padding:10px;width:300px;display:block;text-decoration:none;border:1px solid #ff6c37;font-weight:700;font-size:14px;font-family:\'Open Sans\',sans-serif;color:#fff;background:#ff6c37;border-radius:5px;line-height:17px;margin:0 auto;text-align:center\" target=\"_blank\" data-saferedirecturl=\"https://www.google.com/url?q=https://links.getpostman.com/ls/click?upn\\%3D3y7nOEZSJOF1v-2Fv7UyshsClw6pSPp9j71m85zYfrmPeMkrjqit7zxHzsvknXb2TWV-2Flti2JHfwZCEvZZI4kGT5YLeJfmlsf-2BkLAkpXxOg535VAcwcpYq3Y995dPrNv7OxoEd_Ok13fD09FJNSr5My2iE2o6TOtFlJamVAkBBRlAIaekfKHvmA7SMTWELU4G21lRyXsXfqH3M8IZinE8o1ftpuGUQlDrQ9AwNZL7wbEYH0XszilvnNFPvA0p-2B0Dg14n9I-2FvV-2Fkm8o41NSr-2FZJo-2Bqsds3C6iUvBci6uDov6R854TsWpgJpxQsnYqM63ENMC6uKAmiXeyrzepymXFiR5fDsZcQ4NJijUybZMXFOgqLB-2Fo8nctrA0S4hLC9wAfpxmsUrkaut2vfWe9sDJaPGKOaTTuW8riA92xOTBK7cel67AOx4EB2Vmtf0zraL52lVB9o0-2FQkbaJ9HA4zx5kGL4uRU3nGBedNGjQz7Aa0OAh2wzcjIbohjjn-2FN9nFbsjXp7EQIh&amp;source=gmail&amp;ust=1685864307216000&amp;usg=AOvVaw1gSa9sYEI6WYlLy0-sbx4J\">Confirm My Email</a><p>Once your account is activated, you can start using all of Postman’s features to organize, test, monitor, and share your API requests.</p><p>You’re receiving this email because you recently created a new Postman account or added a new email address. If this wasn’t you, please ignore this email.</p></td></tr></tbody></table></td></tr></tbody></table>', 'TimeSet', 'true', '', '2023-07-26 10:16:31', '2023-7-26', '15:46', NULL),
(53, 11, 'sumanshivprakash742@gmail.com', 'kamal4@yopmail.com', 'Admin', '<table width=\"100\\%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"m_4449668701611399010container\" style=\"border-collapse:collapse;width:100\\%;min-width:100\\%;height:auto\"><tbody><tr><td width=\"100\\%\" valign=\"top\" bgcolor=\"#ffffff\" style=\"padding-top:20px\"><table width=\"580\" class=\"m_4449668701611399010deviceWidth\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" bgcolor=\"#ffffff\" style=\"border-collapse:collapse;margin:0 auto\"><tbody><tr><td valign=\"top\" align=\"center\" style=\"padding:0\" bgcolor=\"#ffffff\"><a href=\"https://links.getpostman.com/ls/click?upn=3y7nOEZSJOF1v-2Fv7UyshsA0slPDVAWp38fB5IEChtheu3bOEbgreuzlgz5zViNwH8xZ9_Ok13fD09FJNSr5My2iE2o6TOtFlJamVAkBBRlAIaekfKHvmA7SMTWELU4G21lRyXsXfqH3M8IZinE8o1ftpuGUQlDrQ9AwNZL7wbEYH0XszilvnNFPvA0p-2B0Dg14n9I-2FvV-2Fkm8o41NSr-2FZJo-2Bqsds3C6iUvBci6uDov6R854TsWYhM9ncIQcniyAoOlqYK2fwgZgzN7sRLDKjVe-2BNU2U6zKgy7koBqN75N0kogwrrOedM2ReskL96iFiFTwOZFk1lqmnRtvWwL3clPWdPZe9irmlbVKz5CVLn68eXCiPkrbD3M0pFDskaZGDRPuS4mhFGPNwdC3yyBR9cb2VEw9C9K80t-2BWTx7gZcOWXcOf-2BzBkAy6gzE7qnAUBCENHx3yLE\" target=\"_blank\" data-saferedirecturl=\"https://www.google.com/url?q=https://links.getpostman.com/ls/click?upn\\%3D3y7nOEZSJOF1v-2Fv7UyshsA0slPDVAWp38fB5IEChtheu3bOEbgreuzlgz5zViNwH8xZ9_Ok13fD09FJNSr5My2iE2o6TOtFlJamVAkBBRlAIaekfKHvmA7SMTWELU4G21lRyXsXfqH3M8IZinE8o1ftpuGUQlDrQ9AwNZL7wbEYH0XszilvnNFPvA0p-2B0Dg14n9I-2FvV-2Fkm8o41NSr-2FZJo-2Bqsds3C6iUvBci6uDov6R854TsWYhM9ncIQcniyAoOlqYK2fwgZgzN7sRLDKjVe-2BNU2U6zKgy7koBqN75N0kogwrrOedM2ReskL96iFiFTwOZFk1lqmnRtvWwL3clPWdPZe9irmlbVKz5CVLn68eXCiPkrbD3M0pFDskaZGDRPuS4mhFGPNwdC3yyBR9cb2VEw9C9K80t-2BWTx7gZcOWXcOf-2BzBkAy6gzE7qnAUBCENHx3yLE&amp;source=gmail&amp;ust=1685864307216000&amp;usg=AOvVaw2Kahkwcp6xWZWuw8HaZbTa\"><img class=\"m_4449668701611399010deviceWidth CToWUd\" src=\"https://ci6.googleusercontent.com/proxy/cbLkq9b3rrQO0cgPhXrrjcrlLLhKJSWzVagEd49My6fHYkwEfjjaHkwVVBDqgnFVBMl__oFR4ZrIPaztu1mQtUHazbnsaipriZ-DHpdeOh34zrs6SNWtibheKhs=s0-d-e1-ft#https://pages.getpostman.com/rs/067-UMD-991/images/pm-logo-horiz\\%402x.png\" alt=\"\" border=\"0\" width=\"125\" style=\"display:block\" data-bit=\"iit\"></a></td></tr><tr><td valign=\"top\" align=\"center\" style=\"padding:0\" bgcolor=\"#ffffff\"><a href=\"https://links.getpostman.com/ls/click?upn=3y7nOEZSJOF1v-2Fv7UyshsA0slPDVAWp38fB5IEChtheu3bOEbgreuzlgz5zViNwHsQp2_Ok13fD09FJNSr5My2iE2o6TOtFlJamVAkBBRlAIaekfKHvmA7SMTWELU4G21lRyXsXfqH3M8IZinE8o1ftpuGUQlDrQ9AwNZL7wbEYH0XszilvnNFPvA0p-2B0Dg14n9I-2FvV-2Fkm8o41NSr-2FZJo-2Bqsds3C6iUvBci6uDov6R854TsUPFd4A61l5cI665IU4qTW8hDtrIOUuHFAo7VMPcFqgSmoVg0svy9WJmVAlU-2FO2tO-2B2Kf71e8hLwiSTmqslZsTk1Ju3xthDD1-2F072JOD04MSSzZNnKFO0MZ5WuWRLgEquhS-2B14dynJubXPWbQVM4Jb1inLqKxYRa1XmsVmM20PQyuUo4AknKxc0dyLaNQhNEMVVJ3uP-2Biq7KvILg-2BYOiUEP\" target=\"_blank\" data-saferedirecturl=\"https://www.google.com/url?q=https://links.getpostman.com/ls/click?upn\\%3D3y7nOEZSJOF1v-2Fv7UyshsA0slPDVAWp38fB5IEChtheu3bOEbgreuzlgz5zViNwHsQp2_Ok13fD09FJNSr5My2iE2o6TOtFlJamVAkBBRlAIaekfKHvmA7SMTWELU4G21lRyXsXfqH3M8IZinE8o1ftpuGUQlDrQ9AwNZL7wbEYH0XszilvnNFPvA0p-2B0Dg14n9I-2FvV-2Fkm8o41NSr-2FZJo-2Bqsds3C6iUvBci6uDov6R854TsUPFd4A61l5cI665IU4qTW8hDtrIOUuHFAo7VMPcFqgSmoVg0svy9WJmVAlU-2FO2tO-2B2Kf71e8hLwiSTmqslZsTk1Ju3xthDD1-2F072JOD04MSSzZNnKFO0MZ5WuWRLgEquhS-2B14dynJubXPWbQVM4Jb1inLqKxYRa1XmsVmM20PQyuUo4AknKxc0dyLaNQhNEMVVJ3uP-2Biq7KvILg-2BYOiUEP&amp;source=gmail&amp;ust=1685864307216000&amp;usg=AOvVaw2CPvjfMp1shOLv8ekPIdm_\"><img class=\"m_4449668701611399010deviceWidth CToWUd\" src=\"https://ci5.googleusercontent.com/proxy/pDGWk03BqKkh63AxQc-d15HEeL5IOBZpAwlyX-4De7rDW56QxQ4RV-_0LNG9chGBQ3fnckiJ8DueBwiRqMp8EK3rib-SIuE9oFKLf5xMRDNaNdiOigozxdg=s0-d-e1-ft#https://pages.getpostman.com/rs/067-UMD-991/images/wave-hello\\%403x.png\" alt=\"\" border=\"0\" width=\"200\" style=\"display:block;margin-top:30px\" data-bit=\"iit\"></a></td></tr><tr><td style=\"font-size:13px;color:#282828;font-weight:400;text-align:left;font-family:\'Open Sans\',sans-serif;line-height:24px;vertical-align:top;padding:15px 8px 10px 8px\" bgcolor=\"#ffffff\"><h1 style=\"font-weight:600;margin:30px 0 50px 0;text-align:center\">Welcome to Postman!</h1><p>You’re just one click away from getting started with Postman. All you need to do is verify your email address to activate your Postman account.</p><a href=\"https://links.getpostman.com/ls/click?upn=3y7nOEZSJOF1v-2Fv7UyshsClw6pSPp9j71m85zYfrmPeMkrjqit7zxHzsvknXb2TWV-2Flti2JHfwZCEvZZI4kGT5YLeJfmlsf-2BkLAkpXxOg535VAcwcpYq3Y995dPrNv7OxoEd_Ok13fD09FJNSr5My2iE2o6TOtFlJamVAkBBRlAIaekfKHvmA7SMTWELU4G21lRyXsXfqH3M8IZinE8o1ftpuGUQlDrQ9AwNZL7wbEYH0XszilvnNFPvA0p-2B0Dg14n9I-2FvV-2Fkm8o41NSr-2FZJo-2Bqsds3C6iUvBci6uDov6R854TsWpgJpxQsnYqM63ENMC6uKAmiXeyrzepymXFiR5fDsZcQ4NJijUybZMXFOgqLB-2Fo8nctrA0S4hLC9wAfpxmsUrkaut2vfWe9sDJaPGKOaTTuW8riA92xOTBK7cel67AOx4EB2Vmtf0zraL52lVB9o0-2FQkbaJ9HA4zx5kGL4uRU3nGBedNGjQz7Aa0OAh2wzcjIbohjjn-2FN9nFbsjXp7EQIh\" style=\"padding:10px;width:300px;display:block;text-decoration:none;border:1px solid #ff6c37;font-weight:700;font-size:14px;font-family:\'Open Sans\',sans-serif;color:#fff;background:#ff6c37;border-radius:5px;line-height:17px;margin:0 auto;text-align:center\" target=\"_blank\" data-saferedirecturl=\"https://www.google.com/url?q=https://links.getpostman.com/ls/click?upn\\%3D3y7nOEZSJOF1v-2Fv7UyshsClw6pSPp9j71m85zYfrmPeMkrjqit7zxHzsvknXb2TWV-2Flti2JHfwZCEvZZI4kGT5YLeJfmlsf-2BkLAkpXxOg535VAcwcpYq3Y995dPrNv7OxoEd_Ok13fD09FJNSr5My2iE2o6TOtFlJamVAkBBRlAIaekfKHvmA7SMTWELU4G21lRyXsXfqH3M8IZinE8o1ftpuGUQlDrQ9AwNZL7wbEYH0XszilvnNFPvA0p-2B0Dg14n9I-2FvV-2Fkm8o41NSr-2FZJo-2Bqsds3C6iUvBci6uDov6R854TsWpgJpxQsnYqM63ENMC6uKAmiXeyrzepymXFiR5fDsZcQ4NJijUybZMXFOgqLB-2Fo8nctrA0S4hLC9wAfpxmsUrkaut2vfWe9sDJaPGKOaTTuW8riA92xOTBK7cel67AOx4EB2Vmtf0zraL52lVB9o0-2FQkbaJ9HA4zx5kGL4uRU3nGBedNGjQz7Aa0OAh2wzcjIbohjjn-2FN9nFbsjXp7EQIh&amp;source=gmail&amp;ust=1685864307216000&amp;usg=AOvVaw1gSa9sYEI6WYlLy0-sbx4J\">Confirm My Email</a><p>Once your account is activated, you can start using all of Postman’s features to organize, test, monitor, and share your API requests.</p><p>You’re receiving this email because you recently created a new Postman account or added a new email address. If this wasn’t you, please ignore this email.</p></td></tr></tbody></table></td></tr></tbody></table>', 'TimeSet', 'true', '', '2023-07-26 10:16:31', '2023-7-26', '15:46', NULL),
(54, 11, 'sumanshivprakash742@gmail.com', 'sonu@yopmail.com', 'Admin', '<table width=\"100\\%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"m_4449668701611399010container\" style=\"border-collapse:collapse;width:100\\%;min-width:100\\%;height:auto\"><tbody><tr><td width=\"100\\%\" valign=\"top\" bgcolor=\"#ffffff\" style=\"padding-top:20px\"><table width=\"580\" class=\"m_4449668701611399010deviceWidth\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" bgcolor=\"#ffffff\" style=\"border-collapse:collapse;margin:0 auto\"><tbody><tr><td valign=\"top\" align=\"center\" style=\"padding:0\" bgcolor=\"#ffffff\"><a href=\"https://links.getpostman.com/ls/click?upn=3y7nOEZSJOF1v-2Fv7UyshsA0slPDVAWp38fB5IEChtheu3bOEbgreuzlgz5zViNwH8xZ9_Ok13fD09FJNSr5My2iE2o6TOtFlJamVAkBBRlAIaekfKHvmA7SMTWELU4G21lRyXsXfqH3M8IZinE8o1ftpuGUQlDrQ9AwNZL7wbEYH0XszilvnNFPvA0p-2B0Dg14n9I-2FvV-2Fkm8o41NSr-2FZJo-2Bqsds3C6iUvBci6uDov6R854TsWYhM9ncIQcniyAoOlqYK2fwgZgzN7sRLDKjVe-2BNU2U6zKgy7koBqN75N0kogwrrOedM2ReskL96iFiFTwOZFk1lqmnRtvWwL3clPWdPZe9irmlbVKz5CVLn68eXCiPkrbD3M0pFDskaZGDRPuS4mhFGPNwdC3yyBR9cb2VEw9C9K80t-2BWTx7gZcOWXcOf-2BzBkAy6gzE7qnAUBCENHx3yLE\" target=\"_blank\" data-saferedirecturl=\"https://www.google.com/url?q=https://links.getpostman.com/ls/click?upn\\%3D3y7nOEZSJOF1v-2Fv7UyshsA0slPDVAWp38fB5IEChtheu3bOEbgreuzlgz5zViNwH8xZ9_Ok13fD09FJNSr5My2iE2o6TOtFlJamVAkBBRlAIaekfKHvmA7SMTWELU4G21lRyXsXfqH3M8IZinE8o1ftpuGUQlDrQ9AwNZL7wbEYH0XszilvnNFPvA0p-2B0Dg14n9I-2FvV-2Fkm8o41NSr-2FZJo-2Bqsds3C6iUvBci6uDov6R854TsWYhM9ncIQcniyAoOlqYK2fwgZgzN7sRLDKjVe-2BNU2U6zKgy7koBqN75N0kogwrrOedM2ReskL96iFiFTwOZFk1lqmnRtvWwL3clPWdPZe9irmlbVKz5CVLn68eXCiPkrbD3M0pFDskaZGDRPuS4mhFGPNwdC3yyBR9cb2VEw9C9K80t-2BWTx7gZcOWXcOf-2BzBkAy6gzE7qnAUBCENHx3yLE&amp;source=gmail&amp;ust=1685864307216000&amp;usg=AOvVaw2Kahkwcp6xWZWuw8HaZbTa\"><img class=\"m_4449668701611399010deviceWidth CToWUd\" src=\"https://ci6.googleusercontent.com/proxy/cbLkq9b3rrQO0cgPhXrrjcrlLLhKJSWzVagEd49My6fHYkwEfjjaHkwVVBDqgnFVBMl__oFR4ZrIPaztu1mQtUHazbnsaipriZ-DHpdeOh34zrs6SNWtibheKhs=s0-d-e1-ft#https://pages.getpostman.com/rs/067-UMD-991/images/pm-logo-horiz\\%402x.png\" alt=\"\" border=\"0\" width=\"125\" style=\"display:block\" data-bit=\"iit\"></a></td></tr><tr><td valign=\"top\" align=\"center\" style=\"padding:0\" bgcolor=\"#ffffff\"><a href=\"https://links.getpostman.com/ls/click?upn=3y7nOEZSJOF1v-2Fv7UyshsA0slPDVAWp38fB5IEChtheu3bOEbgreuzlgz5zViNwHsQp2_Ok13fD09FJNSr5My2iE2o6TOtFlJamVAkBBRlAIaekfKHvmA7SMTWELU4G21lRyXsXfqH3M8IZinE8o1ftpuGUQlDrQ9AwNZL7wbEYH0XszilvnNFPvA0p-2B0Dg14n9I-2FvV-2Fkm8o41NSr-2FZJo-2Bqsds3C6iUvBci6uDov6R854TsUPFd4A61l5cI665IU4qTW8hDtrIOUuHFAo7VMPcFqgSmoVg0svy9WJmVAlU-2FO2tO-2B2Kf71e8hLwiSTmqslZsTk1Ju3xthDD1-2F072JOD04MSSzZNnKFO0MZ5WuWRLgEquhS-2B14dynJubXPWbQVM4Jb1inLqKxYRa1XmsVmM20PQyuUo4AknKxc0dyLaNQhNEMVVJ3uP-2Biq7KvILg-2BYOiUEP\" target=\"_blank\" data-saferedirecturl=\"https://www.google.com/url?q=https://links.getpostman.com/ls/click?upn\\%3D3y7nOEZSJOF1v-2Fv7UyshsA0slPDVAWp38fB5IEChtheu3bOEbgreuzlgz5zViNwHsQp2_Ok13fD09FJNSr5My2iE2o6TOtFlJamVAkBBRlAIaekfKHvmA7SMTWELU4G21lRyXsXfqH3M8IZinE8o1ftpuGUQlDrQ9AwNZL7wbEYH0XszilvnNFPvA0p-2B0Dg14n9I-2FvV-2Fkm8o41NSr-2FZJo-2Bqsds3C6iUvBci6uDov6R854TsUPFd4A61l5cI665IU4qTW8hDtrIOUuHFAo7VMPcFqgSmoVg0svy9WJmVAlU-2FO2tO-2B2Kf71e8hLwiSTmqslZsTk1Ju3xthDD1-2F072JOD04MSSzZNnKFO0MZ5WuWRLgEquhS-2B14dynJubXPWbQVM4Jb1inLqKxYRa1XmsVmM20PQyuUo4AknKxc0dyLaNQhNEMVVJ3uP-2Biq7KvILg-2BYOiUEP&amp;source=gmail&amp;ust=1685864307216000&amp;usg=AOvVaw2CPvjfMp1shOLv8ekPIdm_\"><img class=\"m_4449668701611399010deviceWidth CToWUd\" src=\"https://ci5.googleusercontent.com/proxy/pDGWk03BqKkh63AxQc-d15HEeL5IOBZpAwlyX-4De7rDW56QxQ4RV-_0LNG9chGBQ3fnckiJ8DueBwiRqMp8EK3rib-SIuE9oFKLf5xMRDNaNdiOigozxdg=s0-d-e1-ft#https://pages.getpostman.com/rs/067-UMD-991/images/wave-hello\\%403x.png\" alt=\"\" border=\"0\" width=\"200\" style=\"display:block;margin-top:30px\" data-bit=\"iit\"></a></td></tr><tr><td style=\"font-size:13px;color:#282828;font-weight:400;text-align:left;font-family:\'Open Sans\',sans-serif;line-height:24px;vertical-align:top;padding:15px 8px 10px 8px\" bgcolor=\"#ffffff\"><h1 style=\"font-weight:600;margin:30px 0 50px 0;text-align:center\">Welcome to Postman!</h1><p>You’re just one click away from getting started with Postman. All you need to do is verify your email address to activate your Postman account.</p><a href=\"https://links.getpostman.com/ls/click?upn=3y7nOEZSJOF1v-2Fv7UyshsClw6pSPp9j71m85zYfrmPeMkrjqit7zxHzsvknXb2TWV-2Flti2JHfwZCEvZZI4kGT5YLeJfmlsf-2BkLAkpXxOg535VAcwcpYq3Y995dPrNv7OxoEd_Ok13fD09FJNSr5My2iE2o6TOtFlJamVAkBBRlAIaekfKHvmA7SMTWELU4G21lRyXsXfqH3M8IZinE8o1ftpuGUQlDrQ9AwNZL7wbEYH0XszilvnNFPvA0p-2B0Dg14n9I-2FvV-2Fkm8o41NSr-2FZJo-2Bqsds3C6iUvBci6uDov6R854TsWpgJpxQsnYqM63ENMC6uKAmiXeyrzepymXFiR5fDsZcQ4NJijUybZMXFOgqLB-2Fo8nctrA0S4hLC9wAfpxmsUrkaut2vfWe9sDJaPGKOaTTuW8riA92xOTBK7cel67AOx4EB2Vmtf0zraL52lVB9o0-2FQkbaJ9HA4zx5kGL4uRU3nGBedNGjQz7Aa0OAh2wzcjIbohjjn-2FN9nFbsjXp7EQIh\" style=\"padding:10px;width:300px;display:block;text-decoration:none;border:1px solid #ff6c37;font-weight:700;font-size:14px;font-family:\'Open Sans\',sans-serif;color:#fff;background:#ff6c37;border-radius:5px;line-height:17px;margin:0 auto;text-align:center\" target=\"_blank\" data-saferedirecturl=\"https://www.google.com/url?q=https://links.getpostman.com/ls/click?upn\\%3D3y7nOEZSJOF1v-2Fv7UyshsClw6pSPp9j71m85zYfrmPeMkrjqit7zxHzsvknXb2TWV-2Flti2JHfwZCEvZZI4kGT5YLeJfmlsf-2BkLAkpXxOg535VAcwcpYq3Y995dPrNv7OxoEd_Ok13fD09FJNSr5My2iE2o6TOtFlJamVAkBBRlAIaekfKHvmA7SMTWELU4G21lRyXsXfqH3M8IZinE8o1ftpuGUQlDrQ9AwNZL7wbEYH0XszilvnNFPvA0p-2B0Dg14n9I-2FvV-2Fkm8o41NSr-2FZJo-2Bqsds3C6iUvBci6uDov6R854TsWpgJpxQsnYqM63ENMC6uKAmiXeyrzepymXFiR5fDsZcQ4NJijUybZMXFOgqLB-2Fo8nctrA0S4hLC9wAfpxmsUrkaut2vfWe9sDJaPGKOaTTuW8riA92xOTBK7cel67AOx4EB2Vmtf0zraL52lVB9o0-2FQkbaJ9HA4zx5kGL4uRU3nGBedNGjQz7Aa0OAh2wzcjIbohjjn-2FN9nFbsjXp7EQIh&amp;source=gmail&amp;ust=1685864307216000&amp;usg=AOvVaw1gSa9sYEI6WYlLy0-sbx4J\">Confirm My Email</a><p>Once your account is activated, you can start using all of Postman’s features to organize, test, monitor, and share your API requests.</p><p>You’re receiving this email because you recently created a new Postman account or added a new email address. If this wasn’t you, please ignore this email.</p></td></tr></tbody></table></td></tr></tbody></table>', 'TimeSet', 'true', '', '2023-07-26 10:16:31', '2023-7-26', '15:46', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `payment`
--

CREATE TABLE `payment` (
  `id` int(11) NOT NULL,
  `plan_id` varchar(255) NOT NULL,
  `user_id` int(11) NOT NULL,
  `payment_id` varchar(255) NOT NULL,
  `amount` varchar(255) NOT NULL,
  `status` tinyint(4) NOT NULL,
  `created` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `payment`
--

INSERT INTO `payment` (`id`, `plan_id`, `user_id`, `payment_id`, `amount`, `status`, `created`) VALUES
(1, '2', 6, 'pay_LtPXJOUkk41OtJ', '2299', 1, '2023-06-01 16:08:02'),
(3, '3', 6, 'pay_LvOiOcK6mMweiy', '6999', 1, '2023-06-01 16:04:46'),
(9, '1', 7, 'pay_M1350X6WdSUA9J', '699', 1, '2023-06-12 14:18:18'),
(10, '1', 8, 'pay_M5KmfwNKlrtM8N', '699', 1, '2023-06-23 10:13:29'),
(11, '3', 11, 'pay_MIOZ9t73QxsMB5', '6999', 1, '2023-07-26 10:22:30'),
(12, '2', 11, 'pay_Mm2RQ9zddzAYlG', '2299', 1, '2023-10-09 08:14:00');

-- --------------------------------------------------------

--
-- Table structure for table `plans`
--

CREATE TABLE `plans` (
  `id` int(11) NOT NULL,
  `admin_id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `price` varchar(255) NOT NULL,
  `offer_price` varchar(255) NOT NULL,
  `total_sell` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL,
  `created` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `description` longtext NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `plans`
--

INSERT INTO `plans` (`id`, `admin_id`, `title`, `price`, `offer_price`, `total_sell`, `status`, `created`, `description`) VALUES
(1, 1, 'Besic Plan', '699', '0', '0', '1', '2023-06-01 04:25:32', 'Send the right content at the right time With testing and scheduling features.'),
(2, 1, 'Standard', '2299', '1999', '0', '1', '2023-05-22 05:21:02', 'Sell even more with personalization, Optimization tools, and enhanced automations.'),
(3, 1, 'Premium', '6999', '5599', '0', '1', '2023-05-22 05:21:24', 'Our most advanced tools, unlimited contacts, and priority support. built for teams.');

-- --------------------------------------------------------

--
-- Table structure for table `sendmail`
--

CREATE TABLE `sendmail` (
  `id` int(11) NOT NULL,
  `to` varchar(255) NOT NULL,
  `subject` varchar(255) NOT NULL,
  `send_mail` varchar(255) DEFAULT NULL,
  `error_mail` varchar(255) DEFAULT NULL,
  `compaign_id` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `sendmail`
--

INSERT INTO `sendmail` (`id`, `to`, `subject`, `send_mail`, `error_mail`, `compaign_id`) VALUES
(1, 'kalu88@yopmail.com', 'New Body Building Template', 'true', 'false', '1'),
(2, 'sonu@yopmail.com', 'New Body Building Template', 'false', 'false', '1'),
(3, 'alex44@yopmail.com', 'New Body Building Template', 'true', 'false', '1'),
(4, 'kalu88@yopmail.com', 'New Body Building Template', 'true', 'false', '1'),
(5, 'kalu88@yopmail.com', 'New Body Building Template', 'true', 'false', '1'),
(6, 'bhagya888@yopmail.com', 'New Body Building Template', 'true', 'false', '1'),
(7, 'dev777@yopmail.com', 'New Body Building Template', 'true', 'false', '1'),
(8, 'hanuman55@yopmail.com', 'New Body Building Template', 'true', 'false', '1'),
(9, 'sonu@yopmail.com', 'New Body Building Template', 'true', 'false', '1'),
(10, 'kalu88@yopmail.com', 'Postman', 'false', 'true', '5'),
(11, 'sonu@yopmail.com', 'Postman', 'false', 'true', '5'),
(12, 'alex44@yopmail.com', 'Postman', 'false', 'true', '5');

-- --------------------------------------------------------

--
-- Table structure for table `settings`
--

CREATE TABLE `settings` (
  `id` int(11) NOT NULL,
  `key` varchar(255) NOT NULL,
  `value` varchar(255) NOT NULL,
  `type` varchar(255) NOT NULL,
  `created` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `settings`
--

INSERT INTO `settings` (`id`, `key`, `value`, `type`, `created`) VALUES
(1, 'LOGO', 'file-1683283649340.png', 'Image', '2023-05-13 09:36:27'),
(2, 'THEME_COLOR', '#b51fff', 'Text', '2023-05-13 09:36:55'),
(3, 'THEME_FONT', 'null', 'Text', '2023-05-13 09:36:39'),
(4, 'CURRENCY', 'INR', 'Text', '2023-05-20 17:02:25'),
(5, 'PAYMENT_KEY', 'rzp_test_EgSXZmLh74nVRQ', 'Text', '2023-05-26 16:19:02'),
(6, 'THEME', '#b51fff', 'Text', '2023-05-20 17:02:07'),
(7, 'OFFICE_ADDRESS', 'puliya bus stand kaithoon', 'Text', '2023-05-27 06:41:10');

-- --------------------------------------------------------

--
-- Table structure for table `template`
--

CREATE TABLE `template` (
  `id` int(11) NOT NULL,
  `user_id` varchar(255) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` longtext NOT NULL,
  `category` varchar(255) NOT NULL,
  `repo_path` varchar(255) NOT NULL,
  `index_path` varchar(255) NOT NULL,
  `draft_path` varchar(255) NOT NULL,
  `thumbnail` varchar(255) NOT NULL,
  `status` tinyint(4) NOT NULL,
  `created` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `template`
--

INSERT INTO `template` (`id`, `user_id`, `title`, `description`, `category`, `repo_path`, `index_path`, `draft_path`, `thumbnail`, `status`, `created`) VALUES
(1, '', ' Creating an eCommerce site', ' The 55% increase in online sales during the pandemic saw business owners moving from physical storefronts to digital solutions to sell online, helping to expand their reach and increase revenue.', 'Ecommerce', '/uploads/templates/1', '/uploads/templates/1/index.html', '/uploads/templates/1/draft.html', '/uploads/templates/1/thumbnail.jpg', 0, '2023-05-05 09:46:54'),
(2, '', 'HOW TO START BODYBUILDING FOR TOTAL BEGINNERS', 'eCommerce websites have become an integral part of any business’ success. The 55% increase in online sales during the pandemic saw business owners moving from physical storefronts to digital solutions to sell online, helping to expand their reach and increase revenue.', 'BodyBuild', '/uploads/templates/2', '/uploads/templates/2/index.html', '/uploads/templates/2/draft.html', '/uploads/templates/2/thumbnail.png', 0, '2023-05-05 16:14:04');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `fname` varchar(255) NOT NULL,
  `lname` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `mobile` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `created` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `revember` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `fname`, `lname`, `email`, `password`, `mobile`, `image`, `created`, `revember`) VALUES
(1, 'Shiv ', 'Saini', 'shiv742@gmail.com', '$2a$10$/ywtPR5ZITx.Sfq87vhiJeOvqHPA2oiJm8Uohws5trRhxYy8PtDja', '9057760469', 'file-1683278661221.JPG', '2023-05-05 09:24:21', NULL),
(2, 'Alex ', 'suman', 'alex2023@gmail.com', '$2a$10$KK9L6HrNgQeonlCoPvct2e1Gz1bjErbuViGhqvW8HN6TSncF21NGu', '9001158842', 'file-1683278993164.jpg', '2023-05-05 09:29:53', NULL),
(3, 'ravindra', 'saini', 'ravindra825@gmail.com', '$2a$10$Y7qLaegd1Db.y64yGP9wlucGEQE6yi.e.v/p8OvBkEOSby.4tx3Mi', '9588942355', 'file-1683285384790.jpg', '2023-05-05 11:16:25', NULL),
(4, 'mohit', 'saini', 'mohit555@gmail.com', '$2a$10$y44u2JoudodzXqvWHOWp3ey1sgTQISZLcw0.aaE4ISw.ECU3xMqoC', '9829974238', 'file-1683285487786.jpg', '2023-05-05 11:18:07', NULL),
(5, 'Dev', 'saini', 'dev777@gmail.com', '$2a$10$KdVOc.tGmmEmwAjsBwvcD.le6w3g1uU0xYSQ3jqzPr7NeiUDJ8VTi', '9057760469', 'null', '2023-05-06 18:50:33', NULL),
(6, 'Hanu', 'Suman', 'hanu8888@yopmail.com', '$2a$10$3u4YhoGFh2PPS4iqVI6cvO3S/TXG/iqLxeuLl7RSwTZyof71gFX/.', '9828192284', 'file-1686332112792.png', '2023-06-23 17:34:10', '$2a$10$KMdD9qzWAW.cyYwxFnKWCOOv8h7QHlcg3yfPDymYQ4VvePn1bN49y'),
(7, 'rahul', 'saini', 'rahulsaini@gmail.com', '$2a$10$bCtK0GOSbk8rtTwYcRR5IeQDmK.V3bOeuC6bE3XgGqXodKWQf78/2', '7976918836', 'file-1686578611560.jpg', '2023-06-12 14:03:31', NULL),
(8, 'Rahul', 'Saini', 'rahulsaini37242@gmail.com', '$2a$10$rK0V/cQ.G7FrVCMUEwphA.3Z3zLqGq2O0cRi7EbHcz3t/H5iaIg0q', '7976918836', 'null', '2023-06-23 11:08:26', '$2a$10$x1mV5ZKeOYnj4xXEcrStIuX06ZOcXdkqUBstkDdLTHY703MMmAvk.'),
(9, 'Shiv', 'Saini', 'shiv01@yopmail.com', '$2a$10$wL4cYQh9NhtSxuAHYPNllOF.YrNYBVGJ4VycAkPxViO0oJLL41TmC', '9057760469', 'null', '2023-07-26 10:00:33', NULL),
(10, 'shiv', 'Suman', 'shiv011@yopmail.com', '$2a$10$0z0uhHGleJb8oOreudk/peo65cv/x206S4VtyRrEOwdaUkL7MJHKO', '9057760469', 'null', '2023-07-26 10:10:28', NULL),
(11, 'Shiv', 'suman', 'shiv7777@yopmail.com', '$2a$10$v/g7y9GUodSF/qKlPcT5mu2nYSbqnr6qlCWDxoaSUldKTAUWEEZ7e', '9057760469', 'file-1690366454926.jpg', '2023-07-27 11:30:06', NULL),
(12, 'Shiv', 'Suman', 'shiv77777@yopmail.com', '$2a$10$8DAeM41sIKxoFlIwyb2eeOXA1TgvnA/Oh.agJV1OWDZ1qrbD6nqIa', '9057760469', 'null', '2023-07-27 11:29:43', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `user_setting`
--

CREATE TABLE `user_setting` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `key` varchar(255) NOT NULL,
  `value` varchar(255) NOT NULL,
  `type` varchar(255) NOT NULL,
  `created` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user_setting`
--

INSERT INTO `user_setting` (`id`, `user_id`, `key`, `value`, `type`, `created`) VALUES
(1, 6, 'LOGO', 'file-1685900760087.png', 'Image', '2023-06-05 08:10:15'),
(2, 6, 'USER', 'sumanshivprakash742@gmail.com', 'Text', '2023-06-04 18:00:22'),
(3, 6, 'PASS', 'dituoixzafhqwrmq', 'Text', '2023-06-19 14:17:10'),
(4, 6, 'SERVICE', 'gmail', 'Text', '2023-06-05 08:41:29'),
(5, 6, 'HOST', 'smtp.gmail.com', 'Text', '2023-06-05 08:42:14'),
(6, 6, 'THEME_COLOR', '#b51fff', 'Text', '2023-06-11 08:02:22'),
(7, 6, 'PORT', '465', 'Number', '2023-06-10 13:55:37');

-- --------------------------------------------------------

--
-- Table structure for table `worklog`
--

CREATE TABLE `worklog` (
  `id` int(11) NOT NULL,
  `user_id` varchar(255) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` longtext NOT NULL,
  `created` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `worklog`
--

INSERT INTO `worklog` (`id`, `user_id`, `title`, `description`, `created`) VALUES
(1, '6', 'Compaign', 'Send Email Contact', '2023-06-16 09:13:22'),
(2, '6', 'Compaign', 'Send Email Contact', '2023-06-16 11:42:19'),
(3, '6', 'Compaign', 'Send Email Contact', '2023-06-16 11:45:49'),
(4, '6', 'Contact', 'Delete Row', '2023-06-16 14:41:57'),
(5, '6', 'Profile', 'Update', '2023-06-21 11:11:00'),
(6, '6', 'Profile', 'Update', '2023-06-21 11:44:24'),
(7, '8', 'Subscription', 'Plan name -Besic Plan (purchose)', '2023-06-23 10:12:51'),
(8, '8', 'Subscription', 'Plan name -Besic Plan (purchose)', '2023-06-23 10:13:11'),
(9, '8', 'Profile', 'Update', '2023-06-23 11:08:26'),
(10, '6', 'User Password', 'Reset/Forget ? ', '2023-06-23 17:32:34'),
(11, '6', 'User Password', 'Reset/Forget ? ', '2023-06-23 17:34:10'),
(12, '8', 'Subscription', 'Plan name -Standard (purchose)', '2023-07-23 11:11:23'),
(13, '8', 'Subscription', 'Plan name -Standard (purchose)', '2023-07-23 11:11:34'),
(14, '9', 'Profile', 'Update', '2023-07-26 10:00:32'),
(15, '9', 'Compaign', 'Update', '2023-07-26 10:07:20'),
(16, '11', 'Profile', 'Update', '2023-07-26 10:14:15'),
(17, '11', 'List', 'Create', '2023-07-26 10:15:44'),
(18, '11', 'Compaign', 'Create', '2023-07-26 10:16:09'),
(19, '11', 'Compaign', 'Update', '2023-07-26 10:16:14'),
(20, '11', 'Compaign', 'Send Email Contact', '2023-07-26 10:16:31'),
(21, '11', 'Subscription', 'Plan name -Premium (purchose)', '2023-07-26 10:22:11'),
(22, '11', 'Profile', 'Update', '2023-07-27 11:30:06'),
(23, '11', 'Subscription', 'Plan name -Besic Plan (purchose)', '2023-10-09 08:12:35'),
(24, '11', 'Subscription', 'Plan name -Standard (purchose)', '2023-10-09 08:13:32');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `compaign`
--
ALTER TABLE `compaign`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `contact`
--
ALTER TABLE `contact`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `features`
--
ALTER TABLE `features`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `list`
--
ALTER TABLE `list`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `list_contacts`
--
ALTER TABLE `list_contacts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `mail_queue`
--
ALTER TABLE `mail_queue`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `payment`
--
ALTER TABLE `payment`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `plans`
--
ALTER TABLE `plans`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sendmail`
--
ALTER TABLE `sendmail`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `settings`
--
ALTER TABLE `settings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `template`
--
ALTER TABLE `template`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_setting`
--
ALTER TABLE `user_setting`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `worklog`
--
ALTER TABLE `worklog`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `compaign`
--
ALTER TABLE `compaign`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `contact`
--
ALTER TABLE `contact`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `features`
--
ALTER TABLE `features`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=59;

--
-- AUTO_INCREMENT for table `list`
--
ALTER TABLE `list`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `list_contacts`
--
ALTER TABLE `list_contacts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT for table `mail_queue`
--
ALTER TABLE `mail_queue`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=55;

--
-- AUTO_INCREMENT for table `payment`
--
ALTER TABLE `payment`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `plans`
--
ALTER TABLE `plans`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `sendmail`
--
ALTER TABLE `sendmail`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `settings`
--
ALTER TABLE `settings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `template`
--
ALTER TABLE `template`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `user_setting`
--
ALTER TABLE `user_setting`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `worklog`
--
ALTER TABLE `worklog`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
