#!/bin/bash

sudo apt-get update
sudo apt-get upgrade -y
sudo apt-get clean

sudo apt install unzip -y
unzip -v

sudo apt-get install npm -y
sudo apt-get install nodejs -y
node -v
npm -v

pwd
ls -al

sudo cp /tmp/webapp.zip /opt/webapp.zip

cd /opt || exit
sudo mkdir webapp
sudo unzip webapp.zip -d webapp

echo "------------Unziped File Successfully--------------"
sudo apt-get remove -y git

pwd
ls -al
cd webapp/ || exit
pwd
ls -al
sudo npm install
ls -al

sudo groupadd csye6225
sudo useradd -s /bin/false -g csye6225 -d /opt/csye6225 -m csye6225

sudo cp /tmp/systemd-boot.service /lib/systemd/system/systemd-boot.service

sudo systemctl daemon-reload
sudo systemctl enable systemd-boot.service
sudo systemctl start systemd-boot.service
sudo systemctl status systemd-boot.service





