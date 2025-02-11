# workshop-task-9 (Live Video Capture)
Here is a URL to the webpage for this project: [link]( https://climedu.github.io/workshop-task-9/)

## Task
- Make an experimental 'smart mirror' using live video capture.
- Include manipulations at the level of the pixel.
- Make a new repository for your p5.js project on your GitHub account, publish your sketch as a webpage, and include a README file in your repository with a URL to the webpage along with documentation of your work.

## Overview
- Learning about the live video capture
- Manipulating pixels with the live video capture
- Adding filter to the live video


## Workshop Notes (Live Video Capture)
```ruby
let webcam;

 function setup() {
  createCanvas(400,400);
  pixelDensity(1);//to make the manipulation easier
  webcam = createCapture(VIDEO); // create a new video element in the webpage, going to request to use camera on the webpage
  webcam.size(400,400); // still being distorted
  webcam.hide();
}

function draw(){
  background(220);
  image(webcam, 0,0);
  filter(GRAY);
}

```
Refers to the workshop 7, allows the ball class color based on video captured colors

```ruby
let webcam;
let ballSystem = []

function setup() {
  createCanvas(400,400);
  pixelDensity(1);
  webcam = createCapture(VIDEO);
  webcam.size(400,400);
  //webcam.hide();
  for (x = 0; x<80 ; x ++) {
    rx = random(15, width - 15);
    ry = random(15, height - 15);
    rr = random(10,50);
    ballSystem[x] = new Ball(rx, ry, rr);
  }
}

function draw() {
  background(220);
  image(webcam, 0,0);
  filter(GRAY);
  for (x = 0; x < ballSystem.length; x++){
    ballSystem[x].move();
    ballSystem[x].show();
    ballSystem[x].checkEdges();
  }
}

class Ball {
    constructor(x,y,r){
      this.x = x;
      this.y = y;
      this.r = r;
    }

move () {
  this.x = this.x + random (-8,8);
  this.y = this.y + random (-8,8);
}

show(){
  fill(255,255,0);
  noStroke();
  ellipse(this.x, this.y, this.r);
}

checkEdges(){
  if(this.x < 15) {
    this.x = 1;
  }else if (this.x > width - 15){
  this.x = width - 15;
}
if (this.y<15){
  this.y = 15;
  } else if (this.y> height -15){
  this.y = height- 15;
}
}
}
```

<img width="400" alt="Screenshot 2025-02-11 at 11 11 43 AM" src="https://github.com/user-attachments/assets/d28c6c0c-8cf0-451c-a1d4-69bdb7858c70" />

Setting the color of the live video
```ruby

let webcam;
let ballSystem = [];
let scale = 18;

function setup() {
  createCanvas(400,400);
  pixelDensity(1);
  webcam = createCapture(VIDEO);
  webcam.size(width/scale, height/scale);
  webcam.hide();
  for (x = 0; x<80 ; x ++) {
    rx = random(15, width - 15);
    ry = random(15, height - 15);
    rr = random(10,50);
    ballSystem[x] = new Ball(rx, ry, rr);
  }
}

function draw() {
  //background(220);
  //image(webcam, 0,0);
  //filter(GRAY);
  webcam.loadPixels();
  for (x = 0; x < ballSystem.length; x++){
    ballSystem[x].move();
    ballSystem[x].show();
    ballSystem[x].checkEdges();
  }
}

class Ball {
    constructor(x,y,r){
      this.x = x;
      this.y = y;
      this.r = r;
    }

move () {
  this.x = this.x + random (-8,8);
  this.y = this.y + random (-8,8);
}

show(){
  //let pixelColour = webcam.get(this.x, this.y); //new variable to hold the color
  //since change the canvas size, need new variable
  let px = this.x/scale;
  let py = this.y/scale;
  let pixelColour = webcam.get(px, py);
  fill(pixelColour [0], pixelColour[1], pixelColour[2]); //for the rgb
  noStroke();
  ellipse(this.x, this.y, this.r);
}

checkEdges(){
  if(this.x < 15) {
    this.x = 1;
  }else if (this.x > width - 15){
  this.x = width - 15;
}
if (this.y<15){
  this.y = 15;
  } else if (this.y> height -15){
  this.y = height- 15;
}
}
}
```
<img width="400" alt="Screenshot 2025-02-11 at 1 32 35 PM" src="https://github.com/user-attachments/assets/ca26333d-0c63-46b8-ba08-98a2ace36c07" />

Adding some transparency

```ruby
show(){
  let px = this.x/scale;
  let py = this.y/scale;
  let pixelColour = webcam.get(px, py);
  fill(pixelColour [0], pixelColour[1], pixelColour[2], 120); //adding the 120 to manipulate the transparency
  noStroke();
  ellipse(this.x, this.y, this.r);
}
```

<img width="400" alt="Screenshot 2025-02-11 at 1 35 51 PM" src="https://github.com/user-attachments/assets/fa86219c-3957-4037-b972-97e7c96dcb2f" />

## Process

### Expeerimenting with the Threshold filter
The result is a bit like random black squares because it make the color black and white, beside, I also change the elipse to squares

<img width="400" alt="Screenshot 2025-02-11 at 3 38 49 PM" src="https://github.com/user-attachments/assets/c96135f1-709c-4327-95d9-be4814170123" />

<img width="400" alt="Screenshot 2025-02-11 at 3 33 22 PM" src="https://github.com/user-attachments/assets/14982a41-90d7-4b2a-bb41-29fddc472810" />

### Experimenting with the size of random squares

With smaller squares

<img width="402" alt="Screenshot 2025-02-11 at 3 34 23 PM" src="https://github.com/user-attachments/assets/48203309-4bbb-48ec-bb5e-2e6cb6a90e31" />

With larger squares

<img width="402" alt="Screenshot 2025-02-11 at 3 35 48 PM" src="https://github.com/user-attachments/assets/57f9e94e-67fb-461c-871e-630cfc3986f5" />

### Experimenting with the posterize filter

It has color but the filter make the colours pop and funky

<img width="400" alt="Screenshot 2025-02-11 at 3 39 01 PM" src="https://github.com/user-attachments/assets/8fc6a428-8ba9-4a14-9daf-7c78c092fd23" />


<img width="400" alt="Screenshot 2025-02-11 at 3 42 46 PM" src="https://github.com/user-attachments/assets/ce4c2092-341a-4aec-8115-64bd5738fc04" />

```ruby
let webcam;
let ballSystem = [];
let scale = 18;

function setup() {
  createCanvas(400,400);
  pixelDensity(1);
  webcam = createCapture(VIDEO);
  webcam.size(width/scale, height/scale);
  webcam.hide();
  for (x = 0; x<80 ; x ++) {
    rx = random(15, width - 15);
    ry = random(15, height - 15);
    rr = random(10,20);
    ballSystem[x] = new Ball(rx, ry, rr);
  }
}

function draw() {
  webcam.loadPixels();
  for (x = 0; x < ballSystem.length; x++){
    ballSystem[x].move();
    ballSystem[x].show();
    ballSystem[x].checkEdges();
  }
}

class Ball {
    constructor(x,y,r){
      this.x = x;
      this.y = y;
      this.r = r;
    }

move () {
  this.x = this.x + random (-8,8);
  this.y = this.y + random (-8,8);
}

show(){
  //let pixelColour = webcam.get(this.x, this.y); //new variable to hold the color
  //since change the canvas size, need new variable
  let px = this.x/scale;
  let py = this.y/scale;
  let pixelColour = webcam.get(px, py);
  fill(pixelColour [0], pixelColour[1], pixelColour[2]); //for the rgb
  noStroke();
  rect(this.x, this.y, this.r);
  filter(POSTERIZE,3);
}

checkEdges(){
  if(this.x < 15) {
    this.x = 1;
  }else if (this.x > width - 15){
  this.x = width - 15;
}
if (this.y<15){
  this.y = 15;
  } else if (this.y> height -15){
  this.y = height- 15;
}
}
}
```

### Make it static by removing the ball class
```ruby
let webcam;
let scale = 18; // Size of each pixel block

function setup() {
  createCanvas(400, 400);
  pixelDensity(1);
  webcam = createCapture(VIDEO);
  webcam.size(width / scale, height / scale);
  webcam.hide(); // Hide the default HTML webcam element
}

function draw() {
  background(0);
  webcam.loadPixels(); // Load webcam pixels

  for (let y = 0; y < height; y += scale) {
    for (let x = 0; x < width; x += scale) {
      // Map (x, y) to webcam pixel coordinates
      let px = int(x / scale);
      let py = int(y / scale);
      let index = (py * webcam.width + px) * 4;

      // Get pixel color
      let r = webcam.pixels[index];
      let g = webcam.pixels[index + 1];
      let b = webcam.pixels[index + 2];

      fill(r, g, b);
      noStroke();
      rect(x, y, scale, scale); // Draw pixel block
    }
  }
}
```

<img width="400" alt="Screenshot 2025-02-11 at 3 49 43 PM" src="https://github.com/user-attachments/assets/34b912c2-ac2e-4d2f-a280-44ebde0f233e" />

Add the posterize filter

<img width="400" alt="Screenshot 2025-02-11 at 3 51 03 PM" src="https://github.com/user-attachments/assets/4c834268-05d5-4b80-bbe3-35667d398225" />

### Commentaries
- I think it's cool that we can manipulate the webcam features
- This is a features that will be usefull for more interactivity


## Future Development
- This might be able to use as a sensors/ detectors so while it detecting something, there will be other function that run, for example, face filter
