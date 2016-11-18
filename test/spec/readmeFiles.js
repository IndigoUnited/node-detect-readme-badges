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

test('got', t => {
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
