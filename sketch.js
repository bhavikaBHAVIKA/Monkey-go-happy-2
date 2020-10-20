var monkey;
var bananas;
var obstacle_group;
var background_;
var ground;
var score = 0;
var PLAY = 1;
var END = 0;
var gameState = PLAY
var restart
function preload(){
  monkey1 = loadImage("Monkey_01.png");
  monkey2 = loadImage("Monkey_02.png");
  monkey3 = loadImage("Monkey_03.png");
  monkey4 = loadImage("Monkey_04.png");
  monkey5 = loadImage("Monkey_05.png");
  monkey6 = loadImage("Monkey_06.png");
  monkey7 = loadImage("Monkey_07.png");
  monkey8 = loadImage("Monkey_08.png");
  monkey9 = loadImage("Monkey_09.png");
  monkey10 = loadImage("Monkey_10.png");
  
  jungle = loadImage("jungle.jpg");
  
  banana_image = loadImage("banana.png")
  stone = loadImage("stone.png")
  restart_image = loadImage("restart.png")
}
function setup() {
  createCanvas(400, 400);
  
  background_ = createSprite(200,200,20,20)
  background_.addImage(jungle);
  
  
  monkey = createSprite(100,340,20,20)
  monkey.addAnimation("monkey",monkey1,monkey2,monkey3,monkey4,monkey5,monkey6,monkey7,monkey8,monkey9,monkey10)
  
  monkey.scale = 0.10;
  
  ground = createSprite(200,365,400,5);
  ground.visible = false;
  
  bananas  = createGroup()
  obstacle_group = createGroup()
  
  restart = createSprite(200,200,20,20);
  restart.addImage(restart_image);
  restart.scale = 0.2;

}

function draw() {
  background(300);
  
  if (gameState == PLAY){
    
    restart.visible = false;
    
    
    if (background_.x < 0){
    background_.x  = background_.width / 2
  }

  if (keyDown("space") && monkey.y > 150){
    monkey.y -= 30;
  }

  monkey.collide(ground)
  
  monkey.velocityY = 7;
  background_.velocityX = -3;
  
  spawn_bananas()
  spawn_obstacles()
  
    
  if (bananas.isTouching(monkey)){
    score += 2
    bananas.destroyEach()
  }
  
  if (obstacle_group.isTouching(monkey)){
    monkey.scale = 0.1
    gameState = END
  }
  
    switch(score){
    
    case 10: monkey.scale = 0.15;
    break;
    
    case 20: monkey.scale = 0.2;
    break;
    
    
    case 30: monkey.scale = 0.3;
    break;
    default:break;
    
    
  }
  
      
      
  }
  
  
  if (gameState == END){
    
    background_.velocityX = 0;
    bananas.setVelocityXEach(0);
    obstacle_group.setVelocityXEach(0);
    bananas.setLifetimeEach(-1);
    obstacle_group.setLifetimeEach(-1);
    restart.visible = true;
    
   
  }
  
  if (mousePressedOver(restart)){
      reset()
  }
  
  drawSprites();
  monkey.collide(ground); 
  
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+ score ,300,50 )
}
function spawn_bananas(){
  if (frameCount % 60 === 0){
    var banana = createSprite(400,random(120,300),30,30);
  banana.addImage(banana_image);
  banana.scale = 0.1; 
  bananas.add(banana);
  bananas.setVelocityXEach(-5);
  bananas.setLifetimeEach(80);
  }
}

function spawn_obstacles(){
  if (frameCount % 80 === 0){
    var obstacle = createSprite(400,340,20,20)
    obstacle.addImage(stone)
    obstacle.scale = 0.2
    obstacle_group.add(obstacle)
    obstacle_group.setVelocityXEach(-5)
    obstacle_group.setLifetimeEach(80)
  }
  
  
}

function reset(){
  gameState = PLAY;
  score =0;
  obstacle_group.destroyEach();
  bananas.destroyEach();
  
}
  
