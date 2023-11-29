import express from "express";
import * as assignmentController from "./../controllers/assignment-controller.js";
import { setResponse } from "../utils/response.js";
import {
  checkPayLoadForPost,
  checkPayLoadForPutRequest,
  checkPayloadBody,
} from "../utils/payload.js";

const schema = ["name", "points", "num_of_attempts", "deadline"];
const optional = ["assignment_created", "assignment_updated"];

const submissionSchema = ["submission_url"];
const submissionOptional = ["submission_date", "submission_updated" ];
const router = express.Router();

router
  .route("/")
  .get(checkPayloadBody, assignmentController.getAll)
  .post(checkPayLoadForPost(schema, optional), assignmentController.post)
  .all((req, res) => {
    setResponse(req, res, 405);
  });

router
  .route("/:id")
  .get(checkPayloadBody, assignmentController.getById)
  .delete(checkPayloadBody, assignmentController.deleteById)
  .put(
    checkPayLoadForPutRequest(schema, optional),
    assignmentController.updateById
  )
  .all((req, res) => {
    setResponse(req, res, 405);
  });

router
  .route("/:id/submission")
  .post(checkPayLoadForPost(submissionSchema, submissionOptional), assignmentController.submitById)
  .all((req, res) => {
    setResponse(req, res, 405);
  });


export default router;