const log4js = require('log4js');

module.exports = function getLogger(component) {
  const logger = log4js.getLogger(component);
  logger.level = 'debug';
  return logger;
};
