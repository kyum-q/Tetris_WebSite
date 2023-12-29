let WIDTH = 0;
let HEIGHT = 0;
let DOWN_SPEED = 300;

let tds = null;
let blockLoc = 0;
let timerID =  null;
let blockArray = null;

let blockColor = null;
let currentColor = 0;
let nextColor = 0;
let previewBlock = null;

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
            startNew();
        } else {
            overGame()
        }
    }
}

function checkBlock() {
    let x = Math.floor(blockLoc / WIDTH);
    let y = blockLoc % WIDTH;

    // 가로 확인

    // 세로 확인

    // 대각선 확인
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
