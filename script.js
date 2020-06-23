function play(){
    var audio = document.getElementById("audio");
    var splash = document.getElementById("follow-up");
    var show = document.getElementById('contain');
    var start = document.querySelector('.close');
    var end = document.querySelector('.open');
    var remain = document.getElementById('remain');
    remain.style.display = "block";
    end.style.display = "block";
    splash.style.display = "none";
    end.style.animationName = "load";
    end.style.animationDuration = "3s";
    end.style.animationPlayState = "ease-in-out";
    show.style.animationName = "load";
    show.style.animationDuration = "3s";
    show.style.animationPlayState = "ease-in-out";
    show.style.display = "block";
    start.style.display = "none";
    audio.play();
};

function add(){
    alert("Rock on it's your day");
};
function prev(){
    var old = document.querySelector('#prevpost');
    old.style.animationName = "load";
    old.style.animationDuration = "3s";
    old.style.animationPlayState = "ease-in-out";
    old.style.display = "block";
    document.getElementById('btn').style.display = "none";
    document.getElementById('btn2').style.display = "block";
};
function prev2(){
    var old = document.querySelector('#prevpost');
    old.style.display = "none";
    document.getElementById('btn').style.display = "block";
    document.getElementById('btn2').style.display = "none";
};