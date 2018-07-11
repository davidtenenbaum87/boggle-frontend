document.addEventListener('DOMContentLoaded', function() {
  const possibleLetters = ["R", "I", "F", "O", "B", "X", "I", "F", "E", "H", "E", "Y", "D", "E", "N", "O", "W", "S", "U", "T", "O", "K", "N", "D", "H", "M", "S", "R", "A", "O", "L", "U", "P", "E", "T", "S", "A", "C", "I", "T", "O", "A", "Y", "L", "G", "K", "U", "E", "Q", "B", "M", "J", "O", "A", "E", "H", "I", "S", "P", "N", "V", "E", "T", "I", "G", "N", "B", "A", "L", "I", "Y", "T", "E", "Z", "A", "V", "N", "D", "R", "A", "L", "E", "S", "C", "U", "W", "I", "L", "R", "G", "P", "A", "C", "E", "M", "D"]

  const boxes = document.getElementsByClassName('box')
  // const highScoresButton = document.getElementById('high-scores-button')
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
    score = 0;
    displayScore()
    // getHighScores()
    countdown()
    wordList.innerHTML = ""
    highScoreTable.innerHTML = "";
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
      board.push(possibleLetters[Math.floor(Math.random()*possibleLetters.length)]);
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

// keeping count of current score
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

// displaying current score
  function displayScore() {
    scoreBox.innerText = `Score: ${score}`
  }


// get request from users api, invoking a function to check for existing/new users
  function getUsersFromAPI(score) {
    var userName = prompt("What's your name?")
    fetch(usersURL, {
      "Access-Control-Allow-Origin": "*"
    })
    .then(res => res.json())
    .then(data => checkForUser(data, userName))

  }

// checking if user exist in API. If true, post new score. else create new user.
  function checkForUser(users, userName) {
    const result = users.find( user => user.name === userName );
    // debugger;
      if (result) {
        return postHighScore(result)
      }else {
        return createUser(userName);
      }
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

// countdown
  function countdown(){
    let startingTime = 60;
    timer.innerText = startingTime;
    let gameCountdown = setInterval(function(){
      startingTime--;
      if (startingTime === -1){
        timer.innerText = startingTime
        clearInterval(gameCountdown)
        endGame()
      } else if (startingTime <= 10) {
        timer.style.color = 'red';
        timer.innerText = startingTime
      } else {
        timer.innerText = startingTime
        // clearInterval(gameCountdown)

      }
    }, 1000)
  }

  // end of game function
    function endGame() {
      timer.innerHTML = `<i class="material-icons">pan_tool GAME OVER pan_tool</i>`
      alert("GAME OVER")
      getUsersFromAPI(score)
      getHighScores();
    }

    function getHighScores(){
      fetch(scoresURL, {
        "Access-Control-Allow-Origin": "*"
      })
      .then(res => res.json())
      .then(data => parseScores(data))
    }

    function parseScores(data) {
      let sortedScores = data.sort((a, b) => b.score - a.score);
      let topTen = sortedScores.slice(0,10)
      topTen.forEach(function(score) {
        displayUserScoreHTML(score);
      })
    }

    const highScoreTable = document.getElementById('high-scores-table')

    function displayUserScoreHTML(score) {
      highScoreTable.innerHTML += generateScoreHTML(score)
    }

    function generateScoreHTML(score) {
      return `
        <tr>
          <td>${score.user.name}</td>
          <td>${score.score}</td>
        </tr>
      `
    }

    // function getUserName(score) {
    //   const userId = score.user_id
    //   fetch(usersURL, {
    //     "Access-Control-Allow-Origin": "*"
    //   })
    //   .then(res => res.json())
    //   .then(data => data.find(function(user) { return user.id === userId }))
    //   .then(data => {return data.name})
    //
    // }
    // function getUserNameFromAPI(score) {
    //   const userId = score.user_id
    //   fetch(usersURL, {
    //     "Access-Control-Allow-Origin": "*"
    //   })
    //   .then(res => res.json())
    //   .then(data => data.find(user => user.id === userId))
    //   .then(data => generateScoreHTML(data))
    // }

    // function findUserName(users) {
    //
    // }


});
