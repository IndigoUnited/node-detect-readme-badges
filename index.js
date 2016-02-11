'use strict';

const parseUrl = require('url').parse;
const getUrls = require('get-urls');
const requireDirectory = require('require-directory');
const parsers = requireDirectory(module, './lib', { recurse: false });

// TODO badges to support:
// appveyor https://ci.appveyor.com/api/projects/status/${hash}?svg=true
// circle-ci https://circleci.com/gh/${user}/${package}.svg
// codacy https://api.codacy.com/project/badge/grade/${hash}
// gitter https://badges.gitter.im/${user}/${package}.png
// parallelci
// https://codecov.io/github/codecov/codecov-ruby/coverage.svg?branch=master
// http://www.coverity.com/

// fallback to shields.io

// loose definition of a badge url
function isBadgeUrl(url) {
    return ['.svg', '.png', '.jpg', '.gif', 'svg=true', 'png=true', '/badge/']
    .some(extension => url.indexOf(extension) !== -1);
}

module.exports = readme => {
    return getUrls(
        readme.split('http').map(url => 'http' + url).join(' ') // Separate urls by spaces first
    )
    .map(url => url && url.split(')')[0]) // ignore markdown syntax leftovers
    .filter(url => !!url && isBadgeUrl(url))
    .map(url => {
        const parsedUrl = parseUrl(url, true);
        const badgeParser = Object.keys(parsers)
            .find(badgeParser => parsedUrl.href.indexOf(badgeParser) !== -1);

        return parsers[badgeParser] && parsers[badgeParser](parsedUrl);
    })
    .filter(badge => !!badge);
};
