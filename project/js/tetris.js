
function setColor() {
    currentColor = nextColor;
    nextColor = blockColor[Math.floor(Math.random() * (blockColor.length))];

    tds[blockLoc].style.backgroundColor = currentColor;
    previewBlock.style.backgroundColor = nextColor;
}

function nextLevel() {
    isMove = false;

    timerID = setInterval("blockMovement()", DOWN_SPEED[level]);
    document.getElementById("level_up_alert").style.display = "none";

    startBGM();
}

function playGame() {
    let gameStart = document.getElementById("game_start");
    gameStart.style.display = "none";

    startNew();
    startBGM();

    // timer set
    timerID = setInterval("blockMovement()", DOWN_SPEED[level]);
}

function blockMovement() {

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
    isMove = true;

    if(bgm != null) {
        bgm.pause();
        bgm = null;
    }

    if(timerID != null) {
        clearInterval(timerID);
        timerID = null;
    }

    gameEndAlertText.innerText = text;
    gameEndAlert.style.display = "block";
}


function startBGM() {
    if(bgm != null) {
        bgm.currentTime = 0;  // 현재 재생 위치를 처음으로 설정
        bgm.play();

        /*종료되면 처음부터 다시 재생*/
        bgm.addEventListener('ended', function() {
            this.currentTime = 0;
            this.play();
        }, false);
    }
}

function holdingBlock() {
    isMove = true;

    tds[blockLoc].style.backgroundColor = "white";
    blockLoc = 0;

    if(!isHold) {
        isHold = true;
        holdColor = currentColor;
        holdBlock.style.backgroundColor = holdColor;
    }
    else {
        nextColor = holdColor;
        holdColor = "white";
        holdBlock.style.backgroundColor = 'transparent';
        isHold = false;
    }
    startNew();

    isMove = false;
}