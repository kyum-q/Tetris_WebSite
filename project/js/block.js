function Block(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;

    // 필요한 메소드 삽입하세요.
    this.draw = function () {
        tds[y*WIDTH+x].style.backgroundColor = this.color;
    }

    this.remove = function () {
        tds[y*WIDTH+x].style.backgroundColor = "white";
    }

    this.checkColor = function (color) {
        return this.color === color;
    }
}