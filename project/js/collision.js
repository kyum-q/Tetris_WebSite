function canDown() {
    return !(blockLoc >= WIDTH * (HEIGHT - 1) || checkBlock(blockLoc / WIDTH + 1, blockLoc % WIDTH));
}

function canRight() {
    return !(blockLoc % WIDTH >= WIDTH - 1 || checkBlock(blockLoc / WIDTH, blockLoc % WIDTH + 1));
}

function canLeft() {
    return !(blockLoc % WIDTH <= 0 || checkBlock(blockLoc / WIDTH, blockLoc % WIDTH - 1));
}

function checkBlock(x, y) {
    return blockArray[Math.floor(x)][y] != null
}

function checkRound(x,y) {
    return x >= 0 && y >= 0 && x < WIDTH && y < HEIGHT;
}
