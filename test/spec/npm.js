import test from 'ava';
import detectBadges from '../../';

// version https://img.shields.io/npm/v/${package}.svg
// downloads per month https://img.shields.io/npm/dm/${package}.svg
// downloads total https://img.shields.io/npm/dt/${package}.svg
// license https://img.shields.io/npm/l/${package}.svg

test('nodei: nodei.co', t => {
    let pkg = 'js-promtie';
    let badge = detectBadges(`https://nodei.co/npm/${pkg}.png`)[0];

    t.is(badge.urls.original, `https://nodei.co/npm/${pkg}.png`);
    t.is(badge.urls.content, `https://img.shields.io/npm/v/${pkg}.json`);
    t.is(badge.urls.shields, `https://img.shields.io/npm/v/${pkg}.svg`);
    t.is(badge.info.service, 'npm');
    t.is(badge.info.type, 'version');

    pkg = '@carsy/eslint-config';
    badge = detectBadges(`https://nodei.co/npm/${pkg}.png`)[0];

    t.is(badge.urls.original, `https://nodei.co/npm/${pkg}.png`);
    t.is(badge.urls.content, `https://img.shields.io/npm/v/${pkg}.json`);
    t.is(badge.urls.shields, `https://img.shields.io/npm/v/${pkg}.svg`);
    t.is(badge.info.service, 'npm');
    t.is(badge.info.type, 'version');
});

test('npm: shields.io', t => {
    let pkg = 'js-promtie';
    let badge = detectBadges(`https://img.shields.io/npm/dm/${pkg}.svg`)[0];

    t.is(badge.urls.original, `https://img.shields.io/npm/dm/${pkg}.svg`);
    t.is(badge.urls.content, `https://img.shields.io/npm/dm/${pkg}.json`);
    t.is(badge.urls.shields, `https://img.shields.io/npm/dm/${pkg}.svg`);
    t.is(badge.info.service, 'npm');
    t.is(badge.info.type, 'downloads');

    pkg = '@carsy/eslint-config';
    badge = detectBadges(`https://img.shields.io/npm/dm/${pkg}.svg`)[0];

    t.is(badge.urls.original, `https://img.shields.io/npm/dm/${pkg}.svg`);
    t.is(badge.urls.content, `https://img.shields.io/npm/dm/${pkg}.json`);
    t.is(badge.urls.shields, `https://img.shields.io/npm/dm/${pkg}.svg`);
    t.is(badge.info.service, 'npm');
    t.is(badge.info.type, 'downloads');
});

test('npm: not a valid npm url', t => {
    const pkg = 'js-promtie';

    t.notOk(detectBadges(`https://npm.com/dm/${pkg}.svg`)[0]);
});
