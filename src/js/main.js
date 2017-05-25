'use strict'

import editor from './editor'
import template from '../../node_modules/lodash/template'
import Content from './content'

document.getElementById("headband_button").addEventListener('click', () => {
    document.getElementById("body").innerHTML = template(document.getElementById("menu_t").innerHTML)({
        items: [
            ['one_symbol', 'Один символ'],
            ['two_symbol', 'Два символа']
        ]
    });
    editor();
});