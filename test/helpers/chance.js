const assign = require('lodash/assign');
const chance = require('chance').Chance(Math.random);
const isArray = require('lodash/isArray');
const isEmpty = require('lodash/isEmpty');
const isPlainObject = require('lodash/isPlainObject');
const isUndefined = require('lodash/isUndefined');
const omitBy = require('lodash/omitBy');
const url = require('url');

const omitByUndefined = object => omitBy(object, isUndefined);

chance.mixin({
  // creates a mock attribute object
  // http://apidoc.me/doc/apiJson#attribute
  attribute: object => assign({
    name: chance.word(),
    value: {
      [chance.word()]: chance.word(),
    },
  }, object),

  // create a mock body object
  // http://apidoc.me/doc/apiJson#body
  body: object => omitByUndefined(assign({
    type: chance.type(),
    description: chance.optional(chance.sentence()),
    attributes: chance.optional(chance.n(chance.attribute, chance.d6())),
    deprecation: chance.optional(chance.deprecation()),
  }, object)),

  // creates a mock deprecation object
  // http://apidoc.me/doc/apiJson#deprecation
  deprecation: object => omitByUndefined(assign({
    description: chance.optional(chance.sentence()),
  }, object)),

  // creates a mock enum object
  // http://apidoc.me/doc/apiJson#enum
  enum: object => omitByUndefined(assign({
    name: chance.word(),
    plural: chance.optional(chance.word()),
    description: chance.optional(chance.sentence()),
    values: chance.n(chance.enumvalue, chance.d6()),
    attributes: chance.optional(chance.n(chance.attribute, chance.d6())),
    deprecation: chance.optional(chance.deprecation()),
  }, object)),

  // create a mock enum value object
  // http://apidoc.me/doc/apiJson#enumValue
  enumvalue: object => omitByUndefined(assign({
    name: chance.word(),
    description: chance.optional(chance.sentence()),
    attributes: chance.optional(chance.n(chance.attribute, chance.d6())),
    deprecation: chance.optional(chance.deprecation()),
  }, object)),

  // create a mock field object
  // http://apidoc.me/doc/apiJson#field
  field: object => omitByUndefined(assign({
    name: chance.word(),
    type: chance.type(),
    description: chance.optional(chance.sentence()),
    required: chance.bool(),
    default: chance.optional(chance.word()),
    example: chance.optional(chance.sentence()),
    minimum: chance.optional(chance.natural()),
    maximum: chance.optional(chance.natural()),
    attributes: chance.optional(chance.n(chance.attribute, chance.d6())),
    deprecation: chance.optional(chance.deprecation()),
  }, object)),

  // create a mock model object
  // http://apidoc.me/doc/apiJson#model
  model: object => omitByUndefined(assign({
    name: chance.word(),
    description: chance.optional(chance.sentence()),
    plural: chance.optional(chance.word()),
    fields: chance.n(chance.field, chance.d6()),
    attributes: chance.optional(chance.n(chance.attribute, chance.d6())),
    deprecation: chance.optional(chance.deprecation()),
  }, object)),

  // create a mock operation object
  // http://apidoc.me/doc/apiJson#operation
  operation: object => omitByUndefined(assign({
    method: chance.pickone(['GET', 'PATCH', 'POST', 'PUT', 'DELETE']),
    path: url.parse(chance.url()).pathname,
    description: chance.optional(chance.sentence()),
    body: chance.optional(chance.body()),
    parameters: chance.optional(chance.n(chance.parameter, chance.d6())),
    responses: chance.optional(chance.n(chance.response, chance.d6())),
    attributes: chance.optional(chance.n(chance.attribute, chance.d6())),
    deprecation: chance.optional(chance.deprecation()),
  }, object)),

  optional: (object) => {
    if (isArray(object)) return chance.pickone([[], object]);
    if (isPlainObject(object) && !isEmpty(object)) return chance.pickone([{}, object]);
    return chance.pickone([undefined, object]);
  },

  // create a mock parameter object
  // http://apidoc.me/doc/apiJson#parameter
  parameter: object => omitByUndefined(assign({
    name: chance.word(),
    type: chance.type(),
    location: chance.optional(chance.pickone(['path', 'query', 'form'])),
    description: chance.optional(chance.sentence()),
    deprecation: chance.optional(chance.deprecation()),
    required: chance.bool(),
    default: chance.optional(chance.word()),
    example: chance.optional(chance.sentence()),
    minimum: chance.optional(chance.natural()),
    maximum: chance.optional(chance.natural()),
  }, object)),

  // create a mock resource object
  // http://apidoc.me/doc/apiJson#resource
  resource: object => omitByUndefined(assign({
    type: chance.word(),
    plural: chance.word(),
    path: url.parse(chance.url()).pathname,
    description: chance.optional(chance.sentence()),
    operations: chance.n(chance.operation, chance.d6()),
    attributes: chance.optional(chance.n(chance.attribute, chance.d6())),
    deprecation: chance.optional(chance.deprecation()),
  }, object)),

  // create a mock response object
  // http://apidoc.me/doc/apiJson#response
  response: object => omitByUndefined(assign({
    code: {
      integer: {
        value: chance.pickone([200, 401, 404, 422]),
      },
    },
    type: chance.type(),
    description: chance.optional(chance.sentence()),
    deprecation: chance.optional(chance.deprecation()),
  }, object)),

  // create a mock apidoc service object
  // http://apidoc.me/doc/apiJson
  service: object => omitByUndefined(assign({
    apidoc: {
      version: '0.11.26',
    },
    name: chance.word(),
    version: '0.11.52',
    info: {
      license: {
        name: 'MIT',
        url: 'http://opensource.org/licenses/MIT',
      },
      contact: {
        name: chance.name(),
        url: chance.url(),
        email: chance.email(),
      },
    },
    headers: [],
    imports: [],
    enums: chance.n(chance.enum, chance.d6()),
    unions: chance.n(chance.union, chance.d6()),
    models: chance.n(chance.model, chance.d6()),
    resources: chance.n(chance.resource, chance.d6()),
    attributes: chance.n(chance.attribute, chance.d6()),
    base_url: chance.url(),
    description: chance.sentence(),
  }, object)),

  // returns a mock or valid apidoc type
  // http://apidoc.me/doc/types
  type: () => chance.pickone([
    'boolean',
    'date-iso8601',
    'date-time-iso8601',
    'decimal',
    'double',
    'integer',
    'long',
    'object',
    'string',
    'unit',
    'uuid',
    chance.word(),
  ]),

  // create a mock union object
  // http://apidoc.me/doc/apiJson#union
  union: object => omitByUndefined(assign({
    name: chance.word(),
    plural: chance.optional(chance.word()),
    discriminator: chance.optional('discriminator'),
    description: chance.optional(chance.sentence()),
    types: chance.n(chance.unionType, chance.d6()),
    attributes: chance.optional(chance.n(chance.attribute, chance.d6())),
    deprecation: chance.optional(chance.deprecation()),
  }, object)),

  // create a mock union type object
  // http://apidoc.me/doc/apiJson#unionType
  unionType: object => omitByUndefined(assign({
    type: chance.type(),
    description: chance.optional(chance.sentence()),
    attributes: chance.optional(chance.n(chance.attribute, chance.d6())),
    deprecation: chance.optional(chance.deprecation()),
  }, object)),
});

module.exports = chance;
