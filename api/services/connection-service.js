import { databaseConnection } from "../models/databaseConnection.js";

export const checkConnection = async () => {
  try {
    await databaseConnection.authenticate();
    return {
      statusCode: 200,
    };
  } catch (error) {
    console.log(error);
    return { statusCode: error.parent.errno };
  }
};
