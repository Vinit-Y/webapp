import * as assignmentService from "./../services/assignment-service.js";
import { setResponse } from "../utils/response.js";
import { Sequelize } from "sequelize";

// Get all assignments
export const getAll = async (request, response) => {
  try {
    const assignments = await assignmentService.getAllAssignments();
    setResponse(response, 200, assignments);
  } catch (error) {
    setResponse(response, 400, error);
  }
};

// Create a new assignment
export const post = async (request, response) => {
  try {
    const assignment = await assignmentService.createAssignment(
      request.body,
      request.user.AccountId
    );
    setResponse(response, 201, assignment);
  } catch (error) {
    if (error instanceof Sequelize.DatabaseError) {
      error = error.message;
    } else if (error instanceof Sequelize.ValidationError) {
      error = error.errors[0].message;
    }

    setResponse(response, 400, error);
  }
};

// Get an assignment by its ID
export const getById = async (request, response) => {
  try {
    const assignment = await assignmentService.getAssignment(request.params.id);
    if (assignment) {
      setResponse(response, 200, assignment);
    } else {
      setResponse(response, 404);
    }
  } catch (error) {
    setResponse(response, 400, error);
  }
};

// Update an assignment by its ID
export const updateById = async (request, response) => {
  try {
    const { status } = await assignmentService.updateAssignment(
      request.params.id,
      request.body,
      request.user.AccountId
    );
    setResponse(response, status);
  } catch (error) {
    if (error instanceof Sequelize.DatabaseError) {
      error = error.message;
    } else if (error instanceof Sequelize.ValidationError) {
      error = error.errors[0].message;
    }

    setResponse(response, 400, error);
  }
};

// Delete an assignment by its ID
export const deleteById = async (request, response) => {
  try {
    const { status } = await assignmentService.deleteAssignment(
      request.params.id,
      request.user.AccountId
    );
    setResponse(response, status);
  } catch (error) {
    setResponse(response, 400, error);
  }
};
