import Sequelize from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize({
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT,
}
);

console.log(process.env.DB_USER);
console.log(process.env.DB_PASSWORD);
console.log(process.env.DB_DIALECT);
console.log(process.env.DB_HOST);
console.log(process.env.DB_PORT);


export const getConnection = async () => {

  try {
    await sequelize.authenticate();
    return {
      status: 200,
    };
  } catch (error) {
    console.log(error.parent.errno);
    return { status: error.parent.errno };
  }
};