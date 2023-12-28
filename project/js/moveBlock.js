
window.onkeydown = function (e) {
    if(e.key == "ArrowRight")
        moveRight();
    else if(e.key == "ArrowLeft")
        moveLeft();
}

function moveRight() {
    // 작성할 것
}

function moveLeft() {
    // 작성할 것
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
