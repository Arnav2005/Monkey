
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var bananaGroup, obstacleGroup;
var score = 0;
var bananasEaten = 0;
var ground;


function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  
  bananaGroup = new Group();
  obstacleGroup = new Group();
 
}



function setup() {
  createCanvas(400,400);
  
  //CREATING THE MONKEY 
  monkey = createSprite(80,315,20,20);
  monkey.addAnimation("runing", monkey_running);
  monkey.scale = 0.1;
  console.log()
  
  //CREATING THE GROUND
  ground = createSprite(200,350,900,10);
  ground.velocityX = -4;
  ground.x = ground.width/2;
}


function draw() {
  background("white");
  
    if(ground.x<0){
      ground.x = ground.width/2;
    }

    if(keyDown("space")){
      monkey.velocityY = -12
    }
  
  //ADDING SCORING SYSTEM 
    text("survival time = " + score,140,15);
    if(frameCount % 20 === 0){
      score = score + 1;
    }
    text("Bananas Eaten = " + bananasEaten, 140,30);
    if(monkey.isTouching(bananaGroup)){
      bananaGroup.destroyEach();
      bananasEaten = bananasEaten +1;
    }
  
  //ADDING DEATH MECHANIC
    if(monkey.isTouching(obstacleGroup)){
      monkey.destroy();
      obstacleGroup.destroyEach();
      bananaGroup.destroyEach();
      obstacleGroup.velocityX = 0;
      bananaGroup.velocityX = 0;
    }
  
  //ADDING VELOCITY AND COLLISION TO MONKEY
    monkey.velocityY = monkey.velocityY + 0.8;
    monkey.collide(ground);

    
  //CALLING FUNCTIONS
    spawnObstacles();
    spawnBananas();
    drawSprites();
}

function spawnBananas(){
  if (frameCount% 100 === 0) {
    banana = createSprite(400,Math.round(random(50,250)),25,25);
    banana.addImage(bananaImage);
    banana.scale = 0.08
    banana.velocityX = -4;
    banana.lifetime = 300;
    
    bananaGroup.add(banana);
  }
}

function spawnObstacles(){
  if(frameCount% 150 === 0){
    obstacle = createSprite(400,330,25,25);
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.1;
    obstacle.velocityX = -4;
    obstacle.lifetime = 300;
    
    obstacleGroup.add(obstacle);
  }
}


