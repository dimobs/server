// Define symbols and their corresponding payouts
var symbols = {
    Cherry: [0, 0, 10, 20, 50],
    Lemon: [0, 0, 20, 40, 100],
    Orange: [0, 0, 30, 60, 150],
    Plum: [0, 0, 40, 80, 200],
    Bell: [0, 0, 50, 100, 250],
    Bar: [0, 0, 100, 200, 500],
    Seven: [0, 0, 150, 300, 800],
    Any: [0, 0, 200, 400, 1000],
};
// Define lines in the game
var lines = [
    [0, 0, 0, 0, 0],
    [1, 1, 1, 1, 1],
    [2, 2, 2, 2, 2],
    [0, 1, 0, 1, 0],
    [1, 2, 1, 2, 1],
];
// Function to spin the reels and return the result
function spin(reels) {
    var result = [];
    for (var i = 0; i < reels.length; i++) { //5
        var reel = reels[i];
        var randomIndex = Math.floor(Math.random() * reel.length);
        result.push(reel.slice(randomIndex).concat(reel.slice(0, randomIndex)));
    }
    return result;
}
// Function to calculate payout based on the result
function calculatePayout(result, symbols, lines) {
    var totalPayout = 0;
    for (var _i = 0, lines_1 = lines; _i < lines_1.length; _i++) {
        var line = lines_1[_i];
        var lineSymbols = [];
        for (var i = 0; i < line.length; i++) {
            lineSymbols.push(result[i][line[i]]);
            //     [
            //     1, 1, 2, 2, 9, 9, 3, 3, 1, 1, 8, 8, 8, 3, 3, 6, 6, 1, 1, 7, 7, 2, 2, 6, 6, 1, 1, 8, 8, 2, 2, 5, 5, 4, 4, 4, 1, 1,
            //     4, 4, 2, 2, 3, 3, 4, 4, 9, 9, 3, 3, 2, 2, 1, 1, 9, 9, 1, 1, 4, 4, 8, 8, 2, 2, 5, 5, 5, 3, 3, 1, 1, 7, 7, 3, 3, 6,
            //     6, 7, 7, 2, 2, 6, 6, 6, 1, 1, 8, 8, 2, 2, 7, 7, 5, 5, 5, 1, 1, 6, 6, 4, 4, 3, 3, 4, 4, 5, 5, 3, 3, 2, 2, 1, 1, 1,
            //     1, 2, 2, 9, 9, 3, 3, 1, 1, 8, 8, 8, 3, 3, 6, 6, 1, 1, 7, 7, 2, 2, 6, 6, 1, 1, 8, 8, 2, 2, 5, 5, 4, 4, 4, 1, 1, 4,
            //     4, 2, 2,
            // ]
            // [0]
        }
        var _loop_1 = function (symbol) {
            var payouts = symbols[symbol]; // [0, 0, 10, 20, 50],
            var count = lineSymbols.filter(
                function (s) { 
                    return s === payouts.length - 1; } //4, 2, 5, 1, 8 //4
                ).length;
            if (count > 0) {
                totalPayout += payouts[count - 1];
            }
        };
        for (var symbol in symbols) {
            _loop_1(symbol);
        }
    }
    return totalPayout;
}
// Simulate spins and calculate statistics
function simulateSpins(numSpins, reels, symbols, lines) {
    var totalWins = 0;
    var startTime = Date.now();
    for (var i = 0; i < numSpins; i++) {
        var result = spin(reels);
        var payout = calculatePayout(result, symbols, lines);
        totalWins += payout;
    }
    var endTime = Date.now();
    var executionTime = endTime - startTime;
    var totalBets = numSpins;
    console.log("Total Wins: ".concat(totalWins));
    console.log("Total Bets: ".concat(totalBets));
    console.log("Execution Speed: ".concat(executionTime, "ms"));
}
// Define reels
var reels = [
    [1, 1, 2, 2, 7, 7, 3, 3, 1, 1, 8, 8, 8, 3, 3, 6, 6, 1, 1, 7, 7, 2, 2, 6, 6, 1, 1, 8, 8, 2, 2, 5, 5, 4, 4, 4, 1, 1,
        4, 4, 2, 2, 3, 3, 4, 4, 7, 7, 3, 3, 2, 2, 1, 1, 7, 7, 1, 1, 4, 4, 8, 8, 2, 2, 5, 5, 5, 3, 3, 1, 1, 7, 7, 3, 3, 6,
        6, 7, 7, 2, 2, 6, 6, 6, 1, 1, 8, 8, 2, 2, 7, 7, 5, 5, 5, 1, 1, 6, 6, 4, 4, 3, 3, 4, 4, 5, 5, 3, 3, 2, 2, 1, 1, 1,
        1, 2, 2, 7, 7, 3, 3, 1, 1, 8, 8, 8, 3, 3, 6, 6, 1, 1, 7, 7, 2, 2, 6, 6, 1, 1, 8, 8, 2, 2, 5, 5, 4, 4, 4, 1, 1, 4,
        4, 2, 2],
    [1, 1, 5, 5, 3, 3, 1, 1, 7, 7, 7, 4, 4, 7, 7, 5, 5, 1, 1, 4, 4, 7, 7, 3, 3, 6, 6, 7, 7, 2, 2, 6, 6, 6, 2, 2, 2, 3,
        3, 4, 4, 8, 8, 8, 3, 3, 2, 2, 1, 1, 4, 4, 1, 1, 8, 8, 2, 2, 5, 5, 1, 1, 5, 5, 7, 7, 3, 3, 1, 1, 7, 7, 4, 4, 5, 5,
        1, 1, 4, 4, 4, 4, 3, 3, 6, 6, 7, 7, 2, 2, 6, 6, 2, 2, 2, 3, 3, 4, 4, 3, 3, 2, 2, 1, 1, 1, 1, 8, 8, 2, 2, 5, 5, 6,
        6, 2, 2, 2, 3, 3, 4, 4, 3, 3, 2, 2, 1, 1, 1, 1, 8, 8, 2, 2, 5, 5],
    [1, 1, 7, 7, 2, 2, 2, 5, 5, 8, 8, 3, 3, 1, 1, 7, 7, 3, 3, 6, 6, 7, 7, 2, 2, 6, 6, 6, 1, 1, 8, 8, 2, 2, 5, 5, 4, 4,
        4, 5, 5, 1, 1, 4, 4, 3, 3, 4, 4, 3, 3, 2, 2, 7, 7, 1, 1, 1, 1, 2, 2, 2, 5, 5, 3, 3, 1, 1, 7, 7, 3, 3, 6, 6, 7, 7,
        2, 2, 6, 6, 6, 1, 1, 8, 8, 2, 2, 5, 5, 7, 7, 4, 4, 5, 5, 1, 1, 4, 4, 3, 3, 4, 4, 3, 3, 8, 8, 2, 2, 1, 1, 6, 6, 6,
        1, 1, 8, 8, 2, 2, 5, 5, 7, 7, 4, 4, 5, 5, 1, 1, 4, 4, 3, 3, 4, 4, 3, 3, 8, 8, 2, 2, 1, 1],
    [1, 1, 8, 8, 8, 2, 2, 4, 4, 3, 3, 7, 7, 7, 2, 2, 2, 5, 5, 7, 7, 2, 2, 5, 5, 3, 3, 1, 1, 7, 7, 3, 3, 6, 6, 6, 1, 1,
        4, 4, 4, 5, 5, 5, 1, 1, 4, 4, 8, 8, 3, 3, 6, 6, 2, 2, 1, 1, 7, 7, 1, 1, 8, 8, 2, 2, 4, 4, 3, 3, 2, 2, 2, 5, 5, 5,
        7, 7, 2, 2, 7, 7, 3, 3, 1, 1, 7, 7, 3, 3, 6, 6, 1, 1, 7, 7, 5, 5, 1, 1, 4, 4, 3, 3, 8, 8, 6, 6, 2, 2, 1, 1, 7, 7,
        3, 3, 1, 1, 7, 7, 3, 3, 6, 6, 1, 1, 7, 7, 5, 5, 1, 1, 4, 4, 3, 3, 8, 8, 6, 6, 2, 2, 1, 1],
    [1, 1, 5, 5, 7, 7, 3, 3, 7, 7, 7, 1, 1, 3, 3, 2, 2, 2, 7, 7, 2, 2, 6, 6, 6, 1, 1, 8, 8, 2, 2, 4, 4, 3, 3, 4, 4, 4,
        5, 5, 1, 1, 6, 6, 4, 4, 8, 8, 3, 3, 6, 6, 2, 2, 1, 1, 8, 8, 1, 1, 5, 5, 3, 3, 7, 7, 1, 1, 7, 7, 3, 3, 2, 2, 2, 5,
        5, 1, 1, 7, 7, 7, 2, 2, 6, 6, 6, 1, 1, 8, 8, 8, 2, 2, 4, 4, 3, 3, 5, 5, 1, 1, 4, 4, 3, 3, 7, 7, 7, 6, 6, 2, 2, 1,
        1, 2, 2, 6, 6, 6, 1, 1, 8, 8, 8, 2, 2, 4, 4, 3, 3, 5, 5, 1, 1, 4, 4, 3, 3, 7, 7, 7, 6, 6, 2, 2, 1, 1],
];
// Simulate spins and output total wins, bets, and execution speed
function simulateSpinsAndOutput(numSpins, reels) {
    var totalWins = 0;
    var startTime = Date.now();
    for (var i = 0; i < numSpins; i++) {
        var result = spin(reels);
        var payout = calculatePayout(result, symbols, lines);
        totalWins += payout;
    }
    var endTime = Date.now();
    var executionTime = endTime - startTime;
    var totalBets = numSpins;
    console.log("Total Wins: ".concat(totalWins));
    console.log("Total Bets: ".concat(totalBets));
    console.log("Execution Speed: ".concat(executionTime, "ms"));
}
// Simulate spins
simulateSpinsAndOutput(1000, reels);
