[![Build Status](https://travis-ci.org/joppe/json2ts.svg?branch=master)](https://travis-ci.org/joppe/json2ts) [![Coverage Status](https://coveralls.io/repos/github/joppe/json2ts/badge.svg?branch=master)](https://coveralls.io/github/joppe/json2ts?branch=master)[![Netlify Status](https://api.netlify.com/api/v1/badges/941287f7-fbb6-4236-994a-c7751a68ccce/deploy-status)](https://app.netlify.com/sites/nifty-jackson-3f31e3/deploys)

# JSON to TypeScript interface

With this package a JSON string can be converted to a TypeScript interface definition.

The JSON will be parsed to an object literal with `JSON.parse`. 

## Usage

```typescript
json2ts(json, 'root');
```
 
 The result can be found [here](https://nifty-jackson-3f31e3.netlify.com/).
