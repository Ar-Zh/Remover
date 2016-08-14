'use strict'

import Editor from './editor'

let editor = new Editor();

let screenRoot = document.getElementById('screen'),
    menuRoot = document.getElementById('menu');

editor.roots
    .set('screen', screenRoot)
    .set('menu', menuRoot);

editor.templates
    .set('headband', document.getElementById('headband_t').innerHTML)
    .set('entryField', document.getElementById('entry_field_t').innerHTML)
    .set('showResult', document.getElementById('show_result_t').innerHTML)
    .set('button', document.getElementById('button_t').innerHTML);

editor.subContent('screen', ['headband']);

editor.creatHandler('screen',
    'click',
    event => {
        if (event.target.className == 'headband') {

            editor.subContent('screen', ['entryField'], ['button', {cl: 'button button_single',content: 'ok'}]);
        }
    }
);

editor.creatHandler('screen',
    'click',
    event => {
        let specifiedText = document.getElementById('entry_field').value;

        if (event.target.className == 'button button_single') {

            editor.subContent('screen', ['showResult', {specifiedText: specifiedText}]);
            editor.subContent('menu', ['button', {cl: 'button button_menu', content: 'button_1'}],
                ['button', {cl: 'button button_menu', content: 'button_2'}]);
            }
        }
);
