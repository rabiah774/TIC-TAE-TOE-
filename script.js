let board = [ "", "", "", "", "", "", "", "", "" ];
let currentplayer = "X";
let isgameactive = true;

const statusDisplay = document.getElementById("game-status");
const cells = document.querySelectorAll(".cell");
const  restartButton = document.getElementById("restart-button");

const winningpatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

cells.forEach( (cell, index) => {
    cell.addEventListener("click", () =>
        handlecellclick(cell,index));
   });

   function handlecellclick(cell,index){
    if(board[index] !== "" || !isgameactive)
        return;
     
    board[index] = currentplayer;
    cell.textContent = currentplayer;

    checkwinner();
      
    if (!isgameactive) return;

// Switch player
    currentplayer = currentplayer === "X" ? "O" : "X";
statusDisplay.textContent = `Player ${currentplayer}'s turn`;
  
    }
   

   function checkwinner() {
    let roundwon = false;
    for( let i=0; i< winningpatterns.length; i++) {
        let [a,b,c] = winningpatterns[i];
       if(board[a] !== "" && board[a] === board[b] && board[a] === board[c]){
        roundwon = true;
        break;
       }

    }
   
   if(roundwon){
    statusDisplay.textContent = `Player ${currentplayer} wins!`;
    isgameactive = false;
    return;
   }
    if(!board.includes("")){
        statusDisplay.textContent = "It's a draw!";
        isgameactive = false;
    }
   }
   restartButton.addEventListener("click", restartgame);

   function restartgame() {
    board = [ "", "", "", "", "", "", "", "", "" ];
    isgameactive = true;
    currentplayer = "X";
    cells.forEach(cell => cell.textContent = "");
    statusDisplay.textContent = `Player ${currentplayer}'s turn`;
   }
