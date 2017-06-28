function Game () {

  this.Boxes = [];
  this.level = 10; //freezes with more than 10 boxes
  this.boxTypes = ["key","math","riddle"];
  var type = "";

  for (var row = 0; row < 10; row++) {
    for (var col = 0; col < 10; col++) {
      $('.container').append($('<div>')
        .addClass('cell')
        .attr('data-row', row)
        .attr('data-col', col)
        .attr('data-type',type)
      );
    }
  }
}

Game.prototype.generateKeyBox = function () {
  do{
    this.keyBox = {
      row:Math.floor(Math.random() * 10),
      col: Math.floor(Math.random() * 10),
      type: "key"
    };
    console.log("key attempts");
  }while(this.checkCollsion(this.keyBox));
  this.Boxes.push(this.keyBox);
};

Game.prototype.drawKeyBox = function () {
  var selector = '[data-row=' + this.keyBox.row + ']' +
                 '[data-col=' + this.keyBox.col + ']';
  $(selector).addClass('keybox');
  $(selector).attr('data-type',this.keyBox.type);
  $(selector).html("<span>?</span>");
    };

Game.prototype.clearKeyBox = function() {
  $('.keybox').html("");
  $('.keybox').attr("key","");
  $('.keybox').removeClass('keybox');
};

Game.prototype.generateMathBox = function () {
  do{
    this.mathBox = {
      row:Math.floor(Math.random() * 10),
      col: Math.floor(Math.random() * 10),
      type: "math"
    };
    console.log("math attempts");
  }while(this.checkCollsion(this.mathBox));
  this.Boxes.push(this.mathBox);
};

Game.prototype.drawMathBox = function () {
  var selector = '[data-row=' + this.mathBox.row + ']' +
                 '[data-col=' + this.mathBox.col + ']';
  $(selector).addClass('mathbox');
  $(selector).attr('data-type',this.mathBox.type);
  $(selector).html("<span>?</span>");
    };

Game.prototype.clearMathBox = function() {
  $('.mathbox').html("");
  $('.mathbox').attr("math","");
  $('.mathbox').removeClass('mathbox');
};

Game.prototype.generateRiddleBox = function () {
  do{
    this.riddleBox = {
      row:Math.floor(Math.random() * 10),
      col: Math.floor(Math.random() * 10),
      type: "riddle"
    };
    console.log("riddle attempts");
  }while(this.checkCollsion(this.riddleBox));
  this.Boxes.push(this.riddleBox);
};

Game.prototype.drawRiddleBox = function () {
  var selector = '[data-row=' + this.riddleBox.row + ']' +
                 '[data-col=' + this.riddleBox.col + ']';
  $(selector).addClass('riddlebox');
  $(selector).attr('data-type',this.riddleBox.type);
  $(selector).html("<span>?</span>");
    };

Game.prototype.clearRiddleBox = function() {
  $('.riddlebox').html("");
  $('.riddlebox').attr("riddle","");
  $('.riddlebox').removeClass('riddlebox');
};

Game.prototype.generatePlayer = function() {
  do {
    this.player = {
      row: Math.floor(Math.random() * 10),
      column: Math.floor(Math.random() * 10)
    };
    console.log("Player attempts");
  } while (this.checkCollsion(this.player));
};

Game.prototype.drawPlayer = function() {
  var selector = '[data-row=' + this.player.row + ']' +
                 '[data-col=' + this.player.column + ']';
  $(selector).addClass('player');
};

Game.prototype.clearPlayer = function() {
  $('.player').removeClass('player');
};

Game.prototype.playerMovement = function() {
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

Game.prototype.start = function() {
  for(i = this.level; i>0 ; i--) {
    var randomBox = this.boxTypes[Math.floor(Math.random()*3)];
    if(randomBox==="key"){
      this.generateKeyBox();
      this.drawKeyBox();
    } else if(randomBox ==="math") {
      this.generateMathBox();
      this.drawMathBox();
    } else if(randomBox ==="riddle"){
      this.generateRiddleBox();
      this.drawRiddleBox();
    }
  }
      this.generatePlayer();
      this.drawPlayer();
};

Game.prototype.checkCollsion = function(box) {
  return this.Boxes.some(function(currentBox) {
    return currentBox.row === box.row && currentBox.column === box.column;
  });
};

// Game.prototype.checkKeyCollision = function(){
//   if(this.keyBoxFound(this.keyBox)){
//     this.clearKeyBox();
//     this.clearPlayer();
//     this.drawPlayer();
//     setTimeout(function() {
//       keyInput = prompt("Hit " + this.keyBox.key + " " + this.keyBox.number + " times");}.bind(this),200);
//   } else {
//     this.clearPlayer();
//     this.drawPlayer();
//   }
// };


//
// Game.prototype.playerMovement = function() {
//   $('body').on('keydown', function(e) {
//     switch (e.keyCode) {
//       case 38: // arrow up
//       this.player = {
//         row: (this.player.row-1+10)%10,
//         column: this.player.column
//       };
//         this.checkKeyCollision();
//         break;
//       case 40: // arrow down
//       this.player = {
//         row: (this.player.row+1+10)%10,
//         column: this.player.column
//       };
//         this.checkKeyCollision();
//         break;
//       case 37: // arrow left
//       this.player = {
//         row: this.player.row,
//         column: (this.player.column-1+10)%10
//       };
//         this.checkKeyCollision();
//         break;
//       case 39: // arrow right
//       this.player = {
//         row: this.player.row,
//         column: (this.player.column+1+10)%10
//       };
//         this.checkKeyCollision();
//         break;
//         }
//     }.bind(this)); //bind(this) allows row to be for player.row to be used in switch
// };
//
// Game.prototype.keyBoxFound = function(keyBoxPosition){
//   return this.player.row === keyBoxPosition.row && this.player.column === keyBoxPosition.column;
//   };
//
// Game.prototype.checkKeyCollision = function(){
//   if(this.keyBoxFound(this.keyBox)){
//     this.clearKeyBox();
//     this.clearPlayer();
//     this.drawPlayer();
//     setTimeout(function() {
//       keyInput = prompt("Hit " + this.keyBox.key + " " + this.keyBox.number + " times");}.bind(this),200);
//   } else {
//     this.clearPlayer();
//     this.drawPlayer();
//   }
// };

var game;
$(document).ready(function() {
  game = new Game();
  game.start();
});
