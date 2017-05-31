'use strict'

import Common from './common'

export default class Single extends Common {
    run(_blank) {
        let result = this.check(_blank),
            random;
        do {
            random = this.randomInt(result[1]);
        } while (result[0][random] === '');
        result = this.newResult(result[0], random);
        return result;
    }
};