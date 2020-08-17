//Create variables here
var dog, happyDog, database, foodS, foodStock;
var dogImg, happyDogImg;

function preload()
{
  //load images here

  dogImg = loadAnimation("Dog.png");
  happyDogImg = loadAnimation("happydog.png");
}

function setup() {
  createCanvas(500, 500);
  
  database = firebase.database();
  
  dog = createSprite(250, 250, 30, 30);
  dog.addAnimation("dog1",dogImg);
  dog.addAnimation("dog2",happyDogImg);
  dog.scale = 0.25;

  foodStock = database.ref('food');
  foodStock.on("value", readStock);
  

}


function draw() {  

  background(46, 139, 87);

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.changeAnimation("dog2",happyDogImg);
  }

  drawSprites();
  //add styles here
  textSize(22);
  fill("red");
  stroke(3);
  text("press UP ARROW key to feed the dog", 60, 100);
  

}

function readStock(data){
  foodS = data.val();
}

function writeStock(x){

  if(x<=0){
    x = 0;
  }

  else{
    x = x-1;
  }

  database.ref('/').ref.update({
    food:x
  });
}



