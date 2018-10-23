
//initialize canvas
var canvas = document.getElementById("snakeCanvas");
var ctx = canvas.getContext("2d");

var snake = {
    width: 20,
    height: 20,
    color: "#228B22",
    direction: "U",
    previousDirection: "U",
    previousOrientationX: 0,
    previousOrientationY: 0,
    speed: 20,
    x: 200,
    y: 200,
    taillength: 1
};
var apple = {
    color: "#FF0000",
    x: 0,
    y: 0,
    height: 20,
    width: 20
};

function Init(){
    ctx.clearRect(0, 0, 400, 400);
    snake.taillength = 1;
    snake.x = 200;
    snake.y = 200;
    snake.direction = "U";
    SpawnApple();
    DrawSnake(snake.x, snake.y);
}

//starts or restarts the game
Init();

//draws the apple on a random position
function SpawnApple()
{
    var baseRandomX = Math.floor(Math.random() * (19.99 - 1) + 1);
    var baseRandomY = Math.floor(Math.random() * (19.99 - 1) + 1);
    apple.x = baseRandomX * apple.width;
    apple.y = baseRandomY * apple.height;
    ctx.fillStyle = apple.color;
    ctx.fillRect(apple.x, apple.y, apple.width, apple.height); 
}

// draws the snake
function DrawSnake(x, y) {
    ctx.fillStyle = snake.color;
    ctx.fillRect(x, y, snake.width, snake.height);
}

function SetPreviousOrientation() {
    snake.previousDirection = snake.direction;
    snake.previousOrientationX = snake.x;
    snake.previousOrientationY = snake.y;
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

            SetPreviousOrientation();
            snake.direction = "U";
        }
        else if(e.keyCode == '83' && snake.direction != "U"){
            SetPreviousOrientation();
            snake.direction = "D";
        }
        else if(e.keyCode == '65' && snake.direction != "R"){
            SetPreviousOrientation();
            snake.direction = "L";
        }
        else if(e.keyCode == '68' && snake.direction != "L"){
            SetPreviousOrientation();
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

    if(snake.y == apple.y && snake.x == apple.x){
        SpawnApple();
        snake.taillength += 1;
    }
}

function Draw() {
    //clears the tail behind the snake
    if(snake.direction == "U") {
        ctx.clearRect(snake.x, snake.y + snake.speed * snake.taillength, snake.width, snake.height);
    }
    else if (snake.direction == "D") {
        ctx.clearRect(snake.x, snake.y - snake.speed * snake.taillength, snake.width, snake.height);
    }
    else if (snake.direction == "L") {
        ctx.clearRect(snake.x + snake.speed * snake.taillength, snake.y, snake.width, snake.height);
    }
    else if (snake.direction == "R") {
        ctx.clearRect(snake.x - snake.speed * snake.taillength, snake.y, snake.width, snake.height);
    }

    switch(snake.previousDirection)
    {
        case "U":
            ctx.clearRect(snake.previousOrientationX, snake.previousOrientationY, snake.width, snake.height * snake.taillength);
            break;

        case "D":
            ctx.clearRect(snake.previousOrientationX, snake.previousOrientationY, snake.width, -snake.height * snake.taillength); 
            break;
        
        case "L":
            ctx.clearRect(snake.previousOrientationX, snake.previousOrientationY, snake.width * snake.taillength, snake.height);
            break;
        
        case "R":
            ctx.clearRect(snake.previousOrientationX, snake.previousOrientationY, -snake.width * snake.taillength, snake.height);
            break;
        
        default:
            break;
    }
    
    // draw the snake
    ctx.fillStyle = snake.color;
    ctx.fillRect(snake.x, snake.y, snake.width, snake.height);
}

//Gameloop
window.setInterval(function(){
    Update();
    Draw();
  }, 90);


  

    
  
