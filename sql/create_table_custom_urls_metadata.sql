CREATE TABLE `custom_urls_metadata` (
  `custom_urls_metadata_id` int(11) NOT NULL AUTO_INCREMENT,
  `json_data` text NOT NULL,
  `start_time` timestamp NULL, 
  `end_time` timestamp  NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_by` varchar(100) NOT NULL,
  `updated` timestamp  NULL,
  `updated_by` varchar(100)  NULL,
  PRIMARY KEY (`custom_urls_metadata_id`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=latin1;
