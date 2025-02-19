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
exports.cycle = void 0;
const kleur = require("kleur");
const logUpdate = require("log-update");
const format_1 = require("./internal/format");
const getCaseResult_1 = require("./internal/getCaseResult");
const getSummary_1 = require("./internal/getSummary");
const getStatus = (item, index, summary, ops, fastestOps) => {
    const isFastest = index === summary.fastest.index;
    const isSlowest = index === summary.slowest.index;
    const statusShift = fastestOps.length - ops.length + 2;
    return (' '.repeat(statusShift) +
        (isFastest
            ? kleur.green('| fastest')
            : isSlowest
                ? kleur.red(`| slowest, ${item.percentSlower}% slower`)
                : kleur.yellow(`| ${item.percentSlower}% slower`)));
};
const defaultCycle = (_, summary) => {
    const allCompleted = summary.results.every((item) => item.samples > 0);
    const fastestOps = format_1.default(summary.results[summary.fastest.index].ops);
    const progress = Math.round((summary.results.filter((result) => result.samples !== 0).length /
        summary.results.length) *
        100);
    const progressInfo = `Progress: ${progress}%`;
    const output = summary.results
        .map((item, index) => {
        const ops = format_1.default(item.ops);
        const margin = item.margin.toFixed(2);
        return item.samples
            ? kleur.cyan(`\n  ${item.name}:\n`) +
                `    ${ops} ops/s, ±${margin}% ${allCompleted
                    ? getStatus(item, index, summary, ops, fastestOps)
                    : ''}`
            : null;
    })
        .filter((item) => item !== null)
        .join('\n');
    return `${progressInfo}\n${output}`;
};
const cycle = (fn = defaultCycle) => __awaiter(void 0, void 0, void 0, function* () {
    return (suiteObj) => {
        suiteObj.on('cycle', (event) => {
            const summary = getSummary_1.default(event);
            const current = getCaseResult_1.default(event);
            const output = fn(current, summary);
            if (output) {
                logUpdate(output);
            }
        });
        return suiteObj;
    };
});
exports.cycle = cycle;
exports.default = cycle;
