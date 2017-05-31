'use strict'

import Single from './single'
import Double from './double'
import SingleLetter from './single_letter'
import DoubleLetter from './double_letter'
import Code from './code'

let toolset = {
    single: Single,
    double: Double,
    singleLetter: SingleLetter,
    doubleLetter: DoubleLetter,
    code: Code
};

export {toolset};