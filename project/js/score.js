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
