const createConflictMessageFormatter = ({ name, version }) => ({ type, duplicates }) => (
  `CONFLICT found in ${name} version ${version}.\n`
  + `The following ${type} are already defined: ${duplicates.join(', ')}`
);

module.exports = createConflictMessageFormatter;
