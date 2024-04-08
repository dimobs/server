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

        for (let i = 0; i < this.config.reelsCount; i++) {
            const reel = this.config.reels[i];
            const randomIndex = Math.floor(Math.random() * reel.length);            
            result.push(reel.slice(randomIndex).concat(reel.slice(0, randomIndex)));
        }

        return result;
    }

    calculatePayout(result: number[][]): number {
        let totalPayout = 0;

        for (const line of this.config.lines) {
            const lineSymbols: number[] = [];
            for (let i = 0; i < line.length; i++) {
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
        }

        return totalPayout;
    }
}

import config from './configuration'; 
const slotMachine = new SlotMachine(config);
const result = slotMachine.spin();
const payout = slotMachine.calculatePayout(result);
console.log("Result: ", result);
console.log("Payout: ", payout);
