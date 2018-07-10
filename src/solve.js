document.addEventListener("DOMContentLoaded", function() {

const board = document.getElementById('board')

const one = document.getElementById('1')
const two = document.getElementById('2')
const three = document.getElementById('3')
const four = document.getElementById('4')
const five = document.getElementById('5')
const six = document.getElementById('6')
const seven = document.getElementById('7')
const eight = document.getElementById('8')
const nine = document.getElementById('9')
const ten = document.getElementById('10')
const eleven = document.getElementById('11')
const twelve = document.getElementById('12')
const thirteen = document.getElementById('13')
const fourteen = document.getElementById('14')
const fifteen = document.getElementById('15')
const sixteen = document.getElementById('16')

const boardArr = [one, two, three, four, five, six, seven, eight, nine, ten, eleven, twelve, thirteen, fourteen, fifteen, sixteen]
const lowerCaseBoardArr = boardArr.map(function(letter) {return letter.innerText.toLowerCase()})

const oneArr = [two, five, six]
const twoArr = [one, three, five, six, seven]
const threeArr = [two, four, six, seven, eight]
const fourArr = [three, seven, eight]
const fiveArr = [one, two, six, nine, ten]
const sixArr = [one, two, three, five, seven, nine, ten, eleven]
const sevenArr = [two, three, four, six, eight, ten, eleven, twelve]
const eightArr = [three, four, seven, eleven, twelve]
const nineArr = [five, six, ten, thirteen, fourteen]
const tenArr = [five, six, seven, nine, eleven, thirteen, fourteen, fifteen]
const elevenArr = [six, seven, eight, ten, twelve, fourteen, fifteen, sixteen]
const twelveArr = [seven, eight, eleven, fifteen, sixteen]
const thirteenArr = [nine, ten, fourteen]
const fourteenArr = [nine, ten, eleven, thirteen, fifteen]
const fifteenArr = [ten, eleven, twelve, fourteen, sixteen]
const sixteenArr = [eleven, twelve, fifteen]

const arrayOfAllOptions = [oneArr, twoArr, threeArr, fourArr, fiveArr, sixArr, sevenArr, eightArr, nineArr, tenArr, elevenArr, twelveArr, thirteenArr, fourteenArr, fifteenArr, sixteenArr]

const currentWord = []

document.addEventListener('keypress', function(event) {
  if (lowerCaseBoardArr.includes(event.key)) {
    const currentBox = document.querySelectorAll(`[data-value="${event.key}"]`)
    currentBox.forEach(function(box) {
debugger
      getNextLetterOptions(box)
      box.dataset.action = 'used';
      filterAllUsedLetters()
    })
    currentWord.push(currentBox[0].innerText);
    console.log(currentWord.join(""))
  }
})

function filterAllUsedLetters() {
  return boardArr.filter(function(letter) {
    return (letter.dataset.action === 'unused')
  })
}

function getNextLetterOptions(box) {
  console.log(arrayOfAllOptions[box.id - 1])

}

  // .forEach(function(letter) {
  //
  //   switch (letter.id) {
  //     case "11":
  //
  //       console.log(elevenArr);
  //       break;
  //     default:
  //
  //   }


})
