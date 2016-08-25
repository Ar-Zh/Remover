'use strict'

import template from '../../node_modules/lodash/template'

export default class Editor {

    constructor() {
        this.roots = new Map;
        this.templates = new Map;
    }

    // Used to content substitution
    subContent(root, ...templs) {
        let result = '';
        if (templs) templs.forEach( item => result += template(this.templates.get(item[0]))(item[1]));
        this.roots.get(root).innerHTML = result;
    }

    // Used to creating a handler
    creatHandler(root, event, handler) {
        this.roots.get(root).addEventListener(event, handler);
    }

    // Used to add functional buttons
    pumpButton(options) {
        if (!document.getElementById(options.root).classList.contains(options.disabledClass)) {
            document.getElementById(options.root).classList.toggle(options.falseClass);
            document.getElementById(options.root).classList.toggle(options.trueClass);

            if (options.relatedItems) {
                options.relatedItems.forEach(
                    item => {
                        if (document.getElementById(item).classList.contains(options.trueClass)) {
                            document.getElementById(item).classList.toggle(options.trueClass);
                            document.getElementById(item).classList.toggle(options.falseClass);
                        }
                    }
                )
            }

            if (options.disabledItems) {
                options.disabledItems.forEach(
                    item => {
                        if (document.getElementById(item).classList.contains(options.trueClass)) {
                            document.getElementById(item).classList.toggle(options.trueClass);
                            document.getElementById(item).classList.toggle(options.falseClass);
                        }
                        document.getElementById(item).classList.toggle(options.disabledClass);
                    }
                )
            }

            if (options.reDisabledItems) {
                options.reDisabledItems.forEach(
                    item => {
                        if (document.getElementById(item).classList.contains(options.disabledClass)) {
                            document.getElementById(item).classList.toggle(options.disabledClass);
                        }
                    }
                )
            }
        }
    }
}