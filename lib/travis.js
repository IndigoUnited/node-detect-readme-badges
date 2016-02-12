'use strict';

// travis https://[api.]travis-ci.org/${user}/${repo}.svg?branch=${branch}
// shields https://img.shields.io/travis/${user}/${repo}/${branch}.svg

module.exports = function (parsedUrl) {
    const url = parsedUrl.href.split('?')[0];
    let match;
    let data;

    if ((match = url.match(/img.shields.io\/travis\/(.+)\/(.+)\/(.+)\..+/))) {
        data = { user: match[1], repo: match[2], branch: match[3] };
    } else if ((match = url.match(/img.shields.io\/travis\/(.+)\/(.+)\..+/))) {
        data = { user: match[1], repo: match[2] };
    } else if ((match = url.match(/travis-ci.org\/(.+)\/(.+)\..+/))) {
        data = { user: match[1], repo: match[2], branch: parsedUrl.query.branch };
    } else {
        return null;
    }

    const travisUrl =
        `https://api.travis-ci.org/${data.user}/${data.repo}.svg${data.branch ? `?branch=${data.branch}` : ''}`;
    const shieldsUrl =
        `https://img.shields.io/travis/${data.user}/${data.repo}${data.branch ? `/${data.branch}` : ''}`;

    return {
        urls: {
            original: parsedUrl.href,
            service: travisUrl,
            shields: `${shieldsUrl}.svg`,
            content: `${shieldsUrl}.json`,
        },
        info: {
            service: 'travis',
            type: 'build',
            modifiers: { branch: data.branch },
        },
    };
};
