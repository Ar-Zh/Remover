'use strict'

import Algoritm from './index'

class Single extends Algoritm{

    basicFunc(text) {
        return this._getNewString(text, this._getRandomInt(text.length + 1));
    }
}