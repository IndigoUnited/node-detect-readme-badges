# detect-readme-badges

> Scans a repository's readme file, searching for badges

[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage Status][coveralls-image]][coveralls-url] [![Dependency status][david-dm-image]][david-dm-url] [![Dev Dependency status][david-dm-dev-image]][david-dm-dev-url]

[npm-url]:https://npmjs.org/package/detect-readme-badges
[npm-image]:http://img.shields.io/npm/v/detect-readme-badges.svg?style=flat-square
[travis-url]:https://travis-ci.org/IndigoUnited/node-detect-readme-badges
[travis-image]:http://img.shields.io/travis/IndigoUnited/node-detect-readme-badges/master.svg?style=flat-square
[coveralls-url]:https://coveralls.io/r/IndigoUnited/node-detect-readme-badges
[coveralls-image]:https://img.shields.io/coveralls/IndigoUnited/node-detect-readme-badges/master.svg?style=flat-square
[david-dm-url]:https://david-dm.org/IndigoUnited/node-detect-readme-badges
[david-dm-image]:https://img.shields.io/david/IndigoUnited/node-detect-readme-badges.svg?style=flat-square
[david-dm-dev-url]:https://david-dm.org/IndigoUnited/node-detect-readme-badges#info=devDependencies
[david-dm-dev-image]:https://img.shields.io/david/dev/IndigoUnited/node-detect-readme-badges.svg?style=flat-square

## Usage

`detectReadmeBadges(readme) -> Array`

Given a readme file (in string), detectReadmeBadges returns the array of badges found. Example:

```js
const detectReadmeBadges = require('detect-readme-badges');
const badges = detectReadmeBadges(`
    ...

    > Simplified HTTP/HTTPS requests

    [![Build Status](https://travis-ci.org/sindresorhus/got.svg?branch=master)](https://travis-ci.org/sindresorhus/got) [![Coverage Status](https://coveralls.io/repos/sindresorhus/got/badge.svg?service=github&branch=master)](https://coveralls.io/github/sindresorhus/got?branch=master) [![Downloads](https://img.shields.io/npm/dm/got.svg)](https://npmjs.com/got)

    A nicer interface to the built-in ['http'](http://nodejs.org/api/http.html) module.

    ...
`)

// badges
[
    {
        urls: {
            original: 'https://travis-ci.org/sindresorhus/got.svg?branch=master',
            service: 'https://api.travis-ci.org/sindresorhus/got.svg?branch=master',
            shields: 'https://img.shields.io/travis/sindresorhus/got/master.svg',
            content: 'https://img.shields.io/travis/sindresorhus/got/master.json',
        },
        info: { service: 'travis', type: 'build', modifiers: { branch: 'master' } },
    },
    {
        urls: {
            original: 'https://coveralls.io/repos/sindresorhus/got/badge.svg?branch=master',
            service: 'https://coveralls.io/repos/sindresorhus/got/badge.svg?branch=master',
            shields: 'https://img.shields.io/coveralls/sindresorhus/got/master.svg',
            content: 'https://img.shields.io/coveralls/sindresorhus/got/master.json',
        },
        info: { service: 'coveralls', type: 'coverage', modifiers: { branch: 'master' } },
    },
    {
        urls: {
            original: 'https://img.shields.io/npm/dm/got.svg',
            shields: 'https://img.shields.io/npm/dm/got.svg',
            content: 'https://img.shields.io/npm/dm/got.json' },
        info: { service: 'npm', type: 'downloads', modifiers: { type: 'dm' } },
    },
]
```

#### `badge.urls`

**`urls.original`** the original matched url.

**`urls.service`** the service url.

**`urls.shields`** the shields.io equivalent url.

**`urls.content`** the shields.io url to extract a json of the badge's "value".

#### `badge.info`

Information extracted from the badge url.

**`info.type`** type of the badge. Available types are `build`, `coverage`, `downloads`, `version`, `dependencies` and `misc`.

**`info.service`** is the service that provides the badge. Available services are [coveralls](https://coveralls.io), [david](https://david-dm.org), npm ([shields.io](https://shields.io) or [nodei.co](https://nodei.co)), [travis](https://travis-ci.org) and [gitter](https://gitter.im).

**`info.modifiers`** are the badge modifiers that alter the interpretation of the repo/package depending on the service.


## Tests

`$ npm test`
`$ npm test-cov` to get coverage report

## License

Released under the [MIT License](http://www.opensource.org/licenses/mit-license.php).
