function getComputerChoice() {
  let num = Math.floor(Math.random() * 3)
  let message = "Computer chose"

  switch (num) {
    case 0:
      console.log(message, "rock")
      return "rock"
    case 1:
      console.log(message, "paper")
      return "paper"
    case 2:
      console.log(message, "scissors")
      return "scissors"
  }
}

function getUserChoice() {
  const userChoice = prompt("Choose rock, paper or scissors")

  if (userChoice === null) {
    return null
  }

  userChoice.toLowerCase()

  switch (userChoice) {
    case "rock":
      return "rock"
    case "paper":
      return "paper"
    case "scissors":
      return "scissors"
    default:
      console.log("You didn't choose a valid input! Try typing rock, paper or scissors.")
      return 0
  }
}

function playRound() {
  let userScore = 0
  let computerScore = 0

  function displayScores() {
    console.log(`Scores on the doors: 
        You: ${userScore} 
        Computer: ${computerScore}`)
  }

  function playRound(userChoice, computerChoice) {
    switch (computerChoice) {
      case "rock":
        if (userChoice === "paper") {
          console.log("You win! Paper beats rock!")
          userScore++
        } else if (userChoice === "scissors") {
          console.log("You lose! Rock beats scissors!")
          computerScore++
        } else {
          console.log("Draw! Computer also chose rock!")
        }
        break
      case "paper":
        if (userChoice === "scissors") {
          console.log("You win! Scissors beat paper!")
          userScore++
        } else if (userChoice === "rock") {
          console.log("You lose! Paper beats rock!")
          computerScore++
        } else {
          console.log("Draw! Computer also chose paper!")
        }
        break
      case "scissors":
        if (userChoice === "rock") {
          console.log("You win! Rock beat scissors!")
          userScore++
        } else if (userChoice === "paper") {
          console.log("You lose! Scissors beats paper!")
          computerScore++
        } else {
          console.log("Draw! Computer also chose scissors!")
        }
        break
    }
    displayScores()
  }

  for (i = 0; i < 5; i++) {
    let userChoice = getUserChoice()
    if (userChoice === null) {
      break
    }
    if (!userChoice) {
      i--
      continue
    }
    let computerChoice = getComputerChoice()
    playRound(userChoice, computerChoice)
  }

  if (userScore === 0) {
    console.log("Okay then, refresh the page if you'd like to restart the game.")
    return
  }

  if (userScore > computerScore) {
    console.log("You win the game!")
  } else if (userScore === computerScore) {
    console.log("It's a draw!")
  } else {
    console.log("You lose the game!")
  }
  console.log("Refresh to play again!")
}

playRound()
