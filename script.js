const TicTacToe = (function () {
    const BOARD = [
        [' ', ' ', ' '],
        [' ', ' ', ' '],
        [' ', ' ', ' '],
    ];
    const players = [];
    let turn = 0;

    // Player object
    const Player = function (name, marker) {
        return { name, marker };
    };
    // function: add players in game
    // 0: cannot add more players | 1: player created | -1: marker already taken
    const playerCreate = function (name, marker) {
        players.push(Player(name, marker));
    };

    // function: display board state
    const getBoard = () => BOARD;

    // function: make move by a specified Player in position vector
    const makeMove = function (Player, pos) {
        if (BOARD[pos[0]][pos[1]] == ' ') BOARD[pos[0]][pos[1]] = Player.marker;
        else {
            document.querySelector(
                '.message'
            ).textContent = `Already occupied by ${BOARD[pos[0]][pos[1]]}`;
        }
    };

    // function: checks if rows match in board for Player
    const checkRows = function (board, Player) {
        return board.some((i) => i.every((j) => j == Player.marker));
    };

    // function: transpose rows and cols of copied BOARD
    const transposeBoard = function () {
        duplicate = JSON.parse(JSON.stringify(BOARD));
        for (let i = 0; i < 3; i++)
            for (let j = 0; j < 3; j++) duplicate[i][j] = BOARD[j][i];
        return duplicate;
    };

    // function: checks both diagonals match
    const checkDiagonals = function (Player) {
        let d1 = 0,
            d2 = 0;
        for (let i = 0; i < 3; i++) {
            d1 = BOARD[i][i] == Player.marker ? d1 + 1 : d1;
            d2 = BOARD[i][2 - i] == Player.marker ? d2 + 1 : d2;
        }
        return d1 == 3 ? true : d2 == 3 ? true : false;
    };

    // function: game state of Player (0: tie, 1: win, -1:continue)
    const gameStatus = function (Player) {
        const rowStatus = checkRows(BOARD, Player);
        const colStatus = checkRows(transposeBoard(), Player);
        const diagonalStatus = checkDiagonals(Player);
        const tie = BOARD.every((i) => i.every((j) => j != ' '));

        if (rowStatus || colStatus || diagonalStatus) return 1;
        else if (tie) return 0;
        else return -1;
    };

    // function: get players turn
    const getTurn = () => {
        let temp = turn;
        turn = turn == 1 ? 0 : 1;
        return temp;
    };

    return {
        getBoard,
        makeMove,
        gameStatus,
        players,
        playerCreate,
        getTurn,
    };
})();

// const GameLogic = function () {
//     const players = TicTacToe.players;

//     const turn = TicTacToe.getTurn;
//     const gameStatus = TicTacToe.gameStatus;
//     const makeMove = TicTacToe.makeMove;
//     const display = TicTacToe.displayBoard;

//     TicTacToe.playerCreate('MAN', 'X');
//     TicTacToe.playerCreate('BOT', 'O');
//     while (true) {
//         console.log(display());
//         let pos = JSON.parse(prompt('Enter position vector: '));
//         let player = players[turn()];
//         makeMove(player, pos);
//         if (gameStatus(player) == 1) {
//             console.log(`${player.name} wins!`);
//             break;
//         } else if (gameStatus(player) == 0) {
//             console.log("It's a tie!");
//             break;
//         }
//     }
// };

const DOMLogic = (function () {
    const renderBoard = function (gameboard) {
        const board = document.querySelector('.board');
        board.innerHTML = '';
        for (let i = 0; i < 3; i++) {
            const row = document.createElement('div');
            for (let j = 0; j < 3; j++) {
                const item = document.createElement('div');
                item.textContent = gameboard[i][j];
                item.classList.add(`item`, `${i}-${j}`);
                item.addEventListener('click', makeMove);
                row.appendChild(item);
            }
            row.classList.add('row');
            board.appendChild(row);
        }
    };

    const makeMove = function (e) {
        let pos = e.target.classList[1].split('-');
        let turn = TicTacToe.getTurn();
        let player = TicTacToe.players[turn];
        let getBoard = TicTacToe.getBoard;
        TicTacToe.makeMove(player, pos);
        renderBoard(getBoard());
    };

    const renderPlayers = function (players) {
        const player1name = document.querySelector('.player1 .name');
        const player2name = document.querySelector('.player2 .name');
        const player1marker = document.querySelector('.player1 .marker');
        const player2marker = document.querySelector('.player2 .marker');
        player1name.textContent = players[0].name;
        player2name.textContent = players[1].name;
        player1marker.textContent = players[0].marker;
        player2marker.textContent = players[1].marker;
    };

    return { renderBoard, renderPlayers };
})();
TicTacToe.playerCreate('MAN', 'X');
TicTacToe.playerCreate('BOT', 'O');
DOMLogic.renderBoard(TicTacToe.getBoard());
DOMLogic.renderPlayers(TicTacToe.players);
