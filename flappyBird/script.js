const gameContainer = document.querySelector("#gameContainer");
const gameBoard = document.querySelector("#gameBoard");
const ctx = gameBoard.getContext("2d");
const scoreTxt = document.querySelector("#score");
const resetBtn = document.querySelector("#resetBtn");
const gameHeight = gameBoard.height;
const gameWidth = gameBoard.width;
let score = 0;
const space = 150;
const pipeColor = "green";
const pipeBorder = "black";
const birdColor = "blue";
const pipeWidth = 60;
let pipeArr = [];
let pipeY;
let flying = false;
const boardBackground = "aliceblue";
let time = new Date();
let currentTime;
// let time=currentTime+2000;
let d;
let bird = {x: 60, y: 300};

resetBtn.addEventListener("click", resetGame);
window.addEventListener("keydown", jump);
gameStart();


function gameStart(){
    flying = true;
    d = time.getTime();
    time.setTime(d-3500);
    createPipe();
    drawPipe();
    scoreTxt.textContent = score;
    nextTick();
}

function nextTick(){
    if(flying){
        setTimeout( () => {
            clearBoard();
            pipeArr = pipeArr.filter(pipe => (pipe.x+pipeWidth)>0);
            drawPipe();
            movePipe();
            createPipe();
            checkGameOver();
            createBird();
            gravity();
            nextTick();
        },10)
    }
    else{
        displayGameOver();
    }

}

function createPipe(){
    currentTime = new Date();
    if(currentTime.getTime()-time.getTime() > 3500){
        pipeY = Math.round(Math.random()*(gameHeight-space));
        let pipe1 = {x: (gameWidth-pipeWidth), y: pipeY};
        pipeArr.push(pipe1);
        time = currentTime;
        score+=1;
        scoreTxt.innerHTML = score;
    }
}
    

function drawPipe(){
    ctx.fillStyle = pipeColor;
    ctx.strokeStyle = pipeBorder;
    pipeArr.forEach(pipe => {
        ctx.fillRect(pipe.x, 0, pipeWidth, pipe.y);
        ctx.strokeRect(pipe.x, 0, pipeWidth, pipe.y);
        ctx.fillRect(pipe.x, (pipe.y+space), pipeWidth, (gameHeight-pipe.y-space));
        ctx.strokeRect(pipe.x, (pipe.y+space), pipeWidth, (gameHeight-pipe.y-space));
    })
}

function movePipe(){
    pipeArr.forEach(pipe => {
        pipe.x -=1;
    })

}


function jump(keyPressed){
    const keyName = keyPressed.code;
    if(keyName === "Space"){
        bird.y-=50;
    }
    if(bird.y<0){
        bird.y+=50;
    }
}

function gravity(){
    bird.y+=2;   
}


function createBird(){
    ctx.fillStyle = birdColor;
    ctx.strokeStyle = pipeBorder;
    ctx.beginPath();
    ctx.arc(bird.x, bird.y, 20, 0, 2 * Math.PI);
    ctx.stroke();
}

function checkGameOver(){
    pipeArr.forEach(pipe => {
        if((bird.x+20)>pipe.x && (bird.x-20)<(pipe.x+pipeWidth)){
            if((bird.y-20)<pipe.y || (bird.y+20)> (pipe.y+space)){
                flying=false;
            }
        }
    })
    if(bird.y+20>gameHeight){
        flying=false;
    }
}

function displayGameOver(){
    ctx.font = "50px MV Boli";
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.fillText("GAME OVER!", gameWidth / 2, gameHeight / 2);
    flying = false;
};

function resetGame(){
    score = 0;
    pipeArr = [ ];
    bird = {x: 60, y: 300};
    time = new Date();
    gameStart();
}

function clearBoard(){
    ctx.fillStyle = boardBackground;
    ctx.fillRect(0, 0, gameWidth, gameHeight);
};     