import { databaseConnection } from "./databaseConnection.js";
import { Sequelize, DataTypes } from "sequelize";

const Submission = databaseConnection.define("Submission", {
  id: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  // submissionUrl: {
  //   type: DataTypes.STRING,
  //   allowNull: false,

  // },
  submissionUrl: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isURL: {
        protocols: ['http', 'https'],
        requireProtocol: true,
      },
      endsWithZip(value) {
        if (!value.endsWith('.zip')) {
          throw new Error('Submission URL must end with .zip');
        }
      },
    },
  }
},
  {
    createdAt: "submission_date",
    updatedAt: "submission_updated",
    scopes: {
      withoutSubmissionId: {
        attributes: { exclude: ["SubmissionId"] },
      },
    },
  },
);

export default Submission;
