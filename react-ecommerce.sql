-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 07, 2022 at 06:35 PM
-- Server version: 10.4.22-MariaDB
-- PHP Version: 8.0.13

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `react-ecommerce`
--

-- --------------------------------------------------------

--
-- Table structure for table `carts`
--

CREATE TABLE `carts` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `product_id` int(11) NOT NULL,
  `product_qty` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `carts`
--

INSERT INTO `carts` (`id`, `user_id`, `product_id`, `product_qty`, `created_at`, `updated_at`) VALUES
(15, '1', 5, 2, '2022-01-07 04:50:36', '2022-01-07 04:50:36');

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `meta_title` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `meta_keyword` mediumtext COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `meta_des` mediumtext COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `slug` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `des` longtext COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` tinyint(4) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `meta_title`, `meta_keyword`, `meta_des`, `slug`, `name`, `des`, `status`, `created_at`, `updated_at`) VALUES
(6, 'Smartphone', 'Smartphone, mobile', 'a mobile phone that performs many of the functions of a computer, typically having a touchscreen interface, internet access, and an operating system capable of running downloaded apps.', 'smartphones', 'Smartphones', 'A mobile phone that performs many of the functions of a computer, typically having a touchscreen interface, internet access, and an operating system capable of running downloaded apps.', 0, '2021-12-30 11:30:45', '2021-12-30 11:33:08'),
(7, 'laptop', 'laptop gaming laptop', 'A laptop, laptop computer, or notebook computer is a small, portable personal computer (PC) with a screen and alphanumeric keyboard. ... Laptops can be powered either from an internal battery or by an external power supply from an AC adapter.', 'laptops', 'Laptops', 'A laptop, laptop computer, or notebook computer is a small, portable personal computer (PC) with a screen and alphanumeric keyboard. ... Laptops can be powered either from an internal battery or by an external power supply from an AC adapter.', 0, '2021-12-30 11:32:47', '2021-12-30 11:32:47');

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(13, '2014_10_12_000000_create_users_table', 1),
(14, '2014_10_12_100000_create_password_resets_table', 1),
(15, '2019_08_19_000000_create_failed_jobs_table', 1),
(16, '2019_12_14_000001_create_personal_access_tokens_table', 1),
(17, '2021_12_26_041304_create_categories_table', 2),
(18, '2021_12_27_173555_create_products_table', 3),
(19, '2021_12_30_192724_create_carts_table', 4),
(24, '2022_01_03_154531_create_orders_table', 5),
(25, '2022_01_03_155114_create_orderitems_table', 5);

-- --------------------------------------------------------

--
-- Table structure for table `orderitems`
--

CREATE TABLE `orderitems` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `order_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `qty` int(11) NOT NULL,
  `price` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `orderitems`
--

INSERT INTO `orderitems` (`id`, `order_id`, `product_id`, `qty`, `price`, `created_at`, `updated_at`) VALUES
(1, 2, 5, 4, 125000, '2022-01-07 01:43:58', '2022-01-07 01:43:58'),
(2, 3, 3, 1, 12000, '2022-01-07 02:03:22', '2022-01-07 02:03:22'),
(3, 3, 4, 3, 102000, '2022-01-07 02:03:22', '2022-01-07 02:03:22'),
(4, 3, 5, 3, 125000, '2022-01-07 02:03:22', '2022-01-07 02:03:22'),
(5, 4, 5, 2, 125000, '2022-01-07 02:18:46', '2022-01-07 02:18:46'),
(6, 5, 3, 1, 12000, '2022-01-07 02:56:33', '2022-01-07 02:56:33'),
(7, 6, 3, 1, 12000, '2022-01-07 04:38:23', '2022-01-07 04:38:23');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` int(11) NOT NULL,
  `firstname` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `lastname` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `address` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `city` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `state` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `zipcode` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `payment_id` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `payment_mode` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `tracking_no` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` tinyint(4) NOT NULL DEFAULT 0,
  `remark` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `user_id`, `firstname`, `lastname`, `phone`, `email`, `address`, `city`, `state`, `zipcode`, `payment_id`, `payment_mode`, `tracking_no`, `status`, `remark`, `created_at`, `updated_at`) VALUES
(2, 1, 'jerald', 'dias', '0177888', 'jerald@mail.com', 'Uttar badda ,purbachal,road no: 14 dhaka', 'Dhaka', 'Badda', '1203', NULL, 'COD', 'reactecom10262', 0, NULL, '2022-01-07 01:43:58', '2022-01-07 01:43:58'),
(3, 1, 'Rabbil', 'Nowaj', '2323', 'rabbil@mail.com', 'Uttara ,purbachal,road no: 14 dhaka', 'Dhaka', 'Uttara', '1205', NULL, 'COD', 'reactecom10318', 0, NULL, '2022-01-07 02:03:22', '2022-01-07 02:03:22'),
(4, 1, 'Nowshin', 'Uddin', '98989898', 'nowshin@mail.com', 'Farmgate ,purbachal,road no: 14 dhaka', 'Dhaka', 'farmgate', '12055', NULL, 'COD', 'reactecom10941', 0, NULL, '2022-01-07 02:18:46', '2022-01-07 02:18:46'),
(5, 1, 'Wallace', 'Boyle', '+1 (673) 274-1903', 'piwizolebe@mailinator.com', 'Molestias aliquip ni', 'Mollit soluta duis v', 'Cum labore nisi exce', '64309', NULL, 'COD', 'reactecom10260', 0, NULL, '2022-01-07 02:56:33', '2022-01-07 02:56:33'),
(6, 1, 'Pearl', 'Bradford', '+1 (471) 799-2859', 'fuvup@mailinator.com', 'Dolore facere consec', 'Omnis sit et volupt', 'Ut debitis et sed nu', '73215', 'pay_Igp0sGeeZsEZrk', 'razorpay', 'reactecom10007', 0, NULL, '2022-01-07 04:38:23', '2022-01-07 04:38:23');

-- --------------------------------------------------------

--
-- Table structure for table `password_resets`
--

CREATE TABLE `password_resets` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `personal_access_tokens`
--

INSERT INTO `personal_access_tokens` (`id`, `tokenable_type`, `tokenable_id`, `name`, `token`, `abilities`, `last_used_at`, `created_at`, `updated_at`) VALUES
(31, 'App\\Models\\User', 1, 'Admin_AdminToken-name', 'e4a5b3b5455a7eb8f9f96eb47e404530fc7fed1ef720d2c8b18fc88e91d1224e', '[\"server:admin\"]', '2022-01-07 08:30:52', '2022-01-07 02:17:24', '2022-01-07 08:30:52');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `category_id` int(11) NOT NULL,
  `meta_title` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `meta_keyword` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `meta_des` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `slug` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `des` mediumtext COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `brand` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `selling_price` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `original_price` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `qty` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `image` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `featured` tinyint(4) DEFAULT 0,
  `popular` tinyint(4) DEFAULT 0,
  `status` tinyint(4) DEFAULT 0 COMMENT '0=shown 1=hidden',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `category_id`, `meta_title`, `meta_keyword`, `meta_des`, `slug`, `name`, `des`, `brand`, `selling_price`, `original_price`, `qty`, `image`, `featured`, `popular`, `status`, `created_at`, `updated_at`) VALUES
(3, 6, 'xaomi', 'xaomi mobile smartphone', 'OS Android 11, Realme UI 2.0\nCPU: Octa-core CPU, up to 2.05GHz\nGPU: ARM Mali-G76\nRAM: 8GB LPDDR4X /ROM: 128GB UFS 2.1', 'mi', 'Realme 8 - 8 + 128 Gb', 'OS Android 11, Realme UI 2.0\nCPU: Octa-core CPU, up to 2.05GHz\nGPU: ARM Mali-G76\nRAM: 8GB LPDDR4X /ROM: 128GB UFS 2.1', 'Xaomi Mi', '12000', '15000', '17', 'uploads/product/1640885864.jfif', 0, 0, 0, '2021-12-30 11:37:44', '2022-01-07 04:38:23'),
(4, 6, 'iphone', 'iphone smartphone', 'OS Android 11, Realme UI 2.0\nCPU: Octa-core CPU, up to 2.05GHz\nGPU: ARM Mali-G76\nRAM: 8GB LPDDR4X /ROM: 128GB UFS 2.1', 'iphone', 'Iphone X', 'OS Android 11, Realme UI 2.0\nCPU: Octa-core CPU, up to 2.05GHz\nGPU: ARM Mali-G76\nRAM: 8GB LPDDR4X /ROM: 128GB UFS 2.1', 'Iphone X', '102000', '120000', '47', 'uploads/product/1640885970.jfif', 0, 0, 0, '2021-12-30 11:39:30', '2022-01-07 02:03:22'),
(5, 7, 'Laptop', 'laptop 18 inch', 'MPN: NX.EG8SI.002\nModel: EX215-52-37YW\nIntel Core i3-1005G1 Processor (4M Cache, 1.20 GHz up to 3.40 GHz)', 'asus', 'Asus  Extension 15', 'MPN: NX.EG8SI.002\nModel: EX215-52-37YW\nIntel Core i3-1005G1 Processor (4M Cache, 1.20 GHz up to 3.40 GHz)', 'Asus', '125000', '140000', '15', 'uploads/product/1640886144.jpg', 0, 0, 0, '2021-12-30 11:42:24', '2022-01-07 02:18:46');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `role` int(11) DEFAULT 0 COMMENT '0=user,1=admin',
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `email_verified_at`, `role`, `password`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'Admin', 'admin@mail.com', NULL, 1, '$2y$10$TX.2Vc3G2vf7NBU6ldlqCuxFTs5vqT/82QPfhQpWv586rABLxzhy.', NULL, '2021-12-21 10:51:56', '2021-12-21 10:51:56'),
(2, 'jerald', 'jerald@mail.com', NULL, 0, '$2y$10$MDSf5SF1weEDG3fRSYesx.WlJKc4IWC6ZrapsMNELBkohPhHsFZt.', NULL, '2021-12-25 06:29:03', '2021-12-25 06:29:03'),
(3, 'rasel', 'rasel@mail.com', NULL, 0, '$2y$10$GE6s1PkHofgwzFHSYbiQS.V/J.AbYp27tOtCA/QSIlhosyJd8qVMq', NULL, '2021-12-31 10:07:58', '2021-12-31 10:07:58');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `carts`
--
ALTER TABLE `carts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orderitems`
--
ALTER TABLE `orderitems`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `password_resets`
--
ALTER TABLE `password_resets`
  ADD KEY `password_resets_email_index` (`email`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `carts`
--
ALTER TABLE `carts`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `orderitems`
--
ALTER TABLE `orderitems`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
