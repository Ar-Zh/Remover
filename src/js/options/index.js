'use strict'

export default class Option {

    constructor(text, algoritm) {
        this.text = text;
        this.algoritm = algoritm;
    }

    getNewText() {
        return this.algoritm.basicFunc(this.text);
    }
}