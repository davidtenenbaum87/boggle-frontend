document.addEventListener('DOMContentLoaded', function() {
  const possibleLetters = ["R", "I", "F", "O", "B", "X", "I", "F", "E", "H", "E", "Y", "D", "E", "N", "O", "W", "S", "U", "T", "O", "K", "N", "D", "H", "M", "S", "R", "A", "O", "L", "U", "P", "E", "T", "S", "A", "C", "I", "T", "O", "A", "Y", "L", "G", "K", "U", "E", "Qu", "B", "M", "J", "O", "A", "E", "H", "I", "S", "P", "N", "V", "E", "T", "I", "G", "N", "B", "A", "L", "I", "Y", "T", "E", "Z", "A", "V", "N", "D", "R", "A", "L", "E", "S", "C", "U", "W", "I", "L", "R", "G", "P", "A", "C", "E", "M", "D"]

  const boxes = document.getElementsByClassName('box')
  const newBoardButton = document.getElementById('new-board-button')
  const wordList = document.getElementById('wordList')
  const foundWords = [];
  const possibleWords = []

// event listener for creating a new board
  newBoardButton.addEventListener('click', function() {
    const newBoard = populateBoard()
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
      board.push(possibleLetters[Math.floor(Math.random()*possibleLetters.length)]);
    }
    return board;
  }

//adds event listener to enter word guesses
  const wordInput = document.getElementById('wordInput')
  wordInput.addEventListener('keypress', function (event) {
    var key = event.which || event.keyCode;
    if (key === 13) {
      foundWords.push(event.target.value)
      checkWord(event.target.value)
      event.target.value = ""
    }
  });

// adding the words to the HTML
  function addWordToList(word) {
    wordList.innerHTML += `<li> ${word} </li>`
  }


  function checkWord(word) {
    if (possibleWords.includes(word.toUpperCase())) {
      addWordToList(word)
    } else {
      console.log("not a word")
    }
  };

});
