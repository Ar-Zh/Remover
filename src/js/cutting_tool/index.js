'use strict'

import {toolset} from './toolbox/index'

export default class CuttingTool{
    constructor(_tool) {
        this.tool = new toolset[_tool];
    }

    run(_blank) {
        let result = this.tool.run(_blank);
        return result;
    }
};