var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
var balls = document.querySelectorAll('.ball');
var board = document.getElementsByClassName('board');
var startbtn = document.getElementById('start');
var gameOverDiv = document.getElementById('game-over');
var scoreDisplay = document.getElementsByClassName('show_count');

var ballCount = 0;
var gameOver = false;
balls.forEach(ball => {
    ball.addEventListener('animationend', gameOverEvent)
});

function gameOverEvent() {
    balls.forEach(ball => {
        ball.style.animationPlayState = 'paused';
        ball.classList.add('hide');
    })

    gameOverDiv.classList.remove('hide');
    gameOverDiv.classList.add('game-over');
    startbtn.classList.remove('hide');
}

var ballsArray = [];

function startGame() {
    var ball1 = alphabet[Math.floor(Math.random() * alphabet.length)];
    var ball2 = alphabet[Math.floor(Math.random() * alphabet.length)];
    var ball3 = alphabet[Math.floor(Math.random() * alphabet.length)];

    document.getElementById('ball-1').innerHTML = ball1;
    document.getElementById('ball-2').innerHTML = ball2;
    document.getElementById('ball-3').innerHTML = ball3;
    ballsArray = Array.from(balls).map(ball => ball.textContent);
    ballCount = 0;

    balls.forEach(ball => {
        ball.classList.add('ball-move');
        ball.classList.remove('hide');
        ball.style.animationPlayState = 'running';

        ball.style.left = Math.floor(Math.random() * 90 + 1) + '%';
    });
    gameOverDiv.classList.add('hide')
    gameOverDiv.classList.remove('game-over')
    startbtn.classList.add('hide');
}

function reset(num) {
    var newElement = alphabet[Math.floor(Math.random() * alphabet.length)]
    ballsArray.splice(num, 1, newElement);
    balls[num].innerHTML = newElement;

    balls[num].classList.remove('hide');
    balls[num].classList.add('ball-move');

    balls[num].style.left = Math.floor(Math.random() * 90 + 1) + '%';

    ballCount += 1;
    var counter = `${ballCount}`
    scoreDisplay.innerText = counter;
    if (ballCount > 5) {
        balls.forEach(ball => {
            ball.classList.remove('.ball-move');
            ball.classList.add('overFive');
        })
    }
    for (var i = 0; i < scoreDisplay.length; i++) {
        scoreDisplay[i].innerText = `${ballCount}`;
    }
}

function disappear(num) {
    balls[num].classList.add('hide');
    balls[num].classList.remove('ball-move');
}

function startButtonHandler() {
    startGame();
}

function documentKeydownHandler(event) {
    if (event.keyCode === 13 && !gameOver) {
        startGame();
    }
}

startbtn.addEventListener('click', startButtonHandler);
document.addEventListener('keydown', documentKeydownHandler);

document.addEventListener('keydown', function (event) {
    var key = event.key;
    const uppercaseKey = key.toUpperCase();

    var getIndex = ballsArray.indexOf(uppercaseKey);

    if (getIndex !== -1) {
        disappear(getIndex);
        setTimeout(() => {
            reset(getIndex)
        }, 10)
    }
})
