let gameseq = [];
let userseq = [];

let started = false;
let level = 0;
let isClickEnabled = false;

let btns = ["red-btn","blue-btn","green-btn","yellow-btn"];

let red = document.getElementById("red-btn");
let blue = document.getElementById("blue-btn");
let green = document.getElementById("green-btn");
let yellow = document.getElementById("yellow-btn");

const click = new Audio("./sounds/click.mp3");
const gameover = new Audio("./sounds/game-end.mp3");
const flash = new Audio('./sounds/flash-blink.mp3');
const start = new Audio("./sounds/game-start-6104.mp3");

document.addEventListener("keypress",function(){
              if(started==false){
                            console.log("Game Started");
                            started = true;
                            start.play();
                            setTimeout(function(){
                                          levelup();
                            },1000);
              }
})
function levelup(){
              level++;
              userseq = [];
              document.getElementById("desc").innerText = `Level - ${level}`;

              let randidx = Math.floor(Math.random()*4);
              console.log(randidx);
              console.log(btns[randidx]);

              let randbtn = btns[randidx];
              gameseq.push(randbtn);
              console.log(gameseq);
              btn = document.getElementById(randbtn);
              
              setTimeout(function(){
                            gameflash(btn);
              },1000);
}
function gameflash(btn){
              btn.classList.add("flash");
              flash.play();
              setTimeout(function(){
                            btn.classList.remove("flash");
              },800);
              isClickEnabled = true;
}


function userflash(btn){
              btn.classList.add("btnclick");
              click.play();
              setTimeout(function(){
                            btn.classList.remove("btnclick");
              },500);
}

function checkAns(idx){
              if(userseq[idx] === gameseq[idx]){
                            console.log("Correct");
                            if(userseq.length === gameseq.length){
                                          levelup();
                            }
              }
              else{
                            document.getElementById("desc").innerText = `Game Over! Your Score is ${level}`;
                            gameover.play();
                            setTimeout(function(){
                                          document.getElementById("desc").innerText = `Game Over! Press any key to start the Game`;
                                          // location.reload();    
                                          resetGame();
                            },3000);
                            
              }
}


function btnPress(){
              if (!isClickEnabled) return;
              let btn = this;
              console.log(this);
              userflash(btn);
              btnpressed = this.id;
              userseq.push(btnpressed);
              console.log(userseq);
              checkAns(userseq.length-1);
}


let buttons = document.querySelectorAll(".btns");
for(btn of buttons){
              btn.addEventListener('click',btnPress);  
}

function resetGame(){
              started = false;
              userseq = [];
              gameseq = [];
              level = 0;
              isClickEnabled = false;
}








