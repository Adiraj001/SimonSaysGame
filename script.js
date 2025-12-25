let gameseq = [];
let userseq = [];
let btns = ['green', 'red', 'yellow', 'blue'];

let started = false;
let level = 0;

let h2 = document.querySelector("h2");

document.addEventListener("keypress", function() {
    if (!started) {
        started = true;
        h2.innerText = "Level 1";
        document.body.style.backgroundColor = "";
        levelup();
    }
});

function btnFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function() {
        btn.classList.remove("flash");
    }, 250);        
}

function userflash(btn) {
    btn.classList.add("userflash");
    setTimeout(function() {
        btn.classList.remove("userflash");
    }, 250);        
}

function levelup() {
    level++;  
    h2.innerText = `Level ${level}`;      

    let randINX = Math.floor(Math.random() * 4); 
    let randColor = btns[randINX];
    let randbtn = document.querySelector(`.${randColor}`);

    gameseq.push(randColor);

    btnFlash(randbtn);
}

function check(idx) {
    if (userseq[idx] === gameseq[idx]) {
        if (userseq.length === gameseq.length) {
            setTimeout(levelup, 1000);
            userseq = [];
        }
    } else {
        h2.innerText = "Game Over, Press Any Key To Restart";
        document.body.style.backgroundColor = "red";
        setTimeout(function() {
            document.body.style.backgroundColor = "";
        }, 200);
        resetGame();
    }
}

function btnPress() {
    let btn = this;
    btnFlash(btn);
    userflash(btn);

    let userColour = btn.getAttribute("id");
    userseq.push(userColour);

    check(userseq.length - 1);
}

function resetGame() {
    started = false;
    gameseq = [];
    userseq = [];
    level = 0;
}

let allBtns = document.querySelectorAll(".btn");
for (let btn of allBtns) {
    btn.addEventListener("click", btnPress);
}