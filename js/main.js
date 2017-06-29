function Game () {

  this.Boxes = [];
  this.level = 1;
  this.timer = 60;
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
  for(var i = this.level; i>0 ; i--) {
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
      this.assignControlsToKeys();
      $('.level').html("LEVEL: " + this.level);
}

Game.prototype.generateKeyBox = function () {
  do{
    this.keyBox = {
      row:Math.floor(Math.random() * 10),
      col: Math.floor(Math.random() * 10),
      type: "key"
    };
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

Game.prototype.clearKeyBox = function(pos) {
  $(pos).html("");
  $(pos).attr("data-type","");
  $(pos).removeClass('keybox');
};

Game.prototype.generateMathBox = function () {
  do{
    this.mathBox = {
      row:Math.floor(Math.random() * 10),
      col: Math.floor(Math.random() * 10),
      type: "math"
    };
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

Game.prototype.clearMathBox = function(pos) {
  $(pos).html("");
  $(pos).attr("data-type","");
  $(pos).removeClass('mathbox');
};

Game.prototype.generateRiddleBox = function () {
  do{
    this.riddleBox = {
      row:Math.floor(Math.random() * 10),
      col: Math.floor(Math.random() * 10),
      type: "riddle"
    };
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

Game.prototype.clearRiddleBox = function(pos) {
  $(pos).html("");
  $(pos).attr("data-type","");
  $(pos).removeClass('riddlebox');
};

Game.prototype.generatePlayer = function() {
  do {
    this.player = {
      row: Math.floor(Math.random() * 10),
      col: Math.floor(Math.random() * 10),
      type:""
    };
  } while (this.checkCollsion(this.player));
};

Game.prototype.drawPlayer = function() {
  var selector = '[data-row=' + this.player.row + ']' +
                 '[data-col=' + this.player.col + ']';
  $(selector).addClass('player');
};

Game.prototype.clearPlayer = function() {
  $('.player').removeClass('player');
};

Game.prototype.assignControlsToKeys = function() {
  $('body').on('keydown', function(e) {
    switch (e.keyCode) {
      case 38: // arrow up
        ion.sound.play("snap");
        console.log("test");
        this.playerMovement("up");
        break;
      case 40: // arrow down
        this.playerMovement("down");
        break;
      case 37: // arrow left
        this.playerMovement("left");
        break;
      case 39: // arrow right
        this.playerMovement("right");
        break;
        }
    }.bind(this)); //bind(this) allows row to be for player.row to be used in switch
};

Game.prototype.playerMovement = function(direction) {
    switch (direction) {
      case "up": // arrow up
      this.player = {
        row: (this.player.row-1+10)%10,
        col: this.player.col
      };
        break;
      case "down": // arrow down
      this.player = {
        row: (this.player.row+1+10)%10,
        col: this.player.col
      };
        break;
      case "left": // arrow left
      this.player = {
        row: this.player.row,
        col: (this.player.col-1+10)%10
      };
        break;
      case "right": // arrow right
      this.player = {
        row: this.player.row,
        col: (this.player.col+1+10)%10
      };
        break;
        }
        this.checkBoxFound();
    }; //bind(this) allows row to be for player.row to be used in switch

Game.prototype.checkCollsion = function(box) { //box is newBox
  return this.Boxes.some(function(currentBox) { //currentBox is first element in Boxes array
    return currentBox.row === box.row && currentBox.col === box.col;
  });
};

Game.prototype.removeBoxFromArray = function(box) { //this should be player box
  return this.Boxes.findIndex(function(currentBox){ //this is the Boxes array
    return currentBox.row === box.row && currentBox.col === box.col;
  });
};

// var keyanswer = "";
// Game.prototype.keyChallenge = function() {
//   $('#keyProblem').css('visibility','visible');
//   $('.keysubmitanswer').click(function(){
//     keyanswer = $('#keyboxtext').val();
//     $('#keyProblem').css('visibility','hidden');
//   });
// };

Game.prototype.checkBoxFound = function(){
  if(this.checkCollsion(this.player)){
    var playerSelector = '[data-row=' + this.player.row + ']' + '[data-col=' + this.player.col + ']';
    var boxIndex = this.removeBoxFromArray(this.player); // RETURNS INDEX FROM ARRAY TO BE REMOVED
    switch ($(playerSelector).attr('data-type')) {
      case "key":
      var keyanswer = prompt("KEY CHALLENGE: \"IRONHACK\"");
      if(keyanswer==="IRONHACK"){
        this.clearPlayer();
        this.drawPlayer();
        this.clearKeyBox(playerSelector);
        this.Boxes.splice(boxIndex,1);
        this.checkClearedBoard();
      } else {
        alert("WRONG!");
        this.clearPlayer();
        this.drawPlayer();
      }
      break;
      case "math":
      var mathanswer = prompt("MATH CHALLENGE: 10+5");
      if(mathanswer==="15"){
        this.clearPlayer();
        this.drawPlayer();
        this.clearMathBox(playerSelector);
        this.Boxes.splice(boxIndex,1);
        this.checkClearedBoard()
      } else {
        alert("WRONG!");
        this.clearPlayer();
        this.drawPlayer();
      }
        break;
      case "riddle":
      var riddleanswer = prompt("RIDDLE CHALLENGE: 10to1");
      if(riddleanswer==="10987654321"){
      this.clearPlayer();
      this.drawPlayer();
      this.clearRiddleBox(playerSelector);
      this.Boxes.splice(boxIndex,1);
      this.checkClearedBoard();
    } else {
      alert("WRONG!");
      this.clearPlayer();
      this.drawPlayer();
    }
      break;
    }
  } else {
    this.clearPlayer();
    this.drawPlayer();
  }
};

Game.prototype.checkClearedBoard = function() {
  if(this.Boxes.length === 0){
    $('.shrinking').removeClass('start-animation');
    var shrinkingelement = $('.shrinking');
    newShrink = shrinkingelement.clone(true);
    shrinkingelement.before(newShrink);
    $(".shrinking:last").remove();
    $('#stageclear').css("visibility","visible");
    this.clearPlayer();
    $('.continue').click(function(){
    $('#stageclear').css("visibility","hidden");
    this.newLevel();
  }.bind(this));
  }
};

Game.prototype.newLevel = function () {
    $('.continue').unbind("click");
    this.level++;
    for(var i = this.level; i>0 ; i--) {
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
      $('.level').html("LEVEL: " + this.level);
      $(".shrinking").addClass("start-animation");
      $('.shrinking').one('webkitAnimationEnd oanimationend msAnimationEnd animationend',
          function(e) {
          console.log("TIMER ENDED!");
          });
};

var game;
$(document).ready(function() {
  $('.start-button').click(function() {
    $('#start').css('visibility','hidden');
    $('.shrinking').addClass('start-animation');
      game = new Game();
    $('.shrinking').one('webkitAnimationEnd oanimationend msAnimationEnd animationend',
        function(e) {
        $('#gameover').css('visibility','visible');
    });
  $('.playagain').click(function() {
    $('#gameover').css('visibility','hidden');
      location.reload();
  });
});
});
