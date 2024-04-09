"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var configuration_1 = require("./configuration");
var SlotMachine = /** @class */ (function () {
    function SlotMachine(config) {
        this.config = config;
    }
    SlotMachine.prototype.spin = function () {
        var result = [];
        for (var i = 0; i < this.config.reelsCount; i++) {
            var reel = this.config.reels[i];
            var randomIndex = Math.floor(Math.random() * reel.length);
            result.push(reel.slice(randomIndex).concat(reel.slice(0, randomIndex)));
        }
        return result;
    };
    SlotMachine.prototype.calculatePayout = function (result) {
        var totalPayout = 0;
        var lines = [];
        var symbolsReached = [];
        for (var _i = 0, _a = this.config.lines; _i < _a.length; _i++) {
            var line = _a[_i];
            var lineSymbols = [];
            for (var i = 0; i < line.length; i++) {
                lineSymbols.push(result[i][line[i]]);
            }
            lines.push(lineSymbols);
            var _loop_1 = function (symbol) {
                var symbolIndex = parseInt(symbol);
                var payout = this_1.config.symbols[symbolIndex];
                var count = lineSymbols.filter(function (s) { return s === symbolIndex; }).length;
                if (count > 0 && payout[count - 1] > 0) {
                    totalPayout += payout[count - 1];
                    symbolsReached.push({ reelPosition: symbolIndex, symbol: payout[count - 1] });
                }
            };
            var this_1 = this;
            for (var _b = 0, _c = Object.keys(this.config.symbols); _b < _c.length; _b++) {
                var symbol = _c[_b];
                _loop_1(symbol);
            }
        }
        return { totalPayout: totalPayout, lines: lines, symbolsReached: symbolsReached };
    };
    return SlotMachine;
}());
var slotMachine = new SlotMachine(configuration_1.default);
var result = slotMachine.spin();
var _a = slotMachine.calculatePayout(result), totalPayout = _a.totalPayout, lines = _a.lines, symbolsReached = _a.symbolsReached;
console.log("Game result: ", result);
console.log("Lines payout", lines, symbolsReached);
console.log("Payout: ", totalPayout);
