'use strict'

import Controls from './controls'
import Option from './options/index'
import Single from './options/remove_algoritms/single'
import Double from './options/remove_algoritms/double'
import Screen from './screen'

let editor = function () {
    let one_symbol = Controls.settingButton(document.getElementById('one_symbol')),
        two_symbol = Controls.settingButton(document.getElementById('two_symbol')),
        start = Controls.startingButton(document.getElementById('start_editing')),
        screen = Screen.editorScreen(document.getElementById('entry_field')),
        controls = new Map(),
        getOptionSettings = arr => arr.map(item => item.getPointer()),
        f = function (obj, obj2) {
            let option = getOptionSettings(obj.controls);
            let func = obj.optionSelection(option);
            obj2.setScreenValue(func);
        };

    one_symbol.decorate('actionOrReactionElementDecorator');
    one_symbol.decorate('reActionRelatedElementDecorator', two_symbol, commands);
    one_symbol.decorate('reDisabledRelatedElementDecorator', exception);

    two_symbol.decorate('actionOrReactionElementDecorator');
    two_symbol.decorate('reActionRelatedElementDecorator', one_symbol, commands);
    two_symbol.decorate('reDisabledRelatedElementDecorator', exception);

    start.decorate('optionStartDecorator', f, remove, screen);

    controls
        .set(one_symbol.id_name, one_symbol)
        .set(two_symbol.id_name, two_symbol)
        .set(commands.id_name, commands)
        .set(exception.id_name, exception)
        .set(start.id_name, start);

    window.addEventListener('click', event => {
        if (controls.has(event.target.id)) {
            controls.get(event.target.id).start();
        }
    });
}

export default editor;