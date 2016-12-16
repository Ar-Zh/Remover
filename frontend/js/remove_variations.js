'use strict'

import OptionVariations from './option_variations'

let remove_variations = (function () {
    let one_symbol = OptionVariations.optionVariant(),
        one_symbol_and_exceptions = OptionVariations.optionVariant(),
        two_symbol = OptionVariations.optionVariant(),
        two_symbol_and_exceptions = OptionVariations.optionVariant(),
        commands = OptionVariations.optionVariant();

    one_symbol.check = function (d) {
        if (d.some(item => item === 'one_symbol') && d.every(item => item !== 'exceptions')) {
            return true;
        }
    };
    one_symbol.action = function (s) {
        one_symbol._getResult(s);
    };

    one_symbol_and_exceptions.check = function (d) {
        if (d.some(item => item === 'one_symbol') && d.some(item => item === 'exceptions')) {
            return true;
        }
    };
    one_symbol_and_exceptions.action = function (s) {
        let reg = /[a-zA-Zа-яёА-ЯЁ]/gim;
        this._getResult(s, reg);
    };

    two_symbol.check = function (d) {
        if (d.some(item => item === 'two_symbol') && d.every(item => item !== 'exceptions')) {
            return true;
        }
    };
    two_symbol.action = function (s) {
        if (s.length > 2) {
            this._getResult(this._getResult(s));
        } else {
            alert('Ошибка, в заданном тексте меньше двух символов!!!');
        }
    };

    two_symbol_and_exceptions.check = function (d) {
        if (d.some(item => item === 'two_symbol') && d.some(item => item === 'exceptions')) {
            return true;
        }
    };
    two_symbol_and_exceptions.action = function (s) {
        if (s.length > 2) {
            let reg = /[a-zA-Zа-яёА-ЯЁ]/gim;
            this._getResult(this._getResult(s, reg), reg);
        } else {
            alert('Ошибка, в заданном тексте меньше двух символов!!!');
        }
    };

    commands.check = function (d) {
        if (d.some(item => item === 'commands')) {
            return true;
        }
    };
    commands.action = function (s) {
        let reg = /\bif|else|while|for|do|in|break|continue|switch|case|default\b/ig,
            reg_no = /".*?if|else|while|for|do|in|break|continue|switch|case|default.*?"|'.*?if|else|while|for|do|in|break|continue|switch|case|default.*?'/g,
            result_map = this._getMap(s, reg),
            result_no_map = this._getMap(s, reg_no);

        if (result_map instanceof Map) {
            result_map = this._filterMap(result_map, result_no_map);
            return this._getResult(s, undefined, undefined, result_map);
        } else {
            alert('Ошибка, в заданном тексте нет совпадений!!!');
        }
    };

    return [one_symbol, one_symbol_and_exceptions, two_symbol, two_symbol_and_exceptions, commands];
}());

export default remove_variations;