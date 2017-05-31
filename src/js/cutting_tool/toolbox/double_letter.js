'use strict'

import Common from './common'

export default class Double extends Common {
    constructor() {
        this.iteration = true;
    }
    run(_blank) {
        let result = _blank,
            random,
            i = 2;
        while (i) {
            result= this.check(result);
            do {
                random = this.randomInt(result[1]);
            } while (/[\wа-яё]/gi.test(result[0][random]));
            result = this.newResult(result[0], random);
            i--;
        }
        return result;
    }

    check(_blank) {
        let blank = _blank;
        if (this.iteration) {
            this.iteration = false;
            if (!/[\wа-яё]/gi.test(blank)) {
                return 'No mathes';
            }
        }
        return super.check(blank);
    }
}