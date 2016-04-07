import test from 'ava';
import detectBadges from '../../';

test('coveralls: coveralls.io', t => {
    const user = 'IndigoUnited';
    const repo = 'js-promtie';

    const badge = detectBadges(`https://coveralls.io/repos/${user}/${repo}/badge.svg`)[0];

    t.is(badge.urls.original, `https://coveralls.io/repos/${user}/${repo}/badge.svg`);
    t.is(badge.urls.service, `https://coveralls.io/repos/${user}/${repo}/badge.svg`);
    t.is(badge.urls.shields, `https://img.shields.io/coveralls/${user}/${repo}.svg`);
    t.is(badge.urls.content, `https://img.shields.io/coveralls/${user}/${repo}.json`);
    t.is(badge.info.service, 'coveralls');
    t.is(badge.info.type, 'coverage');
});

test('coveralls: coveralls.io (with branch)', t => {
    const user = 'IndigoUnited';
    const repo = 'js-promtie';
    const branch = 'master';

    const badge = detectBadges(`https://coveralls.io/repos/${user}/${repo}/badge.svg?branch=${branch}`)[0];

    t.is(badge.urls.original, `https://coveralls.io/repos/${user}/${repo}/badge.svg?branch=${branch}`);
    t.is(badge.urls.service, `https://coveralls.io/repos/${user}/${repo}/badge.svg?branch=${branch}`);
    t.is(badge.urls.shields, `https://img.shields.io/coveralls/${user}/${repo}/${branch}.svg`);
    t.is(badge.urls.content, `https://img.shields.io/coveralls/${user}/${repo}/${branch}.json`);
    t.is(badge.info.service, 'coveralls');
    t.is(badge.info.type, 'coverage');
    t.deepEqual(badge.info.modifiers, { branch: 'master' });
});

test('coveralls: coveralls.io (with service)', t => {
    const user = 'IndigoUnited';
    const repo = 'js-promtie';
    const branch = 'master';

    const badge = detectBadges(`https://coveralls.io/repos/github/${user}/${repo}/badge.svg?branch=${branch}`)[0];

    t.is(badge.urls.original, `https://coveralls.io/repos/github/${user}/${repo}/badge.svg?branch=${branch}`);
    t.is(badge.urls.service, `https://coveralls.io/repos/github/${user}/${repo}/badge.svg?branch=${branch}`);
    t.is(badge.urls.shields, `https://img.shields.io/coveralls/${user}/${repo}/${branch}.svg`);
    t.is(badge.urls.content, `https://img.shields.io/coveralls/${user}/${repo}/${branch}.json`);
    t.is(badge.info.service, 'coveralls');
    t.is(badge.info.type, 'coverage');
    t.deepEqual(badge.info.modifiers, { branch: 'master' });
});

test('coveralls: shields.io', t => {
    const user = 'IndigoUnited';
    const repo = 'js-promtie';

    const badge = detectBadges(`https://img.shields.io/coveralls/${user}/${repo}.svg`)[0];

    t.is(badge.urls.original, `https://img.shields.io/coveralls/${user}/${repo}.svg`);
    t.is(badge.urls.service, `https://coveralls.io/repos/${user}/${repo}/badge.svg`);
    t.is(badge.urls.shields, `https://img.shields.io/coveralls/${user}/${repo}.svg`);
    t.is(badge.urls.content, `https://img.shields.io/coveralls/${user}/${repo}.json`);
    t.is(badge.info.service, 'coveralls');
    t.is(badge.info.type, 'coverage');
});

test('coveralls: shields.io (with branch)', t => {
    const user = 'IndigoUnited';
    const repo = 'js-promtie';
    const branch = 'master';

    const badge = detectBadges(`https://img.shields.io/coveralls/${user}/${repo}/${branch}.svg`)[0];

    t.is(badge.urls.original, `https://img.shields.io/coveralls/${user}/${repo}/${branch}.svg`);
    t.is(badge.urls.service, `https://coveralls.io/repos/${user}/${repo}/badge.svg?branch=${branch}`);
    t.is(badge.urls.shields, `https://img.shields.io/coveralls/${user}/${repo}/${branch}.svg`);
    t.is(badge.urls.content, `https://img.shields.io/coveralls/${user}/${repo}/${branch}.json`);
    t.is(badge.info.service, 'coveralls');
    t.is(badge.info.type, 'coverage');
    t.deepEqual(badge.info.modifiers, { branch: 'master' });
});

test('coveralls: not a valid coveralls url', t => {
    const user = 'IndigoUnited';
    const repo = 'js-promtie';

    t.falsy(detectBadges(`https://coveralls.com/repos/${user}/${repo}/badge.svg`)[0]);
});
