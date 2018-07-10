document.addEventListener('DOMContentLoaded', function() {
  const possibleLetters = ["R", "I", "F", "O", "B", "X", "I", "F", "E", "H", "E", "Y", "D", "E", "N", "O", "W", "S", "U", "T", "O", "K", "N", "D", "H", "M", "S", "R", "A", "O", "L", "U", "P", "E", "T", "S", "A", "C", "I", "T", "O", "A", "Y", "L", "G", "K", "U", "E", "Qu", "B", "M", "J", "O", "A", "E", "H", "I", "S", "P", "N", "V", "E", "T", "I", "G", "N", "B", "A", "L", "I", "Y", "T", "E", "Z", "A", "V", "N", "D", "R", "A", "L", "E", "S", "C", "U", "W", "I", "L", "R", "G", "P", "A", "C", "E", "M", "D"]

  const boxes = document.getElementsByClassName('box')
  const newBoardButton = document.getElementById('new-board-button')


  newBoardButton.addEventListener('click', function() {
    const newBoard = populateBoard()
    foundWords = [];
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

  function populateBoard() {
    const board = []
    for (let i = 0; i < 16; i++){
      board.push(possibleLetters[Math.floor(Math.random()*possibleLetters.length)]);
    }
    return board;
  }

  function parseData(data) {
    const possibleWords = []
    data.forEach(function(word) {
      possibleWords.push(word);
    })
    console.log(possibleWords)
  }


foundWords = []

//adds event listener to enter word guesses
  const wordInput = document.getElementById('wordInput')
  wordInput.addEventListener('keypress', function (e) {
    var key = e.which || e.keyCode;
    if (key === 13) {
      foundWords.push(e.target.value)
      const wordList = document.getElementById('wordList')
      wordList.innerHTML += `<li> ${e.target.value} </li>`
      e.target.value = ""
    }
  });

  function checkWords() {
    const allWords = parseData(data)
    // debugger;
    foundWords.filter(function(word){
      console.log(possibleWords.includes(word))

    })
  };
  // debugger



});
