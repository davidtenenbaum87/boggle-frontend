const possibleLetters = ["R", "I", "F", "O", "B", "X", "I", "F", "E", "H", "E", "Y", "D", "E", "N", "O", "W", "S", "U", "T",
"O", "K", "N", "D", "H", "M", "S", "R", "A", "O", "L", "U", "P", "E", "T", "S", "A", "C", "I", "T",
"O", "A", "Y", "L", "G", "K", "U", "E", "Qu", "B", "M", "J", "O", "A", "E", "H", "I", "S", "P", "N",
"V", "E", "T", "I", "G", "N", "B", "A", "L", "I", "Y", "T", "E", "Z", "A", "V", "N", "D", "R", "A",
 "L", "E", "S", "C", "U", "W", "I", "L", "R", "G", "P", "A", "C", "E", "M", "D"]

gameArray = [];
for (let i = 0; i < 16; i++){
  gameArray.push(possibleLetters[Math.floor(Math.random()*possibleLetters.length)]);
}

// const box0 = document.getElementById('box0')
// const box1 = document.getElementById('box1')
// const box2 = document.getElementById('box2')
// const box3 = document.getElementById('box3')
// const box4 = document.getElementById('box4')
// const box5 = document.getElementById('box5')
// const box6 = document.getElementById('box6')
// const box7 = document.getElementById('box7')
// const box8 = document.getElementById('box8')
// const box9 = document.getElementById('box9')
// const box10 = document.getElementById('box10')
// const box11 = document.getElementById('box11')
// const box12 = document.getElementById('box12')
// const box13 = document.getElementById('box13')
// const box14 = document.getElementById('box14')
// const box15 = document.getElementById('box15')
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





startNewGame()
