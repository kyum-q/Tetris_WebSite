var WIDTH = 0;
var HEIGHT = 0;

var SPEED_UP = null;
var SPEED_UP_SCORE = null;

var downSpeed = null;
var level = 1;

var tds = null;
var blockLoc = 0;
var timerID =  null;
var blockArray = null;

var blockColor = null;
var currentColor = null;
var nextColor = null;
var holdColor = null;
var previewBlock = null;
var holdBlock = null;

var retryBtn = null;
var gameEndAlert = null;
var gameEndAlertText = null;

var score = 0;
var isTab = false;
var isHold = false;
var isMove = false;

var levelUpAudio = null;
var blockRemoveAudio = null;
var bgm = null;

window.focus();

window.onload = gameStart;

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
            case "Shift":
                holdingBlock();
                break;
            case " ":
            case "Enter":
                // 버튼 처리 고려
                break;
        }
    }

    // 현재 이벤트의 기본 동작 중단
    event.preventDefault();
}

function gameStart() {
    let speed = 300;
    let speedIncrease = 50;
    let speedUpScore = 400;
    let audio1 = new Audio('../audio/MP_스테이지 클리어(레트로).mp3');
    let audio2 = new Audio('../audio/MP_Tiny Button Push.mp3');
    let bgm = new Audio('../audio/MP_고양이 장난감.mp3');

    setInit(10, 10, speed, speedIncrease, speedUpScore, audio1, audio2, bgm);
}

function initAlert() {
    gameEndAlert = document.getElementById("game_end_alert");
    gameEndAlertText = document.getElementById("game_end_text");

    retryBtn = document.getElementById("retry_btn");
    retryBtn.addEventListener("click",  function() {
        gameEndAlert.style.display = "none";
        gameStart();
        playGame();
    });

    let gameStartBtn = document.getElementById("game_start_btn");
    gameStartBtn.addEventListener("click", playGame);
}

function setInit(w, h, speed, speedIncrease, speedUpScore, levelAudio, blockAudio, newBgm) {
    WIDTH = w;
    HEIGHT = h;

    downSpeed = speed;
    SPEED_UP = speedIncrease;
    SPEED_UP_SCORE = speedUpScore;

    levelUpAudio = levelAudio;
    blockRemoveAudio = blockAudio;
    bgm = newBgm;

    score = 0;
    document.getElementById("score").innerHTML = score;
    level = 1;
    document.getElementById("level").innerHTML = level;

    isTab = false;
    isHold = false;
    isMove = false;

    blockColor = ["#E3A295", "#ECC225", "#9FBF82", "#939CD5", "#93C4D3"];

    initTetrisTable();
    initBlockArray();
    initColor();
    initAlert();

    tds = document.getElementsByClassName("tetris_td");
}

function initTetrisTable() {
    const table = document.getElementById("tetris_table");

    // table의 모든 자식 요소를 삭제
    while (table.firstChild) {
        table.removeChild(table.firstChild);
    }

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
    holdBlock = document.getElementById("hold_block");
}
