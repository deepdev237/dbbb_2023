// canvas
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// game variables
let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
let ballRadius = 10;
let ballSpeedX = 4;
let ballSpeedY = 4;
let paddleHeight = 80;
let paddleWidth = 10;
let paddleY = (canvas.height - paddleHeight) / 2;
let paddleSpeed = 10;
let score = 0;
let keysPressed = {};
let startTime = Date.now();

// draw ball
function drawBall() {
    ctx.beginPath();
    ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

// draw paddle
function drawPaddle() {
    ctx.beginPath();
    ctx.rect(0, paddleY, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

// move paddle up
function movePaddleUp() {
    paddleY = Math.max(0, paddleY - paddleSpeed);
}

// move paddle down
function movePaddleDown() {
    paddleY = Math.min(canvas.height - paddleHeight, paddleY + paddleSpeed);
}

// update game state
function update() {
    // move ball
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    // bounce off walls
    if (ballY + ballRadius > canvas.height || ballY - ballRadius < 0) {
        ballSpeedY = -ballSpeedY;
    }
    if (ballX + ballRadius > canvas.width || ballX - ballRadius < 0) {
        ballSpeedX = -ballSpeedX;
    }

    // check collision with paddle
    if (ballX - ballRadius < paddleWidth && ballY > paddleY && ballY < paddleY + paddleHeight) {
        ballSpeedX = -ballSpeedX;
        score++;
        ballSpeedX *= 1.05; // increase ball speed
        ballSpeedY *= 1.05;
    }

    // check if game over
    if (ballX - ballRadius < 0) {
        cancelAnimationFrame(animationId);
        const endTime = Date.now();
        const timeElapsed = (endTime - startTime) / 1000;
        alert(`Game over! Your score is ${score}. Time elapsed: ${timeElapsed.toFixed(2)} seconds.`);
    }
}

function update() {
    // move ball
    ballX += ballSpeedX;
    ballY += ballSpeedY;
  
    // bounce off walls
    let wallCollision = false;
    if (ballY + ballRadius > canvas.height || ballY - ballRadius < 0) {
        ballSpeedY = -ballSpeedY;
        wallCollision = true;
    }
    if (ballX + ballRadius > canvas.width || ballX - ballRadius < 0) {
        ballSpeedX = -ballSpeedX;
        wallCollision = true;
    }
  
    // check collision with paddle
    if (ballX - ballRadius < paddleWidth && ballY > paddleY && ballY < paddleY + paddleHeight) {
        ballSpeedX = -ballSpeedX;
        score++;
        ballSpeedX *= 1.05; // increase ball speed
        ballSpeedY *= 1.05;
    }
  
    // increase ball speed after wall collision
    if (wallCollision) {
        ballSpeedX *= 1.05;
        ballSpeedY *= 1.05;
    }
  
    // check if game over
    if (ballX - ballRadius < 0) {
        cancelAnimationFrame(animationId);
        const endTime = Date.now();
        const timeElapsed = (endTime - startTime) / 1000;
        alert(`Game over! Your score is ${score}. Time elapsed: ${timeElapsed.toFixed(2)} seconds.`);

        ballSpeedX = 4;
        ballSpeedY = 4;
        score = 0;
        ballX = canvas.width / 2;
        ballY = canvas.height / 2;
        //paddleY = (canvas.height - paddleHeight) / 2;
        startTime = Date.now();
    }
}

// draw game
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawPaddle();
    drawTime();
}

// draw time
function drawTime() {
    const endTime = Date.now();
    const timeElapsed = (endTime - startTime) / 1000;
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText(`Time elapsed: ${timeElapsed.toFixed(2)} seconds`, 10, 20);
}

// handle keyboard input
document.addEventListener("keydown", function (event) {
    keysPressed[event.code] = true;
});

document.addEventListener("keyup", function (event) {
    keysPressed[event.code] = false;
});

// start game loop
let lastTimestamp = 0;
let animationId;

function gameLoop(timestamp) {
    const deltaTime = timestamp - lastTimestamp;
    lastTimestamp = timestamp;

    if (keysPressed["ArrowUp"] || keysPressed["KeyW"]) {
        movePaddleUp();
    }
    if (keysPressed["ArrowDown"] || keysPressed["KeyS"]) {
        movePaddleDown();
    }

    update();
    draw();

    animationId = requestAnimationFrame(gameLoop);
}

animationId = requestAnimationFrame(gameLoop);