var WIDTH = 0;
var HEIGHT = 0;
var DOWN_SPEED = 300;

var tds = null;
var blockLoc = 0;
var blockColor = null;
var currentColor = 0;
var nextColor = 0;
var timerID =  null;
var blockArray = null;

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
    nextColor = blockColor[Math.floor(Math.random() * (blockColor.length))];

    setTetrisTable();
    setBlockArray();

    tds = document.getElementsByClassName("tetris_td");
    startNew();

    // timer set
    timerID = setInterval("play()", DOWN_SPEED);
}

function setTetrisTable() {
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

function setBlockArray() {
    // 10x10 2차원 배열 만들기
    // 블록 배열 생성 및 초기화
    blockArray = new Array(HEIGHT);
    for (let i = 0; i < HEIGHT; i++) {
        blockArray[i] = new Array(WIDTH);
        for (let j = 0; j < WIDTH; j++)
            blockArray[i][j] = null; // 테스트 시에 3으로 초기화
    }
}

function setColor() {
    currentColor = nextColor;
    nextColor = blockColor[Math.floor(Math.random() * (blockColor.length))];
    tds[blockLoc].style.backgroundColor = currentColor;
}

function play() {
    if (isTab || !moveDown()) {
        let i = Math.floor(blockLoc / WIDTH);
        if (i !== 0) {
            startNew();
        } else {
            overGame()
        }
    }
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