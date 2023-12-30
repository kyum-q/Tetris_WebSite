var WIDTH = 0;
var HEIGHT = 0;
var DOWN_SPEED = 300;

var tds = null;
var blockLoc = 0;
var timerID =  null;
var blockArray = null;

var blockColor = null;
var currentColor = 0;
var nextColor = 0;
var previewBlock = null;

var score = 0;
var isTab = false;

window.focus();

window.onload = function () {
    setInit(10, 10, 300);
}

function setInit(w, h, speed) {
    WIDTH = w;
    HEIGHT = h;
    DOWN_SPEED = speed;
    blockColor = ["#E3A295", "#ECC225", "#9FBF82", "#939CD5", "#93C4D3"];

    initTetrisTable();
    initBlockArray();
    initColor();

    tds = document.getElementsByClassName("tetris_td");
    startNew();

    // timer set
    timerID = setInterval("play()", DOWN_SPEED);
}

function initTetrisTable() {
    const table = document.getElementById("tetris_table");
    for (let i = 0; i < HEIGHT; i++) {
        const tr = document.createElement('tr');
        for (let j = 0; j < WIDTH; j++) {
            const td = document.createElement('td');
            td.className = 'tetris_td';
            tr.append(td);
        }
        table.append(tr);
    }
}

function initBlockArray() {
    // 10x10 2차원 배열 만들기
    // 블록 배열 생성 및 초기화
    blockArray = new Array(HEIGHT);
    for (let i = 0; i < HEIGHT; i++) {
        blockArray[i] = new Array(WIDTH);
        for (let j = 0; j < WIDTH; j++)
            blockArray[i][j] = null; // 테스트 시에 3으로 초기화
    }
}

function initColor() {
    nextColor = blockColor[Math.floor(Math.random() * (blockColor.length))];
    previewBlock = document.getElementById("preview_block");
}

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

function checkScore() {
    // 가로 확인
    let x = blockLoc % WIDTH;
    let y = Math.floor(blockLoc / WIDTH);

    let dx = [0,1,1,-1];
    let dy = [1,0,1,1];

    for (let i = 0; i < 4; i++) {
        let count = continuousBlockCount(x,y,dx[i],dy[i]);
        if (count >= 3) {
            score += removeBlock() * 100;
            changeScore();
            fillEmptySpace();
            break;
        }
    }
}

function changeScore() {
    document.getElementById("score").innerHTML = score;
}

function continuousBlockCount(x,y,dx,dy) {
    let xStart = x;
    let xEnd = x;
    let yStart = y;
    let yEnd = y;

    function moveStart(location) {
        xStart += dx * location;
        yStart += dy * location;
    }
    function moveEnd(location) {
        xEnd += dx * location;
        yEnd += dy * location;
    }

    let equalsStartColor = true;
    let equalsEndColor = true;

    while (equalsStartColor || equalsEndColor) {
        if (equalsStartColor) {
            moveStart(-1);
            equalsStartColor = checkBlockColor(xStart, yStart);
            if (!equalsStartColor) {
                moveStart(1);
            } else if ((dx === 1 && xStart === 0) || (dy === 1 && yStart === 0)) {
                equalsStartColor = false;
            }
        }

        if (equalsEndColor) {
            moveEnd(1);
            equalsEndColor = checkBlockColor(xEnd, yEnd);
            if (!equalsEndColor) {
                moveEnd(-1);
            } else if ((dx === 1 && xEnd === WIDTH - 1) || (dy === 1 && yEnd === WIDTH - 1)) {
                equalsEndColor = false;
            }
        }
    }
    return Math.max(xEnd-xStart, yEnd-yStart) + 1;
}

function removeBlock() {
    let count = 0;

    let dx = [0,0,1,-1,1,1,-1,-1];
    let dy = [1,-1,0,0,1,-1,1,-1];

    let x = blockLoc % WIDTH;
    let y = Math.floor(blockLoc / WIDTH);

    let blocks = [];
    blocks.push({x,y});

    while (blocks.length > 0) {
        let value = blocks.shift();
        for (let i = 0; i < 8; i++) {
            let nx = value.x + dx[i];
            let ny = value.y + dy[i];
            if(checkBlockColor(nx,ny)) {
                blockArray[ny][nx].remove();
                blockArray[ny][nx] = null;
                count++;
                blocks.push({x:nx,y:ny});
            }
        }
    }

    return count;
}

function fillEmptySpace() {
    for (let i = HEIGHT-1; i >= 0; i--) {
        for (let j = WIDTH-1; j >= 0; j--) {
            if(blockArray[i][j] != null)
                fallBlock(blockArray[i][j], j, i);
        }
    }
}

function checkRound(x,y) {
    return x >= 0 && y >= 0 && x < WIDTH && y < HEIGHT;
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