'use strict';

// https://coveralls.io/repos/${service}/${user}/${repo}/badge.svg?branch=${branch}
// https://coveralls.io/repos/${user}/${repo}/badge.svg?branch=${branch}
// https://img.shields.io/coveralls/${user}/${repo}.svg
// https://img.shields.io/coveralls/${user}/${repo}/${branch}.svg

module.exports = function (parsedUrl) {
    const url = parsedUrl.href.split('?')[0];
    let match;
    let data;

    if ((match = url.match(/img.shields.io\/coveralls\/(.+)\/(.+)\/(.+)\..+/))) {
        // shields badge with branch
        data = { user: match[1], repo: match[2], branch: match[3] };
    } else if ((match = url.match(/img.shields.io\/coveralls\/(.+)\/(.+)\..+/))) {
        // shields badge
        data = { user: match[1], repo: match[2] };
    } else if ((match = url.match(/coveralls.io\/repos\/(.+)\/(.+)\/(.+)\/badge\..+/))) {
        // coveralls badge with service
        data = { service: match[1], user: match[2], repo: match[3], branch: parsedUrl.query.branch };
    } else if ((match = url.match(/coveralls.io\/repos\/(.+)\/(.+)\/badge\..+/))) {
        // coveralls badge
        data = { user: match[1], repo: match[2], branch: parsedUrl.query.branch, service: parsedUrl.query.service };
    } else {
        return null;
    }

    const coverallsUrl = 'https://coveralls.io/repos/' +
        `${data.service ? `${data.service}/` : ''}` +
        `${data.user}/${data.repo}/badge.svg${data.branch ? `?branch=${data.branch}` : ''}`;
    const shieldsUrl =
        `https://img.shields.io/coveralls/${data.user}/${data.repo}${data.branch ? `/${data.branch}` : ''}`;

    return {
        urls: {
            original: parsedUrl.href,
            service: coverallsUrl,
            shields: `${shieldsUrl}.svg`,
            content: `${shieldsUrl}.json`,
        },
        info: {
            service: 'coveralls',
            type: 'coverage',
            modifiers: { branch: data.branch /* service: data.service */ },
        },
    };
};
