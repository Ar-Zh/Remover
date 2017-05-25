'use strict'

export default class Screen{

    setScreenValue(callback) {
        this.element.value = callback(this._getScreenValue());
    }

    static editorScreen(element) {
        let result = new Screen();
        result.element = element;
        return result;
    }

    _getScreenValue() {
        return this.element.value;
    }
}