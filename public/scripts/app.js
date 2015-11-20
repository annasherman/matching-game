console.log("Linked.");

//randomize how many different options there are
var liftOptions = [{text:'snatch', color: 'rgba(120, 200, 240, 0.83)'},
{text:'clean and jerk', color:'rgba(120, 240, 200, 0.83)'},
  {text:'deadlift', color: 'rgba(240, 120, 188, 0.83)'},
  {text:'bench', color: 'rgba(240, 235, 120, 0.83)'},
  {text:'curl', color: 'rgba(83, 245, 95, 0.83)'},
  {text:'leg press', color: 'rgba(27, 30, 113, 0.88)'},
  {text:'calf raise', color: 'rgba(73, 117, 215, 0.83)'},
  {text:'squat', color: 'rgba(240, 141, 120, 0.83)'},
  {text:'pull up', color: 'rgba(168, 38, 38, 0.83)'},
  {text:'muscle up', color: 'rgba(232, 134, 32, 0.83)'},
  {text:'handstand', color: 'rgba(135, 228, 183, 0.69)'},
  {text:'backbend', color: 'rgba(120, 132, 240, 0.71)'},
  {text:'row', color: 'rgba(26, 134, 66, 0.83)'},
  {text:'lat pulldown', color: 'rgba(236, 74, 191, 0.83)'},
  {text:'decline twist', color: 'rgba(199, 217, 113, 0.83)'},
  {text:'chest fly', color: 'rgba(49, 43, 149, 0.35)'},
  {text:'military press', color: 'rgba(52, 147, 195, 0.83)'},
  {text:'overhead press', color: 'rgba(228, 200, 82, 0.89)'}];


var foodOptions =
[{text:'salmon', color: 'rgba(120, 200, 240, 0.83)'},
{text:'beef cheek', color:'rgba(120, 240, 200, 0.83)'},
  {text:'pork belly', color: 'rgba(240, 120, 188, 0.83)'},
  {text:'ox tail', color: 'rgba(240, 235, 120, 0.83)'},
  {text:'ground chuck', color: 'rgba(83, 245, 95, 0.83)'},
  {text:'ham', color: 'rgba(27, 30, 113, 0.88)'},
  {text:'bacon', color: 'rgba(73, 117, 215, 0.83)'},
  {text:'octopus', color: 'rgba(240, 141, 120, 0.83)'},
  {text:'oyster', color: 'rgba(168, 38, 38, 0.83)'},
  {text:'sea urchin', color: 'rgba(232, 134, 32, 0.83)'},
  {text:'chicken breast', color: 'rgba(135, 228, 183, 0.69)'},
  {text:'chicken thigh', color: 'rgba(120, 132, 240, 0.71)'},
  {text:'escargot', color: 'rgba(26, 134, 66, 0.83)'},
  {text:'frog legs', color: 'rgba(236, 74, 191, 0.83)'},
  {text:'rattle snake', color: 'rgba(199, 217, 113, 0.83)'},
  {text:'aligator', color: 'rgba(49, 43, 149, 0.35)'},
  {text:'mahi mahi', color: 'rgba(52, 147, 195, 0.83)'},
  {text:'futon', color: 'rgba(228, 200, 82, 0.89)'}];


var boardSize = 6;
 //rows*columns
var numberOfPairs = boardSize*boardSize/2
console.log(liftOptions.length);


//initialize scoring
var scorePlayerOne = 0;
var scorePlayerTwo = 0;
var currentPlayer = 1;
var moveCounter = 0;
var howManyClicked = 0;

var clickedItemArray=[];
var spanIDArray = [];
var canClick = true;

//begin game
function switchPlayer(){
  if(currentPlayer == 1){
    currentPlayer = 2;
  } else {
    currentPlayer = 1;
  };
  $('.playerTurn').text("Player " + currentPlayer + "\'s turn.");
  console.log(moveCounter);
  console.log("current player is " + currentPlayer);
}

function recordScore(playerNumber){
  if (currentPlayer == 1){
    scorePlayerOne++;
    $('#playerOneScore').text("Player 1's score is: " + scorePlayerOne);
    console.log("the score is" + scorePlayerOne);
    console.log("current player is " + currentPlayer);
  } else {
    scorePlayerTwo++;
    $('#playerTwoScore').text("Player 2's score is: " + scorePlayerTwo);
    console.log("the score is" + scorePlayerTwo);
    console.log("current player is " + currentPlayer);
  };
};

//sets arrays to 0 for next move.
function clearClicks(){
  canClick = false;
  // array1.shift();
  spanIDArray = [];
  clickedItemArray = [];
  canClick = false;
  //this creates a moment where the array length is not ==2 and you can click another, allowing 3 cards to show on the screen. how to fix???
  // array2.shift();
  canClick = true;
}

//stop click function after 2 inputs & restart
function clearCards(){
  if (clickedItemArray.length == 2){//if there are two cards in the array
    canClick = false;
    moveCounter++;
    if (clickedItemArray[0]===clickedItemArray[1]){ //if they match
      //make the cards disappear
      console.log("A match.");
      recordScore(currentPlayer);
      // console.log(spanIDArray[0]);
      for (var i = 0; i < spanIDArray.length; i++) { //fade out each array item div
        $(spanIDArray[i]).parent().delay(600).queue(function(){
            $(this).css('opacity', '0.0');
            $(this).dequeue();
          });
          //console.log("the spanID Array looks like:" + spanIDArray)
      }
    } else {
      console.log("try again");
      $('.cards span').delay(600).fadeOut(300);
      switchPlayer();
      //flip the cards back over
    }
    canClick = false;
    $('.cards').delay(500).queue(function(){
      clearClicks();
      $(this).dequeue();
    });
  }
}

//block clicks every half second

//generate cards
var cards = []; //array holding all the cards
for (var i = 0; i < (boardSize*boardSize); i++) { //make deck
  cards[i] = {};
}
//decide which board to use

function showUp(){
console.log(cards);
shuffleCards(cards);
for (var i in cards) {
  var eachCard = $('<div>');
  var textBox = $('<span>');
  eachCard.addClass('cards');
  textBox.prop('id',i);
  textBox.text(cards[i].innerText);
  textBox.css('background-color', cards[i].color);
  eachCard.append(textBox);
  $('.gameboard').append(eachCard);
};
}

// //begin game: hide all cards
function hideCards(){
 $('.cards span').hide();
};

function populateCards(){

  $( ".chooseAnArray" ).change(function() {
    var whichArray = $('option:selected').val();
    $('.gameboard').empty();
    console.log(whichArray);
    if (whichArray == "lifts"){
      arrayForGame = liftOptions;
    } else {
      arrayForGame = foodOptions;
    };
    console.log(arrayForGame);
    for (var i = 0; i < numberOfPairs; i++) { //assign from array of lifts -- two of each lift.
    cards[i].innerText = arrayForGame[i].text;
    cards[i].identify= i;
    cards[i].color = arrayForGame[i].color;
    cards[i+numberOfPairs].innerText = arrayForGame[i].text;
    cards[i+numberOfPairs].identify = i;
    cards[i+numberOfPairs].color = arrayForGame[i].color;
    console.log(cards[i]);
  }
    console.log(cards);
    showUp();
    hideCards();
    clickACard();
  });

}
//create scorebar


//shuffle function
function shuffleCards(array){
    var counter = array.length, temp, index;
    while (counter > 0) {
    index = Math.floor(Math.random() * counter);
    counter--;
    temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
    }
  return array;
  }

  function findIndex(array, key, valuetosearch) {
    for (var i = 0; i < array.length; i++) {
      if (array[i][key] == valuetosearch) {
        return i;
      }
    }
    return null;
  };




  function clickACard(){
  $('.cards').click(function(){
  console.log('it got clicked');
      if (canClick == true) {
        $(this).children().fadeIn('fast');
        //get span elements id and store in an array to clear the parent div later.
        spanID = $(this).children('span').prop('id');
        console.log(this.innerText);
        clickedItem = findIndex(cards, "innerText", this.innerText);
        if (clickedItemArray.length < 2 && (spanIDArray.length == 0 || ('#' + spanID) != spanIDArray[0])){
          //console.log(spanIDArray[0]);
          //dont allow the clicked item to store in the array if youve clicked on the same item twice. so check the spanID against the array.
          clickedItemArray.push(clickedItem);
          //console.log("the spanIDArray length is " + spanIDArray.length);
          spanIDArray.push("#" + spanID);
          //console.log(Array.isArray(spanIDArray));
          console.log("the span ID array is " + spanIDArray);
          console.log("the clicked Item array is" + clickedItemArray);

        };
        clearCards(clickedItemArray,spanID);
    };
  });
  };



$(document).ready(function(){

populateCards();

//store the id of the clicked item





  //start button
  $('#startGame').click(function(){
    var scorebar = $('<div>');
    var scoreOne = $('<div>');
    scoreOne.prop('id','playerOneScore');
    var scoreTwo = $('<div>');
    scoreTwo.prop('id','playerTwoScore');
    scorebar.addClass('scorebar');
    $(scorebar).append(scoreOne);
    $(scorebar).append(scoreTwo);
    var playerTurn = $('<div>');
    playerTurn.addClass('playerTurn');
    $(scorebar).append(playerTurn);
    $('body').append(scorebar);
    $('.playerTurn').text("Player 1's turn.");
    $('#startGame').unbind('click');
  });


//updating selectors function:
// function updateStatusInElement(domElement, statusString) {
//   domElement.innerHTML = statusString;
// }
//
// function updateStatusInElement(domElement, statusString) {
//   $(domElement).html(statusString);
// }


//bootstrap
//velocity



//STILL NEED TO INCORPORATE PLAYERS
//need to keep score
//think of putting in a timer? recording total clicks and returning accuracy?

//namespacing -- put your variables inside of objects.
//helps with organization

//if you keep updating the same elements, make a function to do it for you. subsequent updates will be easier as well.

}); //end document ready.
