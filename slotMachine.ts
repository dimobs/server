import config from './configuration'; 

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

    calculatePayout(result: number[][]): {totalPayout: number; lines: number[][] }  {
        let totalPayout = 0;
        const lines: number[][] = [];

        for (const line of this.config.lines) { 
            const lineSymbols: number[] = [];
            for (let i = 0; i < line.length; i++) { 
                lineSymbols.push(result[i][line[i]]);   
            }
            lines.push(lineSymbols);
            
            for (const symbol of Object.keys(this.config.symbols)) { 
                const symbolIndex = parseInt(symbol); 
                const payout = this.config.symbols[symbolIndex]; 
                const count = lineSymbols.filter(s => s === symbolIndex).length; 
                if (count > 0) {
                    totalPayout += payout[count - 1];
                }
            }
        }

        return { totalPayout, lines };
    }
}

const slotMachine = new SlotMachine(config);
const result = slotMachine.spin();
const {totalPayout, lines} = slotMachine.calculatePayout(result);
console.log("Game result: ", result);
console.log("Lines payout", lines);
console.log("Payout: ", totalPayout);
