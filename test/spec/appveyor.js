import test from 'ava';
import detectBadges from '../../';


// appveyor:                        https://ci.appveyor.com/api/projects/status/${user}/${repo}
// appveyor with branch:            https://ci.appveyor.com/api/projects/status/${user}/${repo}/branch/${branch}
// appveyor shields io:             https://img.shields.io/appveyor/ci/${user}/${repo}.svg
// appveyor shields io with branch: https://img.shields.io/appveyor/ci/${user}/${repo}/${branch}.svg

test('appveyor: appveyor.io', t => {
    const user = 'bower';
    const repo = 'bower';

    const badge = detectBadges(`https://ci.appveyor.com/api/projects/status/${user}/${repo}`)[0];

    t.is(badge.urls.original, `https://ci.appveyor.com/api/projects/status/${user}/${repo}`);
    t.is(badge.urls.service, `https://ci.appveyor.com/api/projects/status/${user}/${repo}`);
    t.is(badge.urls.shields, `https://img.shields.io/appveyor/ci/${user}/${repo}.svg`);
    t.is(badge.urls.content, `https://img.shields.io/appveyor/ci/${user}/${repo}.json`);
    t.is(badge.info.service, 'appveyor');
    t.is(badge.info.type, 'coverage');
});

test('appveyor: appveyor.io (with branch)', t => {
    const user = 'bower';
    const repo = 'bower';
    const branch = 'master';

    const badge = detectBadges(`https://ci.appveyor.com/api/projects/status/${user}/${repo}/branch/${branch}`)[0];

    t.is(badge.urls.original, `https://ci.appveyor.com/api/projects/status/${user}/${repo}/branch/${branch}`);
    t.is(badge.urls.service, `https://ci.appveyor.com/api/projects/status/${user}/${repo}/branch/${branch}`);
    t.is(badge.urls.shields, `https://img.shields.io/appveyor/ci/${user}/${repo}/${branch}.svg`);
    t.is(badge.urls.content, `https://img.shields.io/appveyor/ci/${user}/${repo}/${branch}.json`);
    t.is(badge.info.service, 'appveyor');
    t.is(badge.info.type, 'coverage');
});

test('appveyor: shields.io', t => {
    const user = 'bower';
    const repo = 'bower';

    const badge = detectBadges(`https://img.shields.io/appveyor/ci/${user}/${repo}.svg`)[0];

    t.is(badge.urls.original, `https://img.shields.io/appveyor/ci/${user}/${repo}.svg`);
    t.is(badge.urls.service, `https://ci.appveyor.com/api/projects/status/${user}/${repo}`);
    t.is(badge.urls.shields, `https://img.shields.io/appveyor/ci/${user}/${repo}.svg`);
    t.is(badge.urls.content, `https://img.shields.io/appveyor/ci/${user}/${repo}.json`);
    t.is(badge.info.service, 'appveyor');
    t.is(badge.info.type, 'coverage');
});

test('appveyor: shields.io (with branch)', t => {
    const user = 'bower';
    const repo = 'bower';
    const branch = 'master';

    const badge = detectBadges(`https://img.shields.io/appveyor/ci/${user}/${repo}/${branch}.svg`)[0];

    t.is(badge.urls.original, `https://img.shields.io/appveyor/ci/${user}/${repo}/${branch}.svg`);
    t.is(badge.urls.service, `https://ci.appveyor.com/api/projects/status/${user}/${repo}/branch/${branch}`);
    t.is(badge.urls.shields, `https://img.shields.io/appveyor/ci/${user}/${repo}/${branch}.svg`);
    t.is(badge.urls.content, `https://img.shields.io/appveyor/ci/${user}/${repo}/${branch}.json`);
    t.is(badge.info.service, 'appveyor');
    t.is(badge.info.type, 'coverage');
    t.deepEqual(badge.info.modifiers, { branch: 'master' });
});

test('appveyor: not a valid appveyor url', t => {
    const user = 'bower';
    const repo = 'bower';

    t.falsy(detectBadges(`https://appveyor.com/repos/${user}/${repo}/badge.svg`)[0]);
});
