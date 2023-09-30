import express from "express";
import * as databaseController from "./../controllers/database-controller.js";

const router = express.Router();


router.get("/", databaseController.get);

export default router;