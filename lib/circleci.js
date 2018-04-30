'use strict';

// https://circleci.com/gh/${user}/${repo}/tree/${branch}.svg
// https://img.shields.io/circleci/project/github/${user}/${repo}/${branch}.svg

module.exports = function (parsedUrl) {
    const url = parsedUrl.href.split('?')[0];
    let match;
    let data;


    if ((match = url.match(/img.shields.io\/circleci\/project\/github\/(.+)\/(.+)\/(.+)\..+/))) {
        data = { user: match[1], repo: match[2], branch: match[3] };
    } else if ((match = url.match(/img.shields.io\/circleci\/project\/github\/(.+)\/(.+)\..+/))) {
        data = { user: match[1], repo: match[2] };
    } else if ((match = url.match(/circleci.com\/gh\/(.+)\/(.+)\/tree\/(.+)\..+/))) {
        data = { user: match[1], repo: match[2], branch: match[3] };
    } else if ((match = url.match(/circleci.com\/gh\/(.+)\/(.+)\..+/))) {
        data = { user: match[1], repo: match[2] };
    } else {
        return null;
    }

    const circleciUrl = `https://circleci.com/gh/${data.user}/${data.repo}${data.branch ? `/tree/${data.branch}` : ''}.svg`;
    const shieldsUrl =
        `https://img.shields.io/circleci/project/github/${data.user}/${data.repo}${data.branch ? `/${data.branch}` : ''}`;

    return {
        urls: {
            original: parsedUrl.href,
            service: circleciUrl,
            shields: `${shieldsUrl}.svg`,
            content: `${shieldsUrl}.json`,
        },
        info: {
            service: 'circleci',
            type: 'build',
            modifiers: { branch: data.branch },
        },
    };
};
