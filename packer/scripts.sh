#!/bin/bash

# sudo apt-get update
# sudo apt-get upgrade -y
# sudo apt-get clean

# sudo apt install unzip -y
# unzip -v

# sudo apt-get install npm -y
# sudo apt-get install nodejs -y
# node -v
# npm -v

# pwd
# ls -al
# cd /tmp
# sudo ls -al
# sudo cp /tmp/webapp.zip /opt/webapp.zip

# cd /opt || exit
# sudo mkdir webapp
# sudo unzip webapp.zip -d webapp

# echo "------------Unziped File Successfully--------------"
# sudo apt-get remove -y git

# pwd
# ls -al
# cd webapp/ || exit
# pwd
# ls -al
# sudo npm install
# ls -al

# sudo groupadd csye6225
# sudo useradd -s /bin/false -g csye6225 -d /opt/csye6225 -m csye6225

# sudo cp /tmp/systemdBootUp.service /lib/systemd/system/systemdBootUp.service

# sudo systemctl daemon-reload
# sudo systemctl enable systemdBootUp.service
# sudo systemctl start systemdBootUp.service
# sudo systemctl status systemdBootUp.service
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



# Create a dedicated non-privileged user
sudo useradd -s /usr/sbin/nologin -g csye6225 -d /opt/csye6225 -m csye6225

# Copy the application files
sudo cp /tmp/webapp.zip /opt/webapp.zip

# Extract the application files
cd /opt || exit
sudo mkdir webapp
sudo unzip webapp.zip -d webapp
ls -al

# Install Node.js dependencies
cd /opt/webapp || exit
ls -al
sudo npm install

# Remove the Git package
sudo apt-get remove -y git

# Copy the systemd service file
sudo cp /tmp/systemdBootUp.service /lib/systemd/system/systemdBootUp.service

# Change ownership of the application directory
sudo chown -R csye6225:csye6225 /opt/webapp

# Reload, enable, and start the systemd service
sudo systemctl daemon-reload
sudo systemctl enable systemdBootUp.service
sudo systemctl start systemdBootUp.service
sudo systemctl status systemdBootUp.service
