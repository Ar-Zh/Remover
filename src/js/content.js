'use strict'

export default class Content{
    constructor(text) {
        if (typeof (text) === 'string') {
            this.text = text;
        }
    }

    get Text() {
        return this.text
    }
}