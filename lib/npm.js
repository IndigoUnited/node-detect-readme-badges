'use strict';

const shieldsModifiers = require('./util/shields').modifiers;

// shields downloads per month https://img.shields.io/npm/dm/${package}.svg
// shields downloads total https://img.shields.io/npm/dt/${package}.svg
// shields version https://img.shields.io/npm/v/${package}.svg
// shields version (scoped) https://img.shields.io/npm/v/@{scope}/${package}.svg
// shields license https://img.shields.io/npm/l/${package}.svg
// nodei https://nodei.co/npm/${package}.svg

module.exports = function (parsedUrl) {
    const url = parsedUrl.href.split('?')[0];
    let match;
    let data;

    if ((match = url.match(/img.shields.io\/npm\/(.+)\/(@.+)\..+/))) { // scoped packages
        data = { type: match[1], pkg: match[2] };
    } else if ((match = url.match(/img.shields.io\/npm\/(.+)\/(.+)\..+/))) {
        data = { type: match[1], pkg: match[2] };
    } else if ((match = url.match(/nodei.co\/npm\/(.+)\..+/))) {
        data = { pkg: match[1] };
    } else {
        return null;
    }

    const shieldsUrl = `https://img.shields.io/npm/${data.type || 'v'}/${data.pkg}`;

    return {
        urls: {
            original: parsedUrl.href,
            shields: `${shieldsUrl}.svg`,
            content: `${shieldsUrl}.json`,
        },
        info: {
            service: 'npm',
            type: shieldsModifiers[data.type] || 'version',
            modifiers: { type: data.type },
        },
    };
};
