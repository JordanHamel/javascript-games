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

Game = (snake, size, browser) ->
  game =
    board: []
    size: size
    initialize: () ->
      this.setBoard()
      this.setSnake()
      this.setMouse()
    setBoard: () ->
      for i in [0..(this.size - 1)]
        this.board[i] = []
        for j in [0..(this.size - 1)]
          this.markBoard([i, j], null)
    setSnake: () ->
      for i in [0...snake.positions.length]
        this.markBoard(snake.positions[i], snake.mark)
    markBoard: (position, mark) ->
      this.board[position[0]][position[1]] = mark
    mouse:
      position: []
      mark: '*'
    setMouse: () ->
      while true
        position = this.randomPosition()
        break if !snake.onPosition(position)
      this.markBoard(position, this.mouse.mark)
      this.mouse.position = position
    randomPosition: () ->
      [Math.floor(Math.random() * this.size),
       Math.floor(Math.random() * this.size)]
    addToHead: () ->
      snake.positions.push(next = snake.nextPosition())
      this.markBoard(next, snake.mark)
    takeFromTail: () ->
      tail = snake.positions.shift()
      this.markBoard(tail, null)
    checkCollisions: () ->
      next = snake.nextPosition()
      offBoard = (next[0] > (this.size - 1) || next[0] < 0 || next[1] > (this.size - 1) || next[1] < 0)
      offBoard || snake.onPosition(next)
    checkMice: () ->
      next = snake.nextPosition()
      next[0] == this.mouse.position[0] && next[1] == this.mouse.position[1]
    turn: (direction) ->
      snake.turn(direction)
    printBoard: () ->
      for i in [0...this.board.length]
        row = ''
        for j in [0...this.board[i].length]
          if this.board[i][j] == null
            row += 'O'
          else
            row += this.board[i][j]
        browser.println(row)
    snake: () ->
      snake
    step: () ->
      if this.checkCollisions()
        return false
      if this.checkMice()
        this.addToHead()
        this.setMouse()
      else
        this.addToHead()
        this.takeFromTail()
      true

browser =
  println: (string) ->
    $('.output').append(string)
    $('.output').append("\n")
  clear: () ->
    $('.output').html("")

$('html').keydown((event) ->
  switch event.keyCode
    when 38 then game.turn('north')
    when 40 then game.turn('south')
    when 37 then game.turn('west')
    when 39 then game.turn('east')
)

SIZE = parseInt(prompt("How large would you like the board?"))
DELAY = 250
game = Game(Snake(), SIZE, browser)
game.initialize(SIZE)

run_loop = () ->
  window.setInterval((
    () ->
      browser.clear()
      alive = game.step()
      game.printBoard()
      unless alive
        browser.println("You Lose!")
        clearInterval(run_loop)
  ), DELAY)

window.setTimeout(run_loop, DELAY)