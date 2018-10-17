
//initialize canvas
var canvas = document.getElementById("snakeCanvas");
var ctx = canvas.getContext("2d");

//snake's position
var snakeX = 200;
var snakeY = 200;

//snake size, color and speed.
var snakeWidth = 20;
var snakeHeight = 20;
var snakeColor = "#228B22";
var snakeSpeed = 10;

//apple color
var appleColor = "#FF0000";
//the fps for the game
var fps = 30;

DrawApple();
DrawSnake(snakeX, snakeY);

//draws the apple on a random position
function DrawApple() {
    var randomX = Math.random() * (390 - 20) + 20;
    var randomY = Math.random() * (390 - 20) + 20;
    ctx.fillStyle = appleColor;
    ctx.fillRect(randomX, randomY, snakeWidth, snakeHeight);    
}

// draws the snake
function DrawSnake(x, y) {
    ctx.fillStyle = snakeColor;
    ctx.fillRect(x, y, snakeWidth, snakeHeight);
}

function Update() {
    
    document.onkeydown = checkKey;

    function checkKey(e) {

        e = e || window.event;

        if(e.keyCode == '87') {
            snakeY -= snakeSpeed;
        }
    }
}

function Draw() {
    ctx.clearRect(snakeX, snakeY + snakeSpeed, snakeWidth, snakeHeight);
    ctx.fillStyle = snakeColor;
    ctx.fillRect(snakeX, snakeY, snakeWidth, snakeHeight);
}

function GameLoop(){
    Update();
    Draw();
    window.requestAnimationFrame(GameLoop);
}

window.requestAnimationFrame(GameLoop);

  

    
  
