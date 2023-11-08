import logger from './logger.js';
import { logger1 } from './logger.js';
export const setResponse = async (req, res, status, data) => {

  const endpoint = req.originalUrl; 
  if (status >= 200 && status < 300) {
    logger1.info(`Request to [${endpoint}] was successful. Status code: ${status}`);
  } else if (status >= 400 && status < 500) {
    logger1.warn(`Client error on request to [${endpoint}]. Status code: ${status}`);
  } else if (status >= 500) {
    logger.error(`Server error on request to [${endpoint}]. Status code: ${status}`);
  }

  res
  .status(status)
  .header("cache-control", "no-cache, no-store, must-revalidate")
  .header("pragma", "no-cache")
  .json(data);
};