'use strict';

// david https://david-dm.org/${user}/${repo}.svg
// david dev https://david-dm.org/${user}/${repo}/dev-status.svg
// david peer https://david-dm.org/${user}/${repo}/peer-status.svg
// david optional https://david-dm.org/${user}/${repo}/optional-status.svg
// shields https://img.shields.io/david/${user}/${repo}.svg
// shields dev https://img.shields.io/david/dev/${user}/${repo}.svg
// shields peer https://img.shields.io/david/peer/${user}/${repo}.svg
// shields optional https://img.shields.io/david/optional/${user}/${repo}.svg

module.exports = function (parsedUrl) {
    const url = parsedUrl.href.split('?')[0];
    let match;
    let data;

    if ((match = url.match(/img.shields.io\/david\/(.+)\/(.+)\/(.+)\..+/))) {
        // shields badge with type
        data = { type: match[1], user: match[2], repo: match[3] };
    } else if ((match = url.match(/img.shields.io\/david\/(.+)\/(.+)\..+/))) {
        // shields badge without type (normal dependencies)
        data = { user: match[1], repo: match[2] };
    } else if ((match = url.match(/david-dm.org\/(.+)\/(.+)\/(.*)-status\..+/))) {
        // david badge with type
        data = { user: match[1], repo: match[2], type: match[3] };
    } else if ((match = url.match(/david-dm.org\/(.+)\/(.+)\..+/))) {
        // david badge without type (normal dependencies)
        data = { user: match[1], repo: match[2] };
    } else {
        return null;
    }

    const davidUrl = `https://david-dm.org/${data.user}/${data.repo}${data.type ? `/${data.type}-status` : ''}.svg`;
    const shieldsUrl = `https://img.shields.io/david/${data.type ? `${data.type}/` : ''}${data.user}/${data.repo}`;

    return {
        urls: {
            original: parsedUrl.href,
            service: davidUrl,
            shields: `${shieldsUrl}.svg`,
            content: `${shieldsUrl}.json`,
        },
        info: {
            service: 'david',
            type: 'dependencies',
            modifiers: { statusType: data.type || 'normal' },
        },
    };
};
