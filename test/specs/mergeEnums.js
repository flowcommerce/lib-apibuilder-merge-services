const mergeEnums = require('../../lib/mergeEnums');
const chance = require('../helpers/chance');

describe('mergeEnums', () => {
  it('should merge enums with different names properly', () => {
    const e1 = chance.enum({ name: 'events' });
    const e2 = chance.enum({ name: 'types' });
    expect(mergeEnums([e1], [e2])).to.deep.equal([e1, e2]);
  });

  it('should sort enums', () => {
    const e1 = chance.enum({ name: 'events' });
    const e2 = chance.enum({ name: 'types' });
    expect(mergeEnums([e2], [e1])).to.deep.equal([e1, e2]);
  });

  it('should merge undefined enums properly', () => {
    const e1 = chance.enum();
    expect(mergeEnums(undefined, [e1])).to.deep.equal([e1]);
    expect(mergeEnums([e1], undefined)).to.deep.equal([e1]);
    expect(mergeEnums(undefined, undefined)).to.deep.equal([]);
  });

  it('should throw an error when duplicate enums are found', () => {
    const e1 = chance.enum({ name: 'enum' });
    const e2 = chance.enum({ name: 'enum' });
    expect(mergeEnums.bind(null, e1, e2)).to.throw;
  });
});
