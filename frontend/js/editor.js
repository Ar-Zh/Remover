'use strict'

import Controls from './controls'
import Options from './options'
import Screen from './screen'

let editor = function () {
    let one_symbol = Controls.settingButton(document.getElementById('one_symbol')),
        two_symbol = Controls.settingButton(document.getElementById('two_symbol')),
        commands = Controls.settingButton(document.getElementById('commands')),
        exception = Controls.settingButton(document.getElementById('exceptions')),
        start = Controls.startingButton(document.getElementById('start_editing')),
        remove = Options.removeOption(one_symbol, two_symbol, commands, exception),
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

    commands.decorate('actionOrReactionElementDecorator');
    commands.decorate('reActionRelatedElementDecorator', one_symbol, two_symbol, exception);
    commands.decorate('disabledOrRedisabledRelatedElementDecorator', exception);

    exception.decorate('actionOrReactionElementDecorator');

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