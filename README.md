# Assignment Management System 📚

Welcome to the Assignment Management System repository! This Node.js application is designed to streamline the management of assignments, offering features such as creation, updates, and deletions. It also supports assignment submissions with validation checks, including the maximum number of attempts and submission deadlines. User authentication is implemented using basic HTTP authentication with email and password.

## Technologies Used 🚀

- **Node.js:** Server-side JavaScript programming.
- **Express:** Web application framework for handling HTTP requests and responses.
- **Sequelize:** ORM (Object-Relational Mapping) for interacting with the database.
- **bcrypt:** Password hashing and verification for user authentication.
- **AWS SDK:** Facilitates interaction with Amazon Simple Notification Service (SNS) for message publishing.
- **Winston:** Logging tool for both console and file-based logging.
- **CSV Parser:** Supports bootstrapping CSV files for creating or updating user accounts.
- **StatsD:** Used for collecting custom application metrics.

## Database 🗃️

The application uses Sequelize as the ORM to interact with the underlying relational database. The database schema includes tables for assignments, users, and submissions.

## API Endpoints 🌐

### Health Check
- `/healthz`: Performs a health check, verifying the connection to the database.

### Assignment Endpoints
- `GET /v1/assignments`: Retrieve a list of all assignments.
- `GET /v1/assignments/:id`: Retrieve details of a specific assignment by ID.
- `POST /v1/assignments`: Create a new assignment with various validations.
- `PUT /v1/assignments/:id`: Update an assignment (restricted to the owner) with similar validations as the creation.
- `DELETE /v1/assignments/:id`: Delete an assignment (restricted to the owner).

### Assignment Submission
- `POST /v1/assignments/:id/submission`: Submit an assignment with validations.

## Authentication 🔐

User authentication is implemented using basic HTTP authentication. Users must include an Authorization header with their email and password encoded in base64.

## Assignment Submission and SNS Integration 📤

Users can submit assignments, and upon submission, a message is published to an AWS SNS topic. This can be used for notification purposes or integration with other services.

## Logging 📝

The application utilizes Winston for logging. Logs are output to both the console and a file (combined.log).

## CSV Processing 📊

The application includes a function (`loadAccountsFromCSV`) to read and process a CSV file, creating or updating user accounts based on the data.

## Configuration ⚙️

```env
PORT=5000
DB_HOST=127.0.0.1
DB_NAME=**your-dbName**
DB_PORT=**your-dbPort**
DB_USER=**your-user**
DB_PASSWORD=**your-password**
DB_DIALECT=**your-dbDialect**
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=**your-aws-acess-key-id**
AWS_SECRET_ACCESS_KEY=**your-secretAccessKey**
AWS_SNS_TOPIC_ARN==**your-topic arn**
```

## Running the Application 🚀

1. Install dependencies: `npm install`
2. Set environment variables in a .env file.
3. Run the application: `npm start`

The server will run on port 5000 by default.

## Testing 🧪

The application includes basic integration tests. Run tests using: `npm test`

## Deployment

The application can be deployed to a hosting service or cloud provider. Ensure that the necessary environment variables are configured for production use.

## Implementing AWS DNS with Mailgun for Email Services 📧

This comprehensive guide will walk you through the process of setting up and configuring AWS DNS (Amazon Route 53) with Mailgun for efficient email services. Additionally, it highlights the advantage of obtaining a domain from Namecheap, which is available for free through the GitHub Student Developer Pack.

### Prerequisites 🛠️

Before you start, ensure you have the following:

- **AWS Account:** Have an active AWS account.
- **Mailgun Account:** Sign up for a Mailgun account at [Mailgun](https://www.mailgun.com/).
- **GitHub Student Developer Pack:** To avail of a free domain from Namecheap.

### Steps to Implement AWS DNS with Mailgun 🚀

#### 1. Get a Free Domain from Namecheap (GitHub Student Developer Pack)

1. **Access GitHub Education:**
   - Visit [GitHub Education](https://education.github.com/).
   - Apply for the GitHub Student Developer Pack.

2. **Claim Namecheap Offer:**
   - Once approved, navigate to the [GitHub Student Developer Pack](https://education.github.com/pack/offers).
   - Locate the Namecheap offer and claim your free domain.

#### 2. Set Up AWS Route 53

1. **Access AWS Console:**
   - Log in to your AWS Management Console.

2. **Navigate to Route 53:**
   - Open the Route 53 console.

3. **Create Hosted Zone:**
   - Click on "Create Hosted Zone."
   - Enter your domain name (the one obtained from Namecheap).
   - Click "Create."

4. **Record Set for Mailgun:**
   - Inside your hosted zone, create a new record set.
   - Set the record name (e.g., `mail`).
   - Choose the record type as `MX - Mail exchange`.
   - In the "Value/Route traffic to" field, enter the Mailgun MX server (e.g., `mx.mailgun.org`).
   - Set the priority (e.g., `10`).
   - Click "Create Record Set."

5. **Record Set for Email Verification (Optional):**
   - Create a TXT record for email verification if required by Mailgun.
   - Set the name to `_amazonses.yourdomain.com` (replace `yourdomain.com` with your actual domain).
   - Enter the TXT value provided by Mailgun for email verification.
   - Click "Create Record Set."

#### 3. Verify Domain in Mailgun

1. **Access Mailgun Dashboard:**
   - Log in to your Mailgun account.

2. **Add Domain:**
   - In the Mailgun dashboard, go to the "Sending" section.
   - Click on "Domains" and then "Add New Domain."
   - Enter your domain name and click "Add Domain."

3. **Configure DNS Records:**
   - Mailgun will provide DNS records to add.
   - Copy the DNS records provided by Mailgun (TXT, CNAME, and MX records).

4. **Add DNS Records in Route 53:**
   - Go back to your Route 53 hosted zone.
   - Add the DNS records provided by Mailgun.
   - Create new record sets for each record type (TXT, CNAME, MX).

#### 4. Verify DNS Configuration

1. **Wait for Propagation:**
   - DNS changes may take some time to propagate. Wait for the changes to take effect.

2. **Verify Domain in Mailgun:**
   - In the Mailgun dashboard, go to the "Domains" section.
   - Verify that your domain status is "Active."

3. **Test Email Sending:**
   - Use the Mailgun dashboard or API to send a test email.
   - Verify that emails are sent successfully.

Please be patient as DNS changes may take time to propagate. Wait for the changes to reflect before testing email services.

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

