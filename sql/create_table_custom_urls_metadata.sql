CREATE TABLE `custom_urls_metadata` (
  `custom_urls_metadata_id` int(11) NOT NULL AUTO_INCREMENT,
  `transaction_id` char(36) NOT NULL DEFAULT '00000000-0000-0000-0000-000000000000',
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

CREATE TRIGGER Trigger_custom_urls_metadata_OnInsert
BEFORE INSERT ON custom_urls_metadata 
FOR EACH ROW
SET NEW.transaction_id = IF( NEW.transaction_id = '00000000-0000-0000-0000-000000000000', UUID(), NEW.transaction_id );

      <h2>Environment    :   </h2><h3><%=data[i].environment%></h3>
        <h2>Project Name   :   </h2><h3><%=data[i].project_name%></h3>
        <h2>Build Timestamp:   </h2><h3><%=data[i].build_timestamp%></h3>
        <h2>Errors         :   </h2><h3><%=data[i].errors%></h3>
        <h2>Breakers       :   </h2><h3><%=data[i].breakers%></h3>
              if (data[i].color == "Red"){%>
              