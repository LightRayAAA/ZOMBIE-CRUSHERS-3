const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

var leftwall, rightwall
var bridge
var link
var stones = []
var jointPoint, jointPoint2
var jointLink, jointLink2
var zombie, zombie1,zombie2,zombie3,zombie4
var sadzombie
var BGImg
var ground
var collided = false
var breakButton

function preload()
{

zombie1 = loadImage("assets/zombie1.png")
zombie2 = loadImage("assets/zombie2.png")
zombie3 = loadImage("assets/zombie3.png")
zombie4 = loadImage("assets/zombie4.png")
sadzombie = loadImage("assets/sad_zombie.png")
BGImg = loadImage("assets/background.png")
}

function setup() {
createCanvas(windowWidth, windowHeight);
engine = Engine.create();
world = engine.world;
frameRate(80);
breakButton = createButton("")
breakButton.position(width-200,height/2-50)
breakButton.class("breakButton")
breakButton.mousePressed(handleButtonPress)
leftwall = new Base(100,height-300,200,height/2+100,"#8d6d63",true)
rightwall = new Base(width-100,height-300,200,height/2+100,"#8d6d63",true)
bridge = new Bridge(40,{x: 50, y: height/2-140})
jointPoint = new Base(width-300,height/2-25,40,20,"#8d6d63",true)
jointPoint2 = new Base(2500,height/2-25,40,20,"#8d6d63",true)
Matter.Composite.add(bridge.body,jointPoint)
Matter.Composite.add(bridge.body,jointPoint2)
jointLink = new Link(bridge,jointPoint)
jointLink2 = new Link(bridge,jointPoint2)
ground = new Base(0,height-10,width*2,20)

for(var i = 0; i <= 8; i++){
var x = random(width/2 - 200, width / 2 + 300)
var y = random(-100, 100)
var stone = new Stone(x, y, 80, 80)
stones.push(stone)
}

zombie = createSprite(width/2, height-110)
zombie.addAnimation("lefttoright", zombie1, zombie2, zombie1)
zombie.addImage("sad", sadzombie)
zombie.addAnimation("righttoleft", zombie3, zombie4, zombie3)
zombie.scale = 0.1
zombie.frameDelay = 20
zombie.velocityX = 10
}

function draw() {
  background(BGImg);
  Engine.update(engine);
  leftwall.display();
  rightwall.display();
  bridge.show();
  ground.display();

  for(var stone of stones){
  stone.display();
  var pos = stone.body.position
  var D = dist(zombie.position.x, zombie.position.y, pos.x, pos.y)
  if(D <= 50){
  zombie.velocityX = 0
  Matter.Body.setVelocity(stone.body,{x:10, y:-10})
  zombie.changeImage("sad")
  collided = true
  }
  }

  if(zombie.position.x >= width - 300 && !collided){
  zombie.velocityX = -10
  zombie.changeAnimation("righttoleft")
  }
  if(zombie.position.x <= 300 && !collided){
  zombie.velocityX = 10
  zombie.changeAnimation("lefttoright")
  }
  drawSprites();
}

function handleButtonPress()
{
jointLink2.detach()
setTimeout(()=>
{
bridge.break()
},1500)
}