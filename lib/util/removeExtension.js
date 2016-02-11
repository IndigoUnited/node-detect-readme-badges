'use strict';

module.exports = function removeExtension(str) {
    str = str.split('.');
    str.pop();

    str = str.join('');

    return str;
};
