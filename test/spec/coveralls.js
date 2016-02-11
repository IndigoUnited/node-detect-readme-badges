import test from 'ava';
import detectBadges from '../../';

test('coveralls: coveralls.io', t => {
    const user = 'IndigoUnited';
    const repo = 'js-promtie';

    const badge = detectBadges(`https://coveralls.io/repos/${user}/${repo}/badge.svg`)[0];

    t.is(badge.originalUrl, `https://coveralls.io/repos/${user}/${repo}/badge.svg`);
    t.is(badge.url, `https://coveralls.io/repos/${user}/${repo}/badge.svg`);
    t.is(badge.metaUrl, `https://img.shields.io/coveralls/${user}/${repo}.json`);
    t.is(badge.type, 'coveralls');
});

test('coveralls: coveralls.io (with branch)', t => {
    const user = 'IndigoUnited';
    const repo = 'js-promtie';
    const branch = 'master';

    const badge = detectBadges(`https://coveralls.io/repos/${user}/${repo}/badge.svg?branch=${branch}`)[0];

    t.is(badge.originalUrl, `https://coveralls.io/repos/${user}/${repo}/badge.svg?branch=${branch}`);
    t.is(badge.url, `https://coveralls.io/repos/${user}/${repo}/badge.svg?branch=${branch}`);
    t.is(badge.metaUrl, `https://img.shields.io/coveralls/${user}/${repo}/${branch}.json`);
    t.is(badge.type, 'coveralls');
});

test('coveralls: shields.io', t => {
    const user = 'IndigoUnited';
    const repo = 'js-promtie';

    const badge = detectBadges(`https://img.shields.io/coveralls/${user}/${repo}.svg`)[0];

    t.is(badge.originalUrl, `https://img.shields.io/coveralls/${user}/${repo}.svg`);
    t.is(badge.url, `https://coveralls.io/repos/${user}/${repo}/badge.svg`);
    t.is(badge.metaUrl, `https://img.shields.io/coveralls/${user}/${repo}.json`);
    t.is(badge.type, 'coveralls');
});

test('coveralls: coveralls.io (with branch)', t => {
    const user = 'IndigoUnited';
    const repo = 'js-promtie';
    const branch = 'master';

    const badge = detectBadges(`https://img.shields.io/coveralls/${user}/${repo}/${branch}.svg`)[0];

    t.is(badge.originalUrl, `https://img.shields.io/coveralls/${user}/${repo}/${branch}.svg`);
    t.is(badge.url, `https://coveralls.io/repos/${user}/${repo}/badge.svg?branch=${branch}`);
    t.is(badge.metaUrl, `https://img.shields.io/coveralls/${user}/${repo}/${branch}.json`);
    t.is(badge.type, 'coveralls');
});

test('coveralls: not a coveralls url', t => {
    const user = 'IndigoUnited';
    const repo = 'js-promtie';

    t.notOk(detectBadges(`https://coveralls.com/repos/${user}/${repo}/badge.svg`)[0]);
});
