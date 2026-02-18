var mouse_x = -1;
var mouse_y = -1;
var scale = 1;

var canvasX, canvasY;
var c_click = false;

// Класс игры
class HGame {
    constructor(WIDTH, HEIGHT) {
        // Создаём канву для отрисовки
        this._layers = [];
        this._layers.push(document.createElement("canvas"));
        document.body.appendChild(this._layers[0]);
        this._layers[0].style.position = "fixed";
        this._layers[0].style.left = 0;
        this._layers[0].style.top = 0;
        this._layers[0].height = HEIGHT;
        this._layers[0].width = WIDTH;

        this._layers[0].style.backgroundColor = "black";

        canvasX = this._layers[0].offsetLeft;
        canvasY = this._layers[0].offsetTop;

        this.MainCamera = new Camera({
            width: this._layers[0].width,
            height: this._layers[0].height,
            limitX: 1918,
            limitY: 960,
            zoom: 1,
            zoomDelta: 0.05,
            useZoom: false,
        });

        ///this.activeCamera = this.MainCamera;
        this.SetActiveCamera(this.MainCamera);

        this.frame = 0;
        ////console.log(this.MainCamera.width);

        // определяем контекст канвы
        this.context = this._layers[0].getContext("2d");
        var HGameEngine = this;

        this.images = {};
        this.isImagesLoaded = false;

        this.loadImages({
            background: "img/background.png",
            characters: "img/future_chars_2.png",
        });

        this.mouse_x = 0;
        this.mouse_y = 0;

        this.turn = 1;
        this.phase = 1;

        this.controls = new Controls();

        this.TestTurn = new GameProcess();
        this.TestTurn.CreateTurnPhase("Test phase");

        this.TestTurn.Start();
        this.TestTurn.NextTurn();

        // Test phase
        this.TestTurn.Turn[0].Execute = function () {};

        /// test animation
        this.cop = {
            cop_frame: 0,
            x: this.activeCamera.x,
            y: this.activeCamera.y,
        };
        /*
        this.cop_frame = 0;
        this.cop_x = this.activeCamera.x;
        this.cop_y = this.activeCamera.y;
		*/
    }

    loadImages(imageFiles) {
        const loader = new ImageLoader(imageFiles);
        loader.load().then((names) => {
            ///console.log(loader.images);
            this.images = Object.assign(this.images, loader.images);
            this.isImagesLoaded = true;

            console.log(`loaded: ${names}`);

            this.Draw();
        });
    }

    SetActiveCamera(camera) {
        if (this.activeCamera) {
            this.activeCamera.activate = false;
        }
        this.activeCamera = camera;
        this.activeCamera.activate = true;
    }

    next_phase() {}

    next_turn() {
        console.log(typeof fon_pic);
        this.TestTurn.ExecutePhase();
    }

    DrawInfo() {
        this.context.fillStyle = "white";
        this.context.textAlign = "left";

        this.context.fillText(
            `Cam_X: ${this.activeCamera.x} Cam_Y: ${
                this.activeCamera.y
            } Cam_Z: ${this.activeCamera.zoom.toFixed(2)}`,
            50,
            20
        );
        this.context.fillText(
            `Mouse_X: ${this.controls.mouse.x} Mouse_Y: ${this.controls.mouse.y} Mouse_W: ${this.controls.mouse.wheel}`,
            50,
            50
        );

        this.context.fillText(
            this.turn + " ход " + this.phase + " фаза",
            500,
            20
        );
    }

    Draw() {
        ///console.log(this.frame++);
        /*
		if (this.frame %10 !=0) {
			console.log("	условие");
			requestAnimationFrame(this.Draw());
		}
		*/
        //Game.TestTurn.ExecutePhase();

        //this.context.fillStyle = 'black';

        if (this.controls.turn) {
            this.next_turn();
        }

        if (this.controls.target) {
            this.activeCamera.watch(this.cop);
        }

        if (this.controls.left) {
            this.activeCamera.MoveHorizontal(-2);
        }

        if (this.controls.right) {
            this.activeCamera.MoveHorizontal(2);
        }

        if (this.controls.up) {
            this.activeCamera.MoveVertical(-2);
        }

        if (this.controls.down) {
            this.activeCamera.MoveVertical(2);
        }

        this.context.clearRect(
            0,
            0,
            this._layers[0].width,
            this._layers[0].height
        );

        this.activeCamera.Update(this.controls.mouse);

        if (!this.isImagesLoaded) {
            requestAnimationFrame(this.Draw.bind(this));
        }

        const img = this.images["background"];

        DrawPicture(
            this.context,
            this.images["background"],
            this.activeCamera.x - div(this.activeCamera.FoVwidth, 2),
            this.activeCamera.y - div(this.activeCamera.FoVheight, 2),
            this.activeCamera.FoVwidth,
            this.activeCamera.FoVheight,
            0,
            0,
            this._layers[0].width,
            this._layers[0].height
        );

        //////////////////////////////////////////////// draw test animation
        //
        DrawPicture(
            this.context,
            this.images["characters"],
            this.cop.cop_frame * 32,
            6 * 32,
            32,
            32,
            this.cop.x -
                this.activeCamera.x +
                div(this.activeCamera.FoVwidth, 2) -
                16,

            this.cop.y -
                this.activeCamera.y +
                div(this.activeCamera.FoVheight, 2) -
                16,
            32 / this.activeCamera.zoom,
            32 / this.activeCamera.zoom,
            0
        );
        this.cop.cop_frame++;
        ///this.cop_x = 100;
        this.cop.x = this.cop.x + 2;
        if (this.cop.cop_frame > 5) {
            this.cop.cop_frame = 0;
        }

        if (this.cop.x > this.images["background"].width) {
            this.cop.x = 0;
        }
        ////////////////////////////////////////////////////// test animation

        this.context.font = "bold 12px courier";
        this.context.textAlign = "center";
        this.context.textBaseline = "top";
        this.context.fillStyle = "#ddd";

        this.context.strokeStyle = "white";

        this.context.fillStyle = "#0000FF"; // меняем цвет клеток
        //this.context.fillRect(mouse_x - 1, mouse_y - 1, 3, 3);

        this.context.fillStyle = "#0daf22"; // меняем цвет клеток
        this.context.fillRect(
            320 -
                this.activeCamera.x * this.activeCamera.zoom +
                div(this.activeCamera.FoVwidth, 2),
            //div(this.activeCamera.FoVwidth, 2) - this.activeCamera.x + 206,
            240 -
                this.activeCamera.y * this.activeCamera.zoom +
                div(this.activeCamera.FoVheight, 2),
            //div(this.activeCamera.FoVheight, 2) - this.activeCamera.y + 143,
            //200 - this.activeCamera.x + div(this.activeCamera.FoVwidth, 2),
            //200 - this.activeCamera.y + div(this.activeCamera.FoVheight, 2),
            3,
            3
        );

        this.DrawInfo();

        requestAnimationFrame(this.Draw.bind(this));
    }
}
