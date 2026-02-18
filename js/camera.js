// Класс камеры
class Camera {
    constructor({
        width = 640,
        height = 480,
        limitX = 50000,
        limitY = 50000,
        useZoom = false,
        zoom = 1,
        zoomDelta = 0.05,
    } = {}) {
        this.x = div(width, 2);
        this.y = div(height, 2);
        this.zoom = zoom;
        this.useZoom = useZoom;
        this.width = width;
        this.height = height;

        this.FoVwidth = this.width * this.zoom;
        this.FoVheight = this.height * this.zoom;

        this.minLimitX = this.x;
        this.minLimitY = this.y;
        this.limitX = limitX;
        this.limitY = limitY;

        this.zoomDelta = zoomDelta; // скорость изменения зума

        this.active = false;

        this.watchTarget = false;
        this.target = null;
    }

    set activate(bool) {
        this.active = bool;
    }

    watch(target) {
        this.watchTarget = true;
        this.target = target;
    }

    ChangeZoom(delta) {
        if (!this.useZoom) {
            return;
        }
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
        // если перемещение выводит нас за установленные min и max - выходим
        if ((dx < 0) & (this.x + dx < this.minLimitX * this.zoom)) {
            return;
        } else if (
            (dx > 0) &
            (this.x + div(this.FoVwidth, 2) + dx > this.limitX)
        ) {
            return;
        }
        this.x = this.x + dx;
    }

    MoveVertical(dy) {
        // если перемещение выводит нас за установленные min и max - выходим
        if ((dy < 0) & (this.y + dy < this.minLimitY * this.zoom)) {
            return;
        } else if (
            (dy > 0) &
            (this.y + div(this.FoVheight, 2) + dy > this.limitY)
        ) {
            return;
        }
        this.y = this.y + dy;
    }

    Update(mouse) {
        if (this.watchTarget) {
            if (this.target.x > this.x + this.width - this.scrollEdge) {
                this.x = Math.min(
                    this.limitX,
                    this.target.x - this.width + this.scrollEdge
                );
            }

            if (this.target.x < this.x + this.scrollEdge) {
                this.x = Math.max(0, this.target.x - this.scrollEdge);
            }

            if (this.target.y > this.y + this.height - this.scrollEdge) {
                this.y = Math.min(
                    this.limitY,
                    this.target.y - this.height + this.scrollEdge
                );
            }

            if (this.target.y < this.y + this.scrollEdge) {
                this.y = Math.max(0, this.target.y - this.scrollEdge);
            }
        } else {
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
}
