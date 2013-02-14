Snake = () ->
  snake =
    mark: 'X'
    direction: 'east'
    positions: [[1, 1]]
    head: () ->
      this.positions[this.positions.length - 1]
    length: () ->
      this.positions.length
    turn: (direction) ->
      this.direction = direction
    nextPosition: () ->
      switch this.direction
        when 'east'
        then [this.head()[0], this.head()[1] + 1]
        when 'west'
        then [this.head()[0], this.head()[1] - 1]
        when 'north'
        then [this.head()[0] - 1, this.head()[1]]
        when 'south'
        then [this.head()[0] + 1, this.head()[1]]
    onPosition: (position) ->
      onPosition = false
      for i in [0...this.positions.length]
        if this.positions[i][0] == position[0] && this.positions[i][1] == position[1]
          onPosition = true
      onPosition

Game = (snake, board) ->
  game =
    board: board
    snake: snake
    mouse:
      mark: '*'
      position: []
    initialize: () ->
      board.initialize()
      board.setSnake(snake)
      board.setMouse(this.mouse)
    addToHead: () ->
      snake.positions.push(next = snake.nextPosition())
      board.markBoard(next, snake.mark)
    takeFromTail: () ->
      tail = snake.positions.shift()
      board.markBoard(tail, null)
    checkCollisions: () ->
      next = snake.nextPosition()
      board.offBoard(next) || snake.onPosition(next)
    checkMice: () ->
      next = snake.nextPosition()
      next[0] == this.mouse.position[0] && next[1] == this.mouse.position[1]
    turn: (direction) ->
      snake.turn(direction)
    step: () ->
      if this.checkCollisions()
        return false
      if this.checkMice()
        this.addToHead()
        board.setMouse(this.mouse)
        return true
      else
        this.addToHead()
        this.takeFromTail()
        return true

Board = (size) ->
  board =
    initialize: () ->
      this.setBoard()
    board: []
    size: size
    setBoard: () ->
      for i in [0..(this.size - 1)]
        this.board[i] = []
        for j in [0..(this.size - 1)]
          this.markBoard([i, j], null)
    setSnake: (snake) ->
      for i in [0...snake.positions.length]
        this.markBoard(snake.positions[i], snake.mark)
    setMouse: (mouse) ->
      while true
        position = this.randomPosition()
        break if !snake.onPosition(position)
      this.markBoard(position, mouse.mark)
      mouse.position = position
    markBoard: (position, mark) ->
      this.board[position[0]][position[1]] = mark
    randomPosition: () ->
      [Math.floor(Math.random() * this.size),
       Math.floor(Math.random() * this.size)]
    offBoard: (position) ->
      x = position[0] > (this.size - 1) || position[0] < 0
      y = position[1] > (this.size - 1) || position[1] < 0
      x || y


printBoard = (board) ->
  size = board.length
  for i in [0...size]
    row = ''
    for j in [0...size]
      if board[i][j] == null
        row += 'O'
      else
        row += board[i][j]
    browser.println(row)

browser =
  println: (string) ->
    $('.output').append(string)
    $('.output').append("\n")
  clear: () ->
    $('.output').html("")

$('html').keydown((event) ->
  switch event.keyCode
    when 38 then snake.turn('north')
    when 40 then snake.turn('south')
    when 37 then snake.turn('west')
    when 39 then snake.turn('east')
    # when 32 then togglePause()
)

runLoop = () ->
  window.setInterval((
    () ->
      browser.clear()
      alive = game.step()
      printBoard(board.board)
      unless alive
        browser.println("You Lose!")
        clearInterval(runLoop)
  ), DELAY)

# paused = false
# togglePause = () ->
#   if paused
#     paused = false
#     runLoop()
#   else
#     paused = true
#     window.clearInterval(runLoop)


SIZE = parseInt(prompt("How large would you like the board?"))
DELAY = 250

window.setTimeout(runLoop, DELAY)
snake = Snake()
board = Board(SIZE)
game = Game(snake, board)
game.initialize()