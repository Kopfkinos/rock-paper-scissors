const buttonsContainer = document.querySelector("#buttons-container")
const instruction = document.querySelector("#instruction")
const results = document.querySelector("#results")
const scores = document.querySelector("#scores")

const computerPlayed = document.createElement("p")
const userPlayed = document.createElement("p")
const roundResult = document.createElement("h3")

const roundNumText = document.createElement("p")
const scoresTitle = document.createElement("h3")
scoresTitle.textContent = "Scores on the doors..."
const computerScore = document.createElement("p")
computerScore.textContent = "Computer score: "
const userScore = document.createElement("p")
userScore.textContent = "User score: "

const startButton = document.querySelector("#startButton")
startButton.addEventListener("click", (e) => {
  e.stopPropagation()
  playGame()
})

function createRPSButtons() {
  const buttonNames = ["Rock", "Paper", "Scissors"]

  const dynamicMap = new Map()

  for (let name of buttonNames) {
    const button = document.createElement("button")
    button.textContent = name
    button.id = name.toLowerCase()
    dynamicMap.set(name, button)
  }

  dynamicMap.forEach((btn) => {
    buttonsContainer.appendChild(btn)
  })
}

function playGame() {
  let userScoreTally = 0
  let computerScoreTally = 0
  let roundNum = 0

  function updateScores() {
    computerScore.textContent = `Computer score: ${computerScoreTally}`
    userScore.textContent = `User score: ${userScoreTally}`
    roundNumText.textContent = `Round: ${roundNum}/5`
  }
  updateScores()

  function clearPrevRoundResults() {
    ;[computerPlayed, userPlayed, roundResult].forEach((element) => {
      element.textContent = ""
    })
  }
  clearPrevRoundResults()

  function endGame() {
    const buttonsToClear = document.querySelectorAll("#buttons-container button")
    buttonsToClear.forEach((element) => {
      element.remove()
    })
    function getWinnerResult() {
      if (userScoreTally > computerScoreTally) {
        return "You win the game!"
      } else if (userScoreTally === computerScoreTally) {
        return "It's a draw!"
      } else {
        return "You lose the game!"
      }
    }

    instruction.textContent = getWinnerResult()
    const restartBtn = document.createElement("button")
    restartBtn.textContent = "Click to Play Again"
    restartBtn.setAttribute("id", "restartBtn")
    buttonsContainer.appendChild(restartBtn)
  }

  function playRound(userChoice, computerChoice) {
    roundNum++
    computerPlayed.textContent = `Computer drew ${computerChoice}`
    userPlayed.textContent = `User drew ${userChoice}`
    switch (computerChoice) {
      case "rock":
        if (userChoice === "paper") {
          roundResult.textContent = "You win this round! Paper beats rock!"
          userScoreTally++
        } else if (userChoice === "scissors") {
          roundResult.textContent = "You lose this round! Rock beats scissors!"
          computerScoreTally++
        } else {
          roundResult.textContent = "Draw! Computer also chose rock!"
        }
        break
      case "paper":
        if (userChoice === "scissors") {
          roundResult.textContent = "You win this round! Scissors beat paper!"
          userScoreTally++
        } else if (userChoice === "rock") {
          roundResult.textContent = "You lose this round! Paper beats rock!"
          computerScoreTally++
        } else {
          roundResult.textContent = "Draw! Computer also chose paper!"
        }
        break
      case "scissors":
        if (userChoice === "rock") {
          roundResult.textContent = "You win this round! Rock beat scissors!"
          userScoreTally++
        } else if (userChoice === "paper") {
          roundResult.textContent = "You lose this round! Scissors beats paper!"
          computerScoreTally++
        } else {
          roundResult.textContent = "Draw! Computer also chose scissors!"
        }
        break
    }
    results.setAttribute("class", "results-box")
    results.append(computerPlayed, userPlayed, roundResult)
    updateScores()
    if (roundNum === 5) {
      endGame()
    }
  }

  instruction.textContent = "Choose your hand!"
  startButton.remove()
  createRPSButtons()
  scores.setAttribute("class", "scores-box")
  scores.append(computerScore, userScore, roundNumText)
  buttonsContainer.addEventListener("click", (e) => {
    if (e.target.id === "restartBtn") {
      restartBtn.remove()
      results.removeAttribute("class", "results-box")
      playGame()
    } else if (e.target.id !== "buttons-container") {
      let playerChoice = getPlayerChoice(e)
      let computerChoice = getComputerChoice()
      playRound(playerChoice, computerChoice)
    }
  })
}

function getComputerChoice() {
  let num = Math.floor(Math.random() * 3)
  let message = "Computer chose"

  switch (num) {
    case 0:
      return "rock"
    case 1:
      return "paper"
    case 2:
      return "scissors"
  }
}

function getPlayerChoice(e) {
  let target = e.target

  switch (target.id) {
    case "rock":
      return "rock"
    case "paper":
      return "paper"
    case "scissors":
      return "scissors"
  }
}
