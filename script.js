const modal = document.querySelector('.modal')
const start = document.querySelector('.start')
const gamePlay = document.querySelector('.game-play')
const items = document.querySelectorAll('.item')
const form = document.querySelector('form')
const player1 = document.querySelector('#player1')
const player2 = document.querySelector('#player2')
const home = document.querySelector('.home')
const result = document.querySelector('.winner')
const turn = document.querySelector('.turn')

const Game = (() => {
  let playerOne = 0
  let playerTwo = 0
  let turn = 1

  const resetPlayer = () => {
    playerOne = 0
    playerTwo = 0
    turn = 1
  }

  const startGame = () => {
    form.addEventListener('submit', run)
    items.forEach((item) => {
      item.addEventListener('click', () => {
        if (turn === 1) {
          Display.displayTurn(playerTwo)
          Gameboard.marked(playerOne, item.dataset.index)
          Display.displayBoard(turn, item)
          turn = 2
          Gameboard.checkwin(playerOne)
          if (playerOne.getWin()) {
            Gameboard.endGame(playerOne)
            Display.displayWin(playerOne)
          }
          Gameboard.checktie()
        } else {
          Display.displayTurn(playerOne)
          Gameboard.marked(playerTwo, item.dataset.index)
          Display.displayBoard(turn, item)
          turn = 1
          Gameboard.checkwin(playerTwo)
          if (playerTwo.getWin()) {
            Gameboard.endGame(playerTwo)
            Display.displayWin(playerTwo)
          }
          Gameboard.checktie()
        }
      })
    })

    function run(e) {
      e.preventDefault()
      resetPlayer()
      Display.displayGame()
      playerOne = getPlayer().player11
      playerTwo = getPlayer().player22
      Display.displayTurn(playerOne)
    }

    const getPlayer = () => {
      const player11 = Player(player1.value)
      const player22 = Player(player2.value)

      return { player11, player22 }
    }
  }
  return { startGame, resetPlayer }
})()

const Player = (name) => {
  let win = false
  const getName = () => name
  const getWin = () => win
  const setWin = () => (win = true)
  const setLose = () => (win = false)
  return { getName, setWin, getWin, setLose }
}

const Gameboard = (() => {
  let gameboard = [0, 0, 0, 0, 0, 0, 0, 0, 0]
  let tie = 0
  const getGameBoard = () => gameboard

  const resetBoard = () => {
    gameboard = [0, 0, 0, 0, 0, 0, 0, 0, 0]
    tie = 0
  }

  const marked = (player, potition) => {
    if (gameboard[potition] === 0) {
      gameboard.splice(potition, 1, player.getName())
      console.log(gameboard)
    }
  }

  const endGame = (player) => {
    home.addEventListener('click', () => {
      modal.close()
      resetBoard()
      Game.resetPlayer()
      Display.displayReset()
      Display.displayHome()
    })
    modal.showModal()
  }

  const checkwin = (player) => {
    if (gameboard[0] === player.getName()) {
      if (
        gameboard[1] === player.getName() &&
        gameboard[2] === player.getName()
      ) {
        player.setWin()
      } else if (
        gameboard[3] === player.getName() &&
        gameboard[6] === player.getName()
      ) {
        player.setWin()
      } else if (
        gameboard[4] === player.getName() &&
        gameboard[8] === player.getName()
      ) {
        player.setWin()
      }
    } else if (gameboard[1] === player.getName()) {
      if (
        gameboard[4] === player.getName() &&
        gameboard[7] === player.getName()
      ) {
        player.setWin()
      }
    } else if (gameboard[2] === player.getName()) {
      if (
        gameboard[5] === player.getName() &&
        gameboard[8] === player.getName()
      ) {
        player.setWin()
      } else if (
        gameboard[4] === player.getName() &&
        gameboard[6] === player.getName()
      ) {
        player.setWin()
      }
    } else if (gameboard[3] === player.getName()) {
      if (
        gameboard[4] === player.getName() &&
        gameboard[5] === player.getName()
      ) {
        player.setWin()
      }
    } else if (gameboard[6] === player.getName()) {
      if (
        gameboard[7] === player.getName() &&
        gameboard[8] === player.getName()
      ) {
        player.setWin()
      }
    }
  }

  const checktie = () => {
    for (let i = 0; i < gameboard.length; i++) {
      if (gameboard[i] === 0) continue
      tie++
    }
    if (tie === 9) {
      endGame()
      Display.displayTie()
    } else {
      tie = 0
    }
  }
  return { marked, getGameBoard, checkwin, endGame, resetBoard, checktie }
})()

const Display = (() => {
  const displayBoard = (turn, item) => {
    if (
      !item.classList.contains('player1') &&
      !item.classList.contains('player2')
    ) {
      if (turn === 1) item.classList.add('player1')
      if (turn === 2) item.classList.add('player2')
    }
  }

  const displayGame = () => {
    start.style.display = 'none'
    gamePlay.style.display = 'block'
  }

  const displayHome = () => {
    start.style.display = 'block'
    gamePlay.style.display = 'none'
  }

  const displayTie = () => {
    result.textContent = 'Tie!!! 🥳 🥳 🥳'
  }

  const displayWin = (player) => {
    result.textContent = `The winner is ${player.getName()}`
  }

  const displayTurn = (player) => {
    turn.textContent = `${player.getName()} turn`
  }

  const displayReset = () => {
    items.forEach((item) => {
      if (item.classList.contains('player1')) {
        item.classList.remove('player1')
      }
      if (item.classList.contains('player2')) {
        item.classList.remove('player2')
      }
    })
  }

  return {
    displayBoard,
    displayHome,
    displayGame,
    displayReset,
    displayTie,
    displayWin,
    displayTurn,
  }
})()

Game.startGame()
