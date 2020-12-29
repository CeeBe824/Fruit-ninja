var PLAY = 1, END = 0, gameState = 1;
var knife,knifeImage;
var score = 0;
var fruit,fruit1Image,fruit2Image,fruit3Image,fruit4Image,enemyImage,enemy,enemyGroup,gameoverImage,knifeSound,gameOverSound;
var fruitGroup;
function preload(){
  
 knifeImage = loadImage("sword.png");
  fruit1Image = loadImage("fruit1.png");
  fruit2Image = loadImage("fruit2.png");
  fruit3Image = loadImage("fruit3.png");
  fruit4Image = loadImage("fruit4.png");
  enemyImage = loadAnimation("alien1.png","alien2.png");
  gameoverImage = loadImage("gameover.png");
  knifeSound = loadSound("knifeSwooshSound.mp3");
  gameOverSound = loadSound("gameover.mp3");
  
}
function setup(){
  createCanvas(400,400);
  knife = createSprite(200,200,10,10);
 fruitGroup = createGroup();
  enemyGroup = createGroup();
  
  
  
  
  
}
function draw(){
  background("cyan");
  
  knife.scale = 0.5;
  knife.addImage(knifeImage);
  text("Score: " + score,320,30);
  if(gameState === PLAY){
  spawnfruit();
  spawnEnemy();
  knife.y = World.mouseY;
    knife.x = World.mouseX;
  if (knife.isTouching(fruitGroup)){
    fruitGroup.destroyEach();
    score = score + 1;
    
    
  }
  if(enemyGroup.isTouching(knife)){
      gameState = END;
        
        fruitGroup.destroyEach();
        enemyGroup.destroyEach();
        fruitGroup.setVelocityXEach(0);
        enemyGroup.setVelocityXEach(0);
    
        // Change the animation of sword to gameover and reset its position
        
        knife.x=200;
        knife.y=200;
      }
  }
  if(gameState === END){
    knife.addImage(gameoverImage);
   
  }
  if(keyDown("space")&& gameState === END){
    gameState = PLAY;
    knife.addImage(knifeImage);
    score = 0;
  }
  
  
  drawSprites();
}
function spawnEnemy(){
  if (frameCount % 150 === 0){
    enemy = createSprite(400,165,10,40);
    enemy.addAnimation("Enemy",enemyImage);
    enemy.velocityX = -(8 + score/10);
    enemy.y = Math.round(random(400,0));
    enemyGroup.add(enemy);
    var side = Math.round(random(1,2));
    if (side ==1){
      enemy.x = 400;
      enemy.velocityX = -(8 + score/10);
    }
    if(side==2){
          enemy.x = 0;
      enemy.velocityX = (8 + score/10);
          
        }
  }
}
function spawnfruit(){
if (frameCount % 60 === 0){
   var fruit = createSprite(400,165,10,40);
   fruit.velocityX = -(7 + score/4);  
  var rand = Math.round(random(1,4));
    switch(rand) {
      case 1: fruit.addImage(fruit1Image);
              break;
      case 2: fruit.addImage(fruit2Image);
              break;
      case 3: fruit.addImage(fruit3Image);
              break;
      case 4: fruit.addImage(fruit4Image);
              break;
     
      default: break;
    
    }
var position = Math.round(random(1,2));
    if (position ==1){
      fruit.x = 400;
      fruit.velocityX = -(8 + score/10);
    }
    if(position==2){
          fruit.x = 0;
      fruit.velocityX = (8 + score/10);
          
        }
fruit.scale = 0.2
fruit.y = Math.round(random(400,0));
fruit.lifetime = 100;
fruitGroup.add(fruit);

}
  
}