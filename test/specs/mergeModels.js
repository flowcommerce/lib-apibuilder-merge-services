const chance = require('../helpers/chance');
const mergeModels = require('../../lib/mergeModels');

describe('mergeModels', () => {
  it('should merge models with different names properly', () => {
    const m1 = chance.model({ name: 'organization' });
    const m2 = chance.model({ name: 'user' });
    expect(mergeModels([m1], [m2])).to.deep.equal([m1, m2]);
  });

  it('should sort models', () => {
    const m1 = chance.model({ name: 'organization' });
    const m2 = chance.model({ name: 'user' });
    expect(mergeModels([m2], [m1])).to.deep.equal([m1, m2]);
  });

  it('should merge undefined models properly', () => {
    const m1 = chance.model();
    expect(mergeModels(undefined, [m1])).to.deep.equal([m1]);
    expect(mergeModels([m1], undefined)).to.deep.equal([m1]);
    expect(mergeModels(undefined, undefined)).to.deep.equal([]);
  });

  it('should throw an error when duplicate models are found', () => {
    const m1 = chance.model({ name: 'model' });
    const m2 = chance.model({ name: 'model' });
    expect(mergeModels.bind(null, m1, m2)).to.throw;
  });
});
