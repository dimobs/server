"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SlotMachine = /** @class */ (function () {
    function SlotMachine(config) {
        this.config = config;
    }
    SlotMachine.prototype.spin = function () {
        var result = [];
        for (var i = 0; i < this.config.reelsCount; i++) { //5
            var reel = this.config.reels[i]; //[
            //     1, 1, 2, 2, 9, 9, 3, 3, 1, 1, 8, 8, 8, 3, 3, 6, 6, 1, 1, 7, 7, 2, 2, 6, 6, 1, 1, 8, 8, 2, 2, 5, 5, 4, 4, 4, 1, 1,
            //     4, 4, 2, 2, 3, 3, 4, 4, 9, 9, 3, 3, 2, 2, 1, 1, 9, 9, 1, 1, 4, 4, 8, 8, 2, 2, 5, 5, 5, 3, 3, 1, 1, 7, 7, 3, 3, 6,
            //     6, 7, 7, 2, 2, 6, 6, 6, 1, 1, 8, 8, 2, 2, 7, 7, 5, 5, 5, 1, 1, 6, 6, 4, 4, 3, 3, 4, 4, 5, 5, 3, 3, 2, 2, 1, 1, 1,
            //     1, 2, 2, 9, 9, 3, 3, 1, 1, 8, 8, 8, 3, 3, 6, 6, 1, 1, 7, 7, 2, 2, 6, 6, 1, 1, 8, 8, 2, 2, 5, 5, 4, 4, 4, 1, 1, 4,
            //     4, 2, 2,
            //   ],
            var randomIndex = Math.floor(Math.random() * reel.length); //N:0-1 * 155 
            // console.log(randomIndex); //129 / 95 / 100 / 33 / 32            
            result.push(reel.slice(randomIndex).concat(reel.slice(0, randomIndex)));
        }
        return result;
    };
    SlotMachine.prototype.calculatePayout = function (result) {
        var totalPayout = 0;
        for (var _i = 0, _a = this.config.lines; _i < _a.length; _i++) { //[0, 1, 0, 1, 0], [1, 2, 1, 2, 1], //5
            var line = _a[_i];
            var lineSymbols = [];
            for (var i = 0; i < line.length; i++) { //5
                lineSymbols.push(result[i][line[i]]);
            }
            var _loop_1 = function (symbol) {
                var symbolIndex = parseInt(symbol);
                var payout_1 = this_1.config.symbols[symbolIndex];
                var count = lineSymbols.filter(function (s) { return s === symbolIndex; }).length;
                if (count >= payout_1.length) {
                    totalPayout += payout_1[count - 1];
                }
            };
            var this_1 = this;
            for (var _b = 0, _c = Object.keys(this.config.symbols); _b < _c.length; _b++) {
                var symbol = _c[_b];
                _loop_1(symbol);
            }
            // console.log('ttt', lineSymbols);
        }
        return totalPayout;
    };
    return SlotMachine;
}());
var configuration_1 = require("./configuration");
var slotMachine = new SlotMachine(configuration_1.default);
var result = slotMachine.spin();
var payout = slotMachine.calculatePayout(result);
// console.log("Result: ", result);
// console.log("Payout: ", payout);
