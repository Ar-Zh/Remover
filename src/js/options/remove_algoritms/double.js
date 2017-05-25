'use strict'

import Algoritm from './index'

class Double extends Algoritm{

    basicFunc(text) {
        text = this._getNewString(text, this._getRandomInt(text.length + 1));
        return this._getNewString(text, this._getRandomInt(text.length + 1));
    }
}