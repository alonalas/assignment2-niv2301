var context;
var shape = new Object();
var board;
var score;
var pac_color;
var start_time;
var time_elapsed;
var interval;
var madicineInterval;
var lifeArray;
var numBalls;
var time;
var monsters;
var fivePtsBall;
var fifteenPtsBall;
var twentyFivePtsBall;
var movement;
var upKey = 38;
var downKey = 40;
var rightKey = 39;
var leftKey = 37;

var pacman;

function game(upKey1, downKey1, rightKey1, leftKey1) {

    document.getElementById("signup").style.display = "none";
    document.getElementById("login").style.display = "none";
    document.getElementById("game").style.display = "block";
    document.getElementById("log_btn").style.display = "none";
    document.getElementById("reg_btn").style.display = "none";
    document.getElementById("reg_tab").style.display = "none";
    document.getElementById("log_tab").style.display = "none";
    document.getElementById("logout").style.display = "block";
    document.getElementById("settings").style.display = "none";

	time = document.getElementById("rangeValue1").innerHTML;
	monsters = document.getElementById("rangeValue2").innerHTML
	numBalls = document.getElementById("rangeValue3").innerHTML;
	fivePtsBall = document.getElementById("5color").value;
	fifteenPtsBall = document.getElementById("15color").value;
	twentyFivePtsBall = document.getElementById("25color").value;
	
	upKey = upKey1;
	downKey = downKey1;
	rightKey = rightKey1;
	leftKey = leftKey1;
	movement="right";
	Start();

}

$(document).ready(function() {
	context = canvas.getContext("2d");
	Start();
});




/*
0- nothing
1- small ball
2- medium ball
3- large ball
4- wall
5- monster
6- medicine
10- pacman
*/

function Start() {
	board = new Array();
	lifeArray = new Array(1,1,1,1,1);
	updateLives();
	score = 0;
	pac_color = "yellow";
	var cnt = 100;
	var nubmerBallInt=parseInt(numBalls)
	var food_remain = nubmerBallInt;
	var smallBall=nubmerBallInt*0.6;
	var medBall=nubmerBallInt*0.3;
	var largeBall=nubmerBallInt*0.1;
	var pacman_remain = 1;
	start_time = new Date();
	for (var i = 0; i < 10; i++) {
		board[i] = new Array();
		//put obstacles in (i=3,j=3) and (i=3,j=4) and (i=3,j=5), (i=6,j=1) and (i=6,j=2)
		for (var j = 0; j < 10; j++) {
			if (
				(i == 3 && j == 3) ||
				(i == 3 && j == 4) ||
				(i == 3 && j == 5) ||
				(i == 6 && j == 1) ||
				(i == 6 && j == 2)
			) {
				board[i][j] = 4; //wall=4	
			} else {
				var randomNum = Math.random();
				if (randomNum <= (1.0 * food_remain) / cnt) {

					var randomBalls = Math.random();
					if (randomBalls<=0.6){ //small
						if(smallBall>0){
							board[i][j]=1;
							smallBall--;
					    }
						else if(medBall>0){
							board[i][j]=2;
							medBall--;	
						}
						else if(largeBall>0){
							board[i][j]=3;
							largeBall--;
						}
						else
							break;
						food_remain--;
				    }
					else if (randomBalls>0.6 && randomBalls<=0.9){ //medium
						if(medBall>0){
							board[i][j]=2;
							medBall--;	
						}
						else if(largeBall>0){
							board[i][j]=3;
							largeBall--;	
						}
						else if(smallBall>0){
							board[i][j]=1;
							smallBall--;
						}
						else
							break;
						food_remain--;
				    }
					else { //large
						if(largeBall>0){
							board[i][j]=3;
							largeBall--;	
						}
						else if(medBall>0){
							board[i][j]=2;
							medBall--;	
						}
						else if(smallBall>0){
							board[i][j]=1;
							smallBall--;
						}
						else
							break;
						food_remain--;
				    }					
				} else if (randomNum < (1.0 * (pacman_remain + food_remain)) / cnt) {
					shape.i = i;
					shape.j = j;
					pacman_remain--;
					board[i][j] = 10; //pacman
				} else {
					board[i][j] = 0; //nada
				}
				cnt--;
			}
		}
	}
	while (food_remain > 0) {
		var emptyCell = findRandomEmptyCell(board);
		if(smallBall>0){
			board[emptyCell[0]][emptyCell[1]] = 1;
			smallBall--;
			food_remain--;
			continue;
		}
		else if(medBall>0){
			board[emptyCell[0]][emptyCell[1]] = 2;
			medBall--;
			food_remain--;
			continue;
		}
		board[emptyCell[0]][emptyCell[1]] = 3;
		largeBall--;
		food_remain--;
	}
	keysDown = {};
	addEventListener(
		"keydown",
		function(e) {
			keysDown[e.keyCode] = true;
		},
		false
	);
	addEventListener(
		"keyup",
		function(e) {
			keysDown[e.keyCode] = false;
		},
		false
	);
	interval = setInterval(UpdatePosition, 250);
	madicineInterval = setInterval(dropMadicine, 3000);
}

function addLife() {
	if (lifeArray[4] == 1)
		return;
	for (var i = 0; i < 5; i++) {
		if (lifeArray[i]==0){
			lifeArray[i] = 1;
			return;
		}
	}
}

function dropMadicine() {
	var emptyCell = findRandomEmptyCell(board);
	//delete medicine
	for (var i = 0; i < 10; i++) {
		for (var j = 0; j < 10; j++) {
			if (board[i][j]==6){
				board[i][j] = 0;///delete madicine
				break;
			}
		}
	}	
	board[emptyCell[0]][emptyCell[1]] = 6; // add one medicine
	
}


function findRandomEmptyCell(board) {
	var i = Math.floor(Math.random() * 9 + 1);
	var j = Math.floor(Math.random() * 9 + 1);
	while (board[i][j] != 0) {
		i = Math.floor(Math.random() * 9 + 1);
		j = Math.floor(Math.random() * 9 + 1);
	}
	return [i, j];
}

function GetKeyPressed() {
	if (keysDown[upKey]) {
		return 1;
	}
	if (keysDown[downKey]) {
		return 2;
	}
	if (keysDown[leftKey]) {
		return 3;
	}
	if (keysDown[rightKey]) {
		return 4;
	}
}




/*
0- nothing
1- small ball
2- medium ball
3- large ball
4- wall
5- monster
6- madicine
10- pacman
*/
function Draw(movement) {
	canvas.width = canvas.width; //clean board
	lblScore.value = score;
	lblTime.value = time_elapsed;

	//////////////////////// settings
	monsterHtml.value=monsters;
	ballsHtml.value=numBalls;
	timeHTML.value = time;
	$("#5pt").css("background-color",fivePtsBall);
	$("#15pt").css("background-color",fifteenPtsBall);
	$("#25pt").css("background-color",twentyFivePtsBall);

	for (var i = 0; i < 10; i++) {
		for (var j = 0; j < 10; j++) {
			var center = new Object();
			center.x = i * 60 + 30;
			center.y = j * 60 + 30;
			if (board[i][j] == 10) { //draw the pacmam
				switch(movement){
					case "up":
						pacman=new Image();
						pacman.src= "images1/up.png";
						context.drawImage(pacman, center.x-30, center.y-30, 60, 60);
						break;
						
					case "down":
						pacman=new Image();
						pacman.src= "images1/down.png";
						context.drawImage(pacman, center.x-30, center.y-30, 60, 60);
						break;
					case "left":
						pacman=new Image();
						pacman.src= "images1/left.png";	
						context.drawImage(pacman, center.x-30, center.y-30, 60, 60);
						break;
					case "right":
						pacman=new Image();
						pacman.src= "images1/right.png";
						context.drawImage(pacman, center.x-30, center.y-30, 60, 60);
						break;
				}
			} 
			else if (board[i][j] == 1) { //draw food
				context.beginPath();
				context.arc(center.x, center.y, 15, 0, 2 * Math.PI); // circle
				context.fillStyle = fivePtsBall; //color
				context.fill();
			}
			else if (board[i][j] == 2) { //draw food
				context.beginPath();
				context.arc(center.x, center.y, 20, 0, 2 * Math.PI); // circle
				context.fillStyle = fifteenPtsBall; //color
				context.fill();
			}
			else if (board[i][j] == 3) { //draw food
				context.beginPath();
				context.arc(center.x, center.y, 25, 0, 2 * Math.PI); // circle
				context.fillStyle = twentyFivePtsBall; //color
				context.fill();
			} else if (board[i][j] == 4) { //draw walls
				context.beginPath();
				context.rect(center.x - 30, center.y - 30, 60, 60);
				context.fillStyle = "grey"; //color
				context.fill();
			} else if (board[i][j] == 6) { //draw madicine
				// context.beginPath();
				madicine=new Image();
				madicine.src= "images1/madicine.png";
				madicine.style.width="50";
				madicine.style.height="50";
				context.drawImage(madicine, center.x-30, center.y-30, 50, 50);
				// context.fillStyle = "grey"; //color
				// context.fill();
			}
		}
	}
}

function updateLives(){ 
	for (var i=0; i<5; i++) {
		if( lifeArray[i]==1){
			$("#life"+i.toString()).css("display", "block");
		}
		else {
			$("#life"+i.toString()).css("display", "none");
		}
	}
}
//up-1
//down-2
//left-3
//right-4

function UpdatePosition() {
	board[shape.i][shape.j] = 0;
	var x = GetKeyPressed();
	
	if (x == 1) {
		if (shape.j > 0 && board[shape.i][shape.j - 1] != 4) {
			shape.j--;
			movement = "up";
		}
	}
	if (x == 2) {
		if (shape.j < 9 && board[shape.i][shape.j + 1] != 4) {
			shape.j++;
			movement = "down";
		}
	}
	if (x == 3) {
		if (shape.i > 0 && board[shape.i - 1][shape.j] != 4) {
			shape.i--;
			movement = "left";
		}
	}
	if (x == 4) {
		if (shape.i < 9 && board[shape.i + 1][shape.j] != 4) {
			shape.i++;
			movement = "right";
		}
	}
	if (board[shape.i][shape.j] == 1) {
		score+=5;
	}
	if (board[shape.i][shape.j] == 2) {
		score+=15;
	}
	if (board[shape.i][shape.j] == 3) {
		score+=25;
	}
	if (board[shape.i][shape.j] == 6) {
		addLife();		//update life table
		updateLives()
		//display life amount 
	}
	board[shape.i][shape.j] = 10;
	var currentTime = new Date();
	time_elapsed = (currentTime - start_time) / 1000;
	if (score >= 20 && time_elapsed <= 10) {
		pac_color = "green";
	}
	if (score == 50) {
		window.clearInterval(interval);
		///check if to do this with medicineInterval also
		window.alert("Game completed");
	} else {
		//window.clearInterval(interval);

		window.clearInterval(madicineInterval);
		Draw(movement);
	}
}

window.addEventListener("keydown",function (e) {
	if ([32,37,38,39,40].indexOf(e.keyCode) > -1 ){
		e.preventDefault();
	}
},false); 	
