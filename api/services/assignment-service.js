import Assignment from "../models/assignment.js";
import Submission from "../models/submission.js";
import { publishMessageToSns } from "../utils/publishToSns.js";

export const getAllAssignments = async () => {
  const assignments = await Assignment.scope("withoutAccountId").findAll();
  return assignments;
};

export const getAssignment = async (id, AccountId) => {
  const assignment = await Assignment.findByPk(id);
  return assignment;
};

export const getAssignmentsByAccountId = async (id, AccountId) => {
  const assignments = await Assignment.findByPk(id);
  let status = 200;

  if (!assignments) {
    status = 404;
  } else if (assignments.AccountId !== AccountId) {
    status = 403;
  }

  return status;
};

export const createAssignment = async (newAssignment, AccountId) => {
  const assignment = await Assignment.create({ ...newAssignment, AccountId });
  delete assignment.dataValues.AccountId;
  return assignment;
};

export const updateAssignment = async (id, assignment, AccountId) => {
  const status = await getAssignmentsByAccountId(id, AccountId);

  if (status === 200) {
    const updatedAssignment = await Assignment.update(assignment, {
      where: { id },
    });
    return { status: 204, updatedAssignment };
  }

  return { status };
};

export const deleteAssignment = async (id, AccountId) => {
  const status = await getAssignmentsByAccountId(id, AccountId);

  if (status === 200) {
    const deletedAssignment = await Assignment.destroy({ where: { id } });
    return { status: 204, deletedAssignment };
  }

  return { status };
};

export const submitAssignment = async (assignmentId, submissionUrl, user) => {
const status = await getAssignmentsByAccountId(assignmentId, user.AccountId);

if (status === 200) {
  const num_of_attempts = await Submission.count({ where: { AssignmentId: assignmentId } });
  const assignment = await getAssignment(assignmentId, user.AccountId);
  const retries = assignment.num_of_attempts;
  const dueDate = assignment.deadline;

  if (dueDate < new Date()) {
    console.log("Assignment deadline has passed");
    return { status: 400, submission: "Assignment deadline has passed" };
  } else if (retries <= num_of_attempts) {
    console.log("Exceeded maximum number of retries");
    return { status: 400, submission: "Exceeded maximum number of retries" };
  } else {
    const submission = await Submission.create({
      AssignmentId: assignmentId,
      submissionUrl,
    });

    const message = {
      submissionUrl: submissionUrl,
      email: user.email,
      assignmentId: assignmentId,
    };

    await publishMessageToSns(JSON.stringify(message));

    return { status: 201, submission};
  }

}

return { status };
};  
