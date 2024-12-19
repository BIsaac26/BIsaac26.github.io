var runLevels = function (window) {
  window.opspark = window.opspark || {};

  var draw = window.opspark.draw;
  var createjs = window.createjs;
  let currentLevel = 0;

  window.opspark.runLevelInGame = function (game) {
    // some useful constants
    var groundY = game.groundY;

    // this data will allow us to define all of the
    // behavior of our game
    var levelData = window.opspark.levelData;

    // set this to true or false depending on if you want to see hitzones
    game.setDebugMode(false);

    // TODOs 5 through 11 go here
    // BEGIN EDITING YOUR CODE HERE
    function createSawBlade(x, y) {
      var hitZoneSize = 25;
      var damageFromObstacle = 10;
      var sawBladeHitZone = game.createObstacle(
        hitZoneSize,
        damageFromObstacle
      );
      sawBladeHitZone.x = x;
      sawBladeHitZone.y = y;
      game.addGameItem(sawBladeHitZone);
      var obstacleImage = draw.bitmap("img/sawblade.png");
      sawBladeHitZone.addChild(obstacleImage);
      obstacleImage.x = -25;
      obstacleImage.y = -25;
    }
    createSawBlade(400, groundY - 100);
    createSawBlade(900, groundY - 15);
    createSawBlade(1400, groundY - 100);

    function createEnemy(x, y) {
      // all code from TODO 11 and 12
      var enemy = game.createGameItem("enemy", 25);
      var redSquare = draw.rect(45, 100, "Orange");
      redSquare.x = -25;
      redSquare.y = -25;
      enemy.addChild(redSquare);
      enemy.x = x;
      enemy.y = y;
      game.addGameItem(enemy);
      enemy.velocityX = -3.2;
      enemy.rotationalVelocity = -1;
      enemy.onPlayerCollision = function () {
        game.changeIntegrity(-10);
      };
      enemy.onProjectileCollision = function () {
        game.increaseScore(100);
        enemy.fadeOut();
      };
    }
    createEnemy(400, groundY - 50);
    createEnemy(800, groundY - 50);
    createEnemy(1200, groundY - 50);
    function createReward(x, y) {
      var reward = game.createGameItem("reward", 25);
      var trophy = draw.rect(60, 75, "Purple");
      trophy.x = -25;
      trophy.y = -25;
      reward.addChild(trophy);
      reward.x = x;
      reward.y = y;
      reward.velocityX = -1.3
      game.addGameItem(reward);
      reward.onPlayerCollision = function () {
        game.changeIntegrity(10);
        

      };
      reward.onProjectileCollision = function () {
        reward.fadeOut();
      };
    }
    createReward(800, 500);
    function createMarker(x,y){
      var marker = game.createGameItem("marker", 25);
      var end = draw.rect(40, 50, "LightGreen");
      end.x = 50
      end.y = 50
      marker.addChild(end);
      marker.x = x
      marker.y = y
      marker.velocityX = -1
      
      marker.onPlayerCollision = function () {
        startLevel();
      }
      marker.onProjectileCollision = function(){
        startLevel();
      }
      game.addGameItem(marker);
    }
    createMarker(1000,groundY - 50)
    function startLevel() {

      // TODO 13 goes below here
     
      
      
   

      //////////////////////////////////////////////
      // DO NOT EDIT CODE BELOW HERE
      //////////////////////////////////////////////
      if (++currentLevel === levelData.length) {
        startLevel = () => {
          console.log("Congratulations!");
        };
      }
    }
    startLevel();
  };
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if (
  typeof process !== "undefined" &&
  typeof process.versions.node !== "undefined"
) {
  // here, export any references you need for tests //
  module.exports = runLevels;
}
