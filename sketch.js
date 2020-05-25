let biscuit = [];
let video;
let noseX = 0;
let noseY = 0;
let dogBiscuit;
let dogHaloHoop; 


// function for dog image and biscuits to be inserted 
function preload(){
 dogBiscuit = loadImage('Dog_biscuit.png'); 
 dogHaloHoop = loadImage('doggy halo.png'); 
}

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.hide();
  posenet = ml5.poseNet(video, modelReady);
  posenet.on('pose', DOGGYPoses);
  
//create biscuit size between 10 and 30

  for (let i = 0; i < 20; i++) {
    let x = random(width);
    let y = random(height);
    let r = random(10, 30); 
   
// make biscuits move about
    let b = new Biscuit(x, y, r);
    biscuit.push(b);
  }    
}

//nose pose keypoints 
DOGGYPoses = function(poses) { 
   if (poses.length > 0) {
     nX = poses[0].pose.keypoints[0].position.x;
     nY = poses[0].pose.keypoints[0].position.y;
     noseX = lerp(noseX, nX, 0.5);
     noseY = lerp(noseY, nY, 0.5);
  }
}

function modelReady() {
   //console.log('model ready'); 
}

//anything in here runs continually untill i give it some rules
function draw() {
  image (video, 0,0);
  d = dist(noseX, noseY, noseX, noseY);
  
  //insert dog halo hoope, make it offset to be more central to face
  image(dogHaloHoop, noseX-100, noseY-120, 250, 320);
   for (let i = 0; i < biscuit.length; i++) {     
    biscuit[i].move();
    biscuit[i].show();
    biscuit[i].dissappear(noseX, noseY); 
   }
}

class Biscuit {
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.alive = true;
  }

//biscuits disappear
  dissappear(dx, dy) {
    let d = dist(dx, dy, this.x, this.y);
    if (d < this.r) {
      this.alive = false;
      this.x = 1000000;
      this.y = 1000000;
    }
  }
//this lets the biscuits bobble about from the move command
  move() {
    this.x = this.x + random(-2, 2);
    this.y = this.y + random(-2, 2);
  }

//display the biscuits
  show() {
    image(dogBiscuit, this.x, this.y, this.r*2, this.r *2.5);
     //rate biscuits change
    frameRate(1.5) 
  }
}