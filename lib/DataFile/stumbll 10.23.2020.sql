USE `stumbll`;

ALTER TABLE `user_info` 
ADD COLUMN `user_infocol` VARCHAR(45) NULL DEFAULT 'CURRENT_TIMESTAMP' AFTER `updated_at`;

INSERT INTO identify_yourself (name) VALUES("I am a business man");
INSERT INTO identify_yourself (name) VALUES("I am an engineer");
INSERT INTO identify_yourself (name) VALUES("I am a doctor");
INSERT INTO identify_yourself (name) VALUES("I like dogs");