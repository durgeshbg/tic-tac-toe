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
    const makeMove = function (Player, position) {
        BOARD[position[0]][position[1]] = Player.marker;
    };
    return { displayBoard, makeMove };
})();

const P1 = Player('Durgesh', 'X');
const P2 = Player('Babu', 'O');
console.log(TicTacToe.displayBoard());
TicTacToe.makeMove(P1, [1, 2]);
console.log(TicTacToe.displayBoard());