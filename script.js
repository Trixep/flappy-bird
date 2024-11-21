document.onkeydown = GetKeyPress;
function GetKeyPress(e) {

    // if (!start){
    //     return;
    // }

    e = e || window;

    console.log(e.keyCode);
    if (e.keyCode == 32) {
        // space
        FlapBird(45);
    }
}

function FlapBird(){
    var bird = document.getElementById("bird");
    bird.src = "images/yellowbird-upflap.png";
    bird.style.transform = `rotate(-45deg)`;
    rotateBird = 45;
}

function RotateBird(rotateBird){
    rotateBird -= 0.2
    var bird = document.getElementById("bird");
    bird.style.transform = `rotate(-${rotateBird}deg)`;
    return rotateBird;
}

function GetRandom() {
    return Math.floor(Math.random() * 4) + 1;
}

function MoveBackground(x){
    var background = document.getElementById('background');
    x -= 0.05;
    if (Math.round(x) == -724){
        x = 0;
    }
    background.style.left = x + 'px';
    return x;
}

var backgroundMove = 0;
rotateBird = 0;
setInterval(function(){
    backgroundMove = MoveBackground(x);
    rotateBird = RotateBird(rotateBird);
}, 1);
