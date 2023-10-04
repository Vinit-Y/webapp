import csvParser from "csv-parser";
import { databaseConnection } from "../models/databaseConnection.js";
import fs from "fs";
import Account from "../models/account.js";
import bcrypt from "bcrypt";


export const loadAccountsFromCSV = async () => {
  try {
    await databaseConnection.authenticate();
    console.log("Connection has been established with database successfully.");

    await databaseConnection.sync({ force: false });

    fs.createReadStream("./opt/users.csv")
      .pipe(csvParser())
      .on("data", async (row) => {
        try {
          const existingAccount = await Account.findOne({
            where: { email: row.email },
          });

          if (!existingAccount) {
            row.password = await bcrypt.hash(row.password, 10);
            await Account.create(row);
            console.log(`Create Account with email: ${row.email}`);
          }
        } catch (error) {
          console.error(`Error creating account for ${row.email}: ${error.message}`);
        }
      })
      .on("end", () => {
        console.log("Accounts loaded successfully!");
      });
  } catch (error) {
    console.error(`Unable to connect to the database for loading users from CSV ${error.message}`);
  }
};

