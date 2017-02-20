var system,current_pos,start_pos,end_pos,n_iterations;
var incremental;

function setup() {
  createCanvas(720, 400);
  system = new ParticleSystem(createVector(width/2, 50));
  start_pos = new Point(0,100);
  end_pos = new Point(width,200);
  current_pos = start_pos;
  n_iterations=30;
  
  // For optimization purposes, we calculate the xy offset incrementals in this section.
  incremental=new Point(((end_pos.x-start_pos.x)/n_iterations),((end_pos.y-start_pos.y)/n_iterations));
}

function draw() {
  background(51);
  if(current_pos.x<(end_pos.x-incremental.x) && current_pos.y<(end_pos.y-incremental.y)){
    system.addParticle(createVector(current_pos.x,current_pos.y));
    current_pos.x+=incremental.x;
    current_pos.y+=incremental.y;
  }
  system.run();
}

// Point class (just to save x,y in a more elegant way).
var Point = function(x,y){
    this.x=x;
    this.y=y;
}




// A particel. Particel is defined by position (x,y).
var Particle = function(position) {
  this.acceleration = createVector(0, 0.05);
  this.velocity = createVector(random(-1, 1), random(-1, 0));
  this.position = position.copy();
  this.lifespan = 255.0;
};

Particle.prototype.run = function() {
  this.update();
  this.display();
};

// Method to update position
Particle.prototype.update = function(){
  this.velocity.add(this.acceleration);
  this.position.add(this.velocity);
  this.lifespan -= 2;
};

// Method to display
Particle.prototype.display = function() {
  stroke(200, this.lifespan);
  strokeWeight(2);
  fill(127, this.lifespan);
  ellipse(this.position.x, this.position.y, 12, 12);
};

// Is the particle still useful?
Particle.prototype.isDead = function(){
  return (this.lifespan < 0);
};






var ParticleSystem = function(position) {
  this.origin = position.copy();
  this.particles = [];
};

ParticleSystem.prototype.addParticle = function(position) {
  this.particles.push(new Particle(position));
};

ParticleSystem.prototype.run = function(){
  for(var i = this.particles.length-1; i>=0; i--) {
    var p = this.particles[i];
    p.run();
    if (p.isDead()){
      this.particles.splice(i, 1);
    }
  }
};

// Method to update coordinates
Particle.prototype.setPosition = function(e_x, e_y){
  this.position=createVector(e_x,e_y);
};