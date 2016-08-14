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
        templs.forEach( item => result += template(this.templates.get(item[0]))(item[1]));
        this.roots.get(root).innerHTML = result;
    }

    // Used to creating a handler
    creatHandler(root, event, handler) {
        this.roots.get(root).addEventListener(event, handler);
    }
}