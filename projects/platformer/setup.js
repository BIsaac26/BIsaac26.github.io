// setup variables
const walkAcceleration = 2.5; // how much is added to the speed each frame
const gravity = 0.5; // how much is subtracted from speedY each frame
const friction = 1.5; // how much the player is slowed each frame
const maxSpeed = 10; // maximum horizontal speed, not vertical
const playerJumpStrength = 12; // this is subtracted from the speedY each jump
const projectileSpeed = 15; // the speed of projectiles

/////////////////////////////////////////////////
//////////ONLY CHANGE ABOVE THIS POINT///////////
/////////////////////////////////////////////////

// Base game variables
const frameRate = 60;
const playerScale = 0.6; //makes the player just a bit smaller. Doesn't affect the hitbox, just the image

// Player variables
const player = {
  x: 50,
  y: 100,
  speedX: 0,
  speedY: 0,
  width: undefined,
  height: undefined,
  onGround: false,
  facingRight: true,
  deadAndDeathAnimationDone: false,
};

let hitDx;
let hitDy;
let hitBoxWidth = 50 * playerScale;
let hitBoxHeight = 105 * playerScale;
let firstTimeSetup = true;

const keyPress = {
  any: false,
  up: false,
  left: false,
  down: false,
  right: false,
  space: false,
};

// Player animation variables
const animationTypes = {
  duck: "duck",
  flyingJump: "flying-jump",
  frontDeath: "front-death",
  frontIdle: "front-idle",
  jump: "jump",
  lazer: "lazer",
  run: "run",
  stop: "stop",
  walk: "walk",
};
let currentAnimationType = animationTypes.run;
let frameIndex = 0;
let jumpTimer = 0;
let duckTimer = 0;
let DUCK_COUNTER_IDLE_VALUE = 14;
let debugVar = false;

let spriteHeight = 0;
let spriteWidth = 0;
let spriteX = 0;
let spriteY = 0;
let offsetX = 0;
let offsetY = 0;

// Platform, cannon, projectile, and collectable variables
let platforms = [];
let cannons = [];
const cannonWidth = 118;
const cannonHeight = 80;
let projectiles = [];
const defaultProjectileWidth = 24;
const defaultProjectileHeight = defaultProjectileWidth;
const collectableWidth = 55;
const collectableHeight = 55;
let collectables = [];

// canvas and context variables; must be initialized later
let canvas;
let ctx;

// setup function variable
let setup;

let halleImage;
let animationDetails = {};

var collectableList = {
  database: { image: "images/collectables/database.png" },
  diamond: { image: "images/collectables/diamond-head.png" },
  grace: { image: "images/collectables/grace-head.png" },
  kennedi: { image: "images/collectables/kennedi-head.png" },
  max: { image: "images/collectables/max-head.png" },
  steve: { image: "images/collectables/steve-head.png" },
  mask: { image:"images/collectables/mask.png"},
  money: {image: "images/collectables/money.jpg"},
  diamond: {image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAANgAAADqCAMAAAD3THt5AAAAWlBMVEX///8p1P8AAAAbjKh3wsDE/f8q2f8ahqAA0f8r3v+D1tTM//8g1f98wbt8y8kMh6Z909EckrAAzf/U//8Zf5kt5/8KgZ6BysSAv7UQ2/8s4v+D082N1s0Ag6R8PKQdAAACbklEQVR4nO3c3XLaMBCA0dC0/BNaIDgJ6fu/ZnOtZaodj+y65nzXjPBhdLNI8PTUqG+NavU8zQIDm0hgYBMJDGwigYFNJDCwiQQ2bVirB3rfFL3+Y2qrt18vijZgwwRWCWyswCqBjRVYJbCxAqsENlZglWYLO62L3keFZd4sPGKm03lXdB51ps4sHTZVpvXuR9Fu1M0JBgYGBgYGBgYGBgb2ILDMoDkgLLNQnJczrshIrDMubLCNFwMDAwMDAwMDAwMDAwP7KyxzMBth0x801/E15bi8C64vWf2rgUV5KN37VLoVLDISDbk5wcDAwMDAwMDAwMDAZgALk+8pviYOmonO631ZT1grRq9b3Hd6OxS9BVk7WGbj9fp6J7Y/fC86gIGBgYGBgYGBgYGBgT0ArNf5fytY7lT6f4RFKRgYGBgYGBgYGBgY2KPAEr9fbgZb1vtoBdvffhbdEp9rP1h3XVV7bgfbFg0IOz5X+wUGBgYGBgYGBgYGBvYosM9b0Wdizk0VLjsf4qB5LGsGW4Q75MtLfc7NdFnGpUOHruilGSy0XNU3TKbVss92BQMDAwMDAwMDAwMDexhYmP02rQbNTVg6wrqXom1GcYe6Ca7AuPNAvYof0CXI2v1yPcLCxstsoUyZlcHAwMDAwMDAwMDAwMDGgZVntzOBHcNpezcTWJf56gYMDAwMDAwMDAwMDGyWsNfyD64+ruU96msrWFj5d3ngnDxx7kd9Ke9RZ35fnmmfuqHdqjuwcnu0g7XaeGBgYGBgYGBgYGBgYLOEbcuptgt/I92znje0h6MO14AMMDAwMDAwMDAwMDAwMLBsfwDpG2JetoLlVgAAAABJRU5ErkJggg=="},
};
