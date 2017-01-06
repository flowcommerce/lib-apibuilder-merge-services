const chance = require('../helpers/chance');
const mergeUnions = require('../../lib/mergeUnions');

describe('mergeUnions', () => {
  it('should merge unions with different names properly', () => {
    const u1 = chance.union({ name: 'poultry' });
    const u2 = chance.union({ name: 'seafood' });
    expect(mergeUnions([u1], [u2])).to.deep.equal([u1, u2]);
  });

  it('should sort unions', () => {
    const u1 = chance.union({ name: 'poultry' });
    const u2 = chance.union({ name: 'seafood' });
    expect(mergeUnions([u2], [u1])).to.deep.equal([u1, u2]);
  });

  it('should merge undefined unions properly', () => {
    const u1 = chance.union();
    expect(mergeUnions(undefined, [u1])).to.deep.equal([u1]);
    expect(mergeUnions([u1], undefined)).to.deep.equal([u1]);
    expect(mergeUnions(undefined, undefined)).to.deep.equal([]);
  });

  it('should throw an error when duplicate unions are found', () => {
    const u1 = chance.union({ name: 'union' });
    const u2 = chance.union({ name: 'union' });
    expect(mergeUnions.bind(null, u1, u2)).to.throw;
  });
});
