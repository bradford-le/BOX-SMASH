function Game () {

  this.keyBox = undefined;
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
    this.generatePlayer();
    this.drawPlayer();
    this.PlayerMovement();
}

Game.prototype.generateKeyBox = function () {
  this.keyBox = {
    row:Math.floor(Math.random() * 10),
    column: Math.floor(Math.random() * 10)
  };
};

Game.prototype.drawKeyBox = function () {
  var selector = '[data-row=' + this.keyBox.row + ']' +
                 '[data-col=' + this.keyBox.column + ']';
  $(selector).addClass('keybox');
  };

Game.prototype.generatePlayer = function() {
  do {
    this.player = {
      row: Math.floor(Math.random() * 10),
      column: Math.floor(Math.random() * 10)
    };
  } while (this.keyBox.row === this.player.row && this.keyBox.column === this.player.column);
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
        this.clearPlayer();
        this.drawPlayer();
        break;
      case 37: // arrow left
      this.player = {
        row: this.player.row,
        column: (this.player.column-1+10)%10
      };
        this.clearPlayer();
        this.drawPlayer();
        break;
      case 39: // arrow right
      this.player = {
        row: this.player.row,
        column: (this.player.column+1+10)%10
      };
        this.clearPlayer();
        this.drawPlayer();
        break;
        }
    }.bind(this)); //bind(this) allows row to be for player.row to be used in switch
};

Game.prototype.keyBoxFound = function(keyBoxPosition){
  return this.player.row === keyBoxPosition.row && this.player.column === keyBoxPosition.column;
  };

Game.prototype.checkKeyCollision = function(){
  if(this.keyBoxFound(this.keyBox)){

    alert("YOU LANDED ON A KEYBOX");
  } else {
    this.clearPlayer();
    this.drawPlayer();
  }
};

var game;

$(document).ready(function() {
  game = new Game();

});
