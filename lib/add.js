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
exports.add = void 0;
const getType_1 = require("@arrows/dispatch/getType");
const types_1 = require("@arrows/dispatch/types");
const prepareCaseFn = (test) => __awaiter(void 0, void 0, void 0, function* () {
    const returnType = getType_1.default(test());
    if (returnType === types_1.default.Function && getType_1.default(test()()) === types_1.default.Promise) {
        return {
            rawTest: (deferred) => test()().then(() => deferred.resolve()),
            defer: true,
        };
    }
    if (returnType === types_1.default.Function) {
        return {
            rawTest: test(),
            defer: false,
        };
    }
    if (returnType === types_1.default.Promise) {
        const promiseContent = yield test();
        if (getType_1.default(promiseContent) === types_1.default.Function) {
            const nestedReturnType = promiseContent();
            if (getType_1.default(nestedReturnType) === types_1.default.Promise) {
                return {
                    rawTest: (deferred) => promiseContent().then(() => deferred.resolve()),
                    defer: true,
                };
            }
            else {
                return {
                    rawTest: promiseContent,
                    defer: false,
                };
            }
        }
        return {
            rawTest: (deferred) => test().then(() => deferred.resolve()),
            defer: true,
        };
    }
    return {
        rawTest: test,
        defer: false,
    };
});
const add = (caseName, test, options = {}) => __awaiter(void 0, void 0, void 0, function* () {
    const { rawTest, defer } = yield prepareCaseFn(test);
    const fn = (suiteObj) => {
        suiteObj.add(caseName, rawTest, Object.assign(Object.assign({}, options), { defer }));
        return suiteObj;
    };
    Object.defineProperty(fn, 'name', { value: 'add' });
    return fn;
});
exports.add = add;
add.only = (caseName, test, options = {}) => __awaiter(void 0, void 0, void 0, function* () {
    const fn = (suiteObj) => {
        suiteObj.add(caseName, typeof test() === 'function' ? test() : test, options);
        return suiteObj;
    };
    Object.defineProperty(fn, 'name', { value: 'only' });
    return fn;
});
add.skip = (...args) => Promise.resolve({ name: 'skip' });
exports.default = add;
