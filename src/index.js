document.addEventListener('DOMContentLoaded', function() {
  const possibleLetters = ["R", "I", "F", "O", "B", "X", "I", "F", "E", "H", "E", "Y", "D", "E", "N", "O", "W", "S", "U", "T", "O", "K", "N", "D", "H", "M", "S", "R", "A", "O", "L", "U", "P", "E", "T", "S", "A", "C", "I", "T", "O", "A", "Y", "L", "G", "K", "U", "E", "Q", "B", "M", "J", "O", "A", "E", "H", "I", "S", "P", "N", "V", "E", "T", "I", "G", "N", "B", "A", "L", "I", "Y", "T", "E", "Z", "A", "V", "N", "D", "R", "A", "L", "E", "S", "C", "U", "W", "I", "L", "R", "G", "P", "A", "C", "E", "M", "D"]

  const boxes = document.getElementsByClassName('box')
  const highScoresButton = document.getElementById('high-scores-button')
  const newBoardButton = document.getElementById('new-board-button')
  const wordList = document.getElementById('word-list')
  const scoreBox = document.getElementById('score')
  const timer = document.getElementById('timer')
  const usersURL = "http://localhost:3000/api/v1/users"
  const scoresURL = "http://localhost:3000/api/v1/scores"


  const foundWords = [];
  let possibleWords = []
  let score = 0;

  // highScoresButton.addEventListener('click', function() {
  //   debugger;
  // })

// event listener for creating a new board
  newBoardButton.addEventListener('click', function() {
    const newBoard = populateBoard()
    // timer.innerHTML = 03 + ":" + 01;
    score = 0;
    displayScore()
    countdown()
    // startTimer()
    wordList.innerHTML = ""
    let i = 0;
    Array.from(boxes).forEach(function(box) {
      box.innerText = newBoard[i];
      i++;
    })

    fetch(`http://api.codebox.org.uk/boggle/${newBoard.join("")}`)
      .then(res => res.json())
      .then(data => parseData(data))
  })

// parsing the data from the api
  function parseData(data) {
    data.forEach(function(word) {
      possibleWords.push(word);
    })
    console.log(possibleWords)
  }

// populating the new letter for the new board
  function populateBoard() {
    const board = []
    for (let i = 0; i < 16; i++){
      board.push(possibleLetters[Math.floor(Math.random()*possibleLetters.length)]);``
    }
    return board;
  }

//adds event listener to enter word guesses
  const wordInput = document.getElementById('word-input')
  wordInput.addEventListener('keypress', function (event) {
    if (event.keyCode === 13) {
      foundWords.push(event.target.value)
      checkWord(event.target.value)
      event.target.value = ""
    }
  });

// checking if the input word exists in the api
  function checkWord(word) {
    const currentWord = word.toUpperCase();
    const correctWords = [];
    if (possibleWords.includes(currentWord)) {
      correctWords.push(currentWord);
      possibleWords = possibleWords.filter(word => { return word !== currentWord} )
      addWordToList(word);
      keepScore(currentWord);
    } else {
      alert('word does not exist or has been alreay found!')
    }
  };

  // adding the words to the HTML
    function addWordToList(word) {
      wordList.innerHTML += `<li> ${word} </li>`
    }

  function keepScore(word) {
    if (word.length < 5) {
      score += 1;
    } else if (word.length === 5) {
      score += 2;
    } else if (word.length === 6) {
      score += 3;
    } else if (word.length === 7) {
      score += 5;
    } else {
      score += 11;
    }
    displayScore()
  }

  function displayScore() {
    scoreBox.innerText = `Score: ${score}`
  }

  function endGame(){
    alert("GAME OVER")
    getUsersFromAPI(score)
  }

  function getUsersFromAPI(score) {
    var userName = prompt("What's your name?")
    fetch(usersURL, {
      "Access-Control-Allow-Origin": "*"
    })
    .then(res => res.json())
    .then(data => checkForUser(data, userName))

  }

  function checkForUser(users, userName) {
    users.find(function(user) {
      if (user.name === userName) {
        return postHighScore(user)
      }
    })

    return createUser(userName);

  }

  function postHighScore(user) {
    const scoreObj = {
      method: "POST",
      headers: {
        'Content-type':'application/json'
      },
      body: JSON.stringify({ user_id: user.id, score: score})
    }
    fetch(scoresURL, scoreObj);
  }

  function createUser(userName) {
    debugger;
    const userObj = {
      method: "POST",
      headers: {
        'Content-type':'application/json'
      },
      body: JSON.stringify({ name: userName })
    }
    fetch(usersURL, userObj)
      .then(res => res.json())
      .then(data => postHighScore(data));
  }

function countdown(){
  let startingTime = 10;
  timer.innerText = startingTime;
  let gameCountdown = setInterval(function(){
    startingTime--;
    if (startingTime > 0){
      timer.innerText = startingTime
    }
    else {
      endGame()
      clearInterval(gameCountdown)
      timer.innerText = "GAME OVER"
    }
  }, 1000)
}


});
