class Controls {
    constructor() {
        this.up = false;
        this.down = false;
        this.left = false;
        this.right = false;
        this.fire = false;

        this.mouse = { x: 200, y: 100, wheel: 1 };

        this.keyMap = new Map([
            [37, "left"],
            [39, "right"],
            [38, "up"],
            [40, "down"],
            [32, "fire"],
        ]);
        document.addEventListener("keydown", (event) =>
            this.update(event, true)
        );
        document.addEventListener("keyup", (event) =>
            this.update(event, false)
        );

        document.addEventListener("mousemove", (event) =>
            this.mouseUpdate(event)
        );

        document.addEventListener("mousewheel", (event) =>
            this.mouseUpdate(event)
        );

        document.addEventListener("click", (event) => this.mouseUpdate(event));
    }

    update(event, pressed) {
        if (this.keyMap.has(event.keyCode)) {
            event.preventDefault();
            event.stopPropagation();
            this[this.keyMap.get(event.keyCode)] = pressed;
        }
    }

    mouseUpdate(event) {
        switch (event.type) {
            case "mousewheel":
                this.mouse.wheel = Math.sign(event.deltaY);

                ///console.log(event);
                ///console.log(`mousewheel`);
                break;
            case "mousemove":
                this.mouse.x = event.pageX;
                this.mouse.y = event.pageY;

                ///console.log(`mousemove`);

                break;
            case "click":
                console.log(`click`);

                break;
            default:
            ///console.log(event);
            ///console.log(`TYPE: ${event.type}`);
        }
    }
}
