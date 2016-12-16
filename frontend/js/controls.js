'use strict'

export default class Controls {

    decorate(name, ...options) {
        if (!this.decorators_list || !this.decorators_list.set) {
            this.decorators_list = new Map;
        }
        this.decorators_list.set(name, options);
    }

    start() {
        let i;
        for (i of this.decorators_list) {
            this[i[0]](i[1]);
        }
    }

    getPointer() {
        if (this.pointer && this.class_list.contains(this.pointer)) {
            return this.id_name;
        }
    }

    static settingButton(element) {
        if (element instanceof HTMLElement) {
            let e = new Controls(element);
            e.true_class = 'btn-danger';
            e.false_class = 'btn-secondary';
            e.disabled_class = 'disabled';
            e.class_list = element.classList;
            e.id_name = element.id;
            e.pointer = 'btn-danger';
            return e;
        }
    }

    static startingButton(element) {
        if (element instanceof HTMLElement) {
            let e = new Controls();
            e.id_name = element.id;
            return e;
        }
    }

    actionOrReactionElementDecorator() {
        if (!this.class_list.contains(this.disabled_class)) {
            this._switchElementsClass();
        }
    }

    reActionRelatedElementDecorator(roots) {
        if (this.class_list.contains(this.true_class) && !this.class_list.contains(this.disabled_class)) {
            for (let i of roots) {
                if (i.class_list.contains(i.true_class)) {
                    i._switchElementsClass();
                }
            }
        }
    }

    disabledOrRedisabledRelatedElementDecorator (roots) {
        if (this.class_list.contains(this.true_class) && !this.class_list.contains(this.disabled_class)) {
            for (let i of roots) {
                if (!i.class_list.contains(i.disabled_class)) {
                    i.class_list.toggle(i.disabled_class);
                }
            }
        } else if (this.class_list.contains(this.false_class) && !this.class_list.contains(this.disabled_class)) {
            for (let i of roots) {
                if (i.class_list.contains(i.disabled_class)) {
                    i.class_list.toggle(i.disabled_class);
                }
            }
        }
    }

    reDisabledRelatedElementDecorator(roots) {
        if (this.class_list.contains(this.true_class) && !this.class_list.contains(this.disabled_class)) {
            for (let i of roots) {
                if (i.class_list.contains(i.disabled_class)) {
                    i.class_list.toggle(i.disabled_class);
                }
            }
        }
    }

    optionStartDecorator(arr) {
        let func = arr[0];
        let obj = arr[1];
        let obj2 = arr[2];
        func(obj, obj2);
    }

    _switchElementsClass() {
        this.class_list.toggle(this.true_class);
        this.class_list.toggle(this.false_class);
    }
}

class Control {
    activate() {}

    deactivate(){}

}