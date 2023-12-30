function move(move) {
    tds[blockLoc].style.backgroundColor = "white";
    blockLoc += move;
    tds[blockLoc].style.backgroundColor = currentColor;
}

function moveRight() {
    if(canRight()) {
        move(1);
    }
}

function moveLeft() {
    if(canLeft()) {
        move(-1);
    }
}

function moveDown() {
    if(canDown()) {
        move(WIDTH);
        return true;
    }
    makeBlock();
    return false;
}

function moveFloor() {
    while(canDown()) {
        move(WIDTH);
    }
    makeBlock();
}

function fallBlock(block) {
    let x = block.x;
    let y = block.y;
    let color = block.color;

    blockArray[y][x].remove();
    blockArray[y][x] = null;

    y++;
    while(y < HEIGHT && blockArray[y][x] == null) {
        y++;
    }

    blockArray[y-1][x] = new Block(x, y-1, color);
    blockArray[y-1][x].draw();
}