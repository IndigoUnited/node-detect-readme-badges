'use strict';

// https://api.codacy.com/project/badge/Grade/${token}?branch=${branch}
// https://img.shields.io/codacy/grade/e27821fb6289410b8f58338c7e0bc686/master.svg
// https://api.codacy.com/project/badge/Coverage/${token}?branch=${branch}
// https://img.shields.io/codacy/coverage/c44df2d9c89a4809896914fd1a40bedd/master.svg

module.exports = function (parsedUrl) {
    const url = parsedUrl.href.split('?')[0];
    let match;
    let data;

    const upperCaseFirstLetter = str => `${str.charAt(0).toUpperCase()}${str.substr(1)}`;


    if ((match = url.match(/img.shields.io\/codacy\/(.+)\/(.+)\/(.+).svg/))) {
        data = { type: match[1], token: match[2], branch: match[3] };
    } else if ((match = url.match(/img.shields.io\/codacy\/(.+)\/(.+).svg/))) {
        data = { type: match[1], token: match[2] };
    } else if ((match = url.match(/api.codacy.com\/project\/badge\/(.+)\/(.+)/))) {
        data = { type: match[1].toLowerCase(), token: match[2], branch: parsedUrl.query.branch };
    } else {
        return null;
    }

    const codacyUrl = `https://api.codacy.com/project/badge/${upperCaseFirstLetter(data.type)}/${data.token}${data.branch ? `?branch=${data.branch}` : ''}`;
    const shieldsUrl =
        `https://img.shields.io/codacy/${data.type}/${data.token}${data.branch ? `/${data.branch}` : ''}`;

    return {
        urls: {
            original: parsedUrl.href,
            service: codacyUrl,
            shields: `${shieldsUrl}.svg`,
            content: `${shieldsUrl}.json`,
        },
        info: {
            service: 'codacy',
            type: data.type,
            modifiers: { branch: data.branch },
        },
    };
};
