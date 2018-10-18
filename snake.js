
//initialize canvas
var canvas = document.getElementById("snakeCanvas");
var ctx = canvas.getContext("2d");

var snake = {
    width: 20,
    height: 20,
    color: "#228B22",
    direction: "U",
    speed: 2,
    x: 200,
    y: 200
};
var apple = {
    color: "#FF0000",
    x: 0,
    y: 0
};

function Init(){
    ctx.clearRect(0, 0, 400, 400);
    snake.x = 200;
    snake.y = 200;
    snake.direction = "U";
    SpawnApple();
    DrawApple();
    DrawSnake(snake.x, snake.y);
}
//starts or restarts the game
Init();
//draws the apple on a random position
function SpawnApple()
{
    apple.x = Math.random() * (380 - 20) + 20;
    apple.y = Math.random() * (380 - 20) + 20;
}

function DrawApple() {
    ctx.fillStyle = apple.color;
    ctx.fillRect(apple.x, apple.y, snake.width, snake.height);    
}

// draws the snake
function DrawSnake(x, y) {
    ctx.fillStyle = snake.color;
    ctx.fillRect(x, y, snake.width, snake.height);
}

function Update() {
    switch(direction){
        case "U":
        snake.y -= snake.speed;
        break;

        case "D":
        snake.y += snake.speed;
        break;

        case "L":
        snake.x -= snake.speed;
        break;

        case "R":
        snake.x += snake.speed;
        break;

        default:
        break;
    }

    document.onkeydown = checkKey;

    function checkKey(e) {
        e = e || window.event;
        if(e.keyCode == '87'){
            snake.direction = "U";
        }
        else if(e.keyCode == '83'){
            snake.direction = "D";
        }
        else if(e.keyCode == '65'){
            snake.direction = "L";
        }
        else if(e.keyCode == '68'){
            snake.direction = "R";
        }

    }    

    // restart when collision with boundaries
    if(snake.x + snake.width > 400)
    {
        Init();
    }
    else if(snake.y + snake.height > 400)
    {
        Init();
    }
    else if(snake.y < 0){
        Init();
    }
    else if(snake.x < 0){
        Init();
    }

    // if(snake.y < appleY - snake.height && ){
    //     console.log("collision");
    // }
}

function Draw() {
    //clears the tail behind the snake(needs reworking for the actual tail)
    ctx.clearRect(snake.x + snake.speed, snake.y + snake.speed, snake.width, snake.height);
    ctx.clearRect(snake.x - snake.speed, snake.y - snake.speed, snake.width, snake.height);
    ctx.clearRect(snake.x + snake.speed, snake.y - snake.speed, snake.width, snake.height);
    ctx.clearRect(snake.x - snake.speed, snake.y + snake.speed, snake.width, snake.height);
    ctx.fillStyle = snake.color;
    ctx.fillRect(snake.x, snake.y, snake.width, snake.height);
}

function GameLoop(){
    Update();
    Draw();
    window.requestAnimationFrame(GameLoop);
}

window.requestAnimationFrame(GameLoop);

  

    
  
