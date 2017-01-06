const mergeResources = require('../../lib/mergeResources');
const chance = require('../helpers/chance');

describe('mergeResources', () => {
  it('should merge resources with different types properly', () => {
    const e1 = chance.resource({ type: 'organization' });
    const e2 = chance.resource({ type: 'user' });
    expect(mergeResources([e1], [e2])).to.deep.equal([e1, e2]);
  });

  it('should sort resources', () => {
    const e1 = chance.resource({ type: 'organization' });
    const e2 = chance.resource({ type: 'user' });
    expect(mergeResources([e2], [e1])).to.deep.equal([e1, e2]);
  });

  it('should merge undefined resources properly', () => {
    const e1 = chance.resource();
    expect(mergeResources(undefined, [e1])).to.deep.equal([e1]);
    expect(mergeResources([e1], undefined)).to.deep.equal([e1]);
    expect(mergeResources(undefined, undefined)).to.deep.equal([]);
  });

  it('should throw an error when duplicate resources are found', () => {
    const e1 = chance.resource({ type: 'user' });
    const e2 = chance.resource({ type: 'user' });
    expect(mergeResources.bind(null, e1, e2)).to.throw;
  });
});
