import { databaseConnection } from "../models/databaseConnection.js";
import Assignment from "../models/assignment.js";
import Account from "../models/account.js";
import { loadAccountsFromCSV } from "./loadAcntFromCSV.js";

Assignment.belongsTo(Account, { foreignKey: { allowNull: false } });
Account.hasMany(Assignment);

export const syncDatabase = async () => {
  try {
    await databaseConnection.sync({ force: false });

    await loadAccountsFromCSV();
  } catch (error) {
    console.log(error);
  }
};