import express from "express";
import * as connectionController from "../controllers/connection-controller.js";
import { setResponse } from "../utils/response.js";

const router = express.Router();

router.get("/", connectionController.checkConnection);

router.all((req, res) => {
  setResponse(res, 405);
});

export default router;
