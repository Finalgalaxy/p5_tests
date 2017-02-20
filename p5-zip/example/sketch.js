var system;
var incremental;

var list;

function setup() {
    createCanvas(720, 400);
    system = new ParticleSystem(createVector(width/2, 50));
    
    list=[]; // List of trajectories data for X animations (2 trajectories).
    incremental=[];
    
    /* Make 2 trajectories, opposite ones on X axis.
    */
    list[0] = new PSTrajectory(
        createVector(0,0),              // Start from (0,0)...
        createVector(width,height),     // End at bottom-right corner (width,height)...
        30,                             // This parameter increases number of circles generated (more CPU)...
        true                            // true=Right direction!
    );
    list[1] = new PSTrajectory(
        createVector(width,0),          // Start from the top-right corner (width,0)...
        createVector(0,height),         // End at bottom-left corner (0,height)...
        30,                             // Same as above trajectory...
        false                           // false=Left direction!
    );
    
    
    
    // For optimization purposes, we calculate the xy offset incrementals in this section.
    for(var i=0;i<list.length;i++){
        // (end-start)/speed for both X and Y
        incremental[i]=createVector(
            ((list[i].end.x-list[i].start.x)/list[i].speed),
            ((list[i].end.y-list[i].start.y)/list[i].speed)
        );
    }
}

function draw() {
    background(51);
    for(var i=0;i<list.length;i++){ // For each trajectory...
        if( 
            (   
                list[i].direction_multiplier == 1 && (list[i].current.x < (list[i].end.x - incremental[i].x))       // If I'm going right, check right limit;
                ||
                list[i].direction_multiplier == -1 && (list[i].current.x > (list[i].start.x + incremental[i].x))    // If I'm going left, check left limit;
            )
            &&
                list[i].current.y < (list[i].end.y - incremental[i].y)  // Check if height is finished.
            ){
                system.addParticle(createVector(list[i].current.x,list[i].current.y));
                list[i].current.x+=incremental[i].x;
                list[i].current.y+=incremental[i].y;
            }
    }
    
    system.run();
}


var PSTrajectory = function(start,end,speed,isMovingRight){
    this.start=start;
    this.end=end;
    this.current=start; // Start from... start, no?
    this.speed=speed;
    this.direction_multiplier=(isMovingRight) ? 1 : -1;
}


// A particle. Particle is defined by position: Vector2(x,y).
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