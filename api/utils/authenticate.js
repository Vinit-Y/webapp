import Account from "../models/account.js";
import bcrypt from "bcrypt";

// Authentication middleware for checking user credentials
export const authenticate = async (req, res, next) => {
  // Extract and decode the base64-encoded authentication token from the request headers
  const base64Auth = (req.headers.authorization || "").split(" ")[1] || "";
  const [email, password] = Buffer.from(base64Auth, "base64").toString().split(":");

  if (email && password) {
    // Find the account with the provided email
    const account = await Account.findOne({ where: { email } });

    // Check if the account exists and the provided password matches the stored password
    if (account && (await bcrypt.compare(password, account.password))) {
      // Set user information in the request object and configure response headers for CORS
      req.user = { email, AccountId: account.id };
      res.set({
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "*",
        "Access-Control-Allow-Credentials": "true",
        "Access-Control-Allow-Headers": "X-Requested-With, Content-Type, Accept, Origin",
        expires: "-1",
      });
      return next();
    }
  }

  // If email or password is missing, set the WWW-Authenticate header for basic authentication
  if (!email || !password) res.set("WWW-Authenticate", 'Basic realm="401"');
  
  // Respond with a 401 Unauthorized status and a consistent message indicating authentication is required
  res.status(401).send("Authentication is required for this resource.");
};



