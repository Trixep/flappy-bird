document.onkeydown = GetKeyPress;
function GetKeyPress(e) {

    // if (!start){
    //     return;
    // }

    e = e || window;

    console.log(e.keyCode);
    if (e.keyCode == 32) {
        // space
        FlapBird();
    }
}

function FlapBird(){
    var bird = document.getElementById("bird");
    bird.src = "images/yellowbird-upflap.png";
    bird.style.transform = 'rotate(-45deg)';
    Flap();
}

function GetRandom() {
    return Math.floor(Math.random() * 4) + 1;
}



function Flap(){
    var x = 0;
    var bird = document.getElementById("bird");
    setInterval(function(){ bird.style.left = x + "px"; x++; }, 1);
    console.log("dd");
}

(function(){
    var x = 0;
    setInterval(function(){
        x-=1;
        document.getElementById("background").css('background-position', x + 'px 0');
    }, 10);
})