const TicTacToe = (function () {
    const BOARD = [
        [' ', ' ', ' '],
        [' ', ' ', ' '],
        [' ', ' ', ' '],
    ];

    // Player object
    const players = [];
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

    // function: reset board
    const resetBoard = () => {
        for (let i = 0; i < 3; i++)
            for (let j = 0; j < 3; j++) BOARD[i][j] = ' ';
    };

    // function: make move by a specified Player in position vector
    // 1: successful move | 0: gameover | -1: not possible
    const makeMove = function (pos) {
        if (gameStatus() != -1) return 0;
        if (BOARD[pos[0]][pos[1]] == ' ') {
            BOARD[pos[0]][pos[1]] = players[turn].marker;
            if (gameStatus() != -1) return 0;
            flipTurn();
            return 1;
        } else return -1;
    };

    // function: checks if rows match in board for Player
    const checkRows = function (board) {
        return board.some((i) => i.every((j) => j == players[turn].marker));
    };

    // function: transpose rows and cols of copied BOARD
    const transposeBoard = function () {
        duplicate = JSON.parse(JSON.stringify(BOARD));
        for (let i = 0; i < 3; i++)
            for (let j = 0; j < 3; j++) duplicate[i][j] = BOARD[j][i];
        return duplicate;
    };

    // function: checks both diagonals match
    const checkDiagonals = function () {
        let d1 = 0,
            d2 = 0;
        for (let i = 0; i < 3; i++) {
            d1 = BOARD[i][i] == players[turn].marker ? d1 + 1 : d1;
            d2 = BOARD[i][2 - i] == players[turn].marker ? d2 + 1 : d2;
        }
        return d1 == 3 ? true : d2 == 3 ? true : false;
    };

    // function: game state of Player (0: tie, 1: win, -1:continue)
    const gameStatus = function () {
        const tie = BOARD.every((i) => i.every((j) => j != ' '));

        if (
            checkRows(getBoard()) ||
            checkRows(transposeBoard()) ||
            checkDiagonals()
        )
            return 1;
        else if (tie) return 0;
        else return -1;
    };

    // function: get and set players turn
    let turn = 0;
    const getTurn = () => turn;
    const flipTurn = () => (turn = turn == 1 ? 0 : 1);

    return {
        getBoard,
        makeMove,
        gameStatus,
        players,
        playerCreate,
        getTurn,
        flipTurn,
        resetBoard,
    };
})();

const DOMLogic = (function () {
    const renderBoard = function (gameboard) {
        const items = [...document.querySelectorAll('.board .item')];
        let itemIndex = 0;
        for (let i = 0; i < 3; i++)
            for (let j = 0; j < 3; j++) {
                items[itemIndex].textContent = gameboard[i][j];
                items[itemIndex].addEventListener('click', makeMove);
                itemIndex++;
            }
    };

    const makeMove = function (e) {
        let pos = e.target.classList[1].split('-');
        let getBoard = TicTacToe.getBoard;
        let flag = TicTacToe.makeMove(pos);
        renderMessage(flag);
        renderBoard(getBoard());
    };

    const renderPlayers = function () {
        const players = TicTacToe.players;
        const names = [...document.querySelectorAll('.name')];
        const markers = [...document.querySelectorAll('.marker')];
        for (let i = 0; i < 2; i++) {
            names[i].textContent = players[i].name;
            markers[i].textContent = players[i].marker;
        }
    };

    const renderMessage = function (flag) {
        const message = document.querySelector('.message');
        if (flag == 1) message.textContent = '';
        else if (flag == -1) message.textContent = 'Already occupied!';
        else if (flag == 0) {
            let status = TicTacToe.gameStatus();
            let player = TicTacToe.players[TicTacToe.getTurn()];
            if (status == 0) message.textContent = "It's a tie!";
            else if (status == 1) message.textContent = `${player.name} won!`;
        }
    };

    const render = function () {
        const getBoard = TicTacToe.getBoard;
        renderBoard(getBoard());
        renderPlayers();
    };

    return { render };
})();

document.querySelector('.reset button').addEventListener('click', () => {
    TicTacToe.resetBoard();
    DOMLogic.render();
});

TicTacToe.playerCreate('MAN', 'X');
TicTacToe.playerCreate('BOT', 'O');
DOMLogic.render();
