
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

## Importing SSL Certificate into AWS Certificate Manager (ACM):
 A guide on how to import an SSL certificate into AWS Certificate Manager using the AWS CLI.

### Prerequisites

- AWS CLI installed and configured with the necessary credentials.
- SSL certificate files:
  - `certificate.pem`: Your SSL certificate file.
  - `certificate-chain.pem`: Your certificate chain file.
  - `private-key.pem`: Your private key file.

### Importing the SSL Certificate

1. Open a terminal window.

2. Run the following command to import the SSL certificate into AWS ACM:

   ```bash
   aws acm import-certificate --certificate file://certificate.pem --certificate-chain file://certificate-chain.pem --private-key file://private-key.pem
   ```

   Replace `certificate.pem`, `certificate-chain.pem`, and `private-key.pem` with the actual file names and paths on your local system.

3. After running the command, the AWS ACM will import your SSL certificate. The certificate will be in the "PENDING_VALIDATION" state.

4. Complete the domain validation process in the AWS Management Console or using the AWS CLI to validate the certificate for your domain.

