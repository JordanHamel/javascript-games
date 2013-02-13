function TowersOfHanoi() {
  return {
    board: undefined,
    setBoard: function() {
      this.board = [[3,2,1],[],[]]
    },
    move: function(from, to) {
      var disc = this.board[from].pop();
      this.board[to].push(disc);
    },
    validMove: function(from, to) {
      if (from > 2 || from < 0 || to > 2 || to < 0) {
        return false;
      }
      else if (from == to) {
        return false;
      }
      else if (this.board[to][this.board[to].length - 1] < this.board[from][this.board[from].length - 1]) {
        return false;
      }
      else {
        return true;
      }
    },
    gameOver: function() {
      if (this.board[1].length == 3 || this.board[2].length == 3) {
        return true;
      }
      else {
        return false;
      }
    }
  }
}

function playTowers(game) {
  return {
    getMove: function() {
      var move = prompt("What's your move? (from, to)");
      move = move.split(', ');
      for (var i = 0; i < move.length; i++) {
        move[i] = parseInt(move[i]) - 1;
      }
      return move;
    },
    printBoard: function() {
      println("Tower 1:")
      println(game.board[0].join(', '));
      println("Tower 2:")
      println(game.board[1].join(', '));
      println("Tower 3:")
      println(game.board[2].join(', '));
    },
    printInvalidMove: function() {
      alert("Invalid move. Please try again.");
    },
    printWinner: function() {
      this.printBoard();
      println("You won!");
    },
    clearScreen: function() {
      clear();
    },
    play: function() {
      game.setBoard();
      while (!game.gameOver()) {
        this.printBoard();
        var move = this.getMove();
        if (game.validMove(move[0], move[1])) {
          game.move(move[0], move[1]);
        } else {
          this.printInvalidMove();
        }
        this.clearScreen();
      }
      this.printWinner();
    }
  }
}

function println(string) {
  // we'll learn about this when we talk about DOM manipulation.
  $('.output').append(string);
  $('.output').append("\n");
}

function clear() {
  $('.output').html("");
}

playTowers(TowersOfHanoi()).play();

// println("Loaded it up!");
// var input = prompt("Type in your input:");
// println(input);