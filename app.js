let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn=document.querySelector("#new-btn");
let msgContainer=document.querySelector(".msg-container");
let msg=document.querySelector("#msg");

let turn0 = true;//to store whose turn it is
let curr=0;

let winPatterns=[
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8]
];

const resetGame=()=>{
    turn0=true;
    enableBoxes();
    msgContainer.classList.add("hide");
}


boxes.forEach((box)=>{
    box.addEventListener("click",()=>{
        console.log("box was clicked");
        if(turn0){
            box.innerText="O";
            turn0=false;
            box.classList.add("box1");
            box.classList.remove("box2");
        }else{
            box.innerText="X";
            turn0=true;
            box.classList.add("box2");
            box.classList.remove("box1");
        }
        box.disabled=true;//to disable a box when marked
        curr++;

        let isWinner=checkWinner();
        if(curr==9 && !isWinner){
            gameDraw();
        }
        // checkWinner();
    });
});

const showWinner = (winner)=>{
    msg.innerText=`Congratulations , Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
    mod=1;
}

const disableBoxes=()=>{
    for(let box of boxes){
        box.disabled=true;
    }
}

const enableBoxes=()=>{
    for(let box of boxes){
        box.disabled=false;
        box.innerText="";
    }
}

const gameDraw=()=>{
    msg.innerText="Game is drawn";
    msgContainer.classList.remove("hide");
    disableBoxes();
}

const checkWinner = ()=>{
    for(let pattern of winPatterns) {
        let pos1val = boxes[pattern[0]].innerText;
        let pos2val = boxes[pattern[1]].innerText;
        let pos3val = boxes[pattern[2]].innerText;

        if(pos1val!=""&&pos2val!=""&&pos3val!=""){
            if(pos1val==pos2val && pos2val==pos3val){
                console.log("winner",pos1val);
                showWinner(pos1val);
                return true;
            }
        }
    }
}


newGameBtn.addEventListener("click",resetGame);
resetBtn.addEventListener("click",resetGame);