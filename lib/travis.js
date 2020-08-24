'use strict';

// travis https://[api.]travis-ci.org/${user}/${repo}.svg?branch=${branch}
// shields https://img.shields.io/travis/${user}/${repo}/${branch}.svg

module.exports = function (parsedUrl) {
    const url = parsedUrl.href.split('?')[0];
    let match;
    let data;

    if ((match = url.match(/travis-ci.(com|org)\/(.+)\/(.+)\..+/))) {
        data = { user: match[2], repo: match[3], branch: parsedUrl.query.branch, site: match[1] };
    } else if ((match = url.match(/img.shields.io\/travis\/(.+)\/(.+)\/(.+)\..+/))) {
        data = { user: match[1], repo: match[2], branch: match[3] };
    } else if ((match = url.match(/img.shields.io\/travis\/(.+)\/(.+)\..+/))) {
        data = { user: match[1], repo: match[2] };
    } else {
        return null;
    }

    const travisUrl =
        `https://api.travis-ci.${data.site || 'org'}/${data.user}/${data.repo}.svg${data.branch ? `?branch=${data.branch}` : ''}`;
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
