// array having the right answer
const correctAnswer =[
[1,2,3],[4,5,6],[7,8,9],
[1,4,7],[2,5,8],[3,6,9],
[3,5,7],[1,5,9]
]
// array to save number for two player (mode 1 & 2)
let playerX=[];
let playerO=[];

let xWin=0;
let oWin=0;
// in case won or drow (btw mode 2 he havent drow case) gameOer will be true
let gameOver = false;
let nextPlayer="X"
let currentPlayer = "X";

function switchPlayer(){
    if (currentPlayer==="X")
       return currentPlayer="O"
    else return currentPlayer="X"
}

function restartGame (){
    playerX=[];
    playerO=[];
    gameOver=false;
    currentPlayer=nextPlayer;
}
// if (playerX.length>2) i dont need to research every time .
// mode 1 clasic
function playTurn(number) {
    if (gameOver) return;

    if (playerX.includes(number) || playerO.includes(number)) {
        console.log("This cell is already taken!");
        return;
    }
    if (currentPlayer==="X"){
        playX(number)
    }
    else playO(number)
}
    
    function playX(number){
    playerX.push(number);
    if (playerX.length>=3){
        for (let i =0; i<correctAnswer.length;i++){
            // condiution of won
            if(correctAnswer[i].every(number => playerX.includes(number))){
                console.log (`player X is the Winner`)
                xWin++;
                nextPlayer = "O";
                gameOver = true;
                return;
            }
        }
    }
    switchPlayer()
    if(playerX.length+playerO.length===9){
        console.log("this is drow")
        gameOver=true;
        nextPlayer = currentPlayer;
        return;
    }
}

function playO(number) {
     if(gameOver) return;
     
    if (playerX.includes(number) || playerO.includes(number)) {
        console.log("This cell is already taken!");
        return;
    }
    playerO.push(number);  
    if (playerO.length>=3){
        for (let i =0; i<correctAnswer.length;i++){
            if(correctAnswer[i].every(number => playerO.includes(number))){
                console.log (`player O is the Winner`);
                oWin++;
                nextPlayer = "X";               
                gameOver=true;
                return ;
            }
        }
    }
    switchPlayer()
    if(playerX.length+playerO.length===9){
        console.log("this is drow")
        gameOver=true;
        nextPlayer = currentPlayer;
        return;
    }
}
///////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////

function switchPlayer_2(){
    if (currentPlayer==="X"){
       return currentPlayer="O"
    }
    else return currentPlayer="X"
}

function restartGame_2(){
    playerX=[];
    playerO=[];
    gameOver=false;
    currentPlayer=nextPlayer;
}
// mode 2 prime
function playTurn_2(number) {
    if (gameOver) return;
    // this for the cell condiution if it taken
    if (playerX.includes(number) || playerO.includes(number)) {
        console.log("This cell is already taken!");
        return;
    }
    if (currentPlayer==="X"){
        playX_2(number)
    }
    else playO_2(number)
}
    
    function playX_2(number){
    playerX.push(number);
        if (playerX.length>3){
            playerX.shift()
        }
        for (let i =0; i<correctAnswer.length;i++){
            if(correctAnswer[i].every(number => playerX.includes(number))){
                console.log (`player X is the Winner`)
                xWin++;
                nextPlayer = "O";
                gameOver = true;
                return;
            }
        }
      switchPlayer_2()
    }

function playO_2(number) {
     if(gameOver) return;
     
    if (playerX.includes(number) || playerO.includes(number)) {
        console.log("This cell is already taken!");
        return;
    }
    playerO.push(number);  
        if (playerO.length>3){
            playerO.shift()
        }
    
        for (let i =0; i<correctAnswer.length;i++){
            if(correctAnswer[i].every(number => playerO.includes(number))){
                console.log (`player O is the Winner`);
                oWin++;
                nextPlayer = "X";               
                gameOver=true;
                return ;
            }
        }
      switchPlayer_2();
    }
//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////
// mode 3  platinum  // the harder one
function switchPlayer_3(){
    if (currentPlayer==="X")
       return currentPlayer="O"
    else return currentPlayer="X"
}
// both player have array with difreent size
function restartGame_3(){
     playerX_3 = [
    { player: "X", size: 1 },
    { player: "X", size: 2 },
    { player: "X", size: 3 },
    { player: "X", size: 4 },
    { player: "X", size: 5 },
    { player: "X", size: 6 },
    { player: "X", size: 7 }
];
    playerO_3= [
    { player: "O", size: 1 },
    { player: "O", size: 2 },
    { player: "O", size: 3 },
    { player: "O", size: 4 },
    { player: "O", size: 5 },
    { player: "O", size: 6 },
    { player: "O", size: 7 }
];
    gameOver= false;
    borad = Array(9).fill(null);
    currentPlayer = nextPlayer;
}
 let playerX_3 = [
    { player: "X", size: 1 },
    { player: "X", size: 2 },
    { player: "X", size: 3 },
    { player: "X", size: 4 },
    { player: "X", size: 5 },
    { player: "X", size: 6 },
    { player: "X", size: 7 }
];
  let playerO_3= [
    { player: "O", size: 1 },
    { player: "O", size: 2 },
    { player: "O", size: 3 },
    { player: "O", size: 4 },
    { player: "O", size: 5 },
    { player: "O", size: 6 },
    { player: "O", size: 7 }
];
let borad=[
[],[],[],
[],[],[],
[],[],[]
]
borad=Array(9).fill(null);


function playTurn_3(cellNumber, pieceSize){
    if (gameOver) return;

    if (currentPlayer==="X"){
        playX_3(cellNumber,pieceSize)
    }
    else playO_3(cellNumber,pieceSize)
}
    
    function playX_3(cellNumber, pieceIndex){
    if(gameOver){
        return;
    }
        if (!playerX_3[pieceIndex]) {
        console.log("This piece has already been used!");
        return;
    }    
    if (borad[cellNumber]===null){
            borad[cellNumber]=playerX_3[pieceIndex]
            playerX_3.splice(pieceIndex,1,null);
    }    
    else if  (playerX_3[pieceIndex].player===borad[cellNumber].player){
            borad[cellNumber].size=
            borad[cellNumber].size+playerX_3[pieceIndex].size;
            playerX_3.splice(pieceIndex,1,null)
    }
    else if(playerX_3[pieceIndex].player!=borad[cellNumber].player){
        if(playerX_3[pieceIndex].size>borad[cellNumber].size){
            borad[cellNumber]=playerX_3[pieceIndex];
            playerX_3.splice(pieceIndex,1,null);
        }
        else {
            console.log("This cell is already taken!");
            return;
        }
    }

        for (let i =0; i<correctAnswer.length;i++){
            if(correctAnswer[i].every(cell => borad[cell-1]?.player === "X")){
                  // for ?  all elment togther 
                console.log (`player X is the Winner`)
                xWin++;
                nextPlayer = "O";
                gameOver = true;
                return;
            }
        }
        if(
             playerX_3.every(x => x === null) &&
             playerO_3.every(x => x === null)
        )
        {
            gameOver =true;
            console.log("this is drow")
            return;
        }
          switchPlayer_3()
    }
  

function playO_3(cellNumber, pieceIndex) {
    if (gameOver) {
        return;
    }

    if (!playerO_3[pieceIndex]) {
        console.log("This piece has already been used!");
        return;
    }

    if (borad[cellNumber] === null) {
        borad[cellNumber] = playerO_3[pieceIndex];
        playerO_3.splice(pieceIndex, 1, null);
    }
    else if (playerO_3[pieceIndex].player === borad[cellNumber].player) {
        borad[cellNumber].size =
            borad[cellNumber].size + playerO_3[pieceIndex].size;

        playerO_3.splice(pieceIndex, 1, null);
    }
    else if (playerO_3[pieceIndex].player !== borad[cellNumber].player) {
        if (playerO_3[pieceIndex].size > borad[cellNumber].size) {
            borad[cellNumber] = playerO_3[pieceIndex];
            playerO_3.splice(pieceIndex, 1, null);
        }
        else {
            console.log("This cell is already taken!");
            return;
        }
    }

    for (let i = 0; i < correctAnswer.length; i++) {
        if (correctAnswer[i].every(cell => borad[cell - 1]?.player === "O")) {
            console.log("Player O is the Winner");
            oWin++;
            nextPlayer = "X";
            gameOver = true;
            return;
        }
    }

    if (
        playerX_3.every(x => x === null) &&
        playerO_3.every(x => x === null)
    ) {
        gameOver = true;
        console.log("This is a draw");
        return;
    }

    switchPlayer_3();
}
/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////
