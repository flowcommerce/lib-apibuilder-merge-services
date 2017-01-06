const chance = require('../helpers/chance');
const mergeServices = require('../../lib/mergeServices');

describe('mergeServices', () => {
  const s1 = chance.service({ name: 'cats' });
  const s2 = chance.service({ name: 'dogs' });
  const s3 = chance.service({ name: 'ants' });

  it('should select base url from base service', () => {
    expect(mergeServices(s1, s2, s3)).to.have.property('base_url', s1.base_url);
  });

  it('should select description from base service', () => {
    expect(mergeServices(s1, s2, s3)).to.have.property('description', s1.description);
  });

  it('should select attributes from base service', () => {
    expect(mergeServices(s1, s2, s3)).to.have.property('attributes', s1.attributes);
  });

  it('should select imports from base service', () => {
    expect(mergeServices(s1, s2, s3)).to.have.property('imports', s1.imports);
  });

  it('should select headers from base service', () => {
    expect(mergeServices(s1, s2, s3)).to.have.property('headers', s1.headers);
  });

  it('should select info from base service', () => {
    expect(mergeServices(s1, s2, s3)).to.have.property('info', s1.info);
  });

  it('should select version from base service', () => {
    expect(mergeServices(s1, s2, s3)).to.have.property('version', s1.version);
  });

  it('should select name from base service', () => {
    expect(mergeServices(s1, s2, s3)).to.have.property('name', s1.name);
  });
});
