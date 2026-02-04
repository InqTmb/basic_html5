var lang =  Array.from('ABCDEFGHIJKLMNOPQRSTUVWXYZ');

function getRandomInt(max, min = 0) {
	let result = Math.floor(Math.random() * (max+1 - min)) + min;
	///console.log("Между "+ min + " и " + max + " выбрано значение "+result);
	return result;
};

// функция отрисовки изображения на холсте. Параллельно можно записывать ID объекта в массив экранных координат для определения касаний
function DrawPicture(context, img, img_x, img_y, img_w, img_h, context_x, context_y, context_w, context_h, ID = 0) {
	/// context - холст
	/// img - изображение
	/// img_x, img_y, img_w, img_h - положение Х, У на искомом изображении, ширина фрагмента и его высота
	///	context_x, context_y, context_w, context_h - положение Х, У на холсте, ширина фрагмента и его высота
	/// ID - id для определения касаний
	
	// если в функцию передали только Х и У, то рисуем как есть
	if ( img_w == undefined && img_h == undefined && 
		context_x == undefined && context_y == undefined && 
		context_w == undefined && context_h){
		
		context_x = img_x;
		context_y = img_y;
		
		img_x = 0;
		img_y = 0;
		
		img_w = img.width;
		img_h = img.height;
		context_w = img.width;
		context_h = img.height;	
	
	}
	
	context.drawImage(img, img_x, img_y, img_w, img_h, context_x, context_y, context_w, context_h);
	
}