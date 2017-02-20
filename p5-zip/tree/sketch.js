var axiom = "F";
var sentence = axiom;
var len = 110;
var angle;

var rules =[];
rules[0] = {
    a: "F",
    b: "FF+[-F-FF+F]-[+F+FF-F]"
}

function generate() {
    len *= 0.5;
    var nextSentence = "";
    for (var i = 0; i < sentence.length; i++) {
        var current = sentence.charAt(i);
        var found = false;
        for (var j = 0; j < rules.length; j++) {
            if (current == rules[j].a) {
                found = true;
                nextSentence += rules[j].b;
                break;
            }
        }
        if (!found) {
            nextSentence += current;
        }
    }
    sentence = nextSentence;
    //createP(sentence);
    turtle();
}

function turtle() {
    background(40);
    translate(width/2, height);
    strokeWeight(1);
    stroke(70, 210, 190, 80);
    for (var i = 0; i < sentence.length; i++) {
        var current = sentence.charAt(i);
        
        if (current == "F") {
            line(0, 0, 0, -len);
            translate(0, -len);
        } else if (current == "+") {
            rotate(angle);
        } else if (current == "-") {
            rotate(-angle);
        } else if (current == "[") {
            push();
        } else if (current == "]") {
            pop();
        }
    }
}

function setup() {
    createCanvas(800,500);
    translate(width/2, length);
    background(51, 15, 18);
    angle = radians(25);
    createP(axiom);
    turtle();
    var button = createButton("generate");
    button.mousePressed(generate);
}

function draw() {
    
}