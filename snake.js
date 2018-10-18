
//initialize canvas
var canvas = document.getElementById("snakeCanvas");
var ctx = canvas.getContext("2d");

var snake = {
    width: 20,
    height: 20,
    color: "#228B22",
    direction: "U",
    speed: 20,
    x: 200,
    y: 200,
    taillength: 0
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
    var baseRandomX = Math.floor(Math.random() * (19.99 - 1) + 1);
    var baseRandomY = Math.floor(Math.random() * (19.99 - 1) + 1);
    apple.x = baseRandomX * 20;
    apple.y = baseRandomY * 20;
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
    switch(snake.direction){
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
        if(e.keyCode == '87' && snake.direction != "D"){
            snake.direction = "U";
        }
        else if(e.keyCode == '83' && snake.direction != "U"){
            snake.direction = "D";
        }
        else if(e.keyCode == '65' && snake.direction != "R"){
            snake.direction = "L";
        }
        else if(e.keyCode == '68' && snake.direction != "L"){
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
    //clears the tail behind the snake if it has no points yet
    if(snake.direction == "U" && snake.taillength == 0) {
        ctx.clearRect(snake.x, snake.y + snake.speed, snake.width, snake.height);
    }
    else if (snake.direction == "D" && snake.taillength == 0) {
        ctx.clearRect(snake.x, snake.y - snake.speed, snake.width, snake.height);
    }
    else if (snake.direction == "L" && snake.taillength == 0) {
        ctx.clearRect(snake.x + snake.speed, snake.y, snake.width, snake.height);
    }
    else if (snake.direction == "R" && snake.taillength == 0) {
        ctx.clearRect(snake.x - snake.speed, snake.y, snake.width, snake.height);
    }


    // draw the snake
    ctx.fillStyle = snake.color;
    ctx.fillRect(snake.x, snake.y, snake.width, snake.height);
}


//Gameloop
window.setInterval(function(){
    Update();
    Draw();
    /// call your function here
  }, 90);


  

    
  
