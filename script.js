// Get the button and game container
const playSnakeBtn = document.getElementById('playSnakeBtn');
const snakeGameContainer = document.getElementById('snakeGameContainer');

// Add an event listener to the button
playSnakeBtn.addEventListener('click', function() {
    // Hide the background content and show the Snake game
    document.querySelector('section').style.display = 'none';
    snakeGameContainer.style.display = 'block';
});
