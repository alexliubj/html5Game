// Create the canvas
var canvas = document.createElement("canvas");
var pid = document.getElementById("scoreNum");

var ctx = canvas.getContext("2d");
canvas.width = 512;
canvas.height = 480;
document.body.appendChild(canvas);

var mousePos;
var MonsterIntervalSpeed = 3000;
var isMouseClicked;

function getMousePos(canvas, evt) {
        var rect = canvas.getBoundingClientRect();
        return {
          x: evt.clientX - rect.left,
          y: evt.clientY - rect.top
        };
      }

canvas.addEventListener("mousedown", mouseClick, false);

      canvas.addEventListener('mousemove', function(evt) {
        mousePos = getMousePos(canvas, evt);
      }, false);

function mouseClick(event) {
	//alert("mouse");
	isMouseClicked = true;
}


// Background image
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function() {
	bgReady = true;
};
bgImage.src = "images/background.png";

// Monster image
var monsterReady = false;
var monsterImage = new Image();
monsterImage.onload = function() {
	monsterReady = true;
};
monsterImage.src = "images/monster.png";

var monster = {};
var monstersCaught = 0;

// Handle keyboard controls
var keysDown = {};

addEventListener("keydown", function(e) {
	keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function(e) {
	delete keysDown[e.keyCode];
}, false);
var resetMonster = function()
{
	
}
// Reset the game when the player catches a monster
var reset = function() {

		// Throw the monster somewhere on the screen randomly
		monster.x = 32 + (Math.random() * (canvas.width - 64));
		monster.y = 32 + (Math.random() * (canvas.height - 64));
	};

var update
// Update game objects
var update = function(modifier) {
	if(isMouseClicked){
		if(Math.abs(mousePos.x - monster.x) <= 32 && Math.abs(mousePos.y-monster.y)<=32)
		{
			++monstersCaught;
			reset();
		}
	}
	isMouseClicked = false;
	};

// reset score button onClick
function resetScore()
{
	monstersCaught = 0;
}
// reset speed button onClick
function resetSpeed()
{
	MonsterIntervalSpeed = 4000;
}

var render = function() {
		if (bgReady) {
			ctx.drawImage(bgImage, 0, 0);
		}

		if (monsterReady) {
			ctx.drawImage(monsterImage, monster.x, monster.y);
		}
		
		pid.innerHTML = "Score: " + monstersCaught;
		// Score
		ctx.fillStyle = "rgb(250, 250, 250)";
		ctx.font = "24px Helvetica";
		ctx.textAlign = "left";
		ctx.textBaseline = "top";
		//ctx.fillText("Goblins caught: " + monstersCaught, 32, 32);
	};

var updateMonsterSpeed = function()
{
	if(MonsterIntervalSpeed - MonsterIntervalSpeed/5 > 0)
	{
		MonsterIntervalSpeed = MonsterIntervalSpeed - MonsterIntervalSpeed/5
	}
}
var startTime = Date.now();

// The main game loop
var main = function() {
		var now = Date.now();
		var delta = now - then;

		update(delta / 1000);
		render();

		then = now;
		
		if(now - startTime > MonsterIntervalSpeed)
		{
			startTime = Date.now();
			updateMonsterSpeed();
			reset();
		}
	};

// Let's play this game!
reset();
var then = Date.now();
setInterval(main, 1); // Execute as fast as possible
