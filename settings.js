var upKey=38;
var downKey=40;
var leftKey=37;
var rightKey=39;

function checkSetting(){ 
    //todo
    let numBalls = document.getElementById("rangeValue1").value;
    let time = document.getElementById("rangeValue3").value;
    let monsters = document.getElementById("rangeValue2").value;

    $("#settings").validate({
        submitHandler: function(form){
            game(numBalls,time,monsters, upKey, downKey, rightKey, leftKey);
        }
    }); 

}

function updateKey(event, key) {
    switch (key) {
        case "up":
            if(!(event.keyCode===downKey ||event.keyCode===leftKey||event.keyCode===rightKey)) {
                upKey = event.keyCode;
                $("#upB").text(event.keyCode);
            }
            else {
                window.alert("Please Choose Other Key!");
                $("#upButton").text("");
            }
            break;
        case "down": 
            if(!(event.keyCode===upKey ||event.keyCode===leftKey||event.keyCode===rightKey)) {
                downKey = event.keyCode;
                $("#downB").text(event.keyCode);
            }
            else {
                window.alert("Please Choose Other Key!");
                $("#downButton").text("");
            }
            break;
        case "left": 
            if(!(event.keyCode===downKey ||event.keyCode===upKey||event.keyCode===rightKey)) {
                leftKey = event.keyCode;
                $("#leftB").text(event.keyCode);
            }
            else {
                window.alert("Please Choose Other Key!");
                $("#leftButton").text("");
            }
            break;
        case "right": 
            if(!(event.keyCode===downKey ||event.keyCode===leftKey||event.keyCode===upKey)) {
                rightKey =event.keyCode;
                $("#rightB").text(event.keyCode);
            }
            else {
                window.alert("Please Choose Other Key!");
                $("#rightButton").text("");
            }
            break;
    }
    //we reach here only if all keys are OK
}

function randomSettings(){
    $("#leftButtom").val = 37;
    $("#upButtom").val = 38;
    $("#rightButtom").val = 38;
    $("#downButtom").val = 38;
    $("#5color").css("background-color", getRandomColor());
    $("#15color").css("background-color", getRandomColor());
    $("#25color").css("background-color", getRandomColor());

}

// $("colour").change(function(event) {
//     $("color_front").css('background-color',$(this).val());
// });

// $("color_front").click(function(event) {
//     $("colour").click();
// });

$("#colour1").change(function(event) {
    $("#color_front1").css('background-color',$(this).val());
});

$("#color_front1").click(function(event) {
    $("#colour1").click();
});

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }