'use strict'

export default class Algoritm {

    basicFunc(text) {
        return text;
    }

    _getRandomInt(x) {
        return Math.floor(Math.random() * (x - 0 + 1)) + 0;
    }

    _getNewString(string, num) {
        return string.slice(0, num) + string.slice(num + 1);
    }
}
