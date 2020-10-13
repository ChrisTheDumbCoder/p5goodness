class Snake {
  constructor() {
    this.len = 0;
    this.body = [];
    this.body[0] = createVector(floor(w/2), floor(h/2));
    this.xdir = 0;
    this.ydir = 0;
    
  }
  update() {
    let head = this.body[this.body.length-1].copy();
    this.body.shift();
    head.x += this.xdir;
    head.y += this.ydir;
    this.body.push(head);
    
    //this.body[0].x += this.xdir;
    //this.body[0].y += this.ydir;
    
    
  }
  eat(pos) {
    let x = this.body[this.body.length-1].x;
    let y = this.body[this.body.length-1].y;
   
    
    if(x == pos.x && y == pos.y) {
      this.grow();
      return true;
    }
    return false;
    
  }
  grow() {
    let head = this.body[this.body.length-1].copy();
    this.len++
    this.body.push(head);
  }
  endGame() {
    let x = this.body[this.body.length-1].x;
    let y = this.body[this.body.length-1].y;
    if(x > w-1 || x < 0 || y > h-1 || y < 0) {
      return true;
    }
    for(let i = 0; i < this.body.length-1; i++) {
      let part = this.body[i]
      if (part.x == x && part.y == y ) {
          return true;
      }
    }
    return false;
  }
  setDir(x, y) {
    this.xdir = x;
    this.ydir = y;
    
  }
  show() {
    for(let i = 0; i < this.body.length; i++) {
     stroke(255);
      strokeWeight(0.075);
     fill(0, 205, 127)
     rect(this.body[i].x, this.body[i].y, 1, 1 , 0.3);
    }
    
  }
    
}
let snake;
let rez = 15;
let food;
let w ;
let h;
function setup() {
  createCanvas(1280, 720);
  w = floor(width / rez);
  h = floor(height / rez);
  snake = new Snake();
  frameRate(10);
  foodLocation();
}
function foodLocation() {
  let x = floor(random(w));
  let y = floor(random(h));
  food = createVector(x, y);
}
function keyPressed() {
  if(keyCode === LEFT_ARROW) {
    snake.setDir(-1, 0);
    
  } else if (keyCode === RIGHT_ARROW) {
    snake.setDir(1, 0);
  } else if (keyCode === DOWN_ARROW) {
    snake.setDir(0, 1);
  } else if (keyCode === UP_ARROW) {
    snake.setDir(0, -1);
  }
  
}

function draw() {
  scale(rez);
  background(0);
  if(snake.eat(food)) {
    foodLocation();
  }
  snake.update();
  snake.show();
  
  if(snake.endGame()) {
    alert('You died!')
    background(255, 0, 0)
    noLoop();
  
  }
  
  fill(255, 0, 0);
  rect(food.x, food.y, 1, 1, 1)
}
