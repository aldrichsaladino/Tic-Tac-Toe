//Breaking it down into Main steps

//Game initialization - Setting up the Gameboard
let gameBoard = ["" , "" , "" , "" , "" , "" , "" , "" , ""]; //9 slots, each for a square
let currentPlayer = "X"; //Player 1 starts first

//Add event listener to each square
const squares = document.querySelectorAll(".grid-box");
squares.forEach((square,index) => {
    square.addEventListener("click", () => (performMove(index,square))
)}) //when a square is clicked, perform a move

//function to start and reset the game
function startGame() {
    //reset the gameboard array
    gameBoard = ["", "", "", "", "", "", "", "", ""];
    //reset the current player to X and the UI
    currentPlayer = "X";
    document.getElementById("turn").textContent="X's turn";

    //reset the turn display

    //Loop through the squares to reset the UI
    squares.forEach(square => {
        square.classList.remove("flip","win")
        square.querySelector(".x-mark").classList.remove("show");
        square.querySelector(".o-mark").classList.remove("show");
        square.style.pointerEvents = "auto"; //turns clicking on again
    });

    console.log("Game has started");
}

//restart button event listener
document.getElementById("restart").addEventListener("click", startGame); //when buton clicked, startgame function is called 


//Game action - Moves and Turns

//Sound Effects
const clickSound = new Audio("click.mp3");
const winSound = new Audio("win.mp3");

function performMove(index, square) {
    // Prevent overwriting a square
    if (gameBoard[index] !== "") return;

    gameBoard[index] = currentPlayer; // Store move in gameBoard array
    clickSound.play(); // Play click sound

    // 🔹 Step 1: Hide both marks first (ensures only one appears)
    square.querySelector(".x-mark").classList.remove("show");
    square.querySelector(".o-mark").classList.remove("show");

    // 🔹 Step 2: Show the correct mark for the current player
    square.querySelector(`.${currentPlayer.toLowerCase()}-mark`).classList.add("show");

    // 🔹 Step 3: Add flip animation
    square.classList.add("flip");
    square.style.pointerEvents = "none"; // Prevents clicking the same square again

    let gameOver = checkWinner(); // Check if game is won

    if (gameOver) {
        winSound.play(); // Play win sound
        return;
    }

    // 🔹 Step 4: Switch turns
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    document.getElementById("turn").textContent = `${currentPlayer}'s Turn`;
}


//Game Logic - Win Conditions
//Score tracking
let scoreX = 0;
let scoreO = 0;

function checkWinner() {
    //define win conditions
    const winConditions = [
        //rows
        [0,1,2], //top row
        [3,4,5], //middle row
        [6,7,8], //bottom row
        //columns
        [0,3,6], //first column
        [1,4,7], //second column
        [2,5,8], //third column
        //diagonals
        [0,4,8], //diagonal from top left
        [2,4,6] //diagonal from top right
    ];

    //Loop through the gameboard array to check for win conditions
    for (var condition of winConditions) {
        let [a,b,c] = condition; //this is the array for win conditions
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            squares[a].classList.add("win");
            squares[b].classList.add("win");
            squares[c].classList.add("win");

            console.log("Win condition met");
            console.log(gameBoard[a] + " wins");

            //display winner
            document.getElementById("turn").textContent = `${gameBoard[a]} wins!`;

            //update score
            if(gameBoard[a] === "X") {
                scoreX++;
                document.getElementById("score-x").textContent = scoreX;
            } else {
                scoreO++;
                document.getElementById("score-o").textContent = scoreO;
            }
            
            //disable board until reset button selected
            squares.forEach(square => {
                square.style.pointerEvents = "none";
            });
            return true; //if win condition is met, return true
        }
    }

    if(!gameBoard.includes("")) {
        document.getElementById("turn").textContent = "It's a Draw!";
        return true;
    }
    return false; //if after all the squares are selected and no winner, draw
    
}
