# lib-apidoc-merge-services

A node utility for merging [apidoc service](http://apidoc.me/bryzek/apidoc-spec/latest) objects.

## Installation

```bash
npm install --save @flowio/lib-apidoc-merge-services
```

## Usage

```javascript
const apiJson = require('./api.json');
const apiInternalJson = require('./api-internal.json');
const mergeServices = require('@flowio/lib-apidoc-merge-services');

const result = mergeServices(apiJson, apiInternalJson);
```

## Api Reference

### `mergeServices(...services): Object`

Returns a new object with `enums`, `models`, `resources`, and `unions` from all specified service objects merged.

The first service is considered the *base service*. Other attributes, not documented above, will be picked from the base service. For example, the final service name will be the base service name.

An error is thrown whenever merged attributes conflict with each other. For example, if two services described the same model, then an error is thrown with the name of the conflicting models.

```bash
Invariant Error: CONFLICT found in API version 0.0.3
The following models are duplicated: user, account.
```

## License

MIT
