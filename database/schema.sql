CREATE DATABASE IF NOT EXISTS drawing_program CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE drawing_program;

CREATE TABLE IF NOT EXISTS users (
 id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
 username VARCHAR(64) NOT NULL UNIQUE,
 created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS projects (
 id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
 owner VARCHAR(64) NOT NULL,
 name VARCHAR(160) NOT NULL,
 description TEXT,
 document_json JSON,
 updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
 created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
 INDEX idx_projects_owner_updated (owner,updated_at)
);

CREATE TABLE IF NOT EXISTS library_items (
 id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
 category VARCHAR(80) NOT NULL,
 title VARCHAR(160) NOT NULL,
 description TEXT,
 guide_json JSON,
 published BOOLEAN NOT NULL DEFAULT TRUE,
 created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
 updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
 INDEX idx_library_category_title (category,title)
);

CREATE TABLE IF NOT EXISTS assets (
 id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
 project_id BIGINT UNSIGNED NOT NULL,
 kind VARCHAR(40) NOT NULL,
 name VARCHAR(160) NOT NULL,
 uri TEXT NOT NULL,
 metadata_json JSON,
 created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
 FOREIGN KEY(project_id) REFERENCES projects(id) ON DELETE CASCADE
);

INSERT IGNORE INTO library_items(category,title,description,guide_json) VALUES
('Characters','Head & Face','Anime head construction','["circle","jaw","center line","eye line","features","hair"]'),
('Characters','Eyes','Anime eye construction','["eye line","upper lid","iris","pupil","highlights","lower lid"]'),
('Characters','Hair','Anime hair construction','["skull","hairline","masses","locks","tapered strands"]'),
('Characters','Body Anatomy','Anime body construction','["gesture","ribcage","pelvis","limbs","hands","feet"]'),
('Buildings','Japanese Houses','Architecture construction','["horizon","box forms","roof","windows","details"]'),
('Environments','City Streets','Anime background construction','["horizon","perspective","buildings","street","lighting"]'),
('Vehicles','Trains','Anime vehicle construction','["perspective box","body","windows","wheels","details"]'),
('Creatures','Dragons','Fantasy creature construction','["gesture","ribcage","skull","limbs","wings","scales"]'),
('Scenes','Composition','Scene planning','["focal point","rule of thirds","depth","lighting"]'),
('Manga','Panel Layouts','Manga page construction','["page grid","panels","gutter","balloons","effects"]');
