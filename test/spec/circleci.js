import test from 'ava';
import detectBadges from '../../';

test('circleci: circleci.com', t => {
    const user = 'FullHuman';
    const repo = 'purgecss';

    const badge = detectBadges(`https://circleci.com/gh/${user}/${repo}.svg`)[0];

    t.is(badge.urls.original, `https://circleci.com/gh/${user}/${repo}.svg`);
    t.is(badge.urls.service, `https://circleci.com/gh/${user}/${repo}.svg`);
    t.is(badge.urls.content, `https://img.shields.io/circleci/project/github/${user}/${repo}.json`);
    t.is(badge.info.service, 'circleci');
    t.is(badge.info.type, 'build');
});

test('circleci: circleci.com (with branch)', t => {
    const user = 'FullHuman';
    const repo = 'purgecss';
    const branch = 'master';

    const badge = detectBadges(`https://circleci.com/gh/${user}/${repo}/tree/${branch}.svg`)[0];

    t.is(badge.urls.original, `https://circleci.com/gh/${user}/${repo}/tree/${branch}.svg`);
    t.is(badge.urls.service, `https://circleci.com/gh/${user}/${repo}/tree/${branch}.svg`);
    t.is(badge.urls.content, `https://img.shields.io/circleci/project/github/${user}/${repo}/${branch}.json`);
    t.is(badge.info.service, 'circleci');
    t.is(badge.info.type, 'build');
    t.deepEqual(badge.info.modifiers, { branch: 'master' });
});

test('circleci: shields.io', t => {
    const user = 'FullHuman';
    const repo = 'purgecss';

    const badge = detectBadges(`https://img.shields.io/circleci/project/github/${user}/${repo}.svg`)[0];

    t.is(badge.urls.original, `https://img.shields.io/circleci/project/github/${user}/${repo}.svg`);
    t.is(badge.urls.service, `https://circleci.com/gh/${user}/${repo}.svg`);
    t.is(badge.urls.content, `https://img.shields.io/circleci/project/github/${user}/${repo}.json`);
    t.is(badge.info.service, 'circleci');
    t.is(badge.info.type, 'build');
});

test('circleci: shields.io (with branch)', t => {
    const user = 'FullHuman';
    const repo = 'purgecss';
    const branch = 'master';

    const badge = detectBadges(`https://img.shields.io/circleci/project/github/${user}/${repo}/${branch}.svg`)[0];

    t.is(badge.urls.original, `https://img.shields.io/circleci/project/github/${user}/${repo}/${branch}.svg`);
    t.is(badge.urls.service, `https://circleci.com/gh/${user}/${repo}/tree/${branch}.svg`);
    t.is(badge.urls.content, `https://img.shields.io/circleci/project/github/${user}/${repo}/${branch}.json`);
    t.is(badge.info.service, 'circleci');
    t.is(badge.info.type, 'build');
    t.deepEqual(badge.info.modifiers, { branch: 'master' });
});

test('circleci: not a valid circleci url', t => {
    const user = 'FullHuman';
    const repo = 'purgecss';

    t.falsy(detectBadges(`https://circleci.org/${user}/${repo}.svg`)[0]);
});
