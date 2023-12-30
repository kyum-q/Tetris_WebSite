
function setColor() {
    currentColor = nextColor;
    nextColor = blockColor[Math.floor(Math.random() * (blockColor.length))];

    tds[blockLoc].style.backgroundColor = currentColor;
    previewBlock.style.backgroundColor = nextColor;
}

function play() {
    if (isTab || !moveDown()) {
        let i = Math.floor(blockLoc / WIDTH);

        if (i !== 0) {
            checkScore();
            startNew();
        } else {
            overGame()
        }
    }
}

function makeBlock() {
    // 더 이상 내려 갈 수 없는 경우, 블록 객체를 배열에 삽입함
    let i = Math.floor(blockLoc / WIDTH);
    let j = blockLoc % WIDTH;

    blockArray[i][j] = new Block(j, i, currentColor);
    blockArray[i][j].draw();
}


function checkBlockColor(x, y) {
    return checkRound(x,y) && blockArray[y][x] != null
        && blockArray[y][x].checkColor(currentColor);
}

function startNew() {
    isTab = false;

    // new start
    blockLoc = Math.floor(Math.random() * (WIDTH));
    setColor();
}

function overGame() {
    if(timerID != null) {
        clearInterval(timerID);
        timerID = null;
        alert("Game Over!!!!");
    }
}