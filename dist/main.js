/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const TYPE_RE = /^\[object\s(\w+)\]$/;
function getType(value) {
    const raw = Object.prototype.toString.call(value);
    const matches = TYPE_RE.exec(raw);
    if (matches === null || matches.length !== 2) {
        throw new Error(`Type could not be found for "${raw}"`);
    }
    return matches[1];
}
exports.getType = getType;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const type_1 = __webpack_require__(0);
var NodeType;
(function (NodeType) {
    NodeType[NodeType["Array"] = 0] = "Array";
    NodeType[NodeType["Boolean"] = 1] = "Boolean";
    NodeType[NodeType["Number"] = 2] = "Number";
    NodeType[NodeType["Object"] = 3] = "Object";
    NodeType[NodeType["String"] = 4] = "String";
})(NodeType = exports.NodeType || (exports.NodeType = {}));
function isPrimitive(value) {
    return (value === NodeType.Boolean ||
        value === NodeType.Number ||
        value === NodeType.String);
}
exports.isPrimitive = isPrimitive;
function getNodeType(value) {
    const type = type_1.getType(value);
    let nodeType;
    switch (type) {
        case 'Array':
            nodeType = NodeType.Array;
            break;
        case 'Boolean':
            nodeType = NodeType.Boolean;
            break;
        case 'Number':
            nodeType = NodeType.Number;
            break;
        case 'Object':
            nodeType = NodeType.Object;
            break;
        case 'String':
            nodeType = NodeType.String;
            break;
        default:
            throw new Error(`Unsupported type "${type}"`);
    }
    return nodeType;
}
exports.getNodeType = getNodeType;
function create(name, type) {
    return {
        name,
        type,
        children: []
    };
}
exports.create = create;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const type_1 = __webpack_require__(0);
function isEqualArray(a, b) {
    const length = a.length;
    if (length !== b.length) {
        return false;
    }
    const aClone = a.slice(0);
    const bClone = b.slice(0);
    aClone.sort();
    bClone.sort();
    for (let i = 0; i < length; i += 1) {
        if (!isEqual(aClone[i], bClone[i])) {
            return false;
        }
    }
    return true;
}
exports.isEqualArray = isEqualArray;
function isEqualObject(a, b) {
    const aKeys = Object.keys(a);
    const bKeys = Object.keys(b);
    if (aKeys.length !== bKeys.length) {
        return false;
    }
    for (const key of aKeys) {
        if (!isEqual(a[key], b[key])) {
            return false;
        }
    }
    return true;
}
exports.isEqualObject = isEqualObject;
function isEqual(a, b) {
    if (a === b) {
        return true;
    }
    const aType = type_1.getType(a);
    const bType = type_1.getType(b);
    if (aType !== bType) {
        return false;
    }
    if (aType === 'Date') {
        return a.getTime() === b.getTime();
    }
    else if (aType === 'Array') {
        return isEqualArray(a, b);
    }
    else if (aType === 'Object') {
        return isEqualObject(a, b);
    }
    return false;
}
exports.isEqual = isEqual;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(4);
module.exports = __webpack_require__(6);


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__main_scss__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__main_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__main_scss__);



/***/ }),
/* 5 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const json2ts_1 = __webpack_require__(7);
const trigger = window.document.querySelector('.js-trigger');
const input = window.document.querySelector('.js-input');
const output = window.document.querySelector('.js-output');
trigger.addEventListener('click', () => {
    try {
        output.innerText = json2ts_1.json2ts(input.value, 'root');
    }
    catch (e) {
        output.innerText = e.toString();
    }
});


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const compile_1 = __webpack_require__(8);
const structure_1 = __webpack_require__(10);
const parse_1 = __webpack_require__(16);
function json2ts(json, rootName) {
    const result = parse_1.parse(json, rootName);
    const structures = structure_1.structure(result);
    return compile_1.compile(structures.structures);
}
exports.json2ts = json2ts;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const buffer_1 = __webpack_require__(9);
const type_1 = __webpack_require__(0);
function arrayType(types) {
    const buffer = buffer_1.buffer();
    if (types.length > 1) {
        buffer.append('(');
    }
    types.forEach((type, index) => {
        if (index > 0) {
            buffer.append('|');
        }
        if (type_1.getType(type) === 'Array') {
            buffer.append(arrayType(type));
        }
        else {
            buffer.append(type);
        }
    });
    if (types.length > 1) {
        buffer.append(')');
    }
    buffer.append('[]');
    return buffer.flush();
}
exports.arrayType = arrayType;
function compile(structures) {
    const buffer = buffer_1.buffer();
    Object.keys(structures).forEach((id) => {
        const structure = structures[id];
        buffer.newLine();
        buffer.append('interface ');
        buffer.append(structure.name);
        buffer.append(' {');
        structure.properties.forEach((property) => {
            buffer.newLine();
            buffer.tab();
            buffer.append(property.name);
            if (property.optional) {
                buffer.append('?');
            }
            buffer.append(': ');
            if (property.isArray) {
                buffer.append(arrayType(property.type));
            }
            else {
                buffer.append(property.type.join(''));
            }
            buffer.append(';');
        });
        buffer.newLine();
        buffer.append('}');
        buffer.newLine();
    });
    buffer.newLine();
    return buffer.flush();
}
exports.compile = compile;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const NEW_LINE_CHAR = "\n";
const TAB_CHAR = "\t";
function buffer() {
    let text = [];
    return {
        newLine() {
            text.push(NEW_LINE_CHAR);
        },
        tab() {
            text.push(TAB_CHAR);
        },
        append(str) {
            text.push(str);
        },
        flush() {
            const output = text.join('');
            text = [];
            return output;
        }
    };
}
exports.buffer = buffer;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const node_1 = __webpack_require__(1);
const array_1 = __webpack_require__(11);
const equal_1 = __webpack_require__(2);
const ucfirst_1 = __webpack_require__(12);
const uuid_1 = __webpack_require__(13);
const uuid = uuid_1.generator();
function getType(type) {
    if (type === node_1.NodeType.String) {
        return 'string';
    }
    else if (type === node_1.NodeType.Number) {
        return 'number';
    }
    else if (type === node_1.NodeType.Boolean) {
        return 'boolean';
    }
    throw new Error(`Unsupported type ${type}`);
}
exports.getType = getType;
function mergeProperties(a, b) {
    const properties = a.properties.map((prop) => {
        return {
            name: prop.name,
            type: prop.type,
            isArray: prop.isArray,
            optional: true
        };
    });
    b.properties.forEach((prop) => {
        const existing = properties.find((p) => {
            return p.name === prop.name;
        });
        if (existing === undefined) {
            properties.push({
                name: prop.name,
                type: prop.type,
                isArray: prop.isArray,
                optional: true
            });
        }
        else if (!equal_1.isEqualArray(existing.type, prop.type)) {
            prop.type = array_1.merge(existing.type, prop.type);
        }
        else {
            existing.optional = false;
        }
    });
    return {
        id: a.id,
        name: a.name,
        properties
    };
}
exports.mergeProperties = mergeProperties;
function mergeStructures(add, collection) {
    const result = {};
    const keys = Object.keys(collection);
    if (keys.length === 0) {
        return {
            [add.id]: add
        };
    }
    keys.forEach((id) => {
        const existing = collection[id];
        if (existing.name === add.name) {
            result[id] = mergeProperties(existing, add);
        }
        else {
            result[id] = existing;
        }
    });
    return result;
}
exports.mergeStructures = mergeStructures;
function primitiveProperty(node) {
    return {
        property: {
            name: node.name,
            type: [
                getType(node.type)
            ],
            isArray: false,
            optional: false
        },
        structures: {}
    };
}
exports.primitiveProperty = primitiveProperty;
function objectProperty(node) {
    const result = structure(node);
    const struct = result.structures[result.id];
    return {
        id: struct.id,
        property: {
            name: node.name,
            type: [
                struct.name
            ],
            isArray: false,
            optional: false
        },
        structures: result.structures
    };
}
exports.objectProperty = objectProperty;
function arrayProperty(node) {
    let type = [];
    let structures = {};
    node.children.forEach((child) => {
        const result = property(child);
        if (result.id !== undefined) {
            structures = mergeStructures(result.structures[result.id], structures);
        }
        else {
            structures = Object.assign({}, structures, result.structures);
        }
        if (result.property.isArray) {
            type = array_1.merge(type, [result.property.type]);
        }
        else {
            type = array_1.merge(type, result.property.type);
        }
    });
    return {
        property: {
            name: node.name,
            type,
            isArray: true,
            optional: false
        },
        structures
    };
}
exports.arrayProperty = arrayProperty;
function property(node) {
    if (node_1.isPrimitive(node.type)) {
        return primitiveProperty(node);
    }
    else if (node.type === node_1.NodeType.Object) {
        return objectProperty(node);
    }
    else if (node.type === node_1.NodeType.Array) {
        return arrayProperty(node);
    }
}
exports.property = property;
function structure(node) {
    if (node.type !== node_1.NodeType.Object) {
        throw new Error(`Unexpected node type "${node.type}"`);
    }
    let structures = {};
    const struct = {
        id: uuid(),
        name: ucfirst_1.ucfirst(node.name),
        properties: []
    };
    structures[struct.id] = struct;
    node.children.forEach((child) => {
        const result = property(child);
        struct.properties.push(result.property);
        structures = Object.assign({}, structures, result.structures);
    });
    return {
        id: struct.id,
        structures
    };
}
exports.structure = structure;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function merge(a, b) {
    const c = a.slice(0);
    b.forEach((element) => {
        if (c.indexOf(element) === -1) {
            c.push(element);
        }
    });
    return c;
}
exports.merge = merge;


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const CHAR_RE = /^(\w)(\w*)$/;
function ucfirst(str) {
    const matches = CHAR_RE.exec(str);
    if (matches === null || matches.length !== 3) {
        return str;
    }
    return `${matches[1].toUpperCase()}${matches[2]}`;
}
exports.ucfirst = ucfirst;


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const random_1 = __webpack_require__(14);
const repeat_1 = __webpack_require__(15);
const PARTS = [
    8,
    4,
    4,
    4,
    12
];
const CHAR = '.';
const GLUE = '-';
function placeholder(parts = PARTS, char = CHAR, glue = GLUE) {
    return parts.map((count) => {
        return repeat_1.repeat(char, count);
    }).join(glue);
}
exports.placeholder = placeholder;
function generate(blueprint, replace) {
    return blueprint.split('').map((c) => {
        if (c === replace) {
            return random_1.random(0, 15).toString(16);
        }
        return c;
    }).join('');
}
exports.generate = generate;
function generator(parts = PARTS, char = CHAR, glue = GLUE) {
    const blueprint = placeholder(parts, char, glue);
    const store = {};
    return () => {
        let uuid = generate(blueprint, char);
        while (store[uuid] !== undefined) {
            uuid = generate(blueprint, char);
        }
        store[uuid] = true;
        return uuid;
    };
}
exports.generator = generator;


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function random(min = 0, max = 1) {
    if (max < min) {
        throw new Error(`Maximum (${max}) must be larger then minimum (${min}) value`);
    }
    const i = Math.random();
    const diff = max - min;
    return min + Math.round(i * diff);
}
exports.random = random;


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function repeat(input, count) {
    const int = Math.floor(count);
    if (count <= 0) {
        throw new Error(`Count must be a positive number, "${count}" given.`);
    }
    return new Array(int + 1).join(input);
}
exports.repeat = repeat;


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const ast_1 = __webpack_require__(17);
function parse(json, rootName) {
    const data = JSON.parse(json);
    return ast_1.ast(data, rootName);
}
exports.parse = parse;


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const node_1 = __webpack_require__(1);
const equal_1 = __webpack_require__(2);
function isAlreadyChild(newChild, children) {
    return children.find((existingChild) => {
        return equal_1.isEqual(newChild, existingChild);
    }) !== undefined;
}
function leaf(name, data) {
    const type = node_1.getNodeType(data);
    const node = node_1.create(name, type);
    if (type === node_1.NodeType.Object) {
        Object.keys(data).forEach((key) => {
            node.children.push(leaf(key, data[key]));
        });
    }
    else if (type === node_1.NodeType.Array) {
        data.forEach((child) => {
            const childNode = leaf(name, child);
            if (!isAlreadyChild(childNode, node.children)) {
                node.children.push(childNode);
            }
        });
    }
    return node;
}
function ast(data, rootName) {
    let root;
    const rootType = node_1.getNodeType(data);
    if (rootType === node_1.NodeType.Object) {
        root = leaf(rootName, data);
    }
    else {
        root = node_1.create(rootName, node_1.NodeType.Object);
        root.children.push(leaf('', data));
    }
    return root;
}
exports.ast = ast;


/***/ })
/******/ ]);
//# sourceMappingURL=main.js.map