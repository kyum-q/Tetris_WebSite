
window.onkeydown = function (e) {
    switch (e.key) {
        case "ArrowRight":
            moveRight();
            break;
        case "ArrowLeft":
            moveLeft();
            break;
        case "Tab":
            moveFloor();
            break;
    }

    // 현재 이벤트의 기본 동작 중단
    event.preventDefault();
}

function moveRight() {
    // 수정되어야 함
    if(canRight()) {
        tds[blockLoc].style.backgroundColor = "white";
        blockLoc += 1;
        tds[blockLoc].style.backgroundColor = "skyblue";
    }
}

function moveLeft() {
    // 수정되어야 함
    if(canLeft()) {
        tds[blockLoc].style.backgroundColor = "white";
        blockLoc -= 1;
        tds[blockLoc].style.backgroundColor = "skyblue";
    }
}

function moveDown() {
    // 수정되어야 함
    if(canDown()) {
        tds[blockLoc].style.backgroundColor = "white";
        blockLoc += WIDTH;
        tds[blockLoc].style.backgroundColor = "skyblue";
    }
    else {
        // 더 이상 내려 갈 수 없는 경우, 블록 객체를 배열에 삽입함
        let i = Math.floor(blockLoc/WIDTH);
        let j = blockLoc%WIDTH;

        blockArray[i][j] = new Block(i,j, "skyblue");
        blockArray[i][j].draw();
        startNew();
    }
}


function moveFloor() {
    while(canDown()) {
        moveDown();
    }
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
