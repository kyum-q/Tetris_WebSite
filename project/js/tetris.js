
function setColor() {
    currentColor = nextColor;
    nextColor = blockColor[Math.floor(Math.random() * (blockColor.length))];

    tds[blockLoc].style.backgroundColor = currentColor;
    previewBlock.style.backgroundColor = nextColor;
}

function nextLevel() {
    timerID = setInterval("play()", DOWN_SPEED[level]);
    document.getElementById("level_up_alert").style.display = "none";
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
    gameEnd("GAME OVER");
}

function gameClear() {
    gameEnd("GAME CLEAR");
}

function gameEnd(text) {
    if(timerID != null) {
        clearInterval(timerID);
        timerID = null;
    }

    gameEndAlertText.innerText = text;
    gameEndAlert.style.display = "block";
}