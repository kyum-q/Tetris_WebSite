
window.onkeydown = function (e) {
    if(e.key == "ArrowRight")
        moveRight();
    else if(e.key == "ArrowLeft")
        moveLeft();
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
        blockLoc += 10;
        tds[blockLoc].style.backgroundColor = "skyblue";
    }
    else {
        // 더 이상 내려 갈 수 없는 경우, 블록 객체를 배열에 삽입함
        let i = Math.floor(blockLoc/10);
        let j = blockLoc%10;

        blockArray[i][j] = new Block(i,j, "skyblue");
        blockArray[i][j].draw();
        startNew();
    }
}


function canDown() {
    // 수정되어야 함.
    // 현재는 맨 바닥인지만 체그해게 되어 있음
    if(blockLoc >= 90)
        return false;
    else
        return true;
}

function canRight() {
    // 수정되어야 함.
    // 현재는 맨 바닥인지만 체그해게 되어 있음
    if(blockLoc%10 >= 9)
        return false;
    else
        return true;
}

function canLeft() {
    // 수정되어야 함.
    // 현재는 맨 바닥인지만 체그해게 되어 있음
    if(blockLoc%10 <= 0)
        return false;
    else
        return true;
}