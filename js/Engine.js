var mouse_x = -1;
var mouse_y = -1;
var scale = 1;

var canvasX, canvasY;
var c_click = false;

var fon_pic = new Image();
fon_pic.src = "img/background.png";
//fon_pic.src = 'img/background.jpg';

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

        ///this.MainCamera = new Camera(800, 600, 1000, 800);
        this.MainCamera = new Camera({
            width: this._layers[0].width,
            height: this._layers[0].height,
            limitX: 1918,
            limitY: 960,
            zoom: 1,
        });

        this.frame = 0;
        ////console.log(this.MainCamera.width);

        // определяем контекст канвы
        this.context = this._layers[0].getContext("2d");
        var HGameEngine = this;

        this.mouse_x = 0;
        this.mouse_y = 0;

        //this.testplayer.fleets.fleet[1].setDestination(5,-6,1);
        this.turn = 1;
        this.phase = 1;

        this.controls = new Controls();

        /*
        this._layers[0].onclick = function (e) {
            mouse_x = (e.pageX - canvasX) | 0;
            mouse_y = (e.pageY - canvasY) | 0;

            c_click = true;
        };
*/
        /*
        this._layers[0].onmousemove = function (e) {
            mouse_x = (e.pageX - canvasX) | 0;
            mouse_y = (e.pageY - canvasY) | 0;

            c_click = false;

            HGameEngine.mouse_x = mouse_x;
            HGameEngine.mouse_y = mouse_y;
*/
        /*
			if (mouse_x < div(HGameEngine._layers[0].width,5)){
				HGameEngine.MainCamera.MoveHorizontal(-2);
			}
			
			if (mouse_x > (HGameEngine._layers[0].width-div(HGameEngine._layers[0].width,5))){
				HGameEngine.MainCamera.MoveHorizontal(2);
			}
			*/ /*
        };

		*/
        /*

        this._layers[0].onmousewheel = function (e) {
            // обрабатываем колесико мыши
            ///var delta = e.deltaY;
            ///HGameEngine.MainCamera.ChangeZoom(delta/1000);

            // получаем только направление, вниз или вверх
            HGameEngine.MainCamera.ChangeZoom(Math.sign(e.deltaY));
        };
*/
        /*
        document.addEventListener("keydown", (event) =>
            this.update(event, true)
        );
        document.addEventListener("keyup", (event) =>
            this.update(event, false)
        );

		*/

        this.TestTurn = new GameProcess();
        this.TestTurn.CreateTurnPhase("Test phase");

        this.TestTurn.Start();
        this.TestTurn.NextTurn();

        // Test phase
        this.TestTurn.Turn[0].Execute = function () {};
    }

    /*
	
    update(event, pressed) {
        event.preventDefault();
        event.stopPropagation();
        console.log(`keyboard code: ${event.keyCode}`);
        //console.log(event);
        //console.log(pressed);

        switch (event.keyCode) {
            case 37:
                this.MainCamera.MoveHorizontal(-2);
                break;
            case 38:
                this.MainCamera.MoveVertical(-2);
                break;
            case 39:
                this.MainCamera.MoveHorizontal(2);
                break;
            case 40:
                this.MainCamera.MoveVertical(2);
                break;
            // кнопка T
            case 84:
                if (!pressed) {
                    ///this.next_phase();
                    ///this.TestTurn.NextTurnPhase();
                    this.TestTurn.ExecutePhase(true);
                }
                break;
            // кнопка P
            case 80:
                if (!pressed) {
                    ///this.next_phase();
                    console.log(
                        "Статус игры: " + this.TestTurn.TogglePausePlay()
                    );
                }
                break;
        }

		

        //if(this.keyMap.has(event.keyCode)) {
        //			event.preventDefault();
        //			event.stopPropagation();
        //			this[this.keyMap.get(event.keyCode)] = pressed;
        //	}
    }

	*/

    next_phase() {}

    next_turn() {
        this.TestTurn.ExecutePhase();
    }

    DrawInfo() {
        this.context.fillStyle = "white";
        let population = 20;
        let planets_number = 20;
        let CP = 30;
        this.context.fillText(
            `Zoom: ${this.MainCamera.zoom.toFixed(2)}`,
            100,
            20
        );
        this.context.fillText(
            `X: ${this.controls.mouse.x} Y: ${this.controls.mouse.y} W: ${this.controls.mouse.wheel}`,
            250,
            20
        );
        this.context.fillText("Ресурсы: " + CP, 500, 20);

        this.context.fillText(
            this.turn + " ход " + this.phase + " фаза",
            700,
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

        if (this.controls.left) {
            this.MainCamera.MoveHorizontal(-2);
        }

        if (this.controls.right) {
            this.MainCamera.MoveHorizontal(2);
        }

        if (this.controls.up) {
            this.MainCamera.MoveVertical(-2);
        }

        if (this.controls.down) {
            this.MainCamera.MoveVertical(2);
        }

        this.context.clearRect(
            0,
            0,
            this._layers[0].width,
            this._layers[0].height
        );

        this.MainCamera.Update(this.controls.mouse);

        DrawPicture(
            this.context,
            fon_pic,
            this.MainCamera.x - div(this.MainCamera.FoVheight, 2),
            this.MainCamera.y - div(this.MainCamera.FoVwidth, 2),
            this.MainCamera.FoVheight,
            this.MainCamera.FoVwidth,
            0,
            0,
            this._layers[0].width,
            this._layers[0].height
        );

        this.context.font = "bold 12px courier";
        this.context.textAlign = "center";
        this.context.textBaseline = "top";
        this.context.fillStyle = "#ddd";

        this.context.strokeStyle = "white";

        this.context.fillStyle = "#0000FF"; // меняем цвет клеток
        this.context.fillRect(mouse_x - 1, mouse_y - 1, 3, 3);

        this.DrawInfo();

        requestAnimationFrame(this.Draw.bind(this));
    }
}
