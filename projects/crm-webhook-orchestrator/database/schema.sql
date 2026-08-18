CREATE TABLE IF NOT EXISTS tbl_leads (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  email VARCHAR(190) NOT NULL,
  phone VARCHAR(40) NULL,
  city VARCHAR(100) NULL,
  service VARCHAR(120) NULL,
  source VARCHAR(80) NOT NULL,
  consent TINYINT(1) NOT NULL DEFAULT 0,
  status ENUM('new','qualified','contacted','won','lost') NOT NULL DEFAULT 'new',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_leads_email (email),
  INDEX idx_leads_status (status)
);
