function Game () {

  this.keyBox = [];
  // this.mathBox = [];
  this.player = undefined;

  for (var row = 0; row < 10; row++) {
    for (var col = 0; col < 10; col++) {
      $('.container').append($('<div>')
        .addClass('cell')
        .attr('data-row', row)
        .attr('data-col', col)
      );
    }
  }
    this.generateKeyBox();
    this.drawKeyBox();
    this.generateKeyBox();
    this.drawKeyBox();
    this.generateKeyBox();
    this.drawKeyBox();
    // this.generateMathBox();
    // this.drawMathBox();
    // this.generateRiddleBox();
    // this.drawRiddleBox();
    this.generatePlayer();
    this.drawPlayer();
    this.PlayerMovement();
}

var keyBoxRows = [];
Game.prototype.existingBoxes = function() {
  if(keyBoxArray.length===0){
  } else {
    for (var i =0;i<keyBoxArray.length;i++){
    retkeyBoxRows.push(keyBoxArray[i].row);
    }
  }
};

Game.prototype.generateKeyBox = function () {
  this.keyBox = {
    row:Math.floor(Math.random() * 10),
    column: Math.floor(Math.random() * 10)
    // key: keyChallenge,
    // number: Math.floor((Math.random() * 10)+1)
  };
  keyBoxArray.push(this.keyBox);
  // this.existingBoxes();
};

Game.prototype.drawKeyBox = function () {
  var selector = '[data-row=' + this.keyBox.row + ']' +
                 '[data-col=' + this.keyBox.column + ']';
  $(selector).addClass('keybox');
  $(selector).html("<span>?</span>");
  };

Game.prototype.clearKeyBox = function() {
  $('.keybox').html("");
  $('.keybox').removeClass('keybox');
};

// Game.prototype.generateMathBox = function() {
//   do{
//     this.mathBox = {
//       row:Math.floor(Math.random() * 10),
//       column: Math.floor(Math.random() * 10),
//       num1: Math.floor((Math.random() * 20)+1),
//       num2: Math.floor((Math.random() * 20)+1)
//     };
//   } while(this.mathBox.row === this.keyBox.row && this.mathBox.column === this.keyBox.column && this.mathBox.row === this.riddleBox.row && this.mathBox.column === this.riddleBox.column);
//   mathBoxArray.push(this.mathBox);
// };
//
// Game.prototype.drawMathBox = function() {
//   var selector = '[data-row=' + this.mathBox.row + ']' +
//                  '[data-col=' + this.mathBox.column + ']';
//   $(selector).addClass('mathbox');
//   };
//
// Game.prototype.generateRiddleBox = function() {
//   do{
//     this.riddleBox = {
//       row:Math.floor(Math.random() * 10),
//       column: Math.floor(Math.random() * 10)
//     };
//   } while(this.riddleBox.row === this.keyBox.row && this.riddleBox.column === this.keyBox.column && this.riddleBox.row===this.mathBox.row && this.riddleBox.column===this.mathBox.column);
//   riddleBoxArray.push(this.riddleBox);
// };
//
// Game.prototype.drawRiddleBox = function() {
//   var selector = '[data-row=' + this.riddleBox.row + ']' +
//                  '[data-col=' + this.riddleBox.column + ']';
//   $(selector).addClass('riddlebox');
// };

Game.prototype.generatePlayer = function() {
  do {
    this.player = {
      row: Math.floor(Math.random() * 10),
      column: Math.floor(Math.random() * 10)
    };
  } while (this.keyBox.row === this.player.row && this.keyBox.column === this.player.column && this.mathBox.row ===this.player.row && this.mathBox.column===this.player.column && this.riddleBox.row === this.player.row && this.riddleBox.column === this.player.column);
};

Game.prototype.drawPlayer = function() {
  var selector = '[data-row=' + this.player.row + ']' +
                 '[data-col=' + this.player.column + ']';
  $(selector).addClass('player');
};

Game.prototype.clearPlayer = function() {
  $('.player').removeClass('player');
};

Game.prototype.PlayerMovement = function() {
  $('body').on('keydown', function(e) {
    switch (e.keyCode) {
      case 38: // arrow up
      this.player = {
        row: (this.player.row-1+10)%10,
        column: this.player.column
      };
        this.checkKeyCollision();
        break;
      case 40: // arrow down
      this.player = {
        row: (this.player.row+1+10)%10,
        column: this.player.column
      };
        this.checkKeyCollision();
        break;
      case 37: // arrow left
      this.player = {
        row: this.player.row,
        column: (this.player.column-1+10)%10
      };
        this.checkKeyCollision();
        break;
      case 39: // arrow right
      this.player = {
        row: this.player.row,
        column: (this.player.column+1+10)%10
      };
        this.checkKeyCollision();
        break;
        }
    }.bind(this)); //bind(this) allows row to be for player.row to be used in switch
};

Game.prototype.keyBoxFound = function(keyBoxPosition){
  return this.player.row === keyBoxPosition.row && this.player.column === keyBoxPosition.column;
  };

Game.prototype.checkKeyCollision = function(){
  if(this.keyBoxFound(this.keyBox)){
    this.clearKeyBox();
    this.clearPlayer();
    this.drawPlayer();
    setTimeout(function() {
      keyInput = prompt("Hit " + this.keyBox.key + " " + this.keyBox.number + " times");}.bind(this),200);
  } else {
    this.clearPlayer();
    this.drawPlayer();
  }
};

var game;
var keyBoxArray = [];
var mathBoxArray =[];
var riddleBoxArray =[];
var level = 2;
// var keyChallenge = Object.keys(keyCodes[Math.floor(Math.random()*66)])[0];
// var keyInput="";

$(document).ready(function() {
  game = new Game();


});



//Object.keys(keyCodes[i])[0] returns the key for user to enter

//keyCodes[index].keyvalue returns the keycode pressed

//$('.cell.keybox').length returns how many keyboxes are present
//$('.cell.keybox') returns array of keybox objects
