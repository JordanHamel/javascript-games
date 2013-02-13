var TowersOfHanoi = function () {
  var game = {
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

  return game;
}

module.exports = {
  TowersOfHanoi: TowersOfHanoi
}