import * as connectionService from "../services/connection-service.js";
import { setResponse } from "../utils/response.js";

// Check the connection status
export const checkConnection = async (req, res) => {
  // Check if request body or query parameters are present; if so, return a 400 Bad Request response
  if (Object.keys(req.body).length !== 0 || Object.keys(req.query).length !== 0) {
    setResponse(res, 400);
    return;
  }

  // Check the connection using the connection service
  const { statusCode } = await connectionService.checkConnection();

  // Handle different connection status codes and set the appropriate response
  switch (statusCode) {
    case 200:
      setResponse(res, 200); // Success - OK
      break;
    default:
      setResponse(res, 503); // Service Unavailable
      break;
  }
};
