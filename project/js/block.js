function Block(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;

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