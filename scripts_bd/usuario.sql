CREATE USER 'sistema_pos_user'@'localhost' IDENTIFIED BY '***';
GRANT 
    SELECT, 
    INSERT, 
    UPDATE, 
    DELETE, 
    ALTER, 
    SHOW VIEW, 
    EXECUTE 
    ON *.* TO 'sistema_pos_user'@'localhost' 
    IDENTIFIED BY '***' 
    WITH MAX_QUERIES_PER_HOUR 0
    MAX_CONNECTIONS_PER_HOUR 0
    MAX_UPDATES_PER_HOUR 0 
    MAX_USER_CONNECTIONS 0;
    GRANT ALL PRIVILEGES ON `pos_mohansoft`.* TO 'sistema_pos_user'@'localhost';
