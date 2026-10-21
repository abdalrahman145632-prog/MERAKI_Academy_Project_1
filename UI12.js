
"use strict";

// ========================================
// 1. UI ELEMENTS
// ========================================

const screens = document.querySelectorAll(".screen");

const playBtn = document.getElementById("playBtn");
const nameBack = document.getElementById("nameBack");
const nameNext = document.getElementById("nameNext");
const nameInput = document.getElementById("nameInput");

const nameStep = document.getElementById("nameStep");
const nameTitle = document.getElementById("nameTitle");
const nameSub = document.getElementById("nameSub");
const nameError = document.getElementById("nameError");

const boardElement = document.getElementById("board");
const trayElement = document.getElementById("tray");

const statusElement = document.getElementById("status");
const roundElement = document.getElementById("round");
const hintElement = document.getElementById("hint");

const playerXElement = document.getElementById("pX");
const playerOElement = document.getElementById("pO");

const nameXElement = document.getElementById("nX");
const nameOElement = document.getElementById("nO");

const winsXElement = document.getElementById("wX");
const winsOElement = document.getElementById("wO");

const scoreXElement = document.getElementById("sx");
const scoreOElement = document.getElementById("so");
const scoreDrawElement = document.getElementById("sd");

const scoreNameXElement = document.getElementById("snx");
const scoreNameOElement = document.getElementById("sno");

const historyElement = document.getElementById("hist");

const nextBtn = document.getElementById("next");
const restartBtn = document.getElementById("restart");
const resetBtn = document.getElementById("reset");

const modesElement = document.getElementById("modes");

// ========================================
// 2. UI STATE
// ========================================

let selectedMode = 1;

let playerNames = {
    X: "",
    O: ""
};

let nameStepIndex = 0;
let selectedPieceIndex = null;

let roundNumber = 1;
let draws = 0;

let roundHistory = [];
let roundStartX = 0;
let roundStartO = 0;

const playerRoundWins = {
    X: 0,
    O: 0
};

const winningLines = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [3, 5, 7],
    [1, 5, 9]
];

// ========================================
// 3. SCREEN NAVIGATION
// ========================================

function showScreen(screenId) {
    screens.forEach(screen => {
        screen.classList.toggle(
            "show", screen.id === screenId
         // If this is the screen we want to show,
         //  add the "show" class; otherwise, remove it.
        );
    });
}

playBtn.addEventListener("click", () => {
    nameStepIndex = 0;
    nameInput.value = "";
    nameError.textContent = "";
    // for name player 1 display
    updateNameScreen();
    showScreen("names");
    nameInput.focus();
    // that for fouce on thing and he didnt need to selcet
});

function updateNameScreen() {
    const symbol = nameStepIndex === 0 ? "X" : "O";
    const playerNumber = nameStepIndex + 1;
    // 1 of 2  => 2 of 2 
    nameStep.textContent = `Player ${playerNumber} of 2`;
    nameTitle.textContent = "What's your name?";
    nameSub.textContent = `You'll play ${symbol}.`;

    nameInput.value = playerNames[symbol];
    nameInput.placeholder = `Player ${playerNumber}'s name`;
    // placeholder we can cosder is a hidden
    nameError.textContent = "";

    nameNext.textContent =
        nameStepIndex === 0 ? "Next" : "Start game";

    nameBack.textContent =
        nameStepIndex === 0 ? "Back" : "Previous";
}
// for the player  if he want to reback
nameBack.addEventListener("click", () => {
    if (nameStepIndex === 1) {
        nameStepIndex = 0;
        updateNameScreen();
        return;
    }

    showScreen("about");
});
// when player 1 input the name
nameNext.addEventListener("click", startOrContinue);
//  its just for enter keyborad
nameInput.addEventListener("keydown", event => {
    if (event.key === "Enter") {
        startOrContinue();
    }
});

function startOrContinue() {
    const name = nameInput.value.trim();

    if (!name) {
        nameError.textContent = "Please enter your name.";
        nameInput.focus();
        return;
    }

    const symbol = nameStepIndex === 0 ? "X" : "O";
    playerNames[symbol] = name;
    // for player 2 name
    if (nameStepIndex === 0) {
        nameStepIndex = 1;
        updateNameScreen();
        nameInput.focus();
        return;
    }

    showScreen("game");
    startNewMatch();
}

////////////////////////////////
// that function should trans form mode 
modesElement.addEventListener("click", event => {
    // that mean if u click on the button or the text insude it 
    const button = event.target.closest(".mode");
    // clicked an empty gap =>and he will stop
    if (!button) return;
    //   having a number so we can trans
    selectedMode = Number(button.dataset.m);
    // change the color
    document.body.dataset.mode = String(selectedMode);

    document.querySelectorAll(".mode").forEach(modeButton => {
    if (modeButton === button) {
    modeButton.classList.add("on");
    } else {
     modeButton.classList.remove("on");
    }})

    startNewRound();
});


function startNewMatch() {
    xWin = 0;
    oWin = 0;

    draws = 0;
    roundNumber = 1;

    roundHistory = [];

    playerRoundWins.X = 0;
    playerRoundWins.O = 0;

    startNewRound();
}

function startNewRound() {
    selectedPieceIndex = null;
    // chose the mode 
    // if selct any mode you will restart the borad
    if (selectedMode === 1) {
        restartGame();
    } else if (selectedMode === 2) {
        restartGame_2();
    } else {
        restartGame_3();
    }

    roundStartX = xWin;
    roundStartO = oWin;

    renderAll();
}

restartBtn.addEventListener("click", () => {
    startNewRound();
});

nextBtn.addEventListener("click", () => {
    // if you click on next with thegame finsh he will not click
    if (!gameOver) {
        hintElement.textContent = "Finish this round first.";
        return;
    }

    roundNumber++;
    startNewRound();
});

// button above if you click the score will be zero 
resetBtn.addEventListener("click", () => {
    xWin = 0;
    oWin = 0;
    draws = 0;

    roundNumber = 1;
    roundHistory = [];

    playerRoundWins.X = 0;
    playerRoundWins.O = 0;

    startNewRound();
});



function createBoard() {
    boardElement.innerHTML = "";

    for (let i = 0; i < 9; i++) {
        const cell = document.createElement("button");

        cell.type = "button";
        cell.className = "cell";
        // i => 0-8 and dataset save the text
        cell.dataset.cell = String(i);


        cell.addEventListener("click", () => {
            handleCellClick(i);
        });

        boardElement.appendChild(cell);
    }
}

function handleCellClick(index) {
    if (gameOver) return;
    // for mode 3
    if (selectedMode === 3) {
        if (selectedPieceIndex === null) {
            hintElement.textContent =
                "Pick one of your pieces first.";
            return;
        }

        const pieceIndex = selectedPieceIndex;
        const playerBeforeMove = currentPlayer;

        const pieces = playerBeforeMove === "X" ? playerX_3 : playerO_3;
        //  the size player chose and type
        const piece = pieces[pieceIndex];

        const target = borad[index];

        // for the smaller can eat biger 
        if (target !== null) {
            if (target.player !== playerBeforeMove &&
                piece.size <= target.size) {
                hintElement.textContent =
                    "Choose a piece larger than the enemy piece.";
                return;
            }
        }

        const oldX = xWin;
        const oldO = oWin;

        playTurn_3(index, pieceIndex);

        // if the piece became null, the move succeeded => clear the selection
        // (an invalid move leaves the piece, so the selection stays)
        if (pieces[pieceIndex] === null) {
            selectedPieceIndex = null;
        }

        finishMove(oldX, oldO);
        return;
    }
    // mode 1 ,2
    const number = index + 1;

    const taken = playerX.includes(number) || playerO.includes(number);

    if (taken) {
        hintElement.textContent = "This cell is already taken!";
        return;
    }

    const oldX = xWin;
    const oldO = oWin;

    if (selectedMode === 1) {
        playTurn(number);
    } else {
        playTurn_2(number);
    }

    finishMove(oldX, oldO);
}

function finishMove(oldX, oldO) {
    hintElement.textContent = "";

    renderAll();

    if (!gameOver) return;

    let result;
    // that mean to increce the win
    if (xWin > oldX) {
        result = "X";
    } else if (oWin > oldO) {
        result = "O";
    } else {
        result = "Draw";
    }

    const resultText = result === "Draw" ? "Draw"
     : `${playerNames[result]} (${result}) wins`;

    statusElement.textContent =
        result === "Draw"  ? "It's a draw!"  : `${resultText}!`;

    if (result === "Draw") {
        draws++;
    } else {
        playerRoundWins[result]++;
    }
    // save this round's result at the top of the history list
    roundHistory.unshift({
        round: roundNumber,
        result,
        text: resultText
    });

    renderScore();
    renderHistory();
}

// yo full the bord
function renderBoard() {
    const cells = boardElement.querySelectorAll(".cell");

    cells.forEach((cell, index) => {
        cell.innerHTML = "";
        // this one for win remove the color win
        cell.classList.remove("win", "fade");

        // Prime mode: mark the current player's oldest piece (it disappears next)
    if (selectedMode === 2 && !gameOver) {
        const own = currentPlayer === "X" ? playerX : playerO;
    if (own.length === 3 && own[0] === index + 1) {
        cell.classList.add("fade");
        }
        }

        cell.removeAttribute("data-p");

        let piece = null;

        if (selectedMode === 1 || selectedMode === 2) {
            const number = index + 1;

            if (playerX.includes(number)) {
                piece = { player: "X", size: 1 };
            } else if (playerO.includes(number)) {
                piece = { player: "O", size: 1 };
            }
        } else {
            piece = borad[index];
        }

        if (piece) {
            cell.dataset.p = piece.player;

            const mark = document.createElement("span");
            mark.className = "m";
            mark.textContent = piece.player;
            // for mode 3 the code wil make a diffrent size
            mark.style.fontSize = selectedMode === 3
                    ? `${Math.min(25 + piece.size * 5, 60)}px`
                    : "clamp(38px, 10vw, 76px)";

            mark.style.fontWeight = "700";

            cell.appendChild(mark);
            // for small number on the coroner
            if (selectedMode === 3) {
                const sizeLabel = document.createElement("span");
                sizeLabel.className = "sz";
                sizeLabel.textContent = piece.size;
                cell.appendChild(sizeLabel);
            }
        }

        cell.disabled = gameOver;
    });
    // the reson i didnt use else mabye the round  is drow
    // and he reson to cange the color cell for winner
    if (gameOver && xWin > roundStartX) {
        highlightWinningLine("X");
    } else if (gameOver && oWin > roundStartO) {
        highlightWinningLine("O");
    }
}

function highlightWinningLine(player) {
    // to check if any one has been won
    for (const line of winningLines) {
        const won = line.every(number => {
            const piece = selectedMode === 3  ? borad[number - 1]
                : {
                    player: playerX.includes(number) ? "X"
                        : playerO.includes(number)  ? "O"  : null
                };

            return piece && piece.player === player;
        });
        //  he reson to cange the color cell for winner
        if (won) {
            line.forEach(number => {
                const cell = boardElement.querySelector(
                    `[data-cell="${number - 1}"]`
                );

                if (cell) cell.classList.add("win");
            });

            return;
        }
    }
}

// to make for the mode 3 the item to chose 
function renderTray() {
    trayElement.innerHTML = "";

    if (selectedMode !== 3) return;

    const pieces = currentPlayer === "X"  ? playerX_3  : playerO_3;

    pieces.forEach((piece, index) => {
        const button = document.createElement("button");

        button.type = "button";
        button.className = "pc";

        if (!piece) {
            button.disabled = true;
            button.textContent = "—";
            trayElement.appendChild(button);
            return;
        }

        button.style.color =
            piece.player === "X"  ? "var(--x)"  : "var(--o)";

        button.classList.toggle(
            "sel",  selectedPieceIndex === index
        );

        const mark = document.createElement("span");
        mark.className = "m";
        mark.textContent = piece.player;
        mark.style.fontSize = `${Math.min(15 + piece.size * 3, 36)}px`;
        mark.style.fontWeight = "700";

        const size = document.createElement("i");
        size.textContent = piece.size;

        button.append(mark, size);

        button.disabled = gameOver;

        button.addEventListener("click", () => {
            selectedPieceIndex = index;

            hintElement.textContent =
                `Selected size ${piece.size}. Choose a cell.`;

            renderTray();
        });

        trayElement.appendChild(button);
    });
}

// show player names, round wins and whose turn it is
function renderPlayers() {
    nameXElement.textContent = playerNames.X;
    nameOElement.textContent = playerNames.O;

    scoreNameXElement.textContent = playerNames.X || "X";
    scoreNameOElement.textContent = playerNames.O || "O";

    winsXElement.textContent = `${playerRoundWins.X} round wins`;

    winsOElement.textContent = `${playerRoundWins.O} round wins`;

    playerXElement.classList.toggle(
        "act",   currentPlayer === "X" && !gameOver
    );

    playerOElement.classList.toggle(
        "act",  currentPlayer === "O" && !gameOver
    );

    document.getElementById("iX").textContent = "X";
    document.getElementById("iO").textContent = "O";

    if (!gameOver) {
        statusElement.textContent = `${playerNames[currentPlayer]}'s
         turn (${currentPlayer})`;
    }
}
// show the score numbers (X wins, O wins, draws)
function renderScore() {
    scoreXElement.textContent = xWin;
    scoreOElement.textContent = oWin;
    scoreDrawElement.textContent = draws;
}
// rebuild the round history list, newest first
function renderHistory() {
    historyElement.innerHTML = "";

    roundHistory.forEach(item => {
        const li = document.createElement("li");

        const roundLabel = document.createElement("span");
        roundLabel.textContent = `Round ${item.round}`;

        const resultLabel = document.createElement("span");
        resultLabel.textContent = item.text;

        li.append(roundLabel, resultLabel);
        historyElement.appendChild(li);
    });
}

function renderAll() {
    createBoard();
    renderBoard();
    renderTray();
    renderPlayers();
    renderScore();
    renderHistory();

    roundElement.textContent = `Round ${roundNumber}`;

    nextBtn.disabled = !gameOver;

    if (!gameOver) {
        statusElement.textContent =
            `${playerNames[currentPlayer]}'s turn (${currentPlayer})`;
    }
}

document.body.dataset.mode = "1";

function finishGame() {

    let message;
    if (xWin > oWin) {
        message = `${playerNames.X} wins the game! (${xWin} - ${oWin})`;
    } else if (oWin > xWin) {
        message = `${playerNames.O} wins the game! (${oWin} - ${xWin})`;
    } else {
        message = `It's a tie! (${xWin} - ${oWin})`;
    }
    alert(message);

    // reset everything for a brand new game
    xWin = 0;
    oWin = 0;
    draws = 0;
    playerRoundWins.X = 0;
    playerRoundWins.O = 0;
    roundHistory = [];
    roundNumber = 1;
    selectedPieceIndex = null;
    nextPlayer = "X";

    restartGame();      
    restartGame_3();

    renderAll();
}

    document.getElementById("finishBtn")
    .addEventListener("click", finishGame);
 

renderAll();
showScreen("about");


        // cell.setAttribute(
            // "aria-label",
            // `Cell ${i + 1}`
        // );
