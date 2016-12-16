'use strict'

import remove_variations from './remove_variations'

export default class Options {

    optionSelection(arr) {
        let options = arr,
            i;
        for (i of this.variations) {
            if (i.check(options)) {
                return i.action;
            }
        }
    }

    static removeOption(...controls) {
        let option = new Options();
        option.variations = remove_variations;
        option.controls = controls;
        return option;
    }
}