import test from 'ava';
import detectBadges from '../../';

test('codacy: codacy.com (quality)', t => {
    const token = 'e27821fb6289410b8f58338c7e0bc686';

    const badge = detectBadges(`https://api.codacy.com/project/badge/Grade/${token}`)[0];

    t.is(badge.urls.original, `https://api.codacy.com/project/badge/Grade/${token}`);
    t.is(badge.urls.service, `https://api.codacy.com/project/badge/Grade/${token}`);
    t.is(badge.urls.content, `https://img.shields.io/codacy/grade/${token}.json`);
    t.is(badge.info.service, 'codacy');
    t.is(badge.info.type, 'quality');
});

test('codacy: codacy.com (quality with branch)', t => {
    const token = 'e27821fb6289410b8f58338c7e0bc686';
    const branch = 'master';

    const badge = detectBadges(`https://api.codacy.com/project/badge/Grade/${token}?branch=${branch}`)[0];

    t.is(badge.urls.original, `https://api.codacy.com/project/badge/Grade/${token}?branch=${branch}`);
    t.is(badge.urls.service, `https://api.codacy.com/project/badge/Grade/${token}?branch=${branch}`);
    t.is(badge.urls.content, `https://img.shields.io/codacy/grade/${token}/${branch}.json`);
    t.is(badge.info.service, 'codacy');
    t.is(badge.info.type, 'quality');
    t.deepEqual(badge.info.modifiers, { branch: 'master' });
});

test('codacy: codacy.com (coverage)', t => {
    const token = 'e27821fb6289410b8f58338c7e0bc686';

    const badge = detectBadges(`https://api.codacy.com/project/badge/Coverage/${token}`)[0];

    t.is(badge.urls.original, `https://api.codacy.com/project/badge/Coverage/${token}`);
    t.is(badge.urls.service, `https://api.codacy.com/project/badge/Coverage/${token}`);
    t.is(badge.urls.content, `https://img.shields.io/codacy/coverage/${token}.json`);
    t.is(badge.info.service, 'codacy');
    t.is(badge.info.type, 'coverage');
});

test('codacy: codacy.com (coverage with branch)', t => {
    const token = 'e27821fb6289410b8f58338c7e0bc686';
    const branch = 'master';

    const badge = detectBadges(`https://api.codacy.com/project/badge/Coverage/${token}?branch=${branch}`)[0];

    t.is(badge.urls.original, `https://api.codacy.com/project/badge/Coverage/${token}?branch=${branch}`);
    t.is(badge.urls.service, `https://api.codacy.com/project/badge/Coverage/${token}?branch=${branch}`);
    t.is(badge.urls.content, `https://img.shields.io/codacy/coverage/${token}/${branch}.json`);
    t.is(badge.info.service, 'codacy');
    t.is(badge.info.type, 'coverage');
    t.deepEqual(badge.info.modifiers, { branch: 'master' });
});

test('codacy: shields.io (quality)', t => {
    const token = 'e27821fb6289410b8f58338c7e0bc686';

    const badge = detectBadges(`https://img.shields.io/codacy/grade/${token}.svg`)[0];

    t.is(badge.urls.original, `https://img.shields.io/codacy/grade/${token}.svg`);
    t.is(badge.urls.service, `https://api.codacy.com/project/badge/Grade/${token}`);
    t.is(badge.urls.content, `https://img.shields.io/codacy/grade/${token}.json`);
    t.is(badge.info.service, 'codacy');
    t.is(badge.info.type, 'quality');
});

test('codacy: shields.io (quality with branch)', t => {
    const token = 'e27821fb6289410b8f58338c7e0bc686';
    const branch = 'master';

    const badge = detectBadges(`https://img.shields.io/codacy/grade/${token}/${branch}.svg`)[0];

    t.is(badge.urls.original, `https://img.shields.io/codacy/grade/${token}/${branch}.svg`);
    t.is(badge.urls.service, `https://api.codacy.com/project/badge/Grade/${token}?branch=${branch}`);
    t.is(badge.urls.content, `https://img.shields.io/codacy/grade/${token}/${branch}.json`);
    t.is(badge.info.service, 'codacy');
    t.is(badge.info.type, 'quality');
    t.deepEqual(badge.info.modifiers, { branch: 'master' });
});

test('codacy: shields.io (coverage)', t => {
    const token = 'e27821fb6289410b8f58338c7e0bc686';

    const badge = detectBadges(`https://img.shields.io/codacy/coverage/${token}.svg`)[0];

    t.is(badge.urls.original, `https://img.shields.io/codacy/coverage/${token}.svg`);
    t.is(badge.urls.service, `https://api.codacy.com/project/badge/Coverage/${token}`);
    t.is(badge.urls.content, `https://img.shields.io/codacy/coverage/${token}.json`);
    t.is(badge.info.service, 'codacy');
    t.is(badge.info.type, 'coverage');
});

test('codacy: shields.io (coverage with branch)', t => {
    const token = 'e27821fb6289410b8f58338c7e0bc686';
    const branch = 'master';

    const badge = detectBadges(`https://img.shields.io/codacy/coverage/${token}/${branch}.svg`)[0];

    t.is(badge.urls.original, `https://img.shields.io/codacy/coverage/${token}/${branch}.svg`);
    t.is(badge.urls.service, `https://api.codacy.com/project/badge/Coverage/${token}?branch=${branch}`);
    t.is(badge.urls.content, `https://img.shields.io/codacy/coverage/${token}/${branch}.json`);
    t.is(badge.info.service, 'codacy');
    t.is(badge.info.type, 'coverage');
    t.deepEqual(badge.info.modifiers, { branch: 'master' });
});

test('codacy: not a valid codacy url', t => {
    const token = 'e27821fb6289410b8f58338c7e0bc686';

    t.falsy(detectBadges(`https://api.codacy.org/project/badge/Grade/${token}`)[0]);
    t.falsy(detectBadges(`https://api.codacy.org/project/badge/Coverage/${token}`)[0]);
});
