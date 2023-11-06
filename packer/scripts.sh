#!/bin/bash

# Update and upgrade the system
sudo apt-get update
sudo apt-get upgrade -y
sudo apt-get clean

# Install unzip, npm, and nodejs
sudo apt install unzip -y
unzip
sudo apt-get install npm -y
npm -v
sudo apt-get install nodejs -y
node -v

sudo groupadd csye6225
# Create a dedicated non-privileged user
sudo useradd -s /bin/false -g csye6225 -d /opt/csye6225 -m csye6225

# Copy the application files
sudo cp /tmp/webapp.zip /opt/csye6225/webapp.zip

# Extract the application files
cd /opt/csye6225 || exit
sudo mkdir webapp
sudo unzip webapp.zip -d webapp
ls -al

# Install Node.js dependencies
cd webapp/ || exit
ls -al
sudo npm install

# Remove the Git package
sudo apt-get remove -y git

# Change ownership of the application directory
sudo chown -R csye6225:csye6225 /opt/csye6225/webapp

# Change permissions of the application directory
sudo chmod -R 750 /opt/csye6225/webapp

# Copy the systemd service file
sudo cp /tmp/systemdBootUp.service /lib/systemd/system/systemdBootUp.service

# Reload, enable, and start the systemd service
sudo systemctl daemon-reload
sudo systemctl enable systemdBootUp.service
sudo systemctl start systemdBootUp.service
sudo systemctl status systemdBootUp.service
