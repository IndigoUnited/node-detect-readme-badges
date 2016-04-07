import test from 'ava';
import detectBadges from '../../';

test('david: david-dm.org', t => {
    const user = 'IndigoUnited';
    const repo = 'js-promtie';

    const badge = detectBadges(`https://david-dm.org/${user}/${repo}.svg`)[0];

    t.is(badge.urls.original, `https://david-dm.org/${user}/${repo}.svg`);
    t.is(badge.urls.service, `https://david-dm.org/${user}/${repo}.svg`);
    t.is(badge.urls.content, `https://img.shields.io/david/${user}/${repo}.json`);
    t.is(badge.info.service, 'david');
    t.is(badge.info.type, 'dependencies');
    t.deepEqual(badge.info.modifiers, { statusType: 'normal' });
});

test('david: david-dm.org (with type)', t => {
    const user = 'IndigoUnited';
    const repo = 'js-promtie';
    const type = 'dev';

    const badge = detectBadges(`https://david-dm.org/${user}/${repo}/${type}-status.svg`)[0];

    t.is(badge.urls.original, `https://david-dm.org/${user}/${repo}/${type}-status.svg`);
    t.is(badge.urls.service, `https://david-dm.org/${user}/${repo}/${type}-status.svg`);
    t.is(badge.urls.content, `https://img.shields.io/david/${type}/${user}/${repo}.json`);
    t.is(badge.info.service, 'david');
    t.is(badge.info.type, 'dependencies');
    t.deepEqual(badge.info.modifiers, { statusType: 'dev' });
});

test('david: shields.io', t => {
    const user = 'IndigoUnited';
    const repo = 'js-promtie';

    const badge = detectBadges(`https://img.shields.io/david/${user}/${repo}.svg`)[0];

    t.is(badge.urls.original, `https://img.shields.io/david/${user}/${repo}.svg`);
    t.is(badge.urls.service, `https://david-dm.org/${user}/${repo}.svg`);
    t.is(badge.urls.content, `https://img.shields.io/david/${user}/${repo}.json`);
    t.is(badge.info.service, 'david');
    t.is(badge.info.type, 'dependencies');
    t.deepEqual(badge.info.modifiers, { statusType: 'normal' });
});

test('david: shields.io (with type)', t => {
    const user = 'IndigoUnited';
    const repo = 'js-promtie';
    const type = 'dev';

    const badge = detectBadges(`https://img.shields.io/david/${type}/${user}/${repo}.svg`)[0];

    t.is(badge.urls.original, `https://img.shields.io/david/${type}/${user}/${repo}.svg`);
    t.is(badge.urls.service, `https://david-dm.org/${user}/${repo}/${type}-status.svg`);
    t.is(badge.urls.content, `https://img.shields.io/david/${type}/${user}/${repo}.json`);
    t.is(badge.info.service, 'david');
    t.is(badge.info.type, 'dependencies');
    t.deepEqual(badge.info.modifiers, { statusType: 'dev' });
});

test('david: not a valid david url', t => {
    const user = 'IndigoUnited';
    const repo = 'js-promtie';

    t.falsy(detectBadges(`https://david.com/${user}/${repo}.svg`)[0]);
});
