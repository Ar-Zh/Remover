'use strict'

export default class Common {

    randomInt(max, min = 1) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    newResult(blank, startIndex, endIndex = ++startIndex) {
        let newResult = blank.slice(0, startIndex);
        newResult += blank.slice(endIndex);
        return newResult;
    }

    singleTool(blank) {

    }

    check(blank) {
        let blank = blank,
            amt = blank.length;
        if (typeof blank !== 'string') {
            return 'Not string';
        } else if (amt < 1) {
            return 'No text or Short text';
        }
        return [blank, amt];
    }
}