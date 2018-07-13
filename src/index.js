document.addEventListener('DOMContentLoaded', function() {
  const possibleLetters = ["R", "I", "F", "O", "B", "X", "I", "F", "E", "H", "E", "Y", "D", "E", "N", "O", "W", "S", "U", "T", "O", "K", "N", "D", "H", "M", "S", "R", "A", "O", "L", "U", "P", "E", "T", "S", "A", "C", "I", "T", "O", "A", "Y", "L", "G", "K", "U", "E", "Q", "B", "M", "J", "O", "A", "E", "H", "I", "S", "P", "N", "V", "E", "T", "I", "G", "N", "B", "A", "L", "I", "Y", "T", "E", "Z", "A", "V", "N", "D", "R", "A", "L", "E", "S", "C", "U", "W", "I", "L", "R", "G", "P", "A", "C", "E", "M", "D"]

  const boxes = document.getElementsByClassName('box') // representing all of the dice on the board
  const newBoardButton = document.getElementById('new-board-button') // new game button
  const wordList = document.getElementById('word-list') // All the correctly guessed words div
  const highScoreTable = document.getElementById('high-scores-table') // high score table div
  const wordInput = document.getElementById('word-input') // word input div
  const inputBox = document.getElementById('inputBox') // word input box
  const scoreBox = document.getElementById('score') // The current game score
  const timer = document.getElementById('timer') // The timer
  const usersURL = "http://localhost:3000/api/v1/users" // users api
  const scoresURL = "http://localhost:3000/api/v1/scores" // scores api
  const foundWords = [] // all guessed words
  let possibleWords = [] // dictionary of correct words for particular board
  let score = 0; // score
  let rankCounter = 0; // high score ranking counter

  const allScoresTable = [] // holds all the scores data

  fetch(scoresURL, {
    "Access-Control-Allow-Origin": "*"
  })
  .then(res => res.json())
  .then(data => addScoresToAllScores(data))

  function addScoresToAllScores(scores) {
    scores.forEach(function(score) {
      allScoresTable.push({user: score.user.name, score: score.score})
    })
  }

// event listener for creating a new board
  newBoardButton.addEventListener('click', function() {
    const newBoard = populateBoard()
    score = 0;
    displayScore()
    // getHighScores()
    countdown()
    inputBox.focus();
    wordList.innerHTML = ""
    highScoreTable.innerHTML = "";
    highScoreTable.innerHTML = `<img src="hourglass.gif" id="hourglass" class="hourglass">`
    // roll dice, creating new 16 letter game
    let i = 0;
    Array.from(boxes).forEach(function(box) {
      box.innerText = newBoard[i];
      i++;

    })
    $('.box')
      .transition('vertical flip')
      .transition('horizontal flip')
    ;
    $('.hourglass')
      .transition('flash');
    ;

    // calling the api with the newly created letter grid
    fetch(`http://api.codebox.org.uk/boggle/${newBoard.join("")}`)
      .then(res => res.json())
      .then(data => parseData(data))
  })

// parsing the data from the api, saving all the possible words in an array
  function parseData(data) {
    data.forEach(function(word) {
      possibleWords.push(word);
    })
    console.log(possibleWords)
  }

// populating letters for the new board
  function populateBoard() {
    const board = []
    for (let i = 0; i < 16; i++) {
      board.push(possibleLetters[Math.floor(Math.random()*possibleLetters.length)]);
    }
    return board;
  }

//adds event listener to submit guessed word, calling on checkWord() on each guess
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
      alert('word does not exist or has been already found!')
    }
  };

  // adding the correctly guessed words to the HTML
    function addWordToList(word) {
      wordList.innerHTML += `<li> ${word} <i class="material-icons">check</i></li>`
    }

  // keeping count of current score, calling on displayScore()
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

  // displaying current score on HTML
    function displayScore() {
      scoreBox.innerText = `Score: ${score}`
    }

// calculates and displays the countdown
  function countdown() {
    let startingTime = 10;
    timer.innerText = startingTime;
    let gameCountdown = setInterval(function(){
      startingTime--;
      if (startingTime === -1) {
        timer.innerText = startingTime
        clearInterval(gameCountdown)
        endGame()
      } else if (startingTime <= 10) {
        timer.style.color = 'red';
        timer.innerText = startingTime
      } else {
        timer.innerText = startingTime
      }
    }, 1000)
  }

  // end of game function
    function endGame() {
      const hourGlass = document.getElementById('hourglass') // hourglass gif

      hourGlass.remove();

      timer.style = "color:red; margin: auto; width: 21%; padding: 10px;"
      $('.timer')
        .transition('tada')
      ;

      timer.innerHTML = `<i id="game-over" class="material-icons">pan_tool GAME OVER pan_tool</i>`
      setTimeout(function() {

        alert("GAME OVER")
        getUsersFromAPI(score)
      }, 500)

    }

    // GET request from users api, invoking a function to check for existing/new users
    function getUsersFromAPI(score) {
      var userName = prompt("What's your name?")
      addUserScoreToArray(userName, score)

      fetch(usersURL, {
        "Access-Control-Allow-Origin": "*"
      })
      .then(res => res.json())
      .then(data => checkForUser(data, userName))
    }

    function addUserScoreToArray(userName, score) {
      allScoresTable.push({user: userName, score: score})
      parseScores(allScoresTable)
    }


    // checking if user exist in API. If true, post new score. else create new user.
    function checkForUser(users, userName) {
      const result = users.find( user => user.name === userName );
      if (result) {
        return postHighScore(result)
      } else {
        return createUser(userName);
      }
    }

    // creating a new user in API. then calling on the post high score for the newly created user.
    function createUser(userName) {
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

    // post request to post a new score for user.
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

    function parseScores(data) {
      let sortedScores = data.sort((a, b) => b.score - a.score);
      let topTen = sortedScores.slice(0,10)
      highScoreTable.innerHTML = `<th>Rank</th><th>Name</th>
      <th>High Score</th>`
      topTen.forEach(function(score) {
        displayUserScoreHTML(score);
      })
    }


// adds the generated high score table row to the HTML
    function displayUserScoreHTML(score) {
      highScoreTable.innerHTML += generateScoreHTML(score)
    }


// generates a table row HTML element for each user/score
    function generateScoreHTML(score) {
      if (rankCounter >= 10) {
        rankCounter = 0;
      }
      ++rankCounter
      return `
        <tr>
          <td>${rankCounter}</td>
          <td>${score.user}</td>
          <td>${score.score}</td>
        </tr>
      `
    }

});
