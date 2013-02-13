function TicTacToe () {
  return {
    players: ['X','O'],
    setBoard: function () {
      this.board = [[null, null, null],
                    [null, null, null],
                    [null, null, null]];
    },
    move: function (x, y, player_mark) {
      this.board[y][x] = player_mark;
    },
    validMove: function (x, y) {
      if (x > 2 || x < 0 || y > 2 || y < 0) {
        return false;
      } else if (this.board[y][x] !== null) {
        return false;
      } else {
        return true;
      }
    },
    winner: function () {
      var flat_board = this.board[0].concat(this.board[1]).concat(this.board[2])
      var winning_lines = [[0, 1, 2], [3, 4, 5], [6, 7, 8],
                     [0, 3, 6], [1, 4, 7], [2, 5, 8],
                     [0, 4, 8], [2, 4, 6]];

      var winner = false;

      function threeInARow (positions, index, array) {
        var line = flat_board[positions[0]] + flat_board[positions[1]] + flat_board[positions[2]]
        if (line === 'XXX') {
          winner = 'X';
        } else if (line === 'OOO') {
          winner = 'O';
        }
      }

      winning_lines.forEach(threeInARow);

      if (flat_board.indexOf(null) == -1) {
        winner = 'tie';
      }

      return winner;
    }
  };
};

function TicTacToeGame (game) {
  return {
    printBoard: function () {
      println(game.board[0].join(" | "));
      println("-------");
      println(game.board[1].join(" | "));
      println("-------");
      println(game.board[2].join(" | "));
    },
    printWinner: function (winner) {
      this.printBoard();
      if (winner == 'tie') {
        println("It's a tie!");
      } else {
        println("Player " + winner + " won!");
      }
    },
    printInvalid: function () {
      alert("Invalid move, try again.");
    },
    clearScreen: function () {
      clear();
    },
    getMove: function (player_mark) {
      move = prompt(player_mark + ", enter your move (x, y)");
      return move.split(", ");
    },
    play: function () {
      game.setBoard();

      while (true) {

        for (var i = 0; i < 2; i++) {
          this.printBoard();
          while (true) {
            var move = this.getMove(game.players[i]);
            if (game.validMove(move[0], move[1])) {
              break;
            }
            this.printInvalid();
          }
          game.move(move[0], move[1], game.players[i]);
          this.clearScreen();

          if (game.winner()) {
            break;
          }
        }


        if (game.winner()) {
          break;
        }
      };

      this.printWinner(game.winner());
    }
  };
};


function println(string) {
  // we'll learn about this when we talk about DOM manipulation.
  $('.output').append(string);
  $('.output').append("\n");
}

function clear() {
  $('.output').html("");
}


TicTacToeGame(TicTacToe()).play();