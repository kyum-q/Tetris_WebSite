var WIDTH = 0;
var HEIGHT = 0;

var tds = null;
var blockLoc = 0;
var blockColor = null;
var timerID =  null;
var blockArray = null;
window.focus();

function init(w, h) {
    WIDTH = w;
    HEIGHT = h;

    // 10x10 2차원 배열 만들기
    // 블록 배열 생성 및 초기화
    blockArray = new Array(HEIGHT);
    for (let i = 0; i < HEIGHT; i++) {
        blockArray[i] = new Array(WIDTH);
        for (let j = 0; j < WIDTH; j++)
            blockArray[i][j] = null; // 테스트 시에 3으로 초기화
    }
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

window.onload = function () {
    init(7, 5);
    setTetrisTable();

    tds = document.getElementsByClassName("tetris_td");
    tds[blockLoc].style.backgroundColor = "skyblue";

    // timer set
    timerID = setInterval("moveDown()",300);
}

function startNew() {
    // new start
    blockLoc = 0;
    tds[blockLoc].style.backgroundColor = "skyblue";
}

function overGame() {
    if(timerID != null) {
        clearInterval(timerID);
        timerID = null;
        alert("Game Over!!!!");
    }
}
