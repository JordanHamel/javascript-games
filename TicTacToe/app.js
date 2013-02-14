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
    gameOver: false,
    validMove: function (x, y) {
      if (x > 2 || x < 0 || y > 2 || y < 0) {
        return false;
      } else if (this.board[y][x] !== null) {
        return false;
      } else if (this.gameOver) {
        return false;
      }
      else {
        return true;
      }
    },
    winner: function () {
      var flat_board = this.board[0].concat(this.board[1]).concat(this.board[2])
      var winning_lines = [[0, 1, 2], [3, 4, 5], [6, 7, 8],
                     [0, 3, 6], [1, 4, 7], [2, 5, 8],
                     [0, 4, 8], [2, 4, 6]];

      var winner = false;

      var that = this
      function threeInARow (positions, index, array) {
        var line = flat_board[positions[0]] + flat_board[positions[1]] + flat_board[positions[2]]
        if (line === 'XXX') {
          winner = 'X';
          that.gameOver = true;
        } else if (line === 'OOO') {
          winner = 'O';
          that.gameOver = true;
        }
      }

      winning_lines.forEach(threeInARow);

      if (flat_board.indexOf(null) == -1) {
        winner = 'tie';
        this.gameOver = true;
      }

      return winner;
    }
  };
};

function TicTacToeGame (game) {
  return {
    printBoard: function () {
      for (var i = 0; i < game.board.length; i++) {
        $('div.game').append('<div class="row row' + i + ' cf"></div>')
        for (var j = 0; j < game.board.length; j++) {
          mark = game.board[i][j]
          if (mark == null) {
            mark = ''
          }
          $('div.row' + i).append('<div class = "square" id =' + i + j + '>' + mark + '</div>')
        }
      }
    },
    printWinner: function (winner) {
      if (winner == 'tie') {
        println("It's a tie!");
      } else {
        println("Player " + winner + " won!");
      }
    },
    printInvalid: function () {
      alert("Invalid move, try again.");
    },
    game: game,
    mark: 'X',
    tryMove: function (pos) {
      console.log(game.gameOver)
      if (game.validMove(pos[0], pos[1])) {
        game.move(pos[0], pos[1], this.mark);
        if (game.winner()) {
          this.printWinner(game.winner());
        }
        return true;
      } else {
        return false;
      }
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
  $('.message').append(string);
}

function clear() {
  $('.output').html("");
}

game = TicTacToe();
g = TicTacToeGame(game);
g.game.setBoard();
g.printBoard();

// $('body').append('<div class="asdf" >ASDF</div>');

var mark = 'X';
$('.square').click(function (clicked) {
  if (g.tryMove(clicked.target.id.split(''))) {
    $(clicked.currentTarget).addClass('mark' + g.mark);
    if (g.mark == 'X') {
      g.mark = 'O';
    } else {
      g.mark = 'X';
    }
  } else {
    g.printInvalid();
  }
});