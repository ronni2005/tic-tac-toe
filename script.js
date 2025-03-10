let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true;
let count = 0;
let gameOver = false;

const winPatterns = [
    [0,1,2], [0,3,6], [0,4,8], [1,4,7], 
    [2,5,8], [2,4,6], [3,4,5], [6,7,8]
];

const resetGame = () => {
    turnO = true;
    count = 0;
    gameOver = false;
    enableBoxes();
    msg.innerText = "";
    msgContainer.classList.add("hide");
};

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (box.innerText !== "" || gameOver) return;
        console.log("box was clicked");

        box.innerText = turnO ? "O" : "X"; 
        turnO = !turnO;
        box.disabled = true;
        count++;

        if (checkWinner()) {
            gameOver = true;
            return;
        }

        if (count === 9) {
            draw();
        }
    });
});

const enableBoxes = () => {
    boxes.forEach(box => {
        box.disabled = false;
        box.innerText = "";
    });
    msgContainer.classList.add("hide");
};

const disableBoxes = () => {
    boxes.forEach(box => box.disabled = true);
};

const showWinner = (winner) => {
    msg.innerText = `Congratulations, Winner is ${winner}! :)`;
    msgContainer.classList.remove("hide");
    disableBoxes();
};

const draw = () => {
    msg.innerText = "Game Draw!";
    msgContainer.classList.remove("hide");
    disableBoxes();
};

const checkWinner = () => {
    for (let pattern of winPatterns) {
        let [a, b, c] = pattern;
        let pos1Val = boxes[a].innerText;
        let pos2Val = boxes[b].innerText;
        let pos3Val = boxes[c].innerText;

        if (pos1Val !== "" && pos1Val === pos2Val && pos2Val === pos3Val) {
            console.log("Winner!", pos1Val);
            showWinner(pos1Val);
            return true;
        }
    }
    return false;
};

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
