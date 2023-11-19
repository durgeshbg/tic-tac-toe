const TicTacToe = (function () {
    const BOARD = [
        [' ', ' ', ' '],
        [' ', ' ', ' '],
        [' ', ' ', ' '],
    ];

    const players = [];

    // Player object
    const Player = function (name, marker) {
        return { name, marker };
    };
    // function: add players in game
    const playerCreate = function (name, marker) {
        if (players.length >= 2) {
            console.log('Cannot add for than two players!');
            return;
        }
        players.push(Player(name, marker));
    };

    // function: display board state
    const displayBoard = function () {
        let displayStr = '';
        for (let i = 0; i < BOARD.length; i++) {
            row = BOARD[i];
            displayStr += row[0] + ' | ' + row[1] + ' | ' + row[2];
            if (i == 2) return displayStr;
            displayStr += '\n' + '-'.repeat(10) + '\n';
        }
    };

    // function: make move by a specified Player in position vector
    const makeMove = function (Player, pos) {
        if (BOARD[pos[0]][pos[1]] == ' ') BOARD[pos[0]][pos[1]] = Player.marker;
        else console.log(`Already occupied by ${BOARD[pos[0]][pos[1]]}`);
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

    return { displayBoard, makeMove, gameStatus, players, playerCreate };
})();

TicTacToe.playerCreate('Durgesh', 'X');
TicTacToe.playerCreate('Babu', 'O');
TicTacToe.playerCreate('Babu', 'O');
console.log(TicTacToe.players);
