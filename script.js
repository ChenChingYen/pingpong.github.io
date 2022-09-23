// Update Loop
import Ball from './Ball.js';
import Paddle from  './Paddle.js';

const ball = new Ball(document.getElementById("ball"));
const playerPaddle = new Paddle(document.getElementById("player-paddle"));
const computerPaddle = new Paddle(document.getElementById("computer-paddle"));
const playerScoreElem = document.getElementById("player-score");
const computerScoreElem = document.getElementById("computer-score");

let lastTime;

function update(time){
    if(lastTime != null){
        var delta = time - lastTime;
        // Update code
        // console.log(delta);
        ball.update(delta, [playerPaddle.rect(), computerPaddle.rect()]);
        computerPaddle.update(delta, ball.x);
        // const hue = parseFloat(getComputedStyle(document.documentElement).getPropertyPriority("--hue"));
        // document.documentElement.style.setProperty("--hue", hue + delta * 0.01);
        if(isLose()) handleLose();
    }
    lastTime = time;
    // console.log(time);
    window.requestAnimationFrame(update);
}

function isLose(){
    const rect = ball.rect();
    return rect.bottom >= window.innerHeight || rect.top <= 0;
}

function handleLose(){
    const rect = ball.rect();
    if(rect.top <= 0){
        playerScoreElem.textContent = parseInt(playerScoreElem.textContent) + 1;
    }else{
        computerScoreElem.textContent = parseInt(computerScoreElem.textContent) + 1;
    }
    ball.reset();
    computerPaddle.reset();
}

document.addEventListener("mousemove", e =>{
    playerPaddle.position = (e.x / window.innerWidth) * 100;
})

window.requestAnimationFrame(update)

// document.addEventListener('keyup', event => {
//     if (event.code === 'Space' || event.key == " ") {
//         if(!isPaused){
//             console.log('Game Paused');
//             // window.requestAnimationFrame();
//             isPaused = true;
//         }else{
//             console.log('Game Started');
//             window.requestAnimationFrame(update);
//             isPaused = false;
//         }
//     }
// })
