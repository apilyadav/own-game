var bg,bgImg;
var rocket, rocketImg, flyer_flying;
var asteriod, asteriodImg;
var score=0
var heart1, heart2, heart3;
var heart1Img, heart2Img, heart3Img;

var asteriodGroup;

var bullets ,bulletsImg;

var life = 0;

var gameState = "fight"


function preload(){
  
  heart1Img = loadImage("assets/heart(1).png");
  heart2Img = loadImage("assets/heart(2).png");
  heart3Img = loadImage("assets/heart(3).png");
bulletsImg = loadImage("assets/bullet.png");
  rocketImg = loadImage("assets/rocket(1).png");
  flyer_flying = loadImage("assets/rocket(2).png");

  asteriodImg = loadImage("assets/asteroid.png");

  bgImg = loadImage("assets/bg.jpg");

}

function setup() {

  
  createCanvas(windowWidth,windowHeight);

  //adding the background image
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
bg.addImage(bgImg)
bg.scale = 1.1
  

//creating the rocket sprite
rocket = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
 rocket.addImage(rocketImg)
   rocket.scale = 0.1
   rocket.debug = true
   rocket.setCollider("rectangle",0,0,300,300)


   //creating sprites to depict lives remaining
   heart1 = createSprite(displayWidth-150,40,20,20)
   heart1.visible = false
    heart1.addImage("heart1",heart1Img)
    heart1.scale = 0.1

    heart2 = createSprite(displayWidth-100,40,20,20)
    heart2.visible = false
    heart2.addImage("heart2",heart2Img)
    heart2.scale = 0.1

    heart3 = createSprite(displayWidth-150,40,20,20)
    heart3.addImage("heart3",heart3Img)
    heart3.scale = 0.1
   

    //creating groups for asteriod and bullets
    bulletGroup = new Group();
    asteriodGroup = new Group();



}

function draw() {
  background(0); 


if(gameState === "fight"){

  if(life===3){
    heart3.visible = true
    heart1.visible = false
    heart2.visible = false
  }
  if(life===2){
    heart2.visible = true
    heart1.visible = false
    heart3.visible = false
  }
  if(life===1){
    heart1.visible = true
    heart3.visible = false
    heart2.visible = false
  }
else{


  //go to gameState "lost" when 0 lives are remaining
  if(life===0){
    heart1.visible = false
    heart3.visible = false
    heart2.visible = false
  
    
  }
}

  //moving the rocket up and down and making the game mobile compatible using touches
if(keyDown("UP_ARROW")||touches.length>0){
  rocket.y = rocket.y-30
}
if(keyDown("DOWN_ARROW")||touches.length>0){
 rocket.y = rocket.y+30
}
if(keyDown("LEFT_ARROW")||touches.length>0){
  rocket.x = rocket.x-30
}
if(keyDown("RIGHT_ARROW")||touches.length>0){
  rocket.x = rocket.x+30
}


//release bullet and change the image of flyer to flying position when space is pressed
if(keyWentDown("space")){
  bullet = createSprite(displayWidth-1150,rocket.y-30,20,10)
  bullet.velocityY = 20
  
  bulletGroup.add(bullet)
  rocket.depth = bullet.depth
  rocket.depth = rocket.depth+2
  rocket.addImage(flyer_flying)
  bullets = bullets-1
  
}

//player goes back to original standing image once we stop pressing the space bar
else if(keyWentUp("space")){
  rocket.addImage(rocketImg)
}

//go to gameState "bullet" when rocket runs out of bullets
if(bullets==0){
  gameState = "bullet"
    
}

//destroy the rocket when bullet touches it
if(asteriodGroup.isTouching(bulletGroup)){
  for(var i=0;i<asteriodGroup.length;i++){     
      //write a condition for asteriodgroup touches bulletGroup
   if(asteriodGroup[i].isTouching(bulletGroup)){
//destroy asteriod
asteriodGroup[i].destroy()        
bulletGroup.destroyEach()

       
        } 
  
  }
}

//destroy asteriod when rocket touches it
if(asteriodGroup.isTouching(rocket)){

 for(var i=0;i<asteriodGroup.length;i++){     
      
  if(asteriodGroup[i].isTouching(rocket)){
       asteriodGroup[i].destroy()
//Decrease the life
score=score+1
life=life-1
} 
 
 }

//calling the function to spawn asteriod
enemy();
}


drawSprites();
textSize(50)
text("score"+score,200,200)
//destroy asteriod and rocket and display a message in gameState "lost"
if(gameState == "lost"){
  
  textSize(100)
  fill("red")

  //use text to display you lost
text("You lost",400,400)
  //destroy asteriod group
asteriodGroup.destroyEach()
  //destroy player
 rocket.destroy()

}

//destroy asteriod and rocket and display a message in gameState "won"
else if(gameState == "won"){
 
  textSize(100)
  fill("yellow")
  text("You Won ",400,400)
  asteriodGroup.destroyEach();
  rocket.destroy();

}

//destroy asteriod, rocket and bullets and display a message in gameState "bullet"
else if(gameState == "bullet"){
 
  textSize(50)
  fill("yellow")
  text("You ran out of bullets!!!",470,410)
  asteriodGroup.destroyEach();
  rocket.destroy();
  bulletGroup.destroyEach();

}

}


//creating function to spawn asteriod
function enemy(){
  if(frameCount%50===0){

    //giving random x and y positions for asteriod to appear
    asteriod = createSprite(random(500,1100),random(100,500),40,40)

    asteriod.addImage(asteriodImg)
    asteriod.scale = 0.15
    asteriod.velocityX = -3
    asteriod.debug= true
    asteriod.setCollider("rectangle",0,0,400,400)
   
    asteriod.lifetime = 400
   asteriodGroup.add(asteriod)
  }

}
