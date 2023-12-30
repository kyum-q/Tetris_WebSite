window.onkeydown = function (e) {
    if(!isTab) {
        switch (e.key) {
            case "ArrowRight":
                moveRight();
                break;
            case "ArrowLeft":
                moveLeft();
                break;
            case "Tab":
                isTab = true;
                moveFloor();
                break;
        }
    }

    // 현재 이벤트의 기본 동작 중단
    event.preventDefault();
}

function move(move) {
    tds[blockLoc].style.backgroundColor = "white";
    blockLoc += move;
    tds[blockLoc].style.backgroundColor = currentColor;
}

function draw() {
    // 더 이상 내려 갈 수 없는 경우, 블록 객체를 배열에 삽입함
    let i = Math.floor(blockLoc / WIDTH);
    let j = blockLoc % WIDTH;

    blockArray[i][j] = new Block(j, i, currentColor);
    blockArray[i][j].draw();
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
    draw();
    return false;
}

function moveFloor() {
    while(canDown()) {
        move(WIDTH);
    }
    draw();
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

    console.log("1) " + x + ", " + y-1);
    blockArray[y-1][x] = new Block(x, y-1, color);
    blockArray[y-1][x].draw();
}

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
