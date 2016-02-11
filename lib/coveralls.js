'use strict';

const removeExtension = require('./util/removeExtension');

// https://coveralls.io/repos/github/${user}/${repo}/badge.svg?branch=${branch}
// https://coveralls.io/repos/${user}/${repo}/badge.svg?branch=${branch}
// https://img.shields.io/coveralls/${user}/${repo}.svg
// https://img.shields.io/coveralls/${user}/${repo}/${branch}.svg

module.exports = function (parsedUrl) {
    const url = parsedUrl.href.split('?')[0];
    let match;
    let data;

    if ((match = url.match(/img.shields.io\/coveralls\/(.+)\/(.+).*/))) {
        data = { user: match[1], repo: removeExtension(match[2]) };

        // Support branches
        if (data.user.split('/').length > 1) {
            data.branch = data.repo;
            data.repo = data.user.split('/')[1];
            data.user = data.user.split('/')[0];
        }
    } else if ((match = url.match(/coveralls.io\/(.+)/))) {
        // repos/[github]/IndigoUnited/js-promtie/badge.svg -> ['js-promtie', 'IndigoUnited']
        match = match[1].split('/').reverse();
        match.shift();

        data = { user: match[1], repo: match[0], branch: parsedUrl.query.branch };
    } else {
        return null;
    }

    return {
        originalUrl: parsedUrl.href,
        url: `https://coveralls.io/repos/${data.user}/${data.repo}/badge.svg${data.branch ? '?branch=' + data.branch : ''}`,
        metaUrl: `https://img.shields.io/coveralls/${data.user}/${data.repo}${data.branch ? '/' + data.branch : ''}.json`,
        type: 'coveralls',
    };
};
