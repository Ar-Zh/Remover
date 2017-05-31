'use strict'

import Common from './common'

export default class Code extends Common {
    run(_blank) {
        let result = this.check(_blank);

    }
    check(_blank) {
        let result = _blank;

    }
    parse(_blank) {
        let result = _blank,
            _regexp = /if|else|while|do|for|break|continue|switch|case/gi,
            resultArr = new Map;

    }
}