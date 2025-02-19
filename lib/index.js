"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.suite = exports.save = exports.cycle = exports.complete = exports.add = void 0;
const add_1 = require("./add");
exports.add = add_1.default;
const complete_1 = require("./complete");
exports.complete = complete_1.default;
const cycle_1 = require("./cycle");
exports.cycle = cycle_1.default;
const save_1 = require("./save");
exports.save = save_1.default;
const suite_1 = require("./suite");
exports.suite = suite_1.default;
exports.default = {
    add: add_1.default,
    complete: complete_1.default,
    cycle: cycle_1.default,
    save: save_1.default,
    suite: suite_1.default,
};
