const assert = require('assert');
import logger from '../api/utils/logger.js'; 

describe('Logger Tests', () => {
  it('should log an informational message', () => {
    const message = 'This is an informational message.';
    assert.doesNotThrow(() => logger.info(message), Error);
  });

  it('should log a warning message', () => {
    const message = 'This is a warning message.';
    assert.doesNotThrow(() => logger.warn(message), Error);
  });

  it('should log an error message', () => {
    const message = 'This is an error message.';
    assert.doesNotThrow(() => logger.error(message), Error);
  });
});
