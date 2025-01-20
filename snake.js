// Get canvas element and set up the context
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Define game constants
const box = 20;  // size of each block
const canvasSize = 400;  // canvas size
const rows = canvasSize / box;
const columns = canvasSize / box;

let snake = [{x: 9 * box, y: 10 * box}];  // snake starting position
let food = generateFood();
let direction = 'RIGHT';
let nextDirection = 'RIGHT'; // Next direction to prevent opposite movements
let score = 0;

// Display score
const scoreDisplay = document.getElementById('score');

// Initial game speed (in milliseconds)
let speed = 100; // 100 ms per frame (adjust to control initial speed)

// Listen for keyboard input to change direction
document.addEventListener('keydown', directionControl);

function directionControl(event) {
    if (event.keyCode === 37 && direction !== 'RIGHT') {
        nextDirection = 'LEFT';
    } else if (event.keyCode === 38 && direction !== 'DOWN') {
        nextDirection = 'UP';
    } else if (event.keyCode === 39 && direction !== 'LEFT') {
        nextDirection = 'RIGHT';
    } else if (event.keyCode === 40 && direction !== 'UP') {
        nextDirection = 'DOWN';
    }
}

// Generate food at random location
function generateFood() {
    return {
        x: Math.floor(Math.random() * rows) * box,
        y: Math.floor(Math.random() * columns) * box
    };
}

// Game function
function game() {
    if (gameOver()) {
        alert('Game Over! Your score: ' + score);
        document.location.reload();  // Restart the game
    }

    // Update direction smoothly
    direction = nextDirection;

    // Move snake
    let snakeHead = {...snake[0]};  // create a copy of the snake head

    if (direction === 'LEFT') snakeHead.x -= box;
    if (direction === 'RIGHT') snakeHead.x += box;
    if (direction === 'UP') snakeHead.y -= box;
    if (direction === 'DOWN') snakeHead.y += box;

    snake.unshift(snakeHead); // Add the new head

    // If snake eats food
    if (snakeHead.x === food.x && snakeHead.y === food.y) {
        score++;
        food = generateFood();  // new food after eating
    } else {
        snake.pop();  // remove the last part of snake if no food is eaten
    }

    // Clear the canvas and draw everything
    ctx.clearRect(0, 0, canvasSize, canvasSize);

    // Draw food
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, box, box);

    // Draw snake
    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = i === 0 ? '#28a745' : '#ffffff';  // Green head, white body
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
    }

    // Update score display
    scoreDisplay.textContent = score;

    // Gradually increase speed based on score (in smaller increments)
    if (score > 0 && score % 5 === 0) { // Every 5 points, increase speed by 10 ms (slower change)
        speed = Math.max(50, speed - 10); // Ensure speed doesn't go too fast
    }

    // Call game function using requestAnimationFrame for smoother movement
    setTimeout(() => requestAnimationFrame(game), speed); // Adjust speed dynamically
}

// Check if the game is over
function gameOver() {
    const snakeHead = snake[0];

    // Check if snake hits walls
    if (snakeHead.x < 0 || snakeHead.x >= canvasSize || snakeHead.y < 0 || snakeHead.y >= canvasSize) {
        return true;
    }

    // Check if snake hits itself
    for (let i = 1; i < snake.length; i++) {
        if (snake[i].x === snakeHead.x && snake[i].y === snakeHead.y) {
            return true;
        }
    }

    return false;
}

// Start the game
game();
