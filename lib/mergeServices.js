const assignWith = require('lodash/assignWith');
const createConflictMessageFormatter = require('./createConflictMessageFormatter');
const mergeEnums = require('./mergeEnums');
const mergeModels = require('./mergeModels');
const mergeResources = require('./mergeResources');
const mergeUnions = require('./mergeUnions');

function mergeServices(...services) {
  return assignWith({}, ...services, (objValue, srcValue, key, object, source) => {
    const options = {
      formatConflictMessage: createConflictMessageFormatter(source),
    };

    switch (key) {
      case 'enums': return mergeEnums(objValue, srcValue, options);
      case 'models': return mergeModels(objValue, srcValue, options);
      case 'resources': return mergeResources(objValue, srcValue, options);
      case 'unions': return mergeUnions(objValue, srcValue, options);
      default: return objValue;
    }
  });
}

module.exports = mergeServices;
