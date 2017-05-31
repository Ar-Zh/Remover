'use strict'

import Common from './common'

export default class SingleLetter extends Common {
    run(_blank) {
        let result = this.check(_blank),
            random;
        do {
            random = this.randomInt(result[1]);
        } while (/[\wа-яё]/gi.test(result[0][random]));
        result = this.newResult(result[0], random);
        return result;
    }

    check(_blank) {
        let blank = _blank;
        if (!/[\wа-яё]/gi.test(blank)) {
            return 'No mathes';
        }
        return super.check(blank);
    }
};