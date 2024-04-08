# Slot Machine Game

This is a simple slot machine game implemented in TypeScript.

## Description

The slot machine game consists of spinning reels with symbols and calculating the payout based on the combination of symbols on the screen.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/dimobs/slot-machine.git


#How It Works? 

The game configuration includes five reels of different lengths, lines (positions of elements that should be taken), and symbols for prizes.

Implementing the slot method:
Retrieve each reel using the Math.random method and multiply it by the reel's length to ensure that the random number won't exceed the reel's length. Additionally, use this result of the random number to splice each array of reels (from the random index to the end, concatenated with: from 0 to the random index).
Retrieve lines from the configuration file and for each line, get the position index from the reels. After that, check how many symbols match for a prize using the filter method.


