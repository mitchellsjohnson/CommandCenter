GRANT USAGE ON *.* TO `ccuser`@`localhost` IDENTIFIED BY 'cc^2014' REQUIRE NONE;
GRANT Select  ON `commandcenter`.* TO `ccuser`@`localhost`;
GRANT Insert  ON `commandcenter`.* TO `ccuser`@`localhost`;
GRANT Update  ON `commandcenter`.* TO `ccuser`@`localhost`;
GRANT Delete  ON `commandcenter`.* TO `ccuser`@`localhost`;
