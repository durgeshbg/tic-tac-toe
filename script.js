const Player = function (name, marker) {
    return { name, marker };
};

const TicTacToe = (function () {
    const BOARD = [
        [' ', ' ', ' '],
        [' ', ' ', ' '],
        [' ', ' ', ' '],
    ];

    const displayBoard = function () {
        let displayStr = '';
        for (let i = 0; i < BOARD.length; i++) {
            row = BOARD[i];
            displayStr += row[0] + ' | ' + row[1] + ' | ' + row[2];
            if (i == 2) return displayStr;
            displayStr += '\n' + '-'.repeat(10) + '\n';
        }
    };

    const makeMove = function (Player, pos) {
        if (BOARD[pos[0]][pos[1]] == ' ') BOARD[pos[0]][pos[1]] = Player.marker;
        else console.log(`Already occupied by ${BOARD[pos[0]][pos[1]]}`);
    };

    const checkRows = function (board, Player) {
        return board.some((i) => i.every((j) => j == Player.marker));
    };

    const transposeBoard = function () {
        duplicate = JSON.parse(JSON.stringify(BOARD));
        for (let i = 0; i < 3; i++)
            for (let j = 0; j < 3; j++) duplicate[i][j] = BOARD[j][i];
        return duplicate;
    };

    const gameStatus = function (Player) {
        const rowStatus = checkRows(BOARD, Player);
        const tie = BOARD.every((i) => i.every((j) => j != ' '));
        if (rowStatus) return 1;
        else if (tie) return 0;
        else return -1;
    };

    return { displayBoard, makeMove, gameStatus };
})();

const P1 = Player('Durgesh', 'X');
const P2 = Player('Babu', 'O');

TicTacToe.makeMove(P1, [0, 0]);
TicTacToe.makeMove(P2, [0, 1]);
TicTacToe.makeMove(P2, [0, 2]);

TicTacToe.makeMove(P1, [1, 0]);
TicTacToe.makeMove(P1, [1, 1]);
TicTacToe.makeMove(P2, [1, 2]);

TicTacToe.makeMove(P1, [2, 0]);
TicTacToe.makeMove(P1, [2, 1]);
TicTacToe.makeMove(P2, [2, 2]);

console.log(TicTacToe.displayBoard());
console.log(TicTacToe.gameStatus(P1));
