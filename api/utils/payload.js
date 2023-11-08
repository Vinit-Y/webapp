import { setResponse } from "./response.js";

// Middleware to check if the request payload body is empty (for GET requests)
export const checkPayloadBody = (req, res, next) => {
  // Check if the request body or query parameters are present
  const check = Object.keys(req.body).length || Object.keys(req.query).length;
  if (check) {
    setResponse(req, res, 400); // Bad Request
  } else {
    return next(); // Continue to the next middleware
  }
};

// Middleware to check the request payload for POST requests
export const checkPayLoadForPost = (compulsory, optional) => {
  return (req, res, next) => {
    // Check if query parameters are present
    const params = Object.keys(req.query).length;
    if (params) {
      setResponse(req, res, 400); // Bad Request
      return;
    }

    // Check if the request body is not empty
    const check = Object.keys(req.body).length;
    if (check) {
      const keys = Object.keys(req.body);
      // Find missing compulsory fields
      const missing = compulsory.filter((item) => !keys.includes(item));
      if (missing.length) {
        setResponse(
          req,
          res,
          400,
          `Missing compulsory fields: ${missing.join(", ")}`
        );
      } else {
        // Find extra fields that are neither compulsory nor optional
        const extra = keys.filter(
          (item) => !compulsory.includes(item) && !optional.includes(item)
        );
        if (extra.length) {
          setResponse(req, res, 400, `Extra fields: ${extra.join(", ")}`);
        } else {
          // Remove optional fields from the request body
          optional.forEach((item) => {
            if (req.body[item]) {
              delete req.body[item];
            }
          });
          return next(); // Continue to the next middleware
        }
      }
    } else {
      setResponse(req, res, 400); // Bad Request
    }
  };
};

// Middleware to check the request payload for PUT requests
export const checkPayLoadForPutRequest = (schema, optional) => {
  return (req, res, next) => {
    // Check if query parameters are present
    const params = Object.keys(req.query).length;
    if (params) {
      setResponse(req, res, 400); // Bad Request
      return;
    }

    // Get the keys from the request body
    const requestBodyKeys = Object.keys(req.body);

    // Check for invalid properties not in the schema
    const hasInvalidProperties = requestBodyKeys.some(
      (property) => !schema.includes(property)
    );

    // Check if request body includes properties defined in the schema
    const hasSchemaProperties = requestBodyKeys.some((property) =>
      schema.includes(property)
    );

    if (hasInvalidProperties || !hasSchemaProperties) {
      setResponse(req, res, 400); // Bad Request
    } else {
      // Remove optional fields from the request body
      for (const key of optional) {
        if (req.body[key]) {
          delete req.body[key];
        }
      }

      return next(); // Continue to the next middleware
    }
  };
};
