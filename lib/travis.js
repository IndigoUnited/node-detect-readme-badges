'use strict';

const removeExtension = require('./util/removeExtension');

// travis https://[api.]travis-ci.org/${user}/${repo}.svg?branch=${branch}
// shields https://img.shields.io/travis/${user}/${repo}/${branch}.svg

module.exports = function (parsedUrl) {
    const url = parsedUrl.href.split('?')[0];
    let match;
    let data;

    if ((match = url.match(/img.shields.io\/travis\/(.+)\/(.+).*/))) {
        data = { user: match[1], repo: removeExtension(match[2]) };

        // Support branches
        if (data.user.split('/').length > 1) {
            data.branch = data.repo;
            data.repo = data.user.split('/')[1];
            data.user = data.user.split('/')[0];
        }
    } else if ((match = url.match(/travis-ci.org\/(.+)\/(.+).*/))) {
        data = { user: match[1], repo: removeExtension(match[2]), branch: parsedUrl.query.branch };
    } else {
        return null;
    }

    return {
        originalUrl: parsedUrl.href,
        url: `https://api.travis-ci.org/${data.user}/${data.repo}.svg${data.branch ? '?branch=' + data.branch : ''}`,
        metaUrl: `https://img.shields.io/travis/${data.user}/${data.repo}${data.branch ? '/' + data.branch : ''}.json`,
        type: 'travis',
    };
};
