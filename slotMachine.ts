interface Payout {
    symbol: number;
    count: number;
    payout: number;
}

interface Config {
    reelsCount: number;
    rowsCount: number;
    symbols: { [key: number]: number[] };
    lines: number[][];
    reels: number[][];
}

class SlotMachine {
    private config: Config;

    constructor(config: Config) {
        this.config = config;
    }

    spin(): number[][] {
        const result: number[][] = [];

        for (let i = 0; i < this.config.reelsCount; i++) { //5
            const reel = this.config.reels[i]; //[
            //     1, 1, 2, 2, 9, 9, 3, 3, 1, 1, 8, 8, 8, 3, 3, 6, 6, 1, 1, 7, 7, 2, 2, 6, 6, 1, 1, 8, 8, 2, 2, 5, 5, 4, 4, 4, 1, 1,
            //     4, 4, 2, 2, 3, 3, 4, 4, 9, 9, 3, 3, 2, 2, 1, 1, 9, 9, 1, 1, 4, 4, 8, 8, 2, 2, 5, 5, 5, 3, 3, 1, 1, 7, 7, 3, 3, 6,
            //     6, 7, 7, 2, 2, 6, 6, 6, 1, 1, 8, 8, 2, 2, 7, 7, 5, 5, 5, 1, 1, 6, 6, 4, 4, 3, 3, 4, 4, 5, 5, 3, 3, 2, 2, 1, 1, 1,
            //     1, 2, 2, 9, 9, 3, 3, 1, 1, 8, 8, 8, 3, 3, 6, 6, 1, 1, 7, 7, 2, 2, 6, 6, 1, 1, 8, 8, 2, 2, 5, 5, 4, 4, 4, 1, 1, 4,
            //     4, 2, 2,
            //   ],
            const randomIndex = Math.floor(Math.random() * reel.length);  //N:0-1 * 155 
           // console.log(randomIndex); //129 / 95 / 100 / 33 / 32            
            result.push(reel.slice(randomIndex).concat(reel.slice(0, randomIndex)));
        }

        return result;
    }

    calculatePayout(result: number[][]): number {
        let totalPayout = 0;

        for (const line of this.config.lines) { //[0, 1, 0, 1, 0], [1, 2, 1, 2, 1], //5
            const lineSymbols: number[] = [];
            for (let i = 0; i < line.length; i++) { //5
                lineSymbols.push(result[i][line[i]]);
            }
            
            for (const symbol of Object.keys(this.config.symbols)) {
                const symbolIndex = parseInt(symbol);
                const payout = this.config.symbols[symbolIndex];
                const count = lineSymbols.filter(s => s === symbolIndex).length;
                if (count >= payout.length) {
                    totalPayout += payout[count - 1];
                }
            }
        // console.log('ttt', lineSymbols);
        }

        return totalPayout;
    }
}

import config from './configuration'; 
const slotMachine = new SlotMachine(config);
const result = slotMachine.spin();
const payout = slotMachine.calculatePayout(result);
// console.log("Result: ", result);
// console.log("Payout: ", payout);
