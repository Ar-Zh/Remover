'use strict'

import Editor from './editor'

let editor = new Editor();

let bodyRoot = document.body;

editor.roots.set('body', bodyRoot);

let headbandTempl = document.getElementById('headband_t').innerHTML,
    entryFieldTempl = document.getElementById('entry_field_t').innerHTML,
    showResultTempl = document.getElementById('show_result_t').innerHTML,
    menuTempl = document.getElementById('menu_t').innerHTML;

editor.templates
    .set('headband', headbandTempl)
    .set('entryField', entryFieldTempl)
    .set('showResult', showResultTempl)
    .set('menu', menuTempl);

editor.subContent('body',
    ['headband']);

editor.creatHandler(
    'body',
    'click',
    event => {
        if (event.target.id == 'headband_button' || event.target.id == 'show_result_button') {
            editor.subContent('body', ['entryField'],
                ['menu', {items: [
                    ['one_symb', 'Один символ'],
                    ['two_symb', 'Два символа'],
                    ['exceptions', 'Без цифр и знаков'],
                    ['commands', 'Команда(ы) JS']
                ]}]
            );
        }
    }
);

editor.creatHandler(
    'body',
    'click',
    event => {
        if (event.target.id == 'one_symb') {
            editor.pumpButton({
                root: 'one_symb',
                relatedItems: ['two_symb', 'commands'],
                trueClass: 'btn-danger',
                falseClass: 'btn-secondary',
                disabledClass: 'disabled',
                reDisabledItems: ['exceptions']
            })
        }
    }
);

editor.creatHandler(
    'body',
    'click',
    event => {
        if (event.target.id == 'two_symb') {
            editor.pumpButton({
                root: 'two_symb',
                relatedItems: ['one_symb', 'commands'],
                trueClass: 'btn-danger',
                falseClass: 'btn-secondary',
                disabledClass: 'disabled',
                reDisabledItems: ['exceptions']
            })
        }
    }
);

editor.creatHandler(
    'body',
    'click',
    event => {
        if (event.target.id == 'commands') {
            editor.pumpButton({
                root: 'commands',
                relatedItems: ['one_symb', 'two_symb'],
                trueClass: 'btn-danger',
                falseClass: 'btn-secondary',
                disabledClass: 'disabled',
                disabledItems: ['exceptions']
            })
        }
    }
);

editor.creatHandler(
    'body',
    'click',
    event => {
        if (event.target.id == 'exceptions') {
            editor.pumpButton({
                root: 'exceptions',
                trueClass: 'btn-danger',
                falseClass: 'btn-secondary',
                disabledClass: 'disabled'
            })
        }
    }
);

editor.creatHandler(
    'body',
    'click',
    event => {
        if (event.target.id == 'start_editing') {
            if (
                document.getElementById('one_symb').classList.contains('btn-danger') ||
                document.getElementById('two_symb').classList.contains('btn-danger') ||
                document.getElementById('commands').classList.contains('btn-danger')
            ) {
                editor.subContent('body',
                    ['showResult', {specifiedText: setResultText()}])
            } else alert('Забыл установить настройки?');
        }
    }
);

function setResultText () {
    let specifiedText, reg, randomInt, startIndex, stopIndex, resultText;
    specifiedText = document.getElementById('entry_field').value;
    randomInt = Math.floor(Math.random() * ((specifiedText.length - 1) + 0)) + 0;

    if (document.getElementById('exceptions').classList.contains('btn-danger')) {
        let reg = /[a-zA-Zа-яёА-ЯЁ]/gim;
        outer: if (!specifiedText[randomInt].match(reg)) {
            randomInt = Math.floor(Math.random() * ((specifiedText.length - 1) + 0)) + 0;
            break outer;
        };
    };

    startIndex = randomInt;
    stopIndex = randomInt + 1;
    resultText = specifiedText.slice(0, startIndex) + specifiedText.slice(stopIndex)

    if (document.getElementById('two_symb').classList.contains('btn-danger')) {
        if (specifiedText.length > 2) {
            specifiedText = resultText;
            randomInt = Math.floor(Math.random() * ((specifiedText.length - 1) + 0)) + 0;

            if (document.getElementById('exceptions').classList.contains('btn-danger')) {
                let reg = /[a-zA-Zа-яёА-ЯЁ]/gim;
                outer: if (!specifiedText[randomInt].match(reg)) {
                    randomInt = Math.floor(Math.random() * ((specifiedText.length - 1) + 0)) + 0;
                    break outer;
                };
            };

            startIndex = randomInt;
            stopIndex = randomInt + 1;
            resultText = specifiedText.slice(0, startIndex) + specifiedText.slice(stopIndex);
        } else resultText = 'Ошибка!!! Надо минимум три символа!!!';
    }

    if (document.getElementById('commands').classList.contains('btn-danger')) {
        let result, i = 1, resultArr = new Map, reg = /if|else|while|for|do|in|break|continue|switch|case|default/ig;
        while (result = reg.exec(specifiedText)) resultArr.set(result.index, reg.lastIndex);
        randomInt = Math.floor(Math.random() * ((resultArr.size - 1) + 0)) + 0;
        resultArr.forEach( (value, key) => {if (i === randomInt) {startIndex = key; stopIndex = value;}; i++;} );
        resultText = specifiedText.slice(0, startIndex) + specifiedText.slice(stopIndex);
        if (resultArr.size == 0) {
            resultText = 'Ошибка!!! Нет ни одной команды!!!';
        };
    }
    if (resultText.length == 0) resultText = 'Ошибка!!! нет текста!!!';
    return resultText;
};