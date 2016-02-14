'use strict';

// https://badges.gitter.im/${user}/${repo}.svg
// https://img.shields.io/gitter/room/${user}/${repo}.svg

module.exports = function (parsedUrl) {
    const url = parsedUrl.href.split('?')[0];
    let match;
    let data;

    if ((match = url.match(/img.shields.io\/gitter\/room\/(.+)\/(.+)\..+/))) {
        data = { user: match[1], repo: match[2] };
    } else if ((match = url.match(/badges.gitter.im\/(.+)\/(.+)\..+/))) {
        data = { user: match[1], repo: match[2] };
    } else {
        return null;
    }

    const gitterUrl = `https://badges.gitter.im/${data.user}/${data.repo}.svg`;
    const shieldsUrl = `https://img.shields.io/gitter/room/${data.user}/${data.repo}`;

    return {
        urls: {
            original: parsedUrl.href,
            service: gitterUrl,
            shields: `${shieldsUrl}.svg`,
            content: `${shieldsUrl}.json`,
        },
        info: {
            service: 'gitter',
            type: 'misc',
        },
    };
};
