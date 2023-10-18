#!/bin/bash

sudo apt-get update
sudo apt-get upgrade -y
sudo apt-get clean
sudo apt install unzip -y
unzip -v
sudo apt install nodejs npm -y
node -v
npm -v
sudo apt update -y
sudo apt upgrade -y
sudo apt install mariadb-server -y
echo "GRANT ALL ON *.* TO 'admin'@'localhost' IDENTIFIED BY 'password' WITH GRANT OPTION;" | sudo mariadb
echo "FLUSH PRIVILEGES;" | sudo mariadb
echo "show databases;" | sudo mariadb
echo "create database mydb;" | sudo mariadb
echo "show databases;" | sudo mariadb
echo "exit" | sudo mariadb
sudo systemctl status mariadb
sudo mysqladmin version
unzip webapp.zip
echo "------------Unziped File Successfully--------------"
pwd
ls -al
cd webapp/ || exit
pwd
# touch .env
# cat<<EOL> .env
# PORT=5000
# DB_HOST=127.0.0.1
# DB_PORT=3306
# DB_USER=admin
# DB_PASSWORD=password
# DB_DIALECT=mysql
# DB_NAME=mydb
# EOL
sudo npm install


