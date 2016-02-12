import test from 'ava';
import detectBadges from '../../';

test('travis: travis-ci.org', t => {
    const user = 'IndigoUnited';
    const repo = 'js-promtie';

    const badge = detectBadges(`https://api.travis-ci.org/${user}/${repo}.svg`)[0];

    t.is(badge.urls.original, `https://api.travis-ci.org/${user}/${repo}.svg`);
    t.is(badge.urls.service, `https://api.travis-ci.org/${user}/${repo}.svg`);
    t.is(badge.urls.content, `https://img.shields.io/travis/${user}/${repo}.json`);
    t.is(badge.info.service, 'travis');
    t.is(badge.info.type, 'build');
});

test('travis: travis-ci.org (with branch)', t => {
    const user = 'IndigoUnited';
    const repo = 'js-promtie';
    const branch = 'master';

    const badge = detectBadges(`https://travis-ci.org/${user}/${repo}.svg?branch=${branch}`)[0];

    t.is(badge.urls.original, `https://travis-ci.org/${user}/${repo}.svg?branch=${branch}`);
    t.is(badge.urls.service, `https://api.travis-ci.org/${user}/${repo}.svg?branch=${branch}`);
    t.is(badge.urls.content, `https://img.shields.io/travis/${user}/${repo}/${branch}.json`);
    t.is(badge.info.service, 'travis');
    t.is(badge.info.type, 'build');
    t.same(badge.info.modifiers, { branch: 'master' });
});

test('travis: shields.io', t => {
    const user = 'IndigoUnited';
    const repo = 'js-promtie';

    const badge = detectBadges(`https://img.shields.io/travis/${user}/${repo}.svg`)[0];

    t.is(badge.urls.original, `https://img.shields.io/travis/${user}/${repo}.svg`);
    t.is(badge.urls.service, `https://api.travis-ci.org/${user}/${repo}.svg`);
    t.is(badge.urls.content, `https://img.shields.io/travis/${user}/${repo}.json`);
    t.is(badge.info.service, 'travis');
    t.is(badge.info.type, 'build');
});

test('travis: shields.io (with branch)', t => {
    const user = 'IndigoUnited';
    const repo = 'js-promtie';
    const branch = 'master';

    const badge = detectBadges(`https://img.shields.io/travis/${user}/${repo}/${branch}.svg`)[0];

    t.is(badge.urls.original, `https://img.shields.io/travis/${user}/${repo}/${branch}.svg`);
    t.is(badge.urls.service, `https://api.travis-ci.org/${user}/${repo}.svg?branch=${branch}`);
    t.is(badge.urls.content, `https://img.shields.io/travis/${user}/${repo}/${branch}.json`);
    t.is(badge.info.service, 'travis');
    t.is(badge.info.type, 'build');
    t.same(badge.info.modifiers, { branch: 'master' });
});

test('travis: not a valid travis url', t => {
    const user = 'IndigoUnited';
    const repo = 'js-promtie';

    t.notOk(detectBadges(`https://travis.com/${user}/${repo}.svg`)[0]);
});
