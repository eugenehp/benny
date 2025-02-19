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
exports.complete = void 0;
const kleur = require("kleur");
const logUpdate = require("log-update");
const getSummary_1 = require("./internal/getSummary");
const defaultComplete = (summary) => {
    const length = summary.results.length;
    console.log(kleur.blue(`\nFinished ${length} case${length !== 1 ? 's' : ''}!`));
    if (length > 1) {
        console.log(kleur.blue('  Fastest:'), summary.fastest.name);
        console.log(kleur.blue('  Slowest:'), summary.slowest.name);
    }
};
const complete = (fn = defaultComplete) => __awaiter(void 0, void 0, void 0, function* () {
    return (suiteObj) => {
        logUpdate.done();
        suiteObj.on('complete', (event) => fn(getSummary_1.default(event)));
        return suiteObj;
    };
});
exports.complete = complete;
exports.default = complete;
