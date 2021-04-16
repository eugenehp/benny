"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.save = void 0;
const getSummary_1 = require("./internal/getSummary");
const prepareFileContent_1 = require("./internal/prepareFileContent");
const defaultOptions = {
    file: (summary) => summary.date.toISOString(),
    folder: 'benchmark/results',
    version: null,
    details: false,
    format: 'json',
};
const save = (options = {}, callback) => __awaiter(void 0, void 0, void 0, function* () {
    return (suiteObj) => {
        const opt = Object.assign(Object.assign({}, defaultOptions), options);
        suiteObj.on('complete', (event) => {
            const summary = getSummary_1.default(event);
            const fileName = typeof opt.file === 'function' ? opt.file(summary) : opt.file;
            const fileContent = prepareFileContent_1.default(summary, opt);
            if (callback) {
                callback(fileContent, opt);
            }
        });
        return suiteObj;
    };
});
exports.save = save;
exports.default = save;
