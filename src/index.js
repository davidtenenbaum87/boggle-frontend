const possibleLetters = ["R", "I", "F", "O", "B", "X", "I", "F", "E", "H", "E", "Y", "D", "E", "N", "O", "W", "S", "U", "T",
"O", "K", "N", "D", "H", "M", "S", "R", "A", "O", "L", "U", "P", "E", "T", "S", "A", "C", "I", "T",
"O", "A", "Y", "L", "G", "K", "U", "E", "Qu", "B", "M", "J", "O", "A", "E", "H", "I", "S", "P", "N",
"V", "E", "T", "I", "G", "N", "B", "A", "L", "I", "Y", "T", "E", "Z", "A", "V", "N", "D", "R", "A",
 "L", "E", "S", "C", "U", "W", "I", "L", "R", "G", "P", "A", "C", "E", "M", "D"]

gameArray = [];
for (let i = 0; i < 16; i++){
  gameArray.push(possibleLetters[Math.floor(Math.random()*possibleLetters.length)]);
}

gameString = gameArray.join("");



const boxes = document.getElementsByClassName('box')
function startNewGame(){
  populateBoard()
}

function populateBoard() {
  let i = 0
  Array.from(boxes).forEach(function(box) {
    box.innerText = gameArray[i]
    i++
  })
}

const wordsDiv = document.getElementById('words')

displayWords = (words) => {
  words.forEach( word => {
    wordsDiv.innerHTML += `<div><li>${word}</li></div>`
  })
}
solverURL = "http://api.codebox.org.uk/boggle"
function showWords() {
    fetch(`${solverURL}/${gameString}` , {
      method: 'GET',
      mode: "no-cors",
      headers: {
        "Content-Type": "application/json"
      },
  }).then(response => response.json())
  // .then(json => {console.log(json)
  // })
}
showWords();



startNewGame()
