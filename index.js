'use strict';

const parseUrl = require('url').parse;
const getUrls = require('get-urls');
const requireDirectory = require('require-directory');
const parsers = requireDirectory(module, './lib', { recurse: false });

// npm downloads https://img.shields.io/npm/${dm || dt}/${package}.svg
// npm version https://img.shields.io/npm/v/${package}.svg
// nodei.co https://nodei.co/npm/${package}.svg
// travis-ci https://travis-ci.org/${user}/${package}.svg?branch=${branch}
// appveyor https://ci.appveyor.com/api/projects/status/${hash}?svg=true
// circle-ci https://circleci.com/gh/${user}/${package}.svg
// david https://david-dm.org/${user}/${package}.svg
// david dev https://david-dm.org/${user}/${package}/dev-status.svg
// codacy https://api.codacy.com/project/badge/grade/${hash}
// coveralls https://coveralls.io/github/${user}/${package}.svg?branch=${branch}
// gitter https://badges.gitter.im/${user}/${package}.png

// maybe codeship/parallelci
// https://codecov.io/github/codecov/codecov-ruby/coverage.svg?branch=master
// http://www.coverity.com/

// default to shields.io

function isBadgeUrl(url) {
    // loose definition of a badge url
    return ['.svg', '.png', '.jpg', '.gif', 'svg=true', 'png=true', '/badge/']
    .some(extension => url.indexOf(extension) !== -1);
}

// Separate urls by http first
function extractUrls(readme) {
    return getUrls(readme.split('http').map(url => 'http' + url).join(' '))
    .map(url => url && url.split(')')[0]) // ignore markdown syntax
    .filter(url => !!url);
}

function parseBadgeUrl(url) {
    const parsedUrl = parseUrl(url);
    const badgeParser = Object.keys(parsers)
        .find(badgeParser => parsedUrl.href.indexOf(badgeParser) !== -1);

    if (!isBadgeUrl(url) || !badgeParser) {
        return null;
    }

    return parsers[badgeParser](parsedUrl);
}

module.exports = readme => {
    return extractUrls(readme)
        .map(parseBadgeUrl)
        .filter(badge => !!badge);
};
