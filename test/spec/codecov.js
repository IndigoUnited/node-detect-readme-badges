import test from 'ava';
import detectBadges from '../../';

test('codecov: codecov.io old style', t => {
    const service = 'github';
    const user = 'IndigoUnited';
    const repo = 'js-promtie';

    const badge = detectBadges(`https://codecov.io/${service}/${user}/${repo}/coverage.svg`)[0];

    t.is(badge.urls.original, `https://codecov.io/${service}/${user}/${repo}/coverage.svg`);
    t.is(badge.urls.service, `https://codecov.io/${service}/${user}/${repo}/graphs/badge.svg`);
    t.is(badge.urls.shields, `https://img.shields.io/codecov/c/${service}/${user}/${repo}.svg`);
    t.is(badge.urls.content, `https://img.shields.io/codecov/c/${service}/${user}/${repo}.json`);
    t.is(badge.info.service, 'codecov');
    t.is(badge.info.type, 'coverage');
});

test('codecov: codecov.io old style (with branch)', t => {
    const service = 'github';
    const user = 'IndigoUnited';
    const repo = 'js-promtie';
    const branch = 'master';

    const badge = detectBadges(`https://codecov.io/${service}/${user}/${repo}/coverage.svg?branch=${branch}`)[0];

    t.is(badge.urls.original, `https://codecov.io/${service}/${user}/${repo}/coverage.svg?branch=${branch}`);
    t.is(badge.urls.service, `https://codecov.io/${service}/${user}/${repo}/branch/${branch}/graphs/badge.svg`);
    t.is(badge.urls.shields, `https://img.shields.io/codecov/c/${service}/${user}/${repo}/${branch}.svg`);
    t.is(badge.urls.content, `https://img.shields.io/codecov/c/${service}/${user}/${repo}/${branch}.json`);
    t.is(badge.info.service, 'codecov');
    t.is(badge.info.type, 'coverage');
    t.deepEqual(badge.info.modifiers, { branch: 'master' });
});

test('codecov: codecov.io new style', t => {
    const service = 'github';
    const user = 'IndigoUnited';
    const repo = 'js-promtie';

    const badge = detectBadges(`https://codecov.io/${service}/${user}/${repo}/graphs/badge.svg`)[0];

    t.is(badge.urls.original, `https://codecov.io/${service}/${user}/${repo}/graphs/badge.svg`);
    t.is(badge.urls.service, `https://codecov.io/${service}/${user}/${repo}/graphs/badge.svg`);
    t.is(badge.urls.shields, `https://img.shields.io/codecov/c/${service}/${user}/${repo}.svg`);
    t.is(badge.urls.content, `https://img.shields.io/codecov/c/${service}/${user}/${repo}.json`);
    t.is(badge.info.service, 'codecov');
    t.is(badge.info.type, 'coverage');
});

test('codecov: codecov.io new style (with branch)', t => {
    const service = 'github';
    const user = 'IndigoUnited';
    const repo = 'js-promtie';
    const branch = 'master';

    const badge = detectBadges(`https://codecov.io/${service}/${user}/${repo}/branch/${branch}/graphs/badge.svg`)[0];

    t.is(badge.urls.original, `https://codecov.io/${service}/${user}/${repo}/branch/${branch}/graphs/badge.svg`);
    t.is(badge.urls.service, `https://codecov.io/${service}/${user}/${repo}/branch/${branch}/graphs/badge.svg`);
    t.is(badge.urls.shields, `https://img.shields.io/codecov/c/${service}/${user}/${repo}/${branch}.svg`);
    t.is(badge.urls.content, `https://img.shields.io/codecov/c/${service}/${user}/${repo}/${branch}.json`);
    t.is(badge.info.service, 'codecov');
    t.is(badge.info.type, 'coverage');
    t.deepEqual(badge.info.modifiers, { branch: 'master' });
});

test('codecov: shields.io', t => {
    const service = 'github';
    const user = 'IndigoUnited';
    const repo = 'js-promtie';

    const badge = detectBadges(`https://img.shields.io/codecov/c/${service}/${user}/${repo}.svg`)[0];

    t.is(badge.urls.original, `https://img.shields.io/codecov/c/${service}/${user}/${repo}.svg`);
    t.is(badge.urls.service, `https://codecov.io/${service}/${user}/${repo}/graphs/badge.svg`);
    t.is(badge.urls.shields, `https://img.shields.io/codecov/c/${service}/${user}/${repo}.svg`);
    t.is(badge.urls.content, `https://img.shields.io/codecov/c/${service}/${user}/${repo}.json`);
    t.is(badge.info.service, 'codecov');
    t.is(badge.info.type, 'coverage');
});

test('codecov: shields.io (with branch)', t => {
    const service = 'github';
    const user = 'IndigoUnited';
    const repo = 'js-promtie';
    const branch = 'master';

    const badge = detectBadges(`https://img.shields.io/codecov/c/${service}/${user}/${repo}/${branch}.svg`)[0];

    t.is(badge.urls.original, `https://img.shields.io/codecov/c/${service}/${user}/${repo}/${branch}.svg`);
    t.is(badge.urls.service, `https://codecov.io/${service}/${user}/${repo}/branch/${branch}/graphs/badge.svg`);
    t.is(badge.urls.shields, `https://img.shields.io/codecov/c/${service}/${user}/${repo}/${branch}.svg`);
    t.is(badge.urls.content, `https://img.shields.io/codecov/c/${service}/${user}/${repo}/${branch}.json`);
    t.is(badge.info.service, 'codecov');
    t.is(badge.info.type, 'coverage');
    t.deepEqual(badge.info.modifiers, { branch: 'master' });
});

test('codecov: not a valid codecov url', t => {
    const service = 'github';
    const user = 'IndigoUnited';
    const repo = 'js-promtie';

    t.falsy(detectBadges(`https://codecov.com/${service}/${user}/${repo}/graph/coverage.svg`)[0]);
});
