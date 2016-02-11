'use strict';

const removeExtension = require('./util/removeExtension');

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

    if ((match = url.match(/img.shields.io\/npm\/(.+)\/(.+).*/))) {
        data = { type: match[1], pkg: removeExtension(match[2]) };
    } else if ((match = url.match(/nodei.co\/npm\/(.+).*/))) {
        data = { pkg: removeExtension(match[1]) };
    } else {
        return null;
    }

    return {
        originalUrl: parsedUrl.href,
        url: `https://img.shields.io/npm/${data.type || 'v'}/${data.pkg}.svg`,
        metaUrl: `https://img.shields.io/npm/${data.type || 'v'}/${data.pkg}.json`,
        type: 'npm',
    };
};
