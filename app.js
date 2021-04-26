var context;
var shape = new Object();
var board;
var score;
var pac_color;
var start_time;
var time_elapsed;
var interval;
var numBalls;
var time;
var monsters;
var fivePtsBall;
var fifteenPtsBall;
var twentyFivePtsBall;
var upKey = 38;
var downKey = 40;
var rightKey = 39;
var leftKey = 37;

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

	Start();

}




$(document).ready(function() {
	context = canvas.getContext("2d");
	Start();

	// $("#numMons").text(monsters);
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
6- medicine
10- pacman
*/
function Draw() {
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
				context.beginPath();
				context.arc(center.x, center.y, 30, 0.15 * Math.PI, 1.85 * Math.PI); // half circle
				context.lineTo(center.x, center.y);
				context.fillStyle = pac_color; //color
				context.fill();
				context.beginPath();
				context.arc(center.x + 5, center.y - 15, 5, 0, 2 * Math.PI); // circle
				context.fillStyle = "black"; //color
				context.fill();
			} else if (board[i][j] == 1) { //draw food
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
			}
		}
	}
}

function UpdatePosition() {
	board[shape.i][shape.j] = 0;
	var x = GetKeyPressed();
	if (x == 1) {
		if (shape.j > 0 && board[shape.i][shape.j - 1] != 4) {
			shape.j--;
		}
	}
	if (x == 2) {
		if (shape.j < 9 && board[shape.i][shape.j + 1] != 4) {
			shape.j++;
		}
	}
	if (x == 3) {
		if (shape.i > 0 && board[shape.i - 1][shape.j] != 4) {
			shape.i--;
		}
	}
	if (x == 4) {
		if (shape.i < 9 && board[shape.i + 1][shape.j] != 4) {
			shape.i++;
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
	board[shape.i][shape.j] = 10;
	var currentTime = new Date();
	time_elapsed = (currentTime - start_time) / 1000;
	if (score >= 20 && time_elapsed <= 10) {
		pac_color = "green";
	}
	if (score == 50) {
		window.clearInterval(interval);
		window.alert("Game completed");
	} else {
		Draw();
	}
}
