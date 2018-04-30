'use strict';

const parseUrl = require('url').parse;
const getUrls = require('get-urls');
const requireDirectory = require('require-directory');
const parsers = requireDirectory(module, './lib', { recurse: false });
const parsersKeys = Object.keys(parsers);

// TODO badges to support:
// codacy https://api.codacy.com/project/badge/grade/${hash}
// gitter https://badges.gitter.im/${user}/${package}.png
// parallelci
// http://www.coverity.com/

// Loose definition of a badge url
// Appveyor is the only that doesn't have any extension. It has /api on the url,
// but this is too generic to be added here, so we playing safe and not applying it.
function isBadgeUrl(url) {
    return ['.svg', '.png', '.jpg', '.gif', 'svg=true', 'png=true', 'badge', 'appveyor']
        .some(extension => url.indexOf(extension) !== -1);
}

module.exports = readme => {
    let urls;

    // Separate urls by spaces first
    readme = readme || readme.split('http').map(url => `http${url}`).join(' ');

    try {
        urls = Array.from(getUrls(readme));
    } catch (err) {
        return [];
    }

    return urls
        .map(url => url && url.split(')')[0]) // Ignore markdown syntax leftovers
        .filter(url => !!url && isBadgeUrl(url))
        .map(url => {
            const parsedUrl = parseUrl(url, true);
            let badge;

            for (let i = 0; i < parsersKeys.length && !badge; ++i) {
                badge = parsers[parsersKeys[i]](parsedUrl);
            }

            // TODO: Fallback to generic shields.io
            // If that is the case we should add a flag indicating that it is a guess.

            return badge;
        })
        .filter(badge => !!badge);
};
