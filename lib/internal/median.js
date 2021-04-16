"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.median = void 0;
const comparator = (n, m) => n < m ? -1 : 1;
const median = (data) => {
    data.sort(comparator);
    if (data.length % 2 === 0) {
        return (data[data.length / 2 - 1] + data[data.length / 2]) / 2;
    }
    return data[Math.floor(data.length / 2)];
};
exports.median = median;
