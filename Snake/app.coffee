Snake = () ->
  snake =
    direction: 'east'
    positions: [[1, 1], [1, 2], [1, 3], [1, 4], [1, 5]]
    head: () ->
      this.positions[this.positions.length - 1]
    length: () ->
      this.positions.length
    turn: (direction) ->
      this.direction = direction

Game = (snake) ->
  game =
    board: new Array()
    setupBoard: () ->
      this.fillBoard()
      this.setSnake()
      this.setMouse()
    fillBoard: () ->
      for i in [0..9]
        this.board[i] = new Array()
        for j in [0..9]
          this.board[i][j] = null
    setSnake: () ->
      for i in [0...snake.positions.length]
        this.board[snake.positions[i][0]][snake.positions[i][1]] = '='
    mousePosition: [5, 7],
    setMouse: () ->
      this.board[this.mousePosition[0]][this.mousePosition[1]] = '*'
    moveMouse: () ->
      while true
        x = Math.floor(Math.random() * 10)
        y = Math.floor(Math.random() * 10)

        onMouse = () ->
          mouse = false

          for i in [0...snake.positions.length]
            if (snake.positions[i][0] == x && snake.positions[i][1] == y)
              mouse = true
          mouse

        break if !onMouse()

      this.board[x][y] = '*'
      this.mousePosition = [x, y]
    nextPosition: () ->
      switch snake.direction
        when 'east'
        then [snake.head()[0], snake.head()[1] + 1]
        when 'west'
        then [snake.head()[0], snake.head()[1] - 1]
        when 'north'
        then [snake.head()[0] - 1, snake.head()[1]]
        when 'south'
        then [snake.head()[0] + 1, snake.head()[1]]
    addToHead: () ->
      next = this.nextPosition()
      this.board[next[0]][next[1]] = '#'
      snake.positions.push(next)
    takeFromTail: () ->
      tail = snake.positions.shift()
      this.board[tail[0]][tail[1]] = null
    checkCollisions: () ->
      next = this.nextPosition()

      hitSelf = () ->
        hit = false
        for i in [0...snake.positions.length]
          if snake.positions[i][0] == next[0] && snake.positions[i][1] == next[1]
            hit = true
        hit

      offBoard = (next[0] > 9 || next[0] < 0 || next[1] > 9 || next[1] < 0)

      offBoard || hitSelf()
    checkMice: () ->
      next = this.nextPosition()
      next[0] == this.mousePosition[0] && next[1] == this.mousePosition[1]
    turn: (direction) ->
      snake.turn(direction)
    printBoard: () ->
      for i in [0...this.board.length]
        row = ''
        for j in [0...this.board[i].length]
          this.board[i][j] == null ? row += 'O' : row += this.board[i][j]
        println(row)
    snake: () ->
      snake
    step: () ->
      clear()
      if this.checkCollisions()
        println("You Lose!")
        return
      if this.checkMice()
        this.addToHead()
        this.moveMouse()
      else
        this.addToHead()
        this.takeFromTail()
      this.printBoard()

game = Game(Snake())
game.setupBoard()

run_loop = () ->
  window.setInterval((() -> game.step()), 250)

window.setTimeout(run_loop, 250)

println = (string) ->
  $('.output').append(string)
  $('.output').append("\n")

clear = () ->
  $('.output').html("")

$('html').keydown((event) ->
  switch event.keyCode
    when 38 then game.turn('north')
    when 40 then game.turn('south')
    when 37 then game.turn('west')
    when 39 then game.turn('east')
)