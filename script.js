function runScript(){
	canvas = document.getElementById('canvas');
	draw = canvas.getContext('2d');
	radius = canvas.height / 2;
	draw.translate(radius,radius);
	radius = radius * 0.9;
	setInterval(drawClock,1000);
}
//function to draw clock
function drawClock(){
	drawCircle(draw,radius);
	createGradient(draw,radius);
	createDot(draw,radius);
	drawNumbers(draw,radius);
	drawTime(draw,radius);
	drawText(draw);
}
//function to draw  a circle
function drawCircle(draw,radius){
	//draw the white cicle
	draw.beginPath();
	draw.arc(0,0,radius,0,2*Math.PI);
	draw.fillStyle = '#f4f4f4';
	draw.fill();
}
//function for gradient
function createGradient(draw,radius){
	var gradient = draw.createRadialGradient(0,0,radius*0.9,0,0,radius*1.06);
	gradient.addColorStop(0,'#005555');
	gradient.addColorStop(0.3,'#006666');
	gradient.addColorStop(1,'white');
	draw.strokeStyle = gradient;
	draw.lineWidth = radius*0.1;
	draw.stroke();
}
//function to draw dot
function createDot(draw,radius){
	draw.beginPath();
	draw.arc(0,0,radius*0.05,0,2*Math.PI);
	draw.fillStyle = '#005555';
	draw.fill();
}
//funtion to draw numbers
function drawNumbers(draw,radius){
	var rotate = 29.85*(Math.PI/180);
	var angle = rotate;
	draw.font = 'oblique bold '+(radius*0.07)+'px georgia';
	draw.textBaseline = 'middle';
	draw.textAline = 'center';
	for(var num = 1; num <= 12; num++){
		draw.rotate(angle);
		draw.translate(0,-radius*0.85);
		draw.rotate(-angle);
		draw.fillText(num,0,0);
		//reverse
		draw.rotate(angle);
		draw.translate(0,radius*0.85);
		draw.rotate(-angle);
		angle += rotate;
	}
	
}
//function to draw time
function drawTime(draw,radius){
	//get time
	var now = new Date();
	var hour = now.getHours();
	var minute = now.getMinutes();
	var second = now.getSeconds(); 

	//calculate hour
	// if hour is greater than 12, start the count from 1.
	hour = hour % 12;
	hour = (hour * Math.PI/6) + (minute * Math.PI/(6*60)) + (second * Math.PI/(6*60*60));
	//call the function drawHand to draw hour's hand
	drawHand(draw,radius*0.5,radius*0.04,hour);

	minute = (minute * Math.PI/30) + (second * Math.PI/(30*60));
	//call the function drawHand to draw minute's hand
	drawHand(draw,radius*0.7,radius*0.02,minute);

	second = (second * Math.PI/30);
	//call the function drawHand to draw second's hand
	drawHand(draw,radius*0.7,radius*0.01,second);

}
//function to draw hand
function drawHand(draw,length,width,position){
	draw.beginPath();
	draw.moveTo(0,0);
	draw.rotate(position);
	draw.lineTo(0,-length);
	draw.lineCap = "round";
	draw.lineWidth = width;
	draw.stroke();
	draw.rotate(-position);
}
//function to draw text
function drawText(draw){
	now = new Date();
	month = now.getMonth();
	month = displayMonth(month);
	day = now.getDate();
	year = now.getFullYear();
	date = day + ": " + month + ": " + year;
	draw.font = 'oblique bold 20px arial';
	draw.fillStyle = '#005555';
	draw.fillText(date.toString(),40,0);
}
//function to display month
function displayMonth(month){
	//months = [1,2,3,4,5,6,7,8,9,10,11,12];
	monthsInWord = ['Jan','Feb','Mar','April','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
	month = monthsInWord[month];
	return month;
}