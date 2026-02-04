// Класс камеры
class Camera {
    //constructor({width = 640, height = 640, limitX = 50000, limitY = 50000} = {}) {
		constructor(width, height, limitX, limitY) {
        this.x = 0;
        this.y = 0;
        this.width = width;
        this.height = height;
        this.limitX = limitX;
        this.limitY = limitY;
    }

	MoveHorizontal(dx) {
		if (this.x+this.width+dx <= this.limitX & this.x+dx >= 0) {
			this.x=this.x + dx;
		}
	}

	MoveVertical(dy) {
		if (this.y+this.height+dy <= this.limitY & this.y+dy >= 0) {
			this.y=this.y + dy;
			console.log(this.y);
		}
	}
}