import { readFileSync as readFile } from 'fs';
import path from 'path';
import test from 'ava';
import detectBadges from '../../';

test('readme files: self', t => {
    const badges = detectBadges(readFile(path.join(__dirname, '../../README.md')).toString());

    t.deepEqual(badges[0], {
        urls: {
            original: 'http://img.shields.io/npm/v/detect-readme-badges.svg?style=flat-square',
            shields: 'https://img.shields.io/npm/v/detect-readme-badges.svg',
            content: 'https://img.shields.io/npm/v/detect-readme-badges.json',
        },
        info: { service: 'npm', type: 'version', modifiers: { type: 'v' } },
    });
    t.deepEqual(badges[1], {
        urls: {
            original: 'http://img.shields.io/travis/IndigoUnited/node-detect-readme-badges/master.svg?style=flat-square',
            service: 'https://api.travis-ci.org/IndigoUnited/node-detect-readme-badges.svg?branch=master',
            shields: 'https://img.shields.io/travis/IndigoUnited/node-detect-readme-badges/master.svg',
            content: 'https://img.shields.io/travis/IndigoUnited/node-detect-readme-badges/master.json',
        },
        info: {
            service: 'travis',
            type: 'build',
            modifiers: { branch: 'master' },
        },
    });
    t.deepEqual(badges[2], {
        urls: {
            original: 'https://img.shields.io/coveralls/IndigoUnited/node-detect-readme-badges/master.svg?style=flat-square',
            service: 'https://coveralls.io/repos/IndigoUnited/node-detect-readme-badges/badge.svg?branch=master',
            shields: 'https://img.shields.io/coveralls/IndigoUnited/node-detect-readme-badges/master.svg',
            content: 'https://img.shields.io/coveralls/IndigoUnited/node-detect-readme-badges/master.json',
        },
        info: {
            service: 'coveralls',
            type: 'coverage',
            modifiers: { branch: 'master' },
        },
    });
    t.deepEqual(badges[3], {
        urls: {
            original: 'https://img.shields.io/david/IndigoUnited/node-detect-readme-badges.svg?style=flat-square',
            service: 'https://david-dm.org/IndigoUnited/node-detect-readme-badges.svg',
            shields: 'https://img.shields.io/david/IndigoUnited/node-detect-readme-badges.svg',
            content: 'https://img.shields.io/david/IndigoUnited/node-detect-readme-badges.json',
        },
        info: {
            service: 'david',
            type: 'dependencies',
            modifiers: { statusType: 'normal' },
        },
    });
    t.deepEqual(badges[4], {
        urls: {
            original: 'https://img.shields.io/david/dev/IndigoUnited/node-detect-readme-badges.svg?style=flat-square',
            service: 'https://david-dm.org/IndigoUnited/node-detect-readme-badges/dev-status.svg',
            shields: 'https://img.shields.io/david/dev/IndigoUnited/node-detect-readme-badges.svg',
            content: 'https://img.shields.io/david/dev/IndigoUnited/node-detect-readme-badges.json',
        },
        info: {
            service: 'david',
            type: 'dependencies',
            modifiers: { statusType: 'dev' },
        },
    });
});

test('readme files: got', t => {
    const badges = detectBadges(readFile(path.join(__dirname, '../fixtures/got.md')).toString());

    t.deepEqual(badges[0], {
        urls: {
            original: 'https://travis-ci.org/sindresorhus/got.svg?branch=master',
            service: 'https://api.travis-ci.org/sindresorhus/got.svg?branch=master',
            shields: 'https://img.shields.io/travis/sindresorhus/got/master.svg',
            content: 'https://img.shields.io/travis/sindresorhus/got/master.json',
        },
        info: { service: 'travis', type: 'build', modifiers: { branch: 'master' } },
    });
    t.deepEqual(badges[1], {
        urls: {
            original: 'https://coveralls.io/repos/sindresorhus/got/badge.svg?branch=master',
            service: 'https://coveralls.io/repos/sindresorhus/got/badge.svg?branch=master',
            shields: 'https://img.shields.io/coveralls/sindresorhus/got/master.svg',
            content: 'https://img.shields.io/coveralls/sindresorhus/got/master.json',
        },
        info: { service: 'coveralls', type: 'coverage', modifiers: { branch: 'master' } },
    });
    t.deepEqual(badges[2], {
        urls: {
            original: 'https://img.shields.io/npm/dm/got.svg',
            shields: 'https://img.shields.io/npm/dm/got.svg',
            content: 'https://img.shields.io/npm/dm/got.json' },
        info: { service: 'npm', type: 'downloads', modifiers: { type: 'dm' } },
    });
});

test('readme files: mt-stats, should not crash on malformed URLs', t => {
    let badges;

    t.notThrows(() => {
        badges = detectBadges(readFile(path.join(__dirname, '../fixtures/mt-stats.md')).toString());
    });

    t.deepEqual(badges, []);
});

test('readme files: bower', t => {
    const badges = detectBadges(readFile(path.join(__dirname, '../fixtures/bower.md')).toString());

    t.deepEqual(badges[0], {
        urls: {
            original: 'https://img.shields.io/travis/bower/bower/master.svg?maxAge=2592000',
            service: 'https://api.travis-ci.org/bower/bower.svg?branch=master',
            shields: 'https://img.shields.io/travis/bower/bower/master.svg',
            content: 'https://img.shields.io/travis/bower/bower/master.json',
        },
        info: { service: 'travis', type: 'build', modifiers: { branch: 'master' } },
    });

    t.deepEqual(badges[1], {
        urls: {
            original: 'https://img.shields.io/appveyor/ci/bower/bower/master.svg',
            service: 'https://ci.appveyor.com/api/projects/status/bower/bower/branch/master',
            shields: 'https://img.shields.io/appveyor/ci/bower/bower/master.svg',
            content: 'https://img.shields.io/appveyor/ci/bower/bower/master.json',
        },
        info: { service: 'appveyor', type: 'build', modifiers: { branch: 'master' } },
    });
    t.deepEqual(badges[2], {
        urls: {
            original: 'https://img.shields.io/coveralls/bower/bower.svg',
            service: 'https://coveralls.io/repos/bower/bower/badge.svg',
            shields: 'https://img.shields.io/coveralls/bower/bower.svg',
            content: 'https://img.shields.io/coveralls/bower/bower.json',
        },
        info: {
            service: 'coveralls',
            type: 'coverage',
            modifiers: { branch: undefined },
        },
    });
});

test('readme files: purgecss', t => {
    const badges = detectBadges(readFile(path.join(__dirname, '../fixtures/purgecss.md')).toString());

    t.deepEqual(badges[0], {
        urls: {
            original: 'https://travis-ci.org/FullHuman/purgecss.svg?branch=master',
            service: 'https://api.travis-ci.org/FullHuman/purgecss.svg?branch=master',
            shields: 'https://img.shields.io/travis/FullHuman/purgecss/master.svg',
            content: 'https://img.shields.io/travis/FullHuman/purgecss/master.json',
        },
        info: { service: 'travis', type: 'build', modifiers: { branch: 'master' } },
    });
    t.deepEqual(badges[1], {
        urls: {
            original: 'https://circleci.com/gh/FullHuman/purgecss/tree/master.svg?style=shield',
            service: 'https://circleci.com/gh/FullHuman/purgecss/tree/master.svg',
            shields: 'https://img.shields.io/circleci/project/github/FullHuman/purgecss/master.svg',
            content: 'https://img.shields.io/circleci/project/github/FullHuman/purgecss/master.json',
        },
        info: { service: 'circleci', type: 'build', modifiers: { branch: 'master' } },
    });
    t.deepEqual(badges[2], {
        urls: {
            original: 'https://david-dm.org/fullhuman/purgecss/status.svg',
            service: 'https://david-dm.org/fullhuman/purgecss/status.svg',
            shields: 'https://img.shields.io/david/fullhuman/purgecss/status.svg',
            content: 'https://img.shields.io/david/fullhuman/purgecss/status.json',
        },
        info: { service: 'david', type: 'dependencies', modifiers: { statusType: 'normal' } },
    });
    t.deepEqual(badges[3], {
        urls: {
            original: 'https://david-dm.org/fullhuman/purgecss/dev-status.svg',
            service: 'https://david-dm.org/fullhuman/purgecss/dev-status.svg',
            shields: 'https://img.shields.io/david/dev/fullhuman/purgecss.svg',
            content: 'https://img.shields.io/david/dev/fullhuman/purgecss.json',
        },
        info: { service: 'david', type: 'dependencies', modifiers: { statusType: 'dev' } },
    });

    t.deepEqual(badges[4], {
        urls: { original: 'https://api.codacy.com/project/badge/Grade/2f2f3fb0a5c541beab2018483e62a828',
            service: 'https://api.codacy.com/project/badge/Grade/2f2f3fb0a5c541beab2018483e62a828',
            shields: 'https://img.shields.io/codacy/grade/2f2f3fb0a5c541beab2018483e62a828.svg',
            content: 'https://img.shields.io/codacy/grade/2f2f3fb0a5c541beab2018483e62a828.json',
        },
        info: { service: 'codacy', type: 'grade', modifiers: { branch: undefined } },
    });

    t.deepEqual(badges[5], {
        urls: {
            original: 'https://api.codacy.com/project/badge/Coverage/2f2f3fb0a5c541beab2018483e62a828',
            service: 'https://api.codacy.com/project/badge/Coverage/2f2f3fb0a5c541beab2018483e62a828',
            shields: 'https://img.shields.io/codacy/coverage/2f2f3fb0a5c541beab2018483e62a828.svg',
            content: 'https://img.shields.io/codacy/coverage/2f2f3fb0a5c541beab2018483e62a828.json' },
        info: { service: 'codacy', type: 'coverage', modifiers: { branch: undefined } },
    });

    t.deepEqual(badges[6], {
        urls: {
            original: 'https://img.shields.io/npm/v/purgecss.svg',
            shields: 'https://img.shields.io/npm/v/purgecss.svg',
            content: 'https://img.shields.io/npm/v/purgecss.json',
        },
        info: { service: 'npm', type: 'version', modifiers: { type: 'v' } },
    });
});
