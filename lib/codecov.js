'use strict';

// https://codecov.io/${service}/${user}/${repo}/coverage.svg
// https://codecov.io/${service}/${user}/${repo}/coverage.svg?branch=${branch}
// https://codecov.io/${service}/${user}/${repo}/branch/${branch}/coverage.svg
// https://codecov.io/${service}/${user}/${repo}/graphs/badge.svg
// https://codecov.io/${service}/${user}/${repo}/graphs/badge.svg?branch=${branch}
// https://codecov.io/${service}/${user}/${repo}/branch/${branch}/graphs/badge.svg
// https://img.shields.io/codecov/c/${service}/${user}/${repo}.svg
// https://img.shields.io/codecov/c/${service}/${user}/${repo}/${branch}.svg

module.exports = function (parsedUrl) {
    const url = parsedUrl.href.split('?')[0];
    let match;
    let data;

    if ((match = url.match(/img.shields.io\/codecov\/c\/(.+)\/(.+)\/(.+)\/(.+)\..+/))) {
        // shields badge with branch
        data = { service: match[1], user: match[2], repo: match[3], branch: match[4] };
    } else if ((match = url.match(/img.shields.io\/codecov\/c\/(.+)\/(.+)\/(.+)\..+/))) {
        // shields badge
        data = { service: match[1], user: match[2], repo: match[3] };
    } else if ((match = url.match(/codecov.io\/(.+)\/(.+)\/(.+)\/branch\/(.+)\/(coverage|graphs\/badge)\..+/))) {
        // codecov badge with branch url
        data = { service: match[1], user: match[2], repo: match[3], branch: match[4] };
    } else if ((match = url.match(/codecov.io\/(.+)\/(.+)\/(.+)\/(coverage|graphs\/badge)\..+/))) {
        // codecov badge with branch in query
        data = { service: match[1], user: match[2], repo: match[3], branch: parsedUrl.query.branch };
    } else {
        return null;
    }

    const codecovUrl = 'https://codecov.io/' +
        `${data.service}/${data.user}/${data.repo}/${data.branch ? `branch/${data.branch}/` : ''}graphs/badge.svg`;
    const shieldsUrl =
        `https://img.shields.io/codecov/c/${data.service}/${data.user}/${data.repo}${data.branch ? `/${data.branch}` : ''}`;

    return {
        urls: {
            original: parsedUrl.href,
            service: codecovUrl,
            shields: `${shieldsUrl}.svg`,
            content: `${shieldsUrl}.json`,
        },
        info: {
            service: 'codecov',
            type: 'coverage',
            modifiers: data.branch ? { branch: data.branch } : {},
        },
    };
};
