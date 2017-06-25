function Game () {

  this.player = new Player();

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
}

Game.prototype.generateKeyBox = function () {
  this.keyBox = {
    row:Math.floor(Math.random() * 10),
    column: Math.floor(Math.random() * 10)
  };
  console.log(this.keyBox);
};

Game.prototype.drawKeyBox = function () {
  var selector = '[data-row=' + this.keyBox.row + ']' +
                 '[data-col=' + this.keyBox.column + ']';
  $(selector).addClass('keybox');
  };

Game.prototype.generatePlayer = function() {
  do {
    console.log("player test");
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

function Player () {
  this.player = undefined;
}

Player.prototype.keyStrokes = function() {
  $('body').on('keydown', function(e) {
    switch (e.keyCode) {
      case 38: // arrow up
        this.player.goUp();
        break;
      case 40: // arrow down
        this.player.goDown();
        break;
      case 37: // arrow left
        this.player.goLeft();
        break;
      case 39: // arrow right
        this.player.goRight();
        break;
        }
    });
};


var game;

$(document).ready(function() {
  game = new Game();


});
