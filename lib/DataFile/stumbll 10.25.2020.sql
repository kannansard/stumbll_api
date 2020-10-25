USE `stumbll`;

CREATE TABLE `login_with_info` (
  `login_with_info_Id` INT NOT NULL AUTO_INCREMENT,
  `loginWithId` TINYINT NOT NULL,
  'user_id' INT NULL,
  `accessToken` VARCHAR(10000) NULL,
  `loginWithUserId` VARCHAR(1000)  NULL,
  `email` VARCHAR(100) NULL,
  `name` VARCHAR(256) NULL,
  `photoUrl` VARCHAR(1000) NULL,
  `expirationTime` BIGINT NULL,
  `lastRefreshTime` BIGINT NULL,
  `dataAccessExpirationTime` BIGINT NULL,
  `updatedAt` DATETIME DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`login_with_info_Id`)
);


ALTER TABLE `user` 
DROP INDEX `email_UNIQUE` ,
DROP INDEX `user_name_UNIQUE` ;


ALTER TABLE `user` 
CHANGE COLUMN `password` `password` VARCHAR(100) NULL ;
