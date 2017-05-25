/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/js/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _editor = __webpack_require__(1);

	var _editor2 = _interopRequireDefault(_editor);

	var _template = __webpack_require__(8);

	var _template2 = _interopRequireDefault(_template);

	var _content = __webpack_require__(56);

	var _content2 = _interopRequireDefault(_content);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	document.getElementById("headband_button").addEventListener('click', function () {
	    document.getElementById("body").innerHTML = (0, _template2.default)(document.getElementById("menu_t").innerHTML)({
	        items: [['one_symbol', 'Один символ'], ['two_symbol', 'Два символа']]
	    });
	    (0, _editor2.default)();
	});

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _controls = __webpack_require__(2);

	var _controls2 = _interopRequireDefault(_controls);

	var _index = __webpack_require__(3);

	var _index2 = _interopRequireDefault(_index);

	var _single = __webpack_require__(4);

	var _single2 = _interopRequireDefault(_single);

	var _double = __webpack_require__(6);

	var _double2 = _interopRequireDefault(_double);

	var _screen = __webpack_require__(7);

	var _screen2 = _interopRequireDefault(_screen);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var editor = function editor() {
	    var one_symbol = _controls2.default.settingButton(document.getElementById('one_symbol')),
	        two_symbol = _controls2.default.settingButton(document.getElementById('two_symbol')),
	        start = _controls2.default.startingButton(document.getElementById('start_editing')),
	        screen = _screen2.default.editorScreen(document.getElementById('entry_field')),
	        controls = new Map(),
	        getOptionSettings = function getOptionSettings(arr) {
	        return arr.map(function (item) {
	            return item.getPointer();
	        });
	    },
	        f = function f(obj, obj2) {
	        var option = getOptionSettings(obj.controls);
	        var func = obj.optionSelection(option);
	        obj2.setScreenValue(func);
	    };

	    one_symbol.decorate('actionOrReactionElementDecorator');
	    one_symbol.decorate('reActionRelatedElementDecorator', two_symbol, commands);
	    one_symbol.decorate('reDisabledRelatedElementDecorator', exception);

	    two_symbol.decorate('actionOrReactionElementDecorator');
	    two_symbol.decorate('reActionRelatedElementDecorator', one_symbol, commands);
	    two_symbol.decorate('reDisabledRelatedElementDecorator', exception);

	    start.decorate('optionStartDecorator', f, remove, screen);

	    controls.set(one_symbol.id_name, one_symbol).set(two_symbol.id_name, two_symbol).set(commands.id_name, commands).set(exception.id_name, exception).set(start.id_name, start);

	    window.addEventListener('click', function (event) {
	        if (controls.has(event.target.id)) {
	            controls.get(event.target.id).start();
	        }
	    });
	};

	exports.default = editor;

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Controls = function () {
	    function Controls() {
	        _classCallCheck(this, Controls);
	    }

	    _createClass(Controls, [{
	        key: 'decorate',
	        value: function decorate(name) {
	            if (!this.decorators_list || !this.decorators_list.set) {
	                this.decorators_list = new Map();
	            }

	            for (var _len = arguments.length, options = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	                options[_key - 1] = arguments[_key];
	            }

	            this.decorators_list.set(name, options);
	        }
	    }, {
	        key: 'start',
	        value: function start() {
	            var i = void 0;
	            var _iteratorNormalCompletion = true;
	            var _didIteratorError = false;
	            var _iteratorError = undefined;

	            try {
	                for (var _iterator = this.decorators_list[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	                    i = _step.value;

	                    this[i[0]](i[1]);
	                }
	            } catch (err) {
	                _didIteratorError = true;
	                _iteratorError = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion && _iterator.return) {
	                        _iterator.return();
	                    }
	                } finally {
	                    if (_didIteratorError) {
	                        throw _iteratorError;
	                    }
	                }
	            }
	        }
	    }, {
	        key: 'getPointer',
	        value: function getPointer() {
	            if (this.pointer && this.class_list.contains(this.pointer)) {
	                return this.id_name;
	            }
	        }
	    }, {
	        key: 'actionOrReactionElementDecorator',
	        value: function actionOrReactionElementDecorator() {
	            if (!this.class_list.contains(this.disabled_class)) {
	                this._switchElementsClass();
	            }
	        }
	    }, {
	        key: 'reActionRelatedElementDecorator',
	        value: function reActionRelatedElementDecorator(roots) {
	            if (this.class_list.contains(this.true_class) && !this.class_list.contains(this.disabled_class)) {
	                var _iteratorNormalCompletion2 = true;
	                var _didIteratorError2 = false;
	                var _iteratorError2 = undefined;

	                try {
	                    for (var _iterator2 = roots[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	                        var i = _step2.value;

	                        if (i.class_list.contains(i.true_class)) {
	                            i._switchElementsClass();
	                        }
	                    }
	                } catch (err) {
	                    _didIteratorError2 = true;
	                    _iteratorError2 = err;
	                } finally {
	                    try {
	                        if (!_iteratorNormalCompletion2 && _iterator2.return) {
	                            _iterator2.return();
	                        }
	                    } finally {
	                        if (_didIteratorError2) {
	                            throw _iteratorError2;
	                        }
	                    }
	                }
	            }
	        }
	    }, {
	        key: 'disabledOrRedisabledRelatedElementDecorator',
	        value: function disabledOrRedisabledRelatedElementDecorator(roots) {
	            if (this.class_list.contains(this.true_class) && !this.class_list.contains(this.disabled_class)) {
	                var _iteratorNormalCompletion3 = true;
	                var _didIteratorError3 = false;
	                var _iteratorError3 = undefined;

	                try {
	                    for (var _iterator3 = roots[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
	                        var i = _step3.value;

	                        if (!i.class_list.contains(i.disabled_class)) {
	                            i.class_list.toggle(i.disabled_class);
	                        }
	                    }
	                } catch (err) {
	                    _didIteratorError3 = true;
	                    _iteratorError3 = err;
	                } finally {
	                    try {
	                        if (!_iteratorNormalCompletion3 && _iterator3.return) {
	                            _iterator3.return();
	                        }
	                    } finally {
	                        if (_didIteratorError3) {
	                            throw _iteratorError3;
	                        }
	                    }
	                }
	            } else if (this.class_list.contains(this.false_class) && !this.class_list.contains(this.disabled_class)) {
	                var _iteratorNormalCompletion4 = true;
	                var _didIteratorError4 = false;
	                var _iteratorError4 = undefined;

	                try {
	                    for (var _iterator4 = roots[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
	                        var _i = _step4.value;

	                        if (_i.class_list.contains(_i.disabled_class)) {
	                            _i.class_list.toggle(_i.disabled_class);
	                        }
	                    }
	                } catch (err) {
	                    _didIteratorError4 = true;
	                    _iteratorError4 = err;
	                } finally {
	                    try {
	                        if (!_iteratorNormalCompletion4 && _iterator4.return) {
	                            _iterator4.return();
	                        }
	                    } finally {
	                        if (_didIteratorError4) {
	                            throw _iteratorError4;
	                        }
	                    }
	                }
	            }
	        }
	    }, {
	        key: 'reDisabledRelatedElementDecorator',
	        value: function reDisabledRelatedElementDecorator(roots) {
	            if (this.class_list.contains(this.true_class) && !this.class_list.contains(this.disabled_class)) {
	                var _iteratorNormalCompletion5 = true;
	                var _didIteratorError5 = false;
	                var _iteratorError5 = undefined;

	                try {
	                    for (var _iterator5 = roots[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
	                        var i = _step5.value;

	                        if (i.class_list.contains(i.disabled_class)) {
	                            i.class_list.toggle(i.disabled_class);
	                        }
	                    }
	                } catch (err) {
	                    _didIteratorError5 = true;
	                    _iteratorError5 = err;
	                } finally {
	                    try {
	                        if (!_iteratorNormalCompletion5 && _iterator5.return) {
	                            _iterator5.return();
	                        }
	                    } finally {
	                        if (_didIteratorError5) {
	                            throw _iteratorError5;
	                        }
	                    }
	                }
	            }
	        }
	    }, {
	        key: 'optionStartDecorator',
	        value: function optionStartDecorator(arr) {
	            var func = arr[0];
	            var obj = arr[1];
	            var obj2 = arr[2];
	            func(obj, obj2);
	        }
	    }, {
	        key: '_switchElementsClass',
	        value: function _switchElementsClass() {
	            this.class_list.toggle(this.true_class);
	            this.class_list.toggle(this.false_class);
	        }
	    }], [{
	        key: 'settingButton',
	        value: function settingButton(element) {
	            if (element instanceof HTMLElement) {
	                var e = new Controls(element);
	                e.true_class = 'btn-danger';
	                e.false_class = 'btn-secondary';
	                e.disabled_class = 'disabled';
	                e.class_list = element.classList;
	                e.id_name = element.id;
	                e.pointer = 'btn-danger';
	                return e;
	            }
	        }
	    }, {
	        key: 'startingButton',
	        value: function startingButton(element) {
	            if (element instanceof HTMLElement) {
	                var e = new Controls();
	                e.id_name = element.id;
	                return e;
	            }
	        }
	    }]);

	    return Controls;
	}();

	exports.default = Controls;

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Option = function () {
	    function Option(text, algoritm) {
	        _classCallCheck(this, Option);

	        this.text = text;
	        this.algoritm = algoritm;
	    }

	    _createClass(Option, [{
	        key: 'getNewText',
	        value: function getNewText() {
	            return this.algoritm.basicFunc(this.text);
	        }
	    }]);

	    return Option;
	}();

	exports.default = Option;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _index = __webpack_require__(5);

	var _index2 = _interopRequireDefault(_index);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Single = function (_Algoritm) {
	    _inherits(Single, _Algoritm);

	    function Single() {
	        _classCallCheck(this, Single);

	        return _possibleConstructorReturn(this, Object.getPrototypeOf(Single).apply(this, arguments));
	    }

	    _createClass(Single, [{
	        key: 'basicFunc',
	        value: function basicFunc(text) {
	            return this._getNewString(text, this._getRandomInt(text.length + 1));
	        }
	    }]);

	    return Single;
	}(_index2.default);

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Algoritm = function () {
	    function Algoritm() {
	        _classCallCheck(this, Algoritm);
	    }

	    _createClass(Algoritm, [{
	        key: 'basicFunc',
	        value: function basicFunc(text) {
	            return text;
	        }
	    }, {
	        key: '_getRandomInt',
	        value: function _getRandomInt(x) {
	            return Math.floor(Math.random() * (x - 0 + 1)) + 0;
	        }
	    }, {
	        key: '_getNewString',
	        value: function _getNewString(string, num) {
	            return string.slice(0, num) + string.slice(num + 1);
	        }
	    }]);

	    return Algoritm;
	}();

	exports.default = Algoritm;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _index = __webpack_require__(5);

	var _index2 = _interopRequireDefault(_index);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Double = function (_Algoritm) {
	    _inherits(Double, _Algoritm);

	    function Double() {
	        _classCallCheck(this, Double);

	        return _possibleConstructorReturn(this, Object.getPrototypeOf(Double).apply(this, arguments));
	    }

	    _createClass(Double, [{
	        key: 'basicFunc',
	        value: function basicFunc(text) {
	            text = this._getNewString(text, this._getRandomInt(text.length + 1));
	            return this._getNewString(text, this._getRandomInt(text.length + 1));
	        }
	    }]);

	    return Double;
	}(_index2.default);

/***/ },
/* 7 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Screen = function () {
	    function Screen() {
	        _classCallCheck(this, Screen);
	    }

	    _createClass(Screen, [{
	        key: 'setScreenValue',
	        value: function setScreenValue(callback) {
	            this.element.value = callback(this._getScreenValue());
	        }
	    }, {
	        key: '_getScreenValue',
	        value: function _getScreenValue() {
	            return this.element.value;
	        }
	    }], [{
	        key: 'editorScreen',
	        value: function editorScreen(element) {
	            var result = new Screen();
	            result.element = element;
	            return result;
	        }
	    }]);

	    return Screen;
	}();

	exports.default = Screen;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var assignInDefaults = __webpack_require__(9),
	    assignInWith = __webpack_require__(11),
	    attempt = __webpack_require__(34),
	    baseValues = __webpack_require__(36),
	    escapeStringChar = __webpack_require__(38),
	    isError = __webpack_require__(35),
	    isIterateeCall = __webpack_require__(17),
	    keys = __webpack_require__(39),
	    reInterpolate = __webpack_require__(43),
	    templateSettings = __webpack_require__(44),
	    toString = __webpack_require__(48);

	/** Used to match empty string literals in compiled template source. */
	var reEmptyStringLeading = /\b__p \+= '';/g,
	    reEmptyStringMiddle = /\b(__p \+=) '' \+/g,
	    reEmptyStringTrailing = /(__e\(.*?\)|\b__t\)) \+\n'';/g;

	/**
	 * Used to match
	 * [ES template delimiters](http://ecma-international.org/ecma-262/7.0/#sec-template-literal-lexical-components).
	 */
	var reEsTemplate = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g;

	/** Used to ensure capturing order of template delimiters. */
	var reNoMatch = /($^)/;

	/** Used to match unescaped characters in compiled string literals. */
	var reUnescapedString = /['\n\r\u2028\u2029\\]/g;

	/**
	 * Creates a compiled template function that can interpolate data properties
	 * in "interpolate" delimiters, HTML-escape interpolated data properties in
	 * "escape" delimiters, and execute JavaScript in "evaluate" delimiters. Data
	 * properties may be accessed as free variables in the template. If a setting
	 * object is given, it takes precedence over `_.templateSettings` values.
	 *
	 * **Note:** In the development build `_.template` utilizes
	 * [sourceURLs](http://www.html5rocks.com/en/tutorials/developertools/sourcemaps/#toc-sourceurl)
	 * for easier debugging.
	 *
	 * For more information on precompiling templates see
	 * [lodash's custom builds documentation](https://lodash.com/custom-builds).
	 *
	 * For more information on Chrome extension sandboxes see
	 * [Chrome's extensions documentation](https://developer.chrome.com/extensions/sandboxingEval).
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category String
	 * @param {string} [string=''] The template string.
	 * @param {Object} [options={}] The options object.
	 * @param {RegExp} [options.escape=_.templateSettings.escape]
	 *  The HTML "escape" delimiter.
	 * @param {RegExp} [options.evaluate=_.templateSettings.evaluate]
	 *  The "evaluate" delimiter.
	 * @param {Object} [options.imports=_.templateSettings.imports]
	 *  An object to import into the template as free variables.
	 * @param {RegExp} [options.interpolate=_.templateSettings.interpolate]
	 *  The "interpolate" delimiter.
	 * @param {string} [options.sourceURL='templateSources[n]']
	 *  The sourceURL of the compiled template.
	 * @param {string} [options.variable='obj']
	 *  The data object variable name.
	 * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
	 * @returns {Function} Returns the compiled template function.
	 * @example
	 *
	 * // Use the "interpolate" delimiter to create a compiled template.
	 * var compiled = _.template('hello <%= user %>!');
	 * compiled({ 'user': 'fred' });
	 * // => 'hello fred!'
	 *
	 * // Use the HTML "escape" delimiter to escape data property values.
	 * var compiled = _.template('<b><%- value %></b>');
	 * compiled({ 'value': '<script>' });
	 * // => '<b>&lt;script&gt;</b>'
	 *
	 * // Use the "evaluate" delimiter to execute JavaScript and generate HTML.
	 * var compiled = _.template('<% _.forEach(users, function(user) { %><li><%- user %></li><% }); %>');
	 * compiled({ 'users': ['fred', 'barney'] });
	 * // => '<li>fred</li><li>barney</li>'
	 *
	 * // Use the internal `print` function in "evaluate" delimiters.
	 * var compiled = _.template('<% print("hello " + user); %>!');
	 * compiled({ 'user': 'barney' });
	 * // => 'hello barney!'
	 *
	 * // Use the ES delimiter as an alternative to the default "interpolate" delimiter.
	 * var compiled = _.template('hello ${ user }!');
	 * compiled({ 'user': 'pebbles' });
	 * // => 'hello pebbles!'
	 *
	 * // Use backslashes to treat delimiters as plain text.
	 * var compiled = _.template('<%= "\\<%- value %\\>" %>');
	 * compiled({ 'value': 'ignored' });
	 * // => '<%- value %>'
	 *
	 * // Use the `imports` option to import `jQuery` as `jq`.
	 * var text = '<% jq.each(users, function(user) { %><li><%- user %></li><% }); %>';
	 * var compiled = _.template(text, { 'imports': { 'jq': jQuery } });
	 * compiled({ 'users': ['fred', 'barney'] });
	 * // => '<li>fred</li><li>barney</li>'
	 *
	 * // Use the `sourceURL` option to specify a custom sourceURL for the template.
	 * var compiled = _.template('hello <%= user %>!', { 'sourceURL': '/basic/greeting.jst' });
	 * compiled(data);
	 * // => Find the source of "greeting.jst" under the Sources tab or Resources panel of the web inspector.
	 *
	 * // Use the `variable` option to ensure a with-statement isn't used in the compiled template.
	 * var compiled = _.template('hi <%= data.user %>!', { 'variable': 'data' });
	 * compiled.source;
	 * // => function(data) {
	 * //   var __t, __p = '';
	 * //   __p += 'hi ' + ((__t = ( data.user )) == null ? '' : __t) + '!';
	 * //   return __p;
	 * // }
	 *
	 * // Use custom template delimiters.
	 * _.templateSettings.interpolate = /{{([\s\S]+?)}}/g;
	 * var compiled = _.template('hello {{ user }}!');
	 * compiled({ 'user': 'mustache' });
	 * // => 'hello mustache!'
	 *
	 * // Use the `source` property to inline compiled templates for meaningful
	 * // line numbers in error messages and stack traces.
	 * fs.writeFileSync(path.join(process.cwd(), 'jst.js'), '\
	 *   var JST = {\
	 *     "main": ' + _.template(mainText).source + '\
	 *   };\
	 * ');
	 */
	function template(string, options, guard) {
	  // Based on John Resig's `tmpl` implementation
	  // (http://ejohn.org/blog/javascript-micro-templating/)
	  // and Laura Doktorova's doT.js (https://github.com/olado/doT).
	  var settings = templateSettings.imports._.templateSettings || templateSettings;

	  if (guard && isIterateeCall(string, options, guard)) {
	    options = undefined;
	  }
	  string = toString(string);
	  options = assignInWith({}, options, settings, assignInDefaults);

	  var imports = assignInWith({}, options.imports, settings.imports, assignInDefaults),
	      importsKeys = keys(imports),
	      importsValues = baseValues(imports, importsKeys);

	  var isEscaping,
	      isEvaluating,
	      index = 0,
	      interpolate = options.interpolate || reNoMatch,
	      source = "__p += '";

	  // Compile the regexp to match each delimiter.
	  var reDelimiters = RegExp(
	    (options.escape || reNoMatch).source + '|' +
	    interpolate.source + '|' +
	    (interpolate === reInterpolate ? reEsTemplate : reNoMatch).source + '|' +
	    (options.evaluate || reNoMatch).source + '|$'
	  , 'g');

	  // Use a sourceURL for easier debugging.
	  var sourceURL = 'sourceURL' in options ? '//# sourceURL=' + options.sourceURL + '\n' : '';

	  string.replace(reDelimiters, function(match, escapeValue, interpolateValue, esTemplateValue, evaluateValue, offset) {
	    interpolateValue || (interpolateValue = esTemplateValue);

	    // Escape characters that can't be included in string literals.
	    source += string.slice(index, offset).replace(reUnescapedString, escapeStringChar);

	    // Replace delimiters with snippets.
	    if (escapeValue) {
	      isEscaping = true;
	      source += "' +\n__e(" + escapeValue + ") +\n'";
	    }
	    if (evaluateValue) {
	      isEvaluating = true;
	      source += "';\n" + evaluateValue + ";\n__p += '";
	    }
	    if (interpolateValue) {
	      source += "' +\n((__t = (" + interpolateValue + ")) == null ? '' : __t) +\n'";
	    }
	    index = offset + match.length;

	    // The JS engine embedded in Adobe products needs `match` returned in
	    // order to produce the correct `offset` value.
	    return match;
	  });

	  source += "';\n";

	  // If `variable` is not specified wrap a with-statement around the generated
	  // code to add the data object to the top of the scope chain.
	  var variable = options.variable;
	  if (!variable) {
	    source = 'with (obj) {\n' + source + '\n}\n';
	  }
	  // Cleanup code by stripping empty strings.
	  source = (isEvaluating ? source.replace(reEmptyStringLeading, '') : source)
	    .replace(reEmptyStringMiddle, '$1')
	    .replace(reEmptyStringTrailing, '$1;');

	  // Frame code as the function body.
	  source = 'function(' + (variable || 'obj') + ') {\n' +
	    (variable
	      ? ''
	      : 'obj || (obj = {});\n'
	    ) +
	    "var __t, __p = ''" +
	    (isEscaping
	       ? ', __e = _.escape'
	       : ''
	    ) +
	    (isEvaluating
	      ? ', __j = Array.prototype.join;\n' +
	        "function print() { __p += __j.call(arguments, '') }\n"
	      : ';\n'
	    ) +
	    source +
	    'return __p\n}';

	  var result = attempt(function() {
	    return Function(importsKeys, sourceURL + 'return ' + source)
	      .apply(undefined, importsValues);
	  });

	  // Provide the compiled function's source by its `toString` method or
	  // the `source` property as a convenience for inlining compiled templates.
	  result.source = source;
	  if (isError(result)) {
	    throw result;
	  }
	  return result;
	}

	module.exports = template;


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var eq = __webpack_require__(10);

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Used by `_.defaults` to customize its `_.assignIn` use.
	 *
	 * @private
	 * @param {*} objValue The destination value.
	 * @param {*} srcValue The source value.
	 * @param {string} key The key of the property to assign.
	 * @param {Object} object The parent object of `objValue`.
	 * @returns {*} Returns the value to assign.
	 */
	function assignInDefaults(objValue, srcValue, key, object) {
	  if (objValue === undefined ||
	      (eq(objValue, objectProto[key]) && !hasOwnProperty.call(object, key))) {
	    return srcValue;
	  }
	  return objValue;
	}

	module.exports = assignInDefaults;


/***/ },
/* 10 */
/***/ function(module, exports) {

	/**
	 * Performs a
	 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
	 * comparison between two values to determine if they are equivalent.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to compare.
	 * @param {*} other The other value to compare.
	 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
	 * @example
	 *
	 * var object = { 'a': 1 };
	 * var other = { 'a': 1 };
	 *
	 * _.eq(object, object);
	 * // => true
	 *
	 * _.eq(object, other);
	 * // => false
	 *
	 * _.eq('a', 'a');
	 * // => true
	 *
	 * _.eq('a', Object('a'));
	 * // => false
	 *
	 * _.eq(NaN, NaN);
	 * // => true
	 */
	function eq(value, other) {
	  return value === other || (value !== value && other !== other);
	}

	module.exports = eq;


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var copyObject = __webpack_require__(12),
	    createAssigner = __webpack_require__(14),
	    keysIn = __webpack_require__(23);

	/**
	 * This method is like `_.assignIn` except that it accepts `customizer`
	 * which is invoked to produce the assigned values. If `customizer` returns
	 * `undefined`, assignment is handled by the method instead. The `customizer`
	 * is invoked with five arguments: (objValue, srcValue, key, object, source).
	 *
	 * **Note:** This method mutates `object`.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @alias extendWith
	 * @category Object
	 * @param {Object} object The destination object.
	 * @param {...Object} sources The source objects.
	 * @param {Function} [customizer] The function to customize assigned values.
	 * @returns {Object} Returns `object`.
	 * @see _.assignWith
	 * @example
	 *
	 * function customizer(objValue, srcValue) {
	 *   return _.isUndefined(objValue) ? srcValue : objValue;
	 * }
	 *
	 * var defaults = _.partialRight(_.assignInWith, customizer);
	 *
	 * defaults({ 'a': 1 }, { 'b': 2 }, { 'a': 3 });
	 * // => { 'a': 1, 'b': 2 }
	 */
	var assignInWith = createAssigner(function(object, source, srcIndex, customizer) {
	  copyObject(source, keysIn(source), object, customizer);
	});

	module.exports = assignInWith;


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var assignValue = __webpack_require__(13);

	/**
	 * Copies properties of `source` to `object`.
	 *
	 * @private
	 * @param {Object} source The object to copy properties from.
	 * @param {Array} props The property identifiers to copy.
	 * @param {Object} [object={}] The object to copy properties to.
	 * @param {Function} [customizer] The function to customize copied values.
	 * @returns {Object} Returns `object`.
	 */
	function copyObject(source, props, object, customizer) {
	  object || (object = {});

	  var index = -1,
	      length = props.length;

	  while (++index < length) {
	    var key = props[index];

	    var newValue = customizer
	      ? customizer(object[key], source[key], key, object, source)
	      : undefined;

	    assignValue(object, key, newValue === undefined ? source[key] : newValue);
	  }
	  return object;
	}

	module.exports = copyObject;


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	var eq = __webpack_require__(10);

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Assigns `value` to `key` of `object` if the existing value is not equivalent
	 * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
	 * for equality comparisons.
	 *
	 * @private
	 * @param {Object} object The object to modify.
	 * @param {string} key The key of the property to assign.
	 * @param {*} value The value to assign.
	 */
	function assignValue(object, key, value) {
	  var objValue = object[key];
	  if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) ||
	      (value === undefined && !(key in object))) {
	    object[key] = value;
	  }
	}

	module.exports = assignValue;


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	var baseRest = __webpack_require__(15),
	    isIterateeCall = __webpack_require__(17);

	/**
	 * Creates a function like `_.assign`.
	 *
	 * @private
	 * @param {Function} assigner The function to assign values.
	 * @returns {Function} Returns the new assigner function.
	 */
	function createAssigner(assigner) {
	  return baseRest(function(object, sources) {
	    var index = -1,
	        length = sources.length,
	        customizer = length > 1 ? sources[length - 1] : undefined,
	        guard = length > 2 ? sources[2] : undefined;

	    customizer = (assigner.length > 3 && typeof customizer == 'function')
	      ? (length--, customizer)
	      : undefined;

	    if (guard && isIterateeCall(sources[0], sources[1], guard)) {
	      customizer = length < 3 ? undefined : customizer;
	      length = 1;
	    }
	    object = Object(object);
	    while (++index < length) {
	      var source = sources[index];
	      if (source) {
	        assigner(object, source, index, customizer);
	      }
	    }
	    return object;
	  });
	}

	module.exports = createAssigner;


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	var apply = __webpack_require__(16);

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeMax = Math.max;

	/**
	 * The base implementation of `_.rest` which doesn't validate or coerce arguments.
	 *
	 * @private
	 * @param {Function} func The function to apply a rest parameter to.
	 * @param {number} [start=func.length-1] The start position of the rest parameter.
	 * @returns {Function} Returns the new function.
	 */
	function baseRest(func, start) {
	  start = nativeMax(start === undefined ? (func.length - 1) : start, 0);
	  return function() {
	    var args = arguments,
	        index = -1,
	        length = nativeMax(args.length - start, 0),
	        array = Array(length);

	    while (++index < length) {
	      array[index] = args[start + index];
	    }
	    index = -1;
	    var otherArgs = Array(start + 1);
	    while (++index < start) {
	      otherArgs[index] = args[index];
	    }
	    otherArgs[start] = array;
	    return apply(func, this, otherArgs);
	  };
	}

	module.exports = baseRest;


/***/ },
/* 16 */
/***/ function(module, exports) {

	/**
	 * A faster alternative to `Function#apply`, this function invokes `func`
	 * with the `this` binding of `thisArg` and the arguments of `args`.
	 *
	 * @private
	 * @param {Function} func The function to invoke.
	 * @param {*} thisArg The `this` binding of `func`.
	 * @param {Array} args The arguments to invoke `func` with.
	 * @returns {*} Returns the result of `func`.
	 */
	function apply(func, thisArg, args) {
	  switch (args.length) {
	    case 0: return func.call(thisArg);
	    case 1: return func.call(thisArg, args[0]);
	    case 2: return func.call(thisArg, args[0], args[1]);
	    case 3: return func.call(thisArg, args[0], args[1], args[2]);
	  }
	  return func.apply(thisArg, args);
	}

	module.exports = apply;


/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	var eq = __webpack_require__(10),
	    isArrayLike = __webpack_require__(18),
	    isIndex = __webpack_require__(22),
	    isObject = __webpack_require__(20);

	/**
	 * Checks if the given arguments are from an iteratee call.
	 *
	 * @private
	 * @param {*} value The potential iteratee value argument.
	 * @param {*} index The potential iteratee index or key argument.
	 * @param {*} object The potential iteratee object argument.
	 * @returns {boolean} Returns `true` if the arguments are from an iteratee call,
	 *  else `false`.
	 */
	function isIterateeCall(value, index, object) {
	  if (!isObject(object)) {
	    return false;
	  }
	  var type = typeof index;
	  if (type == 'number'
	        ? (isArrayLike(object) && isIndex(index, object.length))
	        : (type == 'string' && index in object)
	      ) {
	    return eq(object[index], value);
	  }
	  return false;
	}

	module.exports = isIterateeCall;


/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	var isFunction = __webpack_require__(19),
	    isLength = __webpack_require__(21);

	/**
	 * Checks if `value` is array-like. A value is considered array-like if it's
	 * not a function and has a `value.length` that's an integer greater than or
	 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
	 * @example
	 *
	 * _.isArrayLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isArrayLike(document.body.children);
	 * // => true
	 *
	 * _.isArrayLike('abc');
	 * // => true
	 *
	 * _.isArrayLike(_.noop);
	 * // => false
	 */
	function isArrayLike(value) {
	  return value != null && isLength(value.length) && !isFunction(value);
	}

	module.exports = isArrayLike;


/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(20);

	/** `Object#toString` result references. */
	var funcTag = '[object Function]',
	    genTag = '[object GeneratorFunction]';

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;

	/**
	 * Checks if `value` is classified as a `Function` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
	 * @example
	 *
	 * _.isFunction(_);
	 * // => true
	 *
	 * _.isFunction(/abc/);
	 * // => false
	 */
	function isFunction(value) {
	  // The use of `Object#toString` avoids issues with the `typeof` operator
	  // in Safari 8 which returns 'object' for typed array and weak map constructors,
	  // and PhantomJS 1.9 which returns 'function' for `NodeList` instances.
	  var tag = isObject(value) ? objectToString.call(value) : '';
	  return tag == funcTag || tag == genTag;
	}

	module.exports = isFunction;


/***/ },
/* 20 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is the
	 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
	 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(_.noop);
	 * // => true
	 *
	 * _.isObject(null);
	 * // => false
	 */
	function isObject(value) {
	  var type = typeof value;
	  return !!value && (type == 'object' || type == 'function');
	}

	module.exports = isObject;


/***/ },
/* 21 */
/***/ function(module, exports) {

	/** Used as references for various `Number` constants. */
	var MAX_SAFE_INTEGER = 9007199254740991;

	/**
	 * Checks if `value` is a valid array-like length.
	 *
	 * **Note:** This method is loosely based on
	 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
	 * @example
	 *
	 * _.isLength(3);
	 * // => true
	 *
	 * _.isLength(Number.MIN_VALUE);
	 * // => false
	 *
	 * _.isLength(Infinity);
	 * // => false
	 *
	 * _.isLength('3');
	 * // => false
	 */
	function isLength(value) {
	  return typeof value == 'number' &&
	    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
	}

	module.exports = isLength;


/***/ },
/* 22 */
/***/ function(module, exports) {

	/** Used as references for various `Number` constants. */
	var MAX_SAFE_INTEGER = 9007199254740991;

	/** Used to detect unsigned integer values. */
	var reIsUint = /^(?:0|[1-9]\d*)$/;

	/**
	 * Checks if `value` is a valid array-like index.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
	 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
	 */
	function isIndex(value, length) {
	  length = length == null ? MAX_SAFE_INTEGER : length;
	  return !!length &&
	    (typeof value == 'number' || reIsUint.test(value)) &&
	    (value > -1 && value % 1 == 0 && value < length);
	}

	module.exports = isIndex;


/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	var arrayLikeKeys = __webpack_require__(24),
	    baseKeysIn = __webpack_require__(31),
	    isArrayLike = __webpack_require__(18);

	/**
	 * Creates an array of the own and inherited enumerable property names of `object`.
	 *
	 * **Note:** Non-object values are coerced to objects.
	 *
	 * @static
	 * @memberOf _
	 * @since 3.0.0
	 * @category Object
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 *   this.b = 2;
	 * }
	 *
	 * Foo.prototype.c = 3;
	 *
	 * _.keysIn(new Foo);
	 * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
	 */
	function keysIn(object) {
	  return isArrayLike(object) ? arrayLikeKeys(object, true) : baseKeysIn(object);
	}

	module.exports = keysIn;


/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	var baseTimes = __webpack_require__(25),
	    isArguments = __webpack_require__(26),
	    isArray = __webpack_require__(29),
	    isIndex = __webpack_require__(22),
	    isString = __webpack_require__(30);

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Creates an array of the enumerable property names of the array-like `value`.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @param {boolean} inherited Specify returning inherited property names.
	 * @returns {Array} Returns the array of property names.
	 */
	function arrayLikeKeys(value, inherited) {
	  var result = (isArray(value) || isString(value) || isArguments(value))
	    ? baseTimes(value.length, String)
	    : [];

	  var length = result.length,
	      skipIndexes = !!length;

	  for (var key in value) {
	    if ((inherited || hasOwnProperty.call(value, key)) &&
	        !(skipIndexes && (key == 'length' || isIndex(key, length)))) {
	      result.push(key);
	    }
	  }
	  return result;
	}

	module.exports = arrayLikeKeys;


/***/ },
/* 25 */
/***/ function(module, exports) {

	/**
	 * The base implementation of `_.times` without support for iteratee shorthands
	 * or max array length checks.
	 *
	 * @private
	 * @param {number} n The number of times to invoke `iteratee`.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array} Returns the array of results.
	 */
	function baseTimes(n, iteratee) {
	  var index = -1,
	      result = Array(n);

	  while (++index < n) {
	    result[index] = iteratee(index);
	  }
	  return result;
	}

	module.exports = baseTimes;


/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	var isArrayLikeObject = __webpack_require__(27);

	/** `Object#toString` result references. */
	var argsTag = '[object Arguments]';

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;

	/** Built-in value references. */
	var propertyIsEnumerable = objectProto.propertyIsEnumerable;

	/**
	 * Checks if `value` is likely an `arguments` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
	 *  else `false`.
	 * @example
	 *
	 * _.isArguments(function() { return arguments; }());
	 * // => true
	 *
	 * _.isArguments([1, 2, 3]);
	 * // => false
	 */
	function isArguments(value) {
	  // Safari 8.1 incorrectly makes `arguments.callee` enumerable in strict mode.
	  return isArrayLikeObject(value) && hasOwnProperty.call(value, 'callee') &&
	    (!propertyIsEnumerable.call(value, 'callee') || objectToString.call(value) == argsTag);
	}

	module.exports = isArguments;


/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	var isArrayLike = __webpack_require__(18),
	    isObjectLike = __webpack_require__(28);

	/**
	 * This method is like `_.isArrayLike` except that it also checks if `value`
	 * is an object.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an array-like object,
	 *  else `false`.
	 * @example
	 *
	 * _.isArrayLikeObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isArrayLikeObject(document.body.children);
	 * // => true
	 *
	 * _.isArrayLikeObject('abc');
	 * // => false
	 *
	 * _.isArrayLikeObject(_.noop);
	 * // => false
	 */
	function isArrayLikeObject(value) {
	  return isObjectLike(value) && isArrayLike(value);
	}

	module.exports = isArrayLikeObject;


/***/ },
/* 28 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is object-like. A value is object-like if it's not `null`
	 * and has a `typeof` result of "object".
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 * @example
	 *
	 * _.isObjectLike({});
	 * // => true
	 *
	 * _.isObjectLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isObjectLike(_.noop);
	 * // => false
	 *
	 * _.isObjectLike(null);
	 * // => false
	 */
	function isObjectLike(value) {
	  return !!value && typeof value == 'object';
	}

	module.exports = isObjectLike;


/***/ },
/* 29 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is classified as an `Array` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
	 * @example
	 *
	 * _.isArray([1, 2, 3]);
	 * // => true
	 *
	 * _.isArray(document.body.children);
	 * // => false
	 *
	 * _.isArray('abc');
	 * // => false
	 *
	 * _.isArray(_.noop);
	 * // => false
	 */
	var isArray = Array.isArray;

	module.exports = isArray;


/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	var isArray = __webpack_require__(29),
	    isObjectLike = __webpack_require__(28);

	/** `Object#toString` result references. */
	var stringTag = '[object String]';

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;

	/**
	 * Checks if `value` is classified as a `String` primitive or object.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a string, else `false`.
	 * @example
	 *
	 * _.isString('abc');
	 * // => true
	 *
	 * _.isString(1);
	 * // => false
	 */
	function isString(value) {
	  return typeof value == 'string' ||
	    (!isArray(value) && isObjectLike(value) && objectToString.call(value) == stringTag);
	}

	module.exports = isString;


/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(20),
	    isPrototype = __webpack_require__(32),
	    nativeKeysIn = __webpack_require__(33);

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * The base implementation of `_.keysIn` which doesn't treat sparse arrays as dense.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 */
	function baseKeysIn(object) {
	  if (!isObject(object)) {
	    return nativeKeysIn(object);
	  }
	  var isProto = isPrototype(object),
	      result = [];

	  for (var key in object) {
	    if (!(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
	      result.push(key);
	    }
	  }
	  return result;
	}

	module.exports = baseKeysIn;


/***/ },
/* 32 */
/***/ function(module, exports) {

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/**
	 * Checks if `value` is likely a prototype object.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
	 */
	function isPrototype(value) {
	  var Ctor = value && value.constructor,
	      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;

	  return value === proto;
	}

	module.exports = isPrototype;


/***/ },
/* 33 */
/***/ function(module, exports) {

	/**
	 * This function is like
	 * [`Object.keys`](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
	 * except that it includes inherited enumerable properties.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 */
	function nativeKeysIn(object) {
	  var result = [];
	  if (object != null) {
	    for (var key in Object(object)) {
	      result.push(key);
	    }
	  }
	  return result;
	}

	module.exports = nativeKeysIn;


/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	var apply = __webpack_require__(16),
	    baseRest = __webpack_require__(15),
	    isError = __webpack_require__(35);

	/**
	 * Attempts to invoke `func`, returning either the result or the caught error
	 * object. Any additional arguments are provided to `func` when it's invoked.
	 *
	 * @static
	 * @memberOf _
	 * @since 3.0.0
	 * @category Util
	 * @param {Function} func The function to attempt.
	 * @param {...*} [args] The arguments to invoke `func` with.
	 * @returns {*} Returns the `func` result or error object.
	 * @example
	 *
	 * // Avoid throwing errors for invalid selectors.
	 * var elements = _.attempt(function(selector) {
	 *   return document.querySelectorAll(selector);
	 * }, '>_>');
	 *
	 * if (_.isError(elements)) {
	 *   elements = [];
	 * }
	 */
	var attempt = baseRest(function(func, args) {
	  try {
	    return apply(func, undefined, args);
	  } catch (e) {
	    return isError(e) ? e : new Error(e);
	  }
	});

	module.exports = attempt;


/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	var isObjectLike = __webpack_require__(28);

	/** `Object#toString` result references. */
	var errorTag = '[object Error]';

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;

	/**
	 * Checks if `value` is an `Error`, `EvalError`, `RangeError`, `ReferenceError`,
	 * `SyntaxError`, `TypeError`, or `URIError` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 3.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an error object, else `false`.
	 * @example
	 *
	 * _.isError(new Error);
	 * // => true
	 *
	 * _.isError(Error);
	 * // => false
	 */
	function isError(value) {
	  if (!isObjectLike(value)) {
	    return false;
	  }
	  return (objectToString.call(value) == errorTag) ||
	    (typeof value.message == 'string' && typeof value.name == 'string');
	}

	module.exports = isError;


/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	var arrayMap = __webpack_require__(37);

	/**
	 * The base implementation of `_.values` and `_.valuesIn` which creates an
	 * array of `object` property values corresponding to the property names
	 * of `props`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {Array} props The property names to get values for.
	 * @returns {Object} Returns the array of property values.
	 */
	function baseValues(object, props) {
	  return arrayMap(props, function(key) {
	    return object[key];
	  });
	}

	module.exports = baseValues;


/***/ },
/* 37 */
/***/ function(module, exports) {

	/**
	 * A specialized version of `_.map` for arrays without support for iteratee
	 * shorthands.
	 *
	 * @private
	 * @param {Array} [array] The array to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array} Returns the new mapped array.
	 */
	function arrayMap(array, iteratee) {
	  var index = -1,
	      length = array ? array.length : 0,
	      result = Array(length);

	  while (++index < length) {
	    result[index] = iteratee(array[index], index, array);
	  }
	  return result;
	}

	module.exports = arrayMap;


/***/ },
/* 38 */
/***/ function(module, exports) {

	/** Used to escape characters for inclusion in compiled string literals. */
	var stringEscapes = {
	  '\\': '\\',
	  "'": "'",
	  '\n': 'n',
	  '\r': 'r',
	  '\u2028': 'u2028',
	  '\u2029': 'u2029'
	};

	/**
	 * Used by `_.template` to escape characters for inclusion in compiled string literals.
	 *
	 * @private
	 * @param {string} chr The matched character to escape.
	 * @returns {string} Returns the escaped character.
	 */
	function escapeStringChar(chr) {
	  return '\\' + stringEscapes[chr];
	}

	module.exports = escapeStringChar;


/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	var arrayLikeKeys = __webpack_require__(24),
	    baseKeys = __webpack_require__(40),
	    isArrayLike = __webpack_require__(18);

	/**
	 * Creates an array of the own enumerable property names of `object`.
	 *
	 * **Note:** Non-object values are coerced to objects. See the
	 * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
	 * for more details.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 *   this.b = 2;
	 * }
	 *
	 * Foo.prototype.c = 3;
	 *
	 * _.keys(new Foo);
	 * // => ['a', 'b'] (iteration order is not guaranteed)
	 *
	 * _.keys('hi');
	 * // => ['0', '1']
	 */
	function keys(object) {
	  return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
	}

	module.exports = keys;


/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	var isPrototype = __webpack_require__(32),
	    nativeKeys = __webpack_require__(41);

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 */
	function baseKeys(object) {
	  if (!isPrototype(object)) {
	    return nativeKeys(object);
	  }
	  var result = [];
	  for (var key in Object(object)) {
	    if (hasOwnProperty.call(object, key) && key != 'constructor') {
	      result.push(key);
	    }
	  }
	  return result;
	}

	module.exports = baseKeys;


/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	var overArg = __webpack_require__(42);

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeKeys = overArg(Object.keys, Object);

	module.exports = nativeKeys;


/***/ },
/* 42 */
/***/ function(module, exports) {

	/**
	 * Creates a unary function that invokes `func` with its argument transformed.
	 *
	 * @private
	 * @param {Function} func The function to wrap.
	 * @param {Function} transform The argument transform.
	 * @returns {Function} Returns the new function.
	 */
	function overArg(func, transform) {
	  return function(arg) {
	    return func(transform(arg));
	  };
	}

	module.exports = overArg;


/***/ },
/* 43 */
/***/ function(module, exports) {

	/** Used to match template delimiters. */
	var reInterpolate = /<%=([\s\S]+?)%>/g;

	module.exports = reInterpolate;


/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	var escape = __webpack_require__(45),
	    reEscape = __webpack_require__(54),
	    reEvaluate = __webpack_require__(55),
	    reInterpolate = __webpack_require__(43);

	/**
	 * By default, the template delimiters used by lodash are like those in
	 * embedded Ruby (ERB). Change the following template settings to use
	 * alternative delimiters.
	 *
	 * @static
	 * @memberOf _
	 * @type {Object}
	 */
	var templateSettings = {

	  /**
	   * Used to detect `data` property values to be HTML-escaped.
	   *
	   * @memberOf _.templateSettings
	   * @type {RegExp}
	   */
	  'escape': reEscape,

	  /**
	   * Used to detect code to be evaluated.
	   *
	   * @memberOf _.templateSettings
	   * @type {RegExp}
	   */
	  'evaluate': reEvaluate,

	  /**
	   * Used to detect `data` property values to inject.
	   *
	   * @memberOf _.templateSettings
	   * @type {RegExp}
	   */
	  'interpolate': reInterpolate,

	  /**
	   * Used to reference the data object in the template text.
	   *
	   * @memberOf _.templateSettings
	   * @type {string}
	   */
	  'variable': '',

	  /**
	   * Used to import variables into the compiled template.
	   *
	   * @memberOf _.templateSettings
	   * @type {Object}
	   */
	  'imports': {

	    /**
	     * A reference to the `lodash` function.
	     *
	     * @memberOf _.templateSettings.imports
	     * @type {Function}
	     */
	    '_': { 'escape': escape }
	  }
	};

	module.exports = templateSettings;


/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	var escapeHtmlChar = __webpack_require__(46),
	    toString = __webpack_require__(48);

	/** Used to match HTML entities and HTML characters. */
	var reUnescapedHtml = /[&<>"'`]/g,
	    reHasUnescapedHtml = RegExp(reUnescapedHtml.source);

	/**
	 * Converts the characters "&", "<", ">", '"', "'", and "\`" in `string` to
	 * their corresponding HTML entities.
	 *
	 * **Note:** No other characters are escaped. To escape additional
	 * characters use a third-party library like [_he_](https://mths.be/he).
	 *
	 * Though the ">" character is escaped for symmetry, characters like
	 * ">" and "/" don't need escaping in HTML and have no special meaning
	 * unless they're part of a tag or unquoted attribute value. See
	 * [Mathias Bynens's article](https://mathiasbynens.be/notes/ambiguous-ampersands)
	 * (under "semi-related fun fact") for more details.
	 *
	 * Backticks are escaped because in IE < 9, they can break out of
	 * attribute values or HTML comments. See [#59](https://html5sec.org/#59),
	 * [#102](https://html5sec.org/#102), [#108](https://html5sec.org/#108), and
	 * [#133](https://html5sec.org/#133) of the
	 * [HTML5 Security Cheatsheet](https://html5sec.org/) for more details.
	 *
	 * When working with HTML you should always
	 * [quote attribute values](http://wonko.com/post/html-escaping) to reduce
	 * XSS vectors.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category String
	 * @param {string} [string=''] The string to escape.
	 * @returns {string} Returns the escaped string.
	 * @example
	 *
	 * _.escape('fred, barney, & pebbles');
	 * // => 'fred, barney, &amp; pebbles'
	 */
	function escape(string) {
	  string = toString(string);
	  return (string && reHasUnescapedHtml.test(string))
	    ? string.replace(reUnescapedHtml, escapeHtmlChar)
	    : string;
	}

	module.exports = escape;


/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	var basePropertyOf = __webpack_require__(47);

	/** Used to map characters to HTML entities. */
	var htmlEscapes = {
	  '&': '&amp;',
	  '<': '&lt;',
	  '>': '&gt;',
	  '"': '&quot;',
	  "'": '&#39;',
	  '`': '&#96;'
	};

	/**
	 * Used by `_.escape` to convert characters to HTML entities.
	 *
	 * @private
	 * @param {string} chr The matched character to escape.
	 * @returns {string} Returns the escaped character.
	 */
	var escapeHtmlChar = basePropertyOf(htmlEscapes);

	module.exports = escapeHtmlChar;


/***/ },
/* 47 */
/***/ function(module, exports) {

	/**
	 * The base implementation of `_.propertyOf` without support for deep paths.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Function} Returns the new accessor function.
	 */
	function basePropertyOf(object) {
	  return function(key) {
	    return object == null ? undefined : object[key];
	  };
	}

	module.exports = basePropertyOf;


/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	var baseToString = __webpack_require__(49);

	/**
	 * Converts `value` to a string. An empty string is returned for `null`
	 * and `undefined` values. The sign of `-0` is preserved.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to process.
	 * @returns {string} Returns the string.
	 * @example
	 *
	 * _.toString(null);
	 * // => ''
	 *
	 * _.toString(-0);
	 * // => '-0'
	 *
	 * _.toString([1, 2, 3]);
	 * // => '1,2,3'
	 */
	function toString(value) {
	  return value == null ? '' : baseToString(value);
	}

	module.exports = toString;


/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	var Symbol = __webpack_require__(50),
	    isSymbol = __webpack_require__(53);

	/** Used as references for various `Number` constants. */
	var INFINITY = 1 / 0;

	/** Used to convert symbols to primitives and strings. */
	var symbolProto = Symbol ? Symbol.prototype : undefined,
	    symbolToString = symbolProto ? symbolProto.toString : undefined;

	/**
	 * The base implementation of `_.toString` which doesn't convert nullish
	 * values to empty strings.
	 *
	 * @private
	 * @param {*} value The value to process.
	 * @returns {string} Returns the string.
	 */
	function baseToString(value) {
	  // Exit early for strings to avoid a performance hit in some environments.
	  if (typeof value == 'string') {
	    return value;
	  }
	  if (isSymbol(value)) {
	    return symbolToString ? symbolToString.call(value) : '';
	  }
	  var result = (value + '');
	  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
	}

	module.exports = baseToString;


/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	var root = __webpack_require__(51);

	/** Built-in value references. */
	var Symbol = root.Symbol;

	module.exports = Symbol;


/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	var freeGlobal = __webpack_require__(52);

	/** Detect free variable `self`. */
	var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

	/** Used as a reference to the global object. */
	var root = freeGlobal || freeSelf || Function('return this')();

	module.exports = root;


/***/ },
/* 52 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {/** Detect free variable `global` from Node.js. */
	var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

	module.exports = freeGlobal;

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	var isObjectLike = __webpack_require__(28);

	/** `Object#toString` result references. */
	var symbolTag = '[object Symbol]';

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;

	/**
	 * Checks if `value` is classified as a `Symbol` primitive or object.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
	 * @example
	 *
	 * _.isSymbol(Symbol.iterator);
	 * // => true
	 *
	 * _.isSymbol('abc');
	 * // => false
	 */
	function isSymbol(value) {
	  return typeof value == 'symbol' ||
	    (isObjectLike(value) && objectToString.call(value) == symbolTag);
	}

	module.exports = isSymbol;


/***/ },
/* 54 */
/***/ function(module, exports) {

	/** Used to match template delimiters. */
	var reEscape = /<%-([\s\S]+?)%>/g;

	module.exports = reEscape;


/***/ },
/* 55 */
/***/ function(module, exports) {

	/** Used to match template delimiters. */
	var reEvaluate = /<%([\s\S]+?)%>/g;

	module.exports = reEvaluate;


/***/ },
/* 56 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Content = function Content() {
	    _classCallCheck(this, Content);

	    if (Content.instance === object) {
	        return Content.instance;
	    }
	    Content.instance = this;
	};

	exports.default = Content;

/***/ }
/******/ ]);