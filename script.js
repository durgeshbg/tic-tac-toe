const TicTacToe = (function () {
    const BOARD = [
        ['X', 'O', 'X'],
        ['X', 'X', 'O'],
        ['O', 'O', 'X'],
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
    const Player = function (name, marker) {
        return { name, marker };
    };
    return { Player, displayBoard };
})();
