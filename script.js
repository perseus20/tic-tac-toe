const modal = document.querySelector('.modal')
const start = document.querySelector('.start')
const gamePlay = document.querySelector('.game-play')
const items = document.querySelectorAll('.item')
const form = document.querySelector('form')
const player1 = document.querySelector('#player1')
const player2 = document.querySelector('#player2')
const home = document.querySelector('.home')

const Game = (() => {
  let playerOne = 0
  let playerTwo = 0
  let turn = 1

  const startGame = () => {
    form.addEventListener('submit', run)
    items.forEach((item) => {
      item.addEventListener('click', () => {
        if (turn === 1) {
          Gameboard(playerOne, item.dataset.index)
          displayBoard(turn, item)
          turn = 2
        } else {
          Gameboard(playerTwo, item.dataset.index)
          displayBoard(turn, item)
          turn = 1
        }
      })
    })

    const reset = () => {
      playerOne = 0
      playerTwo = 0
      turn = 1
    }

    function run(e) {
      e.preventDefault()
      display()
      reset()
      playerOne = getPlayer().player11
      playerTwo = getPlayer().player22
    }

    const display = () => {
      start.style.display = 'none'
      gamePlay.style.display = 'block'
    }

    const displayBoard = (turn, item) => {
      if (
        !item.classList.contains('player1') &&
        !item.classList.contains('player2')
      ) {
        if (turn === 1) item.classList.add('player1')
        if (turn === 2) item.classList.add('player2')
      }
    }

    const getPlayer = () => {
      const player11 = Player(player1.value, 'x')
      const player22 = Player(player2.value, 'x')

      return { player11, player22 }
    }
  }
  return startGame
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

  const marked = (player, potition) => {
    if (gameboard[potition] === 0) {
      gameboard.splice(potition, 1, player.getName())
      console.log(gameboard)
      checkwin(player)
      console.log(player.getName(), player.getWin())
      if (player.getWin()) endGame(player)
    }
  }

  const resetBoard = (player) => {
    gameboard = [0, 0, 0, 0, 0, 0, 0, 0, 0]
    player.setLose()
    items.forEach((item) => {
      item.classList.remove('player1')
      item.classList.remove('player2')
    })
  }

  const endGame = (player) => {
    home.addEventListener('click', () => {
      modal.close()
      start.style.display = 'block'
      gamePlay.style.display = 'none'
      resetBoard(player)
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

  return marked
})()

Game()
