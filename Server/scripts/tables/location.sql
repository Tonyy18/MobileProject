CREATE TABLE IF NOT EXISTS locations (
    id INT NOT NULL AUTO_INCREMENT,
    user_id INT NOT NULL,
    coordinates TEXT NOT NULL,
    city TEXT NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);