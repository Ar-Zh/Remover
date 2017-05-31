'use strict'

import Common from './common'

export default class Double extends Common {
    run(_blank) {
        let result = _blank,
            random,
            i = 2;
        while (i) {
            result= this.check(result);
            do {
                random = this.randomInt(result[1]);
            } while (result[0][random] === '');
            result = this.newResult(result[0], random);
            i--;
        }
        return result;
    }
}