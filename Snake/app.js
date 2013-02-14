// Generated by CoffeeScript 1.4.0
var DELAY, Game, SIZE, Snake, browser, game, run_loop;

Snake = function() {
  var snake;
  return snake = {
    mark: 'X',
    direction: 'east',
    positions: [[1, 1]],
    head: function() {
      return this.positions[this.positions.length - 1];
    },
    length: function() {
      return this.positions.length;
    },
    turn: function(direction) {
      return this.direction = direction;
    },
    nextPosition: function() {
      switch (this.direction) {
        case 'east':
          return [this.head()[0], this.head()[1] + 1];
        case 'west':
          return [this.head()[0], this.head()[1] - 1];
        case 'north':
          return [this.head()[0] - 1, this.head()[1]];
        case 'south':
          return [this.head()[0] + 1, this.head()[1]];
      }
    },
    onPosition: function(position) {
      var i, onPosition, _i, _ref;
      onPosition = false;
      for (i = _i = 0, _ref = this.positions.length; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
        if (this.positions[i][0] === position[0] && this.positions[i][1] === position[1]) {
          onPosition = true;
        }
      }
      return onPosition;
    }
  };
};

Game = function(snake, size, browser) {
  var game;
  return game = {
    board: [],
    size: size,
    initialize: function() {
      this.setBoard();
      this.setSnake();
      return this.setMouse();
    },
    setBoard: function() {
      var i, j, _i, _ref, _results;
      _results = [];
      for (i = _i = 0, _ref = this.size - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
        this.board[i] = [];
        _results.push((function() {
          var _j, _ref1, _results1;
          _results1 = [];
          for (j = _j = 0, _ref1 = this.size - 1; 0 <= _ref1 ? _j <= _ref1 : _j >= _ref1; j = 0 <= _ref1 ? ++_j : --_j) {
            _results1.push(this.markBoard([i, j], null));
          }
          return _results1;
        }).call(this));
      }
      return _results;
    },
    setSnake: function() {
      var i, _i, _ref, _results;
      _results = [];
      for (i = _i = 0, _ref = snake.positions.length; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
        _results.push(this.markBoard(snake.positions[i], snake.mark));
      }
      return _results;
    },
    markBoard: function(position, mark) {
      return this.board[position[0]][position[1]] = mark;
    },
    mouse: {
      position: [],
      mark: '*'
    },
    setMouse: function() {
      var position;
      while (true) {
        position = this.randomPosition();
        if (!snake.onPosition(position)) {
          break;
        }
      }
      this.markBoard(position, this.mouse.mark);
      return this.mouse.position = position;
    },
    randomPosition: function() {
      return [Math.floor(Math.random() * this.size), Math.floor(Math.random() * this.size)];
    },
    addToHead: function() {
      var next;
      snake.positions.push(next = snake.nextPosition());
      return this.markBoard(next, snake.mark);
    },
    takeFromTail: function() {
      var tail;
      tail = snake.positions.shift();
      return this.markBoard(tail, null);
    },
    checkCollisions: function() {
      var next, offBoard;
      next = snake.nextPosition();
      offBoard = next[0] > (this.size - 1) || next[0] < 0 || next[1] > (this.size - 1) || next[1] < 0;
      return offBoard || snake.onPosition(next);
    },
    checkMice: function() {
      var next;
      next = snake.nextPosition();
      return next[0] === this.mouse.position[0] && next[1] === this.mouse.position[1];
    },
    turn: function(direction) {
      return snake.turn(direction);
    },
    printBoard: function() {
      var i, j, row, _i, _j, _ref, _ref1, _results;
      _results = [];
      for (i = _i = 0, _ref = this.board.length; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
        row = '';
        for (j = _j = 0, _ref1 = this.board[i].length; 0 <= _ref1 ? _j < _ref1 : _j > _ref1; j = 0 <= _ref1 ? ++_j : --_j) {
          if (this.board[i][j] === null) {
            row += 'O';
          } else {
            row += this.board[i][j];
          }
        }
        _results.push(browser.println(row));
      }
      return _results;
    },
    snake: function() {
      return snake;
    },
    step: function() {
      if (this.checkCollisions()) {
        return false;
      }
      if (this.checkMice()) {
        this.addToHead();
        this.setMouse();
      } else {
        this.addToHead();
        this.takeFromTail();
      }
      return true;
    }
  };
};

browser = {
  println: function(string) {
    $('.output').append(string);
    return $('.output').append("\n");
  },
  clear: function() {
    return $('.output').html("");
  }
};

$('html').keydown(function(event) {
  switch (event.keyCode) {
    case 38:
      return game.turn('north');
    case 40:
      return game.turn('south');
    case 37:
      return game.turn('west');
    case 39:
      return game.turn('east');
  }
});

SIZE = parseInt(prompt("How large would you like the board?"));

DELAY = 250;

game = Game(Snake(), SIZE, browser);

game.initialize(SIZE);

run_loop = function() {
  return window.setInterval((function() {
    var alive;
    browser.clear();
    alive = game.step();
    game.printBoard();
    if (!alive) {
      browser.println("You Lose!");
      return clearInterval(run_loop);
    }
  }), DELAY);
};

window.setTimeout(run_loop, DELAY);
