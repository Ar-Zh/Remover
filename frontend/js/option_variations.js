'use strict'

export default class OptionVariations{

    static optionVariant() {
        let variant = new OptionVariations();
        return variant;
    }

    _getRandomInt(min, max, reg = null, string = null) {
        let result;
        if (reg instanceof RegExp) {
            while (!string[result].match(reg)) {
                result = this._getRandomInt(1, string.length);
                return result;
            }
        }
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    _getNewString(string, num, length) {
        return string.slice(0, num) + string.slice(num + length);
    }

    _getResult(string = null, reg = null, len = 1, map = null) {
        let r;
        if (string.length <1) {
            alert('Ошибка, отсутствует введенный текст!!!');
        } else {
            if (reg instanceof RegExp) {
                if (string.match(reg)) {
                    r = this._getRandomInt(1, string.length, reg, string);
                    return this._getNewString(string, r, len);
                } else {
                    alert('Ошибка, в заданном тексте нет совпадений!!!');
                }
            } else if (map instanceof Map) {
                r = this._getRandomInt(1, map.size);
                r = this._getMapKey(map, r);
                return this._getNewString(string, r[0], r[1] - r[0])
            } else {
                let r = this._getRandomInt(1, string.length);
                return this._getNewString(string, r, len);
            }
        }
    }

    _getMap(string, reg) {
        let result;
        while (result = reg.exec(string)) {
            if (!result || !result.set) {
                result = new Map;
            }
            result.set(result.index, reg.lastIndex);
        }
        return result;
    }

    _filterMap(map1, map2) {
        if (map1 instanceof Map && map2 instanceof Map) {
            let i;
            for (i of map1.keys()) {
                if (map2.has(i)) {
                    map1.delete(i);
                }
            }
            return map1;
        } else {
            return map1;
        }
    }

    _getMapKey(map, num) {
        let i,
            j = 1;
        for (i of map) {
            if (num = j) {
                return i;
            }
        }
    }
}