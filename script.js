var backgroundMove = 0;
var groundMove = 0;
var rotateBird = 0;
var rotateDown = false;
var cancel = 0;
var jumpForce = 15;
var remainingJump = 20;
var birdHeight = -60;
var goingDown = true;
var gravity = 9.8;
var dt = 0.015;
var velocity = 0;
var started = false;
var animateCounter = 0;
var pipes = [];
var pipeDistance = 200;
var pipeCounter = 0;
var canSpawnPipe = true;
var speed = 1;
var counter = 0;

const bird = document.getElementById("bird");
const ground = document.getElementById("ground");
const background = document.getElementById("background");

document.addEventListener("mousedown", FlapBird);
document.onkeydown = GetKeyPress;
function GetKeyPress(e) {
    e = e || window;

    console.log(e.keyCode);
    if (e.keyCode == 32) {
        // space
        FlapBird();
    }

    if (e.keyCode == 83) {
        // S
        speed *= 2;
        counter = 0;
    }
    
    if (e.keyCode == 68) {
        // D
        speed /= 2;
        counter = 0;

        if (speed < 1){
            speed = 1;
        }
    }
}

function FlapBird(){
    started = true;

    bird.style.transform = `rotate(-30deg)`;
    rotateBird = 30;
    rotateDown = false;

    cancel += 1;
    goingDown = false;

    remainingJump = jumpForce;
    velocity = 0;

    WaitRotate();
}

function RotateBird(){
    if (!rotateDown || !started){
        return;
    }

    rotateBird -= 2;
    bird.style.transform = `rotate(${-rotateBird}deg)`;

    if (rotateBird == -90){
        rotateBird += 2;
    }
}

function Jump(){
    if (goingDown){
        return;
    }

    let currentJump = Math.sqrt(remainingJump) / 10;
    remainingJump -= currentJump;
    birdHeight -= currentJump;

    if (remainingJump < 0.5){
        remainingJump = jumpForce;
        goingDown = true;
    }

    bird.style.top = birdHeight + "vh";
}

function Fall(){
    if (!goingDown || !started){
        return;
    }

    velocity += gravity * dt;
    birdHeight += velocity * dt;
    bird.style.top = birdHeight + "vh";
}

function MoveBackground(){
    backgroundMove -= 0.1;
    let resetPoint = background.clientHeight / 512 * 275;
    if (Math.round(backgroundMove) == Math.round(-resetPoint)){
        backgroundMove = 0;
    }
    background.style.left = backgroundMove + "px";
}

function MoveGround(){
    groundMove -= 0.5;
    let resetPoint = ground.clientHeight / 112 * 336;
    if (Math.round(groundMove) == Math.round(-resetPoint)){
        groundMove = 0;
    }
    ground.style.left = groundMove + "px";
}

function SpawnPipe(){
    if (!canSpawnPipe){
        return;
    }
    canSpawnPipe = false;

    let random = GetRandom();

    if (pipes.length != 0){

        let pipe1 = pipes[0];
        let pipe2 = pipes[1];

        console.log(pipe1.width);
        if (parseFloat(pipe1.style.left) + pipe1.width * (parseInt(pipe1.parentNode.id.replace("pipes", ""), 10) - 1) < -100) {
            pipe1.style.left = window.innerWidth + "px";
            pipe2.style.left = window.innerWidth + "px";
            pipe1.style.top = random + "vh";
            pipe2.style.top = random + "vh";

            pipes = pipes.slice(2).concat(pipes.slice(0, 2));

            return;
        }
    }

    var original = document.getElementById('pipes');
    var clone = original.cloneNode(true);
    clone.id = "pipes" + ++pipeCounter;
    original.parentNode.appendChild(clone);

    for (const child of clone.children) {
        child.style.left = window.innerWidth + "px";
        child.style.top = random + "vh";
        pipes.push(child);
    }
}

function MovePipes(){
    pipes.forEach(pipe => {
        let currentLeft = parseFloat(pipe.style.left) || 0;
        pipe.style.left = (currentLeft - 0.5) + "px";
    });

    let pipe = pipes[pipes.length - 1];
    let currentLeft = parseFloat(pipe.style.left) || 0;
    if(window.innerWidth - currentLeft > pipeDistance){
        canSpawnPipe = true;
    }
}

function CheckCollision(){
    if (isColliding(bird, ground)) {
        console.log("colliding");
    }
}

function isColliding(x, y) {
    const rect1 = x.getBoundingClientRect();
    const rect2 = y.getBoundingClientRect();

    return !(
        rect1.right < rect2.left ||
        rect1.left > rect2.right ||
        rect1.bottom < rect2.top ||
        rect1.top > rect2.bottom
    );
}

function Animate(){
    switch (animateCounter){
        case 0:
            bird.src = "images/yellowbird-downflap.png";
            break;

        case 1:
            bird.src = "images/yellowbird-midflap.png";
            break;

        case 2:
            bird.src = "images/yellowbird-upflap.png";
            break;
    }

    animateCounter += 1;
    if (animateCounter > 2){
        animateCounter = 0;
    }
}

setInterval(function(){
    counter++
    if (counter != speed){
        return;
    }
    counter = 0;

    MoveBackground();
    MoveGround();

    if (!started){
        return;
    }
    CheckCollision();
    Jump();
    Fall();
    RotateBird();
    SpawnPipe();
    MovePipes();
}, 1);

setInterval(function(){
    Animate();
}, 100);

const delay = ms => new Promise(res => setTimeout(res, ms));

const WaitRotate = async () => {
    await delay(500 * speed);
    
    if (cancel == 1){
        rotateDown = true;
        cancel = 0;
    }
    else{
        cancel -= 1;
    }
};

function GetRandom() {
    return Math.random() * (-160 + 187) - 187;
}