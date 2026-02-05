// Класс камеры
class Camera {
    constructor({
        width = 640,
        height = 640,
        limitX = 50000,
        limitY = 50000,
        zoom = 1,
        zoomDelta = 0.05,
    } = {}) {
        //constructor(width, height, limitX, limitY) {
        this.x = div(width, 2);
        this.y = div(height, 2);
        this.zoom = zoom;
        this.width = width;
        this.height = height;
        this.limitX = limitX;
        this.limitY = limitY;

        this.zoomDelta = zoomDelta; // скорость изменения зума

        this.ChangeZoom(0);
    }

    ChangeZoom(delta) {
        if (
            this.zoom + this.zoomDelta * delta < 0.1 ||
            this.zoom + this.zoomDelta * delta > 3
        ) {
            return;
        }

        this.zoom = this.zoom + this.zoomDelta * delta;

        this.FoVwidth = this.width * this.zoom;
        this.FoVheight = this.height * this.zoom;
    }

    MoveHorizontal(dx) {
        if ((this.x + this.width + dx <= this.limitX) & (this.x + dx >= 0)) {
            this.x = this.x + dx;
        }
    }

    MoveVertical(dy) {
        if ((this.y + this.height + dy <= this.limitY) & (this.y + dy >= 0)) {
            this.y = this.y + dy;
        }
    }

    Update(mouse) {
        if (mouse.x < div(this.width, 5)) {
            this.MoveHorizontal(-2);
        }

        if (mouse.x > this.width - div(this.width, 5)) {
            this.MoveHorizontal(2);
        }

        if (mouse.y < div(this.height, 5)) {
            this.MoveVertical(-2);
        }

        if (mouse.y > this.height - div(this.height, 5)) {
            this.MoveVertical(2);
        }

        if (mouse.wheel != 0) {
            this.ChangeZoom(mouse.wheel);
            mouse.wheel = 0; // сбрасываем значение колеса мыши после обработки
        }
    }
}
