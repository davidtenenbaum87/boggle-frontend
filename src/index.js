document.addEventListener('DOMContentLoaded', function() {
  const possibleLetters = ["R", "I", "F", "O", "B", "X", "I", "F", "E", "H", "E", "Y", "D", "E", "N", "O", "W", "S", "U", "T", "O", "K", "N", "D", "H", "M", "S", "R", "A", "O", "L", "U", "P", "E", "T", "S", "A", "C", "I", "T", "O", "A", "Y", "L", "G", "K", "U", "E", "Q", "B", "M", "J", "O", "A", "E", "H", "I", "S", "P", "N", "V", "E", "T", "I", "G", "N", "B", "A", "L", "I", "Y", "T", "E", "Z", "A", "V", "N", "D", "R", "A", "L", "E", "S", "C", "U", "W", "I", "L", "R", "G", "P", "A", "C", "E", "M", "D"]

  const boxes = document.getElementsByClassName('box')
  const highScoresButton = document.getElementById('high-scores-button')
  const newBoardButton = document.getElementById('new-board-button')
  const wordList = document.getElementById('word-list')
  const scoreBox = document.getElementById('score')
  const timer = document.getElementById('timer')


  const foundWords = [];
  const possibleWords = []
  let score = 0;

  // highScoresButton.addEventListener('click', function() {
  //   debugger;
  // })

// event listener for creating a new board
  newBoardButton.addEventListener('click', function() {
    const newBoard = populateBoard()
    timer.innerHTML = 03 + ":" + 01;
    score = 0;
    displayScore()
    startTimer()
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
    var key = event.which || event.keyCode;
    if (key === 13) {
      foundWords.push(event.target.value)
      checkWord(event.target.value)
      event.target.value = ""
    }
  });

// checking if the input word exists in the api
  function checkWord(word) {
    const currentWord = word.toUpperCase();
    const correctWords = []
    if (possibleWords.includes(currentWord)) {
      if (!correctWords.includes(currentWord)) {
        correctWords.push(currentWord);
        addWordToList(word);
        keepScore(currentWord);
      }
    } else {
      console.log("not a word")
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



function startTimer() {
  var presentTime = document.getElementById('timer').innerHTML;
  var timeArray = presentTime.split(/[:]+/);
  var m = timeArray[0];
  var s = checkSecond((timeArray[1] - 1));
  if(s==59){m=m-1}
  //if(m<0){alert('timer completed')}

  document.getElementById('timer').innerHTML =
    m + ":" + s;
  setTimeout(startTimer, 1000);
}

function checkSecond(sec) {
  if (sec < 10 && sec >= 0) {sec = "0" + sec}; // add zero in front of numbers < 10
  if (sec < 0) {sec = "59"};
  return sec;
}





//   function setTimer() {
//     timer = ({ timer }) => {
//
//     const minute = () => {
//      return Math.floor(timer / 60)
//     }
//
//  const second = () => {
//    let s = timer % 60;
//    return (s<10) ? `0${s}` : s
//  }
//
//  return(
//    <div className="boggle-timer">
//      <div id="hour-glass">
//        <div id="glass"></div>
//        <div id="sand-stream"></div>
//        <div id="top-sand"></div>
//        <div id="bottom-sand"></div>
//      </div>
//    </div>
//  )
//
// }
//
// export default Timer;
//   }



});
