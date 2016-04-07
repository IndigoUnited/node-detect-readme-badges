import test from 'ava';
import detectBadges from '../../';

test('gitter: gitter.im', t => {
    const user = 'IndigoUnited';
    const repo = 'js-promtie';

    const badge = detectBadges(`https://badges.gitter.im/${user}/${repo}.svg`)[0];

    t.is(badge.urls.original, `https://badges.gitter.im/${user}/${repo}.svg`);
    t.is(badge.urls.service, `https://badges.gitter.im/${user}/${repo}.svg`);
    t.is(badge.urls.shields, `https://img.shields.io/gitter/room/${user}/${repo}.svg`);
    t.is(badge.urls.content, `https://img.shields.io/gitter/room/${user}/${repo}.json`);
    t.is(badge.info.service, 'gitter');
    t.is(badge.info.type, 'misc');
});

test('gitter: shields.io', t => {
    const user = 'IndigoUnited';
    const repo = 'js-promtie';

    const badge = detectBadges(`https://img.shields.io/gitter/room/${user}/${repo}.svg`)[0];

    t.is(badge.urls.original, `https://img.shields.io/gitter/room/${user}/${repo}.svg`);
    t.is(badge.urls.service, `https://badges.gitter.im/${user}/${repo}.svg`);
    t.is(badge.urls.shields, `https://img.shields.io/gitter/room/${user}/${repo}.svg`);
    t.is(badge.urls.content, `https://img.shields.io/gitter/room/${user}/${repo}.json`);
    t.is(badge.info.service, 'gitter');
    t.is(badge.info.type, 'misc');
});

test('gitter: not a valid gitter url', t => {
    const user = 'IndigoUnited';
    const repo = 'js-promtie';

    t.falsy(detectBadges(`https://gitter.com/${user}/${repo}.svg`)[0]);
});
