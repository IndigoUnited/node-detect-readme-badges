'use strict';

const parseUrl = require('url').parse;
const getUrls = require('get-urls');
const requireDirectory = require('require-directory');
const parsers = requireDirectory(module, './lib', { recurse: false });
const parsersKeys = Object.keys(parsers);

// TODO badges to support:
// appveyor https://ci.appveyor.com/api/projects/status/${hash}?svg=true
// circle-ci https://circleci.com/gh/${user}/${package}.svg
// codacy https://api.codacy.com/project/badge/grade/${hash}
// gitter https://badges.gitter.im/${user}/${package}.png
// parallelci
// https://codecov.io/github/codecov/codecov-ruby/coverage.svg?branch=master
// http://www.coverity.com/

// loose definition of a badge url
function isBadgeUrl(url) {
    return ['.svg', '.png', '.jpg', '.gif', 'svg=true', 'png=true', 'badge']
    .some(extension => url.indexOf(extension) !== -1);
}

module.exports = readme => {
    let urls;

    readme = readme || readme.split('http').map(url => 'http' + url).join(' '); // Separate urls by spaces first

    try {
        urls = getUrls(readme);
    } catch (err) {
        return [];
    }

    return urls
    .map(url => url && url.split(')')[0]) // ignore markdown syntax leftovers
    .filter(url => !!url && isBadgeUrl(url))
    .map(url => {
        const parsedUrl = parseUrl(url, true);
        let badge;

        for (let i = 0; i < parsersKeys.length && !badge; ++i) {
            badge = parsers[parsersKeys[i]](parsedUrl);
        }

        // fallback to generic shields.io

        return badge;
    })
    .filter(badge => !!badge);
};
