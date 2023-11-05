import csvParser from "csv-parser";
import { databaseConnection } from "../models/databaseConnection.js";
import fs from "fs";
import Account from "../models/account.js";
import bcrypt from "bcrypt";

// Function to load user accounts from a CSV file into the database
export const loadAccountsFromCSV = async () => {
  try {
    // Authenticate the database connection
    await databaseConnection.authenticate();
    console.log("Database connection established successfully.");

    // Synchronize the database models
    await databaseConnection.sync({ force: false });

    // Read data from the CSV file and process each row
    fs.createReadStream("./opt/users.csv")
      .pipe(csvParser())
      .on("data", async (row) => {
        try {
          // Check if an account with the same email exists
          const existingAccount = await Account.findOne({
            where: { email: row.email },
          });

          if (!existingAccount) {
            // Hash the password and create a new account if it doesn't exist
            row.password = await bcrypt.hash(row.password, 10);
            await Account.create(row);
            console.log(`Account created with email: ${row.email}`);
          }
        } catch (error) {
          console.error(`Error creating account for ${row.email}: ${error.message}`);
        }
      })
      .on("end", () => {
        // Data loading completed successfully
        console.log("Account data loaded from CSV successfully!");
      });
  } catch (error) {
    // Handle any errors related to database connection
    console.error(`Failed to connect to the database for user data import: ${error.message}`);
  }
};
