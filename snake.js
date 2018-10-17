
//initialize canvas
var canvas = document.getElementById("snakeCanvas");
var ctx = canvas.getContext("2d");

//snake's position
var snakeX = 200;
var snakeY = 200;

//snake properties.
var snakeWidth = 20;
var snakeHeight = 20;
var snakeColor = "#228B22";
var direction = "U";
var snakeSpeed = 2;

//apple properties 
var appleColor = "#FF0000";
var appleX = 0;
var appleY = 0;

function Init(){
    ctx.clearRect(0, 0, 400, 400);
    snakeX = 200;
    snakeY = 200;
    direction = "U";
    SpawnApple();
    DrawApple();
    DrawSnake(snakeX, snakeY);
}
//starts or restarts the game
Init();
//draws the apple on a random position
function SpawnApple()
{
    appleX = Math.random() * (380 - 20) + 20;
    appleY = Math.random() * (380 - 20) + 20;
}

function DrawApple() {
    ctx.fillStyle = appleColor;
    ctx.fillRect(appleX, appleY, snakeWidth, snakeHeight);    
}

// draws the snake
function DrawSnake(x, y) {
    ctx.fillStyle = snakeColor;
    ctx.fillRect(x, y, snakeWidth, snakeHeight);
}

function Update() {
    switch(direction){
        case "U":
        snakeY -= snakeSpeed;
        break;

        case "D":
        snakeY += snakeSpeed;
        break;

        case "L":
        snakeX -= snakeSpeed;
        break;

        case "R":
        snakeX += snakeSpeed;
        break;

        default:
        break;
    }

    document.onkeydown = checkKey;

    function checkKey(e) {
        e = e || window.event;
        if(e.keyCode == '87'){
            direction = "U";
        }
        else if(e.keyCode == '83'){
            direction = "D";
        }
        else if(e.keyCode == '65'){
            direction = "L";
        }
        else if(e.keyCode == '68'){
            direction = "R";
        }

    }    

    // restart when collision with boundaries
    if(snakeX + snakeWidth > 400)
    {
        Init();
    }
    else if(snakeY + snakeHeight > 400)
    {
        Init();
    }
    else if(snakeY < 0){
        Init();
    }
    else if(snakeX < 0){
        Init();
    }
}

function Draw() {
    //clears the tail behind the snake(needs reworking for the actual tail)
    ctx.clearRect(snakeX + snakeSpeed, snakeY + snakeSpeed, snakeWidth, snakeHeight);
    ctx.clearRect(snakeX - snakeSpeed, snakeY - snakeSpeed, snakeWidth, snakeHeight);
    ctx.clearRect(snakeX + snakeSpeed, snakeY - snakeSpeed, snakeWidth, snakeHeight);
    ctx.clearRect(snakeX - snakeSpeed, snakeY + snakeSpeed, snakeWidth, snakeHeight);
    ctx.fillStyle = snakeColor;
    ctx.fillRect(snakeX, snakeY, snakeWidth, snakeHeight);
}

function GameLoop(){
    Update();
    Draw();
    window.requestAnimationFrame(GameLoop);
}

window.requestAnimationFrame(GameLoop);

  

    
  
