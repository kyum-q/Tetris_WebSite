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

    blockArray[i][j] = new Block(i, j, currentColor);
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
    return false;
}

function canDown() {
    if(blockLoc >= WIDTH*(HEIGHT-1) || checkBlock(blockLoc/WIDTH+1, blockLoc%WIDTH))
        return false;
    else
        return true;
}

function canRight() {
    if(blockLoc%WIDTH >= WIDTH-1 || checkBlock(blockLoc/WIDTH, blockLoc%WIDTH+1))
        return false;
    else
        return true;
}

function canLeft() {
    if(blockLoc%WIDTH <= 0 || checkBlock(blockLoc/WIDTH, blockLoc%WIDTH-1))
        return false;
    else
        return true;
}

function checkBlock(x, y) {
    return blockArray[Math.floor(x)][y] != null
}
