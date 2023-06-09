   // Game settings
   const gameContainer = document.getElementById('game-container');
   const paddleLeft = document.getElementById('paddle-left');
   const paddleRight = document.getElementById('paddle-right');
   const ball = document.getElementById('ball');
   const player1Score = document.getElementById('player1-score');
   const player2Score = document.getElementById('player2-score');
   const themeToggle = document.getElementById('theme-toggle');

   const paddleHeight = parseInt(getComputedStyle(paddleLeft).height);
   const paddleWidth = parseInt(getComputedStyle(paddleLeft).width);
   const ballSize = parseInt(getComputedStyle(ball).width);

   const gameWidth = parseInt(getComputedStyle(gameContainer).width);
   const gameHeight = parseInt(getComputedStyle(gameContainer).height);

   const paddleSpeed = 10;
   const ballSpeed = 1.5;

   let paddleLeftPosition = (gameHeight - paddleHeight) / 2;
   let paddleRightPosition = (gameHeight - paddleHeight) / 2;
   let ballPositionX = (gameWidth - ballSize) / 2;
   let ballPositionY = (gameHeight - ballSize) / 2;
   let ballDirectionX = 1;
   let ballDirectionY = 1;
   let player1ScoreValue = 0;
   let player2ScoreValue = 0;
   let isLightTheme = true;

   // Update game elements positions
   function updatePositions() {
       paddleLeft.style.top = `${paddleLeftPosition}px`;
       paddleRight.style.top = `${paddleRightPosition}px`;
       ball.style.left = `${ballPositionX}px`;
       ball.style.top = `${ballPositionY}px`;
   }

   // Handle keyboard input
   function handleKeydown(event) {
       if (event.code === 'ArrowUp') {
           paddleRightPosition -= paddleSpeed;
       } else if (event.code === 'ArrowDown') {
           paddleRightPosition += paddleSpeed;
       } else if (event.code === 'KeyW') {
           paddleLeftPosition -= paddleSpeed;
       } else if (event.code === 'KeyS') {
           paddleLeftPosition += paddleSpeed;
       }
   }

   // Handle game logic
   function updateGame() {
       // Update paddle positions
       if (paddleLeftPosition < 0) {
           paddleLeftPosition = 0;
       }
       if (paddleLeftPosition > gameHeight - paddleHeight) {
           paddleLeftPosition = gameHeight - paddleHeight;
       }
       if (paddleRightPosition < 0) {
           paddleRightPosition = 0;
       }
       if (paddleRightPosition > gameHeight - paddleHeight) {
           paddleRightPosition = gameHeight - paddleHeight;
       }

       // Update ball position
       ballPositionX += ballSpeed * ballDirectionX;
       ballPositionY += ballSpeed * ballDirectionY;

       // Ball collision with paddles
       if (
           ballPositionX <= paddleWidth &&
           ballPositionY + ballSize >= paddleLeftPosition &&
           ballPositionY <= paddleLeftPosition + paddleHeight
       ) {
           ballDirectionX = 1;
       }

       if (
           ballPositionX + ballSize >= gameWidth - paddleWidth &&
           ballPositionY + ballSize >= paddleRightPosition &&
           ballPositionY <= paddleRightPosition + paddleHeight
       ) {
           ballDirectionX = -1;
       }

       // Ball collision with walls
       if (ballPositionY <= 0 || ballPositionY >= gameHeight - ballSize) {
           ballDirectionY *= -1;
       }

       // Ball out of bounds
       if (ballPositionX <= 0) {
           player2ScoreValue += 1;
           resetGame();
       } else if (ballPositionX + ballSize >= gameWidth) {
           player1ScoreValue += 1;
           resetGame();
       }

       // Update score
       player1Score.textContent = player1ScoreValue;
       player2Score.textContent = player2ScoreValue;

       // Update game positions
       updatePositions();
   }

   // Reset game state
   function resetGame() {
       paddleLeftPosition = (gameHeight - paddleHeight) / 2;
       paddleRightPosition = (gameHeight - paddleHeight) / 2;
       ballPositionX = (gameWidth - ballSize) / 2;
       ballPositionY = (gameHeight - ballSize) / 2;
       ballDirectionX *= -1;
       ballDirectionY = Math.random() > 0.5 ? 1 : -1;
   }

  // Toggle theme
function toggleTheme() {
    const body = document.body;
    const ball = document.getElementById('ball');
    const paddles = document.querySelectorAll('.paddle');

    body.classList.toggle('light-theme');
    isLightTheme = !isLightTheme;

    if (isLightTheme) {
        body.classList.remove('dark-theme');
        ball.style.backgroundColor = '#000';
        paddles.forEach(paddle => {
            paddle.style.backgroundColor = '#000';
        });
    } else {
        body.classList.remove('light-theme');
        ball.style.backgroundColor = '#fff';
        paddles.forEach(paddle => {
            paddle.style.backgroundColor = '#fff';
        });
    }

    themeToggle.textContent = isLightTheme ? 'Toggle Dark Theme' : 'Toggle Light Theme';
}


   
 
// Start the game with a countdown and delayy
function startGame() {
    let countdown = 3; // Countdown duration in seconds
  
    // Display countdown on the screen
    const countdownElement = document.createElement('div');
    countdownElement.id = 'countdown';
    countdownElement.style.textAlign = 'center';
    countdownElement.style.fontSize = '48px';
    countdownElement.style.marginTop = '100px';
    countdownElement.textContent = countdown;
    gameContainer.appendChild(countdownElement);
  
    // Update countdown every second
    const countdownInterval = setInterval(() => {
      countdown--;
      countdownElement.textContent = countdown;
  
      // Start the game when countdown reaches zero
      if (countdown === 0) {
        clearInterval(countdownInterval);
        gameContainer.removeChild(countdownElement);
        resetGame();
        setInterval(updateGame, 10);
      }
    }, 1000); // 1000 milliseconds interval (1 second)
  }
  

   // Event listeners
   document.addEventListener('keydown', handleKeydown);
   themeToggle.addEventListener('click', toggleTheme);

   // Start the game when the page loads
   window.addEventListener('load', startGame);