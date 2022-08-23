//
// ==== CHOOSING CHAR ==== //
//

// get players images
// var playerImg = document.querySelectorAll(".playerImg")
var playerOne = document.getElementById("playerOneImg");
var playerTwo = document.getElementById("playerTwoImg");
var playerThree = document.getElementById("playerThreeImg");
var playerFour = document.getElementById("playerFourImg");

// connecting the box to be able to assign the player chossed img to it
var playerImgBox = document.getElementById("playerCharImg");

// L OBSOLETE OPTIMIZEE RESTE OBSOLETE
// let i
// for(i=0; i<4 ; i++){
//   playerImg[i].addEventListener("click", () => {
//     console.log(playerImg)
//     console.log(i)
//     console.log(this)
//     playerImgBox.src = this.src
//     playerImgBox.style.display = "block";
//     chooseCharModal.style.display = "none";
//     chooseCharBtn.style.display = "none";
//     playBtn.style.display = "block";
//   })
// }
function changesRelatedToPlayerImg() {
  playerImgBox.style.display = "block";
  chooseCharModal.style.display = "none";
  chooseCharBtn.style.display = "none";
  playBtn.style.display = "block"; // show play btn ater char choice
}

// all possible choices and events connected to choosing CHAR img
playerOne.addEventListener("click", () => {
  playerImgBox.src = playerOne.src;
  changesRelatedToPlayerImg()
});
playerTwo.addEventListener("click", () => {
  playerImgBox.src = playerTwo.src;
  changesRelatedToPlayerImg()
});
playerThree.addEventListener("click", () => {
  playerImgBox.src = playerThree.src;
  changesRelatedToPlayerImg()
});
playerFour.addEventListener("click", () => {
  playerImgBox.src = playerFour.src;
  changesRelatedToPlayerImg()
});
// TEST // console.log(event.target) inside event    (event)

// ==== CHOOSE CHAR MODAL ==== //

var chooseCharModal = document.getElementById("charModal");

// Get the button that opens the modal
var chooseCharBtn = document.getElementById("chooseCharBtn");

// Get the <span> element that closes the modal
var chooseCharSpan = document.getElementsByClassName("charClose")[0];

// When the user clicks on the button, open the modal
chooseCharBtn.onclick = () => {
  chooseCharModal.style.display = "block";
};

// When the user clicks on <span> (x), close the modal
chooseCharSpan.onclick = () => {
  chooseCharModal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = (event) => {
  if (event.target == chooseCharModal) {
    chooseCharModal.style.display = "none";
  }
};

// ==== END CHOOSHING CHAR ==== //

// ==== CHOOSING PLAY-MOVE ==== //

// getting elements related to the match
var playBtn = document.getElementById("playBtn");
var playerChoiceBox = document.getElementById("playerChoiceBox");
var npcChoiceBox = document.getElementById("npcChoiceBox");
var showResult = document.getElementById("result");
var vs = document.getElementById("vs");
//default states
playBtn.style.display = "none";

// getting Play choices images
var frog = document.getElementById("frog");
var snake = document.getElementById("snake");
var centipede = document.getElementById("centipede");

//
// ==== PLAYING PROCESS ==== //
//

// ==== NPC side ==== //
let npcChoice;
playBtn.addEventListener("click", () => {
  npcChoiceBox.style.display = "none";
  vs.style.display = "block";
  let npcPlay = Math.floor(Math.random() * 3);
  // SNAKE - 0  // FROG - 1  // CENTIPEDE - 2
  switch (npcPlay) {
    case 0: // snake
      npcChoice = 0;
      npcChoiceBox.src = snake.src;
      break;
    case 1: // frog
      npcChoice = 1;
      npcChoiceBox.src = frog.src;
      break;
    default: // 2 - centipede
      npcChoice = 2;
      npcChoiceBox.src = centipede.src;
  }
});
// SNAKE - 0  // FROG - 1  // CENTIPEDE - 2
let playerChoice;
snake.addEventListener("click", () => {
  // snake
  playerChoice = 0;
  playerChoiceBox.src = snake.src; // changing image box
  combat(playerChoice, npcChoice); // call the combat logic function
  playModal.style.display = "none"; // closing modal
  npcChoiceBox.style.display = "block"; // show the npc choice
});
frog.addEventListener("click", () => {
  // frog
  playerChoice = 1;
  playerChoiceBox.src = frog.src;
  combat(playerChoice, npcChoice);
  playModal.style.display = "none";
  npcChoiceBox.style.display = "block";
});
centipede.addEventListener("click", () => {
  // centipede
  playerChoice = 2;
  npcChoiceBox.style.display = "block";
  playerChoiceBox.src = centipede.src;
  combat(playerChoice, npcChoice);
  playModal.style.display = "none";
});
// function: show result of combat( to be used in combat function )
var showResultBox = (result) => {
  switch (result) {
    case "tie":
      showResult.style.display = "block";
      showResult.innerHTML = "TIE !";
      break;
    case "npcWin":
      showResult.style.display = "block";
      showResult.innerHTML = "LOSE !";
      break;
    default:
      showResult.style.display = "block";
      showResult.innerHTML = "WIN !";
      break;
  }
};

// ==== COMPARAISON PLAYER vs NPC ==== //
var result; //  tie .  npcWin . playerWIn

function combat(playerChoice, npcChoice) {
  // GAME COMBAT LOGIC
  // SNAKE - 0  // FROG - 1  // CENTIPEDE - 2
  if (npcChoice == 0) {
    // snake
    if (playerChoice == 0) {
      result = "tie";
    } else if (playerChoice == 1) {
      result = "npcWin";
    } else {
      result = "playerWin";
    }
  } else if (npcChoice == 1) {
    // frog
    if (playerChoice == 0) {
      result = "playerWin";
    } else if (playerChoice == 1) {
      result = "tie";
    } else {
      result = "npcWin";
    }
  } else {
    // npcChoice == 2 centipede
    if (playerChoice == 2) {
      result = "tie";
    } else if (playerChoice == 1) {
      result = "playerWin";
    } else {
      result = "npcWin";
    }
  }
  showResultBox(result);   // update the result of the match on screen
  npcAfterPlay(result); // update the npc avatar after each combat
  return result;
}

// ==== BOT IMAGE REACTION AFTER EACH MATCH ==== //

//get NPC image box 
var npcImgBox = document.getElementById("npcCharImg");
//default
npcImgBox.src = './assets/img/botWaiting.gif';
// npcImgBox.src = "http://127.0.0.1:5500/assets/img/botWaiting.gif";
function npcAfterPlay(props) {

  // props = win , lose , streakWin, streakLose
  switch (props) {
    case "npcWin":
      npcImgBox.src = "./assets/img/botWinner.gif";
      // npcImgBox.src = "http://127.0.0.1:5500/assets/img/botWinner.gif";
      break;
    case "playerWin":
      npcImgBox.src = "./assets/img/botLoser.gif";
      // npcImgBox.src = "http://127.0.0.1:5500/assets/img/botLoser.gif";
      //   TO BE IMPLEMENTED !!    ticket = #0134
      break;
    // case 'streakWin':
    //   npcImgBox.src = 'http://127.0.0.1:5500/assets/img/botOnFlames.gif'
    //   break
    //   case 'streakLose':
    //   npcImgBox.src = 'http://127.0.0.1:5500/assets/img/botCrying.gif'
    //   break
    default:
      npcImgBox.src = "./assets/img/botWaiting.gif";
  }
}
//
// ==== endOf PLAYING PROCESS ==== //
//

// ==== CHOOSE PLAY-MOVE MODAL ==== //

var playModal = document.getElementById("playModal");

// Get the button that opens the modal
var playBtn = document.getElementById("playBtn");

// Get the <span> element that closes the modal
var playSpan = document.getElementsByClassName("playClose")[0];

// When the user clicks on the button, open the modal
playBtn.onclick = () => {
  playModal.style.display = "block";
};

// When the user clicks on <span> (x), close the modal
playSpan.onclick = () => {
  playModal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = (event) => {
  if (event.target == playModal) {
    playModal.style.display = "none";
  }
};
// ==== endOf CHOOSE PLAY-MOVE MODAL ==== // 

// ==== RULES IN GAME MODAL ==== //

var rulesModal = document.getElementById("rulesModal");

// Get the button that opens the modal
var rulesBtn = document.getElementById("rulesInGameBtn");

// Get the <span> element that closes the modal
var rulesSpan = document.getElementsByClassName("rulesClose")[0];

// When the user clicks on the button, open the modal
rulesBtn.onclick = function () {
  rulesModal.style.display = "block";
};

// When the user clicks on <span> (x), close the modal
rulesSpan.onclick = function () {
  rulesModal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == rulesModal) {
    rulesModal.style.display = "none";
  }
};
// ==== endOf RULES IN GAME MODAL ==== //
