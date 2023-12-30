var WIDTH = 0;
var HEIGHT = 0;

var MAX_LEVEL = null;
var DOWN_SPEED = null;
var CLEAR_SCORE = null;

var level = 0;

var tds = null;
var blockLoc = 0;
var timerID =  null;
var blockArray = null;

var blockColor = null;
var currentColor = 0;
var nextColor = 0;
var previewBlock = null;

var levelUpBtn = null
var score = 0;
var isTab = false;

window.focus();

window.onload = function () {
    let maxLevel = 4;
    let speed = [300, 200, 100, 80];
    let score = [300, 800, 1300, 2000];
    setInit(10, 10, maxLevel, speed, score);
}

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

function initLevelUpBtn() {
    levelUpBtn = document.getElementById("next_level_btn");
    levelUpBtn.addEventListener("click", nextLevel);
}

function setInit(w, h, maxLevel, speed, clearScore) {
    WIDTH = w;
    HEIGHT = h;

    level = 0;
    MAX_LEVEL = maxLevel;
    DOWN_SPEED = speed;
    CLEAR_SCORE = clearScore;

    blockColor = ["#E3A295", "#ECC225", "#9FBF82", "#939CD5", "#93C4D3"];

    initTetrisTable();
    initBlockArray();
    initColor();
    initLevelUpBtn();

    tds = document.getElementsByClassName("tetris_td");
    startNew();

    // timer set
    timerID = setInterval("play()", DOWN_SPEED[level]);
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
