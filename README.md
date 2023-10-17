# Assignment 03

A Node.js application developed for CSYE 6225

## Prerequisites

- Node.js
- GitHub account with GitHub Team plan access
- Debian 12 VM (for testing and demo)
- Basic authentication token

## Setup and Usage

1. Clone the repository:
   git clone https://github.com/your-username/cloud.git

2. Install dependencies:
   cd fiel path
   npm install

3. Configure environment variables:
   - Create a `.env` file (use `.env.example` as a template).

4. Run the application:

   - Development mode (with hot-reloading):
     npm run dev
     

   - Production mode:
     npm start

5. Testing:

   - Run tests:
     npm test
    
## Copying Project to Debian VM

To copy your project to a Debian VM for testing and demo purposes, you can use the `scp` command. Replace the placeholders with your specific values:

1. **Copy Your Project to the Debian VM**:

   
   scp -r /path/to/your/cloud username@your-debian-vm-ip:/path/to/destination/
   ```

   Replace:
   - `/path/to/your/cloud` with the local path to your project folder
   - `username` with your SSH username for the Debian VM
   - `your-debian-vm-ip` with the IP address or hostname of your Debian VM
   - `/path/to/destination/` with the path on the VM where you want to copy your project files


2. **SSH into the Debian VM**:

   ```bash
   ssh username@your-debian-vm-ip
   ```

   Replace `username` with your SSH username and `your-debian-vm-ip` with the IP address or hostname of your Debian VM.

3. **Navigate to the Destination Folder**:

   ```bash
   cd /path/to/destination/
   ```

   Change to the directory where you copied your project.

4. **Install Dependencies and Start the Application**:
  sudo apt update
sudo apt upgrade
sudo apt install unzip
sudo apt install nodejs
sudo apt install npm
sudo apt install mariadb-server


