function Snake () {
  var snake = {
    direction: 'east',
    turn: function (direction) {
      this.direction = direction;
    },
    length: 5,
    addToLength: function () {
      this.length += 1
    },
    positions: [[1, 1], [1, 2], [1, 3], [1, 4], [1, 5]],
    head: function () {
      return this.positions[this.positions.length - 1];
    }
  };

  return snake;
}

function Game (snake) {
  var game = {
    board: new Array(),
    setupBoard: function () {
      this.fillBoard();
      this.setSnake();
      this.setMouse();
    },
    fillBoard: function () {
      for (var i = 0; i < 10; i++) {
        this.board[i] = new Array();
        for (var j = 0; j < 10; j++) {
          this.board[i][j] = null;
        };
      };
    },
    setSnake: function () {
      for (var i = 0; i < snake.positions.length; i++) {
        this.board[snake.positions[i][0]][snake.positions[i][1]] = '=';
      };
    },
    mousePosition: [5, 7],
    setMouse: function () {
      this.board[this.mousePosition[0]][this.mousePosition[1]] = '*'
    },
    moveMouse: function () {
      while (true) {
        var x = Math.floor(Math.random() * 10);
        var y = Math.floor(Math.random() * 10);

        function onMouse () {
          var mouse = false;

          for (var i = 0; i < snake.positions.length; i++){
            if (snake.positions[i][0] == x && snake.positions[i][1] == y) {
              mouse = true;
            }
          }

          return mouse;
        }

        if (!onMouse()) {
          break;
        };
      }

      this.board[x][y] = '*';
      this.mousePosition = [x, y]
    },
    nextPosition: function () {
      switch (snake.direction) {
        case 'east':
          return [snake.head()[0], snake.head()[1] + 1]
          break;
        case 'west':
          return [snake.head()[0], snake.head()[1] - 1]
          break;
        case 'north':
          return [snake.head()[0] - 1, snake.head()[1]]
          break;
        case 'south':
          return [snake.head()[0] + 1, snake.head()[1]]
          break;
      };

    },
    addToHead: function () {
      var next = this.nextPosition();
      this.board[next[0]][next[1]] = '#';
      snake.positions.push(next);
    },
    takeFromTail: function () {
      var tail = snake.positions.shift();
      this.board[tail[0]][tail[1]] = null;
    },
    checkCollisions: function () {
      var next = this.nextPosition();

      function hitSelf () {
        var hit = false;

        for (var i = 0; i < snake.positions.length; i++){
          if (snake.positions[i][0] == next[0] && snake.positions[i][1] == next[1]) {
            hit = true;
          }
        }

        return hit;
      }

      if (next[0] > 9 || next[0] < 0 || next[1] > 9 || next[1] < 0) {
        return true;
      } else if (hitSelf()) {
        return true;
      } else {
        return false;
      };
    },
    checkMice: function () {
      var next = this.nextPosition();
      if (next[0] == this.mousePosition[0] && next[1] == this.mousePosition[1]) {
        return true;
      } else {
        return false;
      };
    },
    turn: function (direction) {
      snake.turn(direction)
    },
    printBoard: function () {
      for (var i = 0; i < this.board.length; i++) {
        var row = ''
        
        for (var j = 0; j < this.board[i].length; j++) {
          if (this.board[i][j] == null) {
            row += 'O'
          } else {
            row += this.board[i][j]
          }
        }

        println(row);
      }
    },
    get_snake: function () {
      return snake;
    },
    step: function () {
      clear();
      if (this.checkCollisions()) {
        println("You Lose!")
        return;
      }

      if (this.checkMice()) {
        this.addToHead();
        this.moveMouse();
      } else {
        this.addToHead();
        this.takeFromTail();
      }
      this.printBoard();
    }
  };

  return game;
}

// module.exports = {
//   Snake: Snake,
//   Game: Game
// }

// Game
// board
// step
// collision (walls + self)

var game = Game(Snake());
game.setupBoard();

// function run_game_step () {
//   game.step();
// }

function run_loop() {
  window.setInterval(function() {game.step()}, 250);
}

window.setTimeout(run_loop, 250);


function println(string) {
  // we'll learn about this when we talk about DOM manipulation.
  $('.output').append(string);
  $('.output').append("\n");
}

function clear() {
  $('.output').html("");
}

$('html').keydown(function (event) {
  switch (event.keyCode) {
    case 38:
      game.turn('north');
      break;
    case 40:
      game.turn('south');
      break;
    case 37:
      game.turn('west');
      break;
    case 39:
      game.turn('east');
      break;
  }
});

