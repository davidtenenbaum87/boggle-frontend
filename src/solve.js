// find elements
const box1 = document.getElementById('1')
const box2 = document.getElementById('2')
const box3 = document.getElementById('3')
const box4 = document.getElementById('4')
const box5 = document.getElementById('5')
const box6 = document.getElementById('6')
const box7 = document.getElementById('7')
const box8 = document.getElementById('8')
const box9 = document.getElementById('9')
const box10 = document.getElementById('10')
const box11 = document.getElementById('11')
const box12 = document.getElementById('12')
const box13 = document.getElementById('13')
const box14 = document.getElementById('14')
const box15 = document.getElementById('15')
const box16 = document.getElementById('16')

// 1:
//   {2:
//     {5:
//       {6:
//         {3:
//           {7: [4, 8, 10, 11, 12]},
//           {8: [4, 7, 11, 12]},
//           {4: [7, 8]}
//         },
//         {7:
//           {3: [3, 4]},
//           {4: [3, 8]},
//           {8: [3, 4, 11, 12]},
//           {10: [9, 11, 13, 14, 15]},
//           {11: [8, 10, 12, 14, 15, 16]},
//           {12: [8, 11, 15, 16]}
//         },
//         {9:
//           {10: [7, 11, 13, 14, 15] },
//           {13: [10, 14]},
//           {14: [10, 11, 13, 15]}
//         },
//         {10:
//           {7: [3, 4, 8, 11, 12]},
//           {9: [13, 14]},
//           {11: [7, 8, 12, 14, 15, 16]},
//           {13: [9, 14]},
//           {14: [9, 11, 13, 15]},
//           {15: [11, 12, 14, 16]}
//         },
//         {11:
//           {7: [3, 4, 8, 10, 12]},
//           {8: [3, 4, 7, 12]},
//           {10: [7, 9, 13, 14, 15]},
//           {12: [7, 8, 15, 16]},
//           {14: [9, 10, 13, 15]},
//           {15: [10, 12, 14, 16]},
//           {16: [12, 15]}
//         }
//       },
//       {9:
//         {6:
//           {3: [4, 7, 8]},
//           {7: [3, 4, 8, 10, 11, 12]},
//           {10: [7, 11, 13, 14, 15]},
//           {11: [7, 8, 10, 12, 14, 15, 16]}
//         },
//         {10:
//           {6: [3, 7, 11]},
//           {7: [3, 4, 6, 8, 11, 12]},
//           {11: [6, 7, 8, 12, 14, 15, 16]},
//           {13: [14]},
//           {14: [11, 13, 15]},
//           {15: [11, 12, 14, 16]}
//         },
//         {13:
//           {10: [6, 7, 11, 14, 15]},
//           {14: [10, 11, 15]}
//         },
//         {14:
//           {10: [6, 7, 11, 13, 15]},
//           {11: [6, 7, 8, 10, 12, 15, 16]},
//           {13: [10]},
//           {15: [10, 11, 12, 16]}
//         }
//       },
//       {10:
//         {6:
//           {3: [4, 7, 8]},
//           {7: [3, 4, 8, 11, 12]},
//           {9: [13, 14]},
//           {11: [7, 8, 12, 14, 15, 16]}
//         },
//         {7: },
//         {9: },
//         {11: },
//         {13: },
//         {14: },
//         {15: }
//       }
//     },
//     {6: },
//     {7: },
//     {3: }
//   },
//   {5: },
//   {6: }


//get all possible combinations of 3-7 letter words from string of 16 game letters
  function combinations(str) {
    var fn = function(active, rest, a) {
        if (!active && !rest)
            return;
        if (!rest) {
            a.push(active);
        } else {
            fn(active + rest[0], rest.slice(1), a);
            fn(active, rest.slice(1), a);
        }
        return a;
    }
    return fn("", str, []);
  }
  filteredCombinations = combinations().filter(function(element) {
    return element.length > 2 && element.length < 8;
  });
