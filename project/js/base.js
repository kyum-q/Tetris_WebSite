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
    for(let i=0; i<HEIGHT; i++) {
        blockArray[i] = new Array(WIDTH);
        for(let j=0; j<WIDTH; j++)
            blockArray[i][j] = null; // 테스트 시에 3으로 초기화
    }

    // 생성된 배열 출력하여 테스트
    /*
    var str="";
    for(let i=0; i<10; i++) {
        for(let j=0; j<10; j++)
            str += blockArray[i][j] + " ";
        str += "\n";
    }

    alert(str);
    */
}

window.onload = function () {
    init(10, 10);
    tds = document.getElementsByTagName("td");
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
