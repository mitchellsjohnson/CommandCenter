CREATE TABLE `custom_urls_metadata` (
  `custom_urls_metadata_id` int(11) NOT NULL AUTO_INCREMENT,
  `url_id` int(11) NOT NULL,
  `json_data` text NOT NULL,
  `start_time` timestamp NULL, 
  `end_time` timestamp  NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_by` varchar(100) NOT NULL,
  `updated` timestamp  NULL,
  `updated_by` varchar(100)  NULL,
  PRIMARY KEY (`custom_urls_metadata_id`),
  KEY `FK_url_url_id_custom_urls_metadata` (`url_id`),
  CONSTRAINT `FK_url_url_id_custom_urls_metadata` FOREIGN KEY (`url_id`) REFERENCES `urls` (`url_id`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=latin1;
