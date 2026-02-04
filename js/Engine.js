var mouse_x = -1;
var mouse_y = -1;
var scale = 1;

var canvasX, canvasY;
var c_click = false;

var fon_pic = new Image();
fon_pic.src = 'img/background.png';

// Класс игры
class HGame {

	constructor(WIDTH, HEIGHT) {
		// Создаём канву для отрисовки
		this._layers = [];
		this._layers.push( document.createElement('canvas') );
		document.body.appendChild(this._layers[0]);
		this._layers[0].style.position = 'fixed';
		this._layers[0].style.left = 0;
		this._layers[0].style.top = 0;
		this._layers[0].height = HEIGHT;
		this._layers[0].width = WIDTH;

		this._layers[0].style.backgroundColor = 'black';

		canvasX = this._layers[0].offsetLeft
		canvasY = this._layers[0].offsetTop;

		this.MainCamera = new Camera(800, 600, 1000, 800);

		this.frame=0;
		////console.log(this.MainCamera.width);


		// определяем контекст канвы
		this.context = this._layers[0].getContext('2d');
		var HGameEngine = this;

		
		//this.testplayer.fleets.fleet[1].setDestination(5,-6,1);
		this.turn = 1;
		this.phase = 1;

		this._layers[0].onclick = function(e) {
			mouse_x = (e.pageX - canvasX)  | 0;
			mouse_y = (e.pageY - canvasY)   | 0;

			c_click = true;

			
		}



		this._layers[0].onmousemove = function(e) {
			mouse_x = (e.pageX - canvasX)  | 0;
			mouse_y = (e.pageY - canvasY)   | 0;

			c_click = false;

		}

		this._layers[0].onmousewheel = function(e) { // обрабатываем колесико мыши
			var delta = e.deltaY;

			// меняем масштаб
			scale = scale+delta/1000;
			// проверяем масштаб - не менее 1 и не более 3
			if ((scale < 1) || (scale > 3)) {
				scale = scale-delta/1000;
			}
		}




		document.addEventListener('keydown', (event) => this.update(event, true));
		document.addEventListener('keyup', (event) => this.update(event, false));

		this.TestTurn = new GameProcess();
		this.TestTurn.CreateTurnPhase("Test phase") ;

		this.TestTurn.Start();
		this.TestTurn.NextTurn();

		// Test phase
		this.TestTurn.Turn[0].Execute = function(){
	
			
		}


	}

	update(event, pressed) {
		event.preventDefault();
		event.stopPropagation();
		///console.log(event.keyCode);
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
					console.log("Статус игры: "+this.TestTurn.TogglePausePlay());
				}
				break;

		}



		//if(this.keyMap.has(event.keyCode)) {
		//			event.preventDefault();
		//			event.stopPropagation();
		//			this[this.keyMap.get(event.keyCode)] = pressed;
		//	}
	}


	next_phase() {
	}
	
	next_turn() {
		this.TestTurn.ExecutePhase();

	}

	
	
	DrawInfo(){
		/*
		this.context.fillStyle = 'white';
		let population = 20;
		let planets_number = 20;
		let CP = 30;
		this.context.fillText( 'Население: '+population, 100, 20);
		this.context.fillText( 'Планет: '+planets_number, 200, 20);
		this.context.fillText( 'Ресурсы: '+CP, 300, 20);
		
		this.context.fillText( this.turn+' ход '+this.phase+' фаза', 700, 20);
		*/
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
		this.context.clearRect(0, 0, this._layers[0].width, this._layers[0].height );
		
		DrawPicture(this.context, fon_pic, 0, 0, fon_pic.width, fon_pic.height, 
			0, 0, this._layers[0].width, this._layers[0].height);
		

		this.context.font = 'bold 12px courier';
		this.context.textAlign = 'center';
		this.context.textBaseline = 'top';
		this.context.fillStyle = '#ddd';

		this.context.strokeStyle = 'white';
		
		this.context.fillStyle = '#0000FF'; // меняем цвет клеток
		this.context.fillRect(mouse_x-1, mouse_y-1, 3, 3);


		this.DrawInfo();
		requestAnimationFrame(this.Draw.bind(this));
	}


}




