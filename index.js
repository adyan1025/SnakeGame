const heading = document.getElementById("heading");
heading.textContent = "Snake Game";

const box_size = 25;
const rows = 20;
const cols = 20;
var board;
var context;
var facing;
var dead = false;

var snakeX = box_size * 5;
var snakeY = box_size * 7;

var snake_body = [];

var velocity_x = 0;
var velocity_y = 0;

var foodX;
var foodY;



window.onload = function() {
    board = document.getElementById("board");
    board.height = rows * box_size;
    board.width = cols * box_size;
    context = board.getContext("2d");

    placeFood();
    document.addEventListener("keydown", changeDirection);
    setInterval(update, 1000/10);
}

function update() {
    if (dead == true) {
        location.reload();
        return;
    }

    context.fillStyle = "black";
    context.fillRect(0, 0, board.width, board.height);

    context.fillStyle = "lime";
    snakeX += velocity_x;
    snakeY += velocity_y;
    context.fillRect(snakeX, snakeY, box_size, box_size);

    context.fillStyle = "red";
    context.fillRect(foodX, foodY, box_size, box_size);

    
    for (let i = 0; i < snake_body.length; i++) {
        context.fillStyle = "lime";
        context.fillRect(snake_body[i][0], snake_body[i][1], box_size, box_size);
    }
    

    for (let i = snake_body.length-1; i > 0; i--) {
        snake_body[i] = snake_body[i-1]
    }
    if (snake_body.length) {
        snake_body[0] = [snakeX, snakeY];
    }

    if (snakeX < 0 || snakeX > cols*box_size || snakeY < 0 || snakeY > rows*box_size) {
        alert("GAME OVER")
        dead = true;
    }

    for (let i = 1; i < snake_body.length; i++) {
        if ((snakeX == snake_body[i][0]) && snakeY == snake_body[i][1]) {
            alert("GAME OVER")
            dead = true;
        }
    }
    checkEat();
    
}

function checkEat() {
    if ((snakeX == foodX) && (snakeY == foodY)) {
        snake_body.push([snakeX, snakeY]);
        placeFood();
    }
}

function changeDirection(e) {
    if ((e.code == "ArrowUp") && (facing != "down")) {
        velocity_x = 0;
        velocity_y = -1 * box_size;
        facing = "up";
    }
    else if ((e.code == "ArrowDown") && (facing != "up")) {
        velocity_x = 0;
        velocity_y = 1 * box_size;
        facing = "down";
    }
    else if ((e.code == "ArrowRight") && (facing != "left")) {
        velocity_x = 1 * box_size;
        velocity_y = 0;
        facing = "right";
    }
    if ((e.code == "ArrowLeft") && (facing != "right")) {
        velocity_x = -1 * box_size;
        velocity_y = 0;
        facing = "left";
    }
}

function placeFood() {
    do {
        foodX = Math.floor(Math.random() * cols) * box_size;
        foodY = Math.floor(Math.random() * rows) * box_size;
    } while (isFoodOnSnake());
}

function isFoodOnSnake() {
    for (let i = 0; i < snake_body.length; i++) {
        if (foodX === snake_body[i][0] && foodY === snake_body[i][1]) {
            return true;
        }
    }
    return false;
}
