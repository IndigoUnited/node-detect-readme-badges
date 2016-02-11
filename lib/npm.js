'use strict';

const removeExtension = require('./util/removeExtension');

// npm downloads per month https://img.shields.io/npm/dm/${package}.svg
// npm downloads total https://img.shields.io/npm/dt/${package}.svg
// npm version https://img.shields.io/npm/v/${package}.svg
// npm version (scoped) https://img.shields.io/npm/v/@{scope}/${package}.svg // TODO
// npm license https://img.shields.io/npm/l/${package}.svg
// npm nodei https://nodei.co/npm/${package}.svg

function extractData(url) {
    let match;
    let data;

    if (url.indexOf('img.shields.io') !== -1) {
        match = url.match(/img.shields.io\/npm\/(.+)\/(.+).*/);

        if (!match) {
            return null;
        }

        data = { type: match[1], pkg: removeExtension(match[2]) };

        return data;
    }

    // TODO use query parameters to construct all the metaUrls
    match = url.match(/nodei.co\/npm\/(.+).*/);

    if (!match) {
        return null;
    }

    return { pkg: removeExtension(match[1]) };
}

module.exports = function (url) {
    const data = extractData(url.href.split('?')[0]);

    if (!data) {
        return null;
    }

    return {
        url: url.href,
        originalUrl: url.href,
        metaUrl: `https://img.shields.io/npm/${data.type || 'v'}/${data.pkg}.json`,
        type: 'npm',
    };
};
