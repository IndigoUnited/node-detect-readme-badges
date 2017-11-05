'use strict';

// appveyor:                        https://ci.appveyor.com/api/projects/status/${user}/${repo}
// appveyor with branch:            https://ci.appveyor.com/api/projects/status/${user}/${repo}/branch/${branch}
// appveyor shields io:             https://img.shields.io/appveyor/ci/${user}/${repo}.svg
// appveyor shields io with branch: https://img.shields.io/appveyor/ci/${user}/${repo}/${branch}.svg

module.exports = function (parsedUrl) {
    const url = parsedUrl.href.split('?')[0];
    let match;
    let data;

    if ((match = url.match(/img.shields.io\/appveyor\/ci\/(.+)\/(.+)\/(.+)\.+/))) {
        // shields badge with branch
        data = { user: match[1], repo: match[2], branch: match[3] };
    } else if ((match = url.match(/img.shields.io\/appveyor\/ci\/(.+)\/(.+)\..+/))) {
        // shields badge
        data = { user: match[1], repo: match[2] };
    } else if ((match = url.match(/ci.appveyor.com\/api\/projects\/status\/(.+)\/(.+)\/branch\/(.+)/))) {
        // appveyor badge with branch
        data = { user: match[1], repo: match[2], branch: match[3] };
    } else if ((match = url.match(/ci.appveyor.com\/api\/projects\/status\/(.+)\/(.+)/))) {
        // appveyor badge
        data = { user: match[1], repo: match[2] };
    } else {
        return null;
    }

    const appveyorUrl = 'https://ci.appveyor.com/api/projects/status/' +
        `${data.user}/${data.repo}${data.branch ? `/branch/${data.branch}` : ''}`;
    const shieldsUrl =
        `https://img.shields.io/appveyor/ci/${data.user}/${data.repo}${data.branch ? `/${data.branch}` : ''}`;

    return {
        urls: {
            original: parsedUrl.href,
            service: appveyorUrl,
            shields: `${shieldsUrl}.svg`,
            content: `${shieldsUrl}.json`,
        },
        info: {
            service: 'appveyor',
            type: 'build',
            modifiers: { branch: data.branch /* service: data.service */ },
        },
    };
};
