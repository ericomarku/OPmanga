var canvas;
let bubbles = [];

var bubblenumber = 50;

var w, h;

function windowResized() {
  if (home) {
    w = windowWidth;
    h = windowHeight;
    resizeCanvas(w, h);
  }
}

function setup() {
  w = windowWidth;
  h = windowHeight;
  canvas = createCanvas(w, h);
  canvas.parent('BackgroundContainer');
  generate(bubblenumber, 100);
}

function draw() {
  if (home && !onMobile) {
    var frames = frameRate()
    frameRate(30);
    clear();
    translate(w/2, h/2);

    if (frames <= 20) {
      bubblenumber--;
    }

    if (frames >= 30) {
      bubblenumber++;
    }

    while (bubbles.length < bubblenumber) {
      generate(1, 30);
    }

    for (let bubble of bubbles) {
      bubble.bubblesize();
      bubble.colour();
      bubble.move();
      bubble.show();
    }

    bubbles = bubbles.filter(b => !b.offScreen());
  }
}

function generate(amount, distrution) {
  for (var i = 0; i < amount; i++) {
    let x = randomGaussian(0, distrution);
    let y = randomGaussian(0, distrution);
    let b = new Bubble(x, y);
    bubbles.push(b);
  }
}

class Bubble {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.dx = x/20;
    this.dy = y/20;
    if (this.dx > -0.05 && this.dx < 0.05) {
      this.dx = this.dx * 20;
    }
    if (this.dy > -0.05 && this.dy < 0.05) {
      this.dy = this.dy * 20;
    }
    this.r;
    this.red;
    this.green;
    this.blue;
    this.dc = random(-10, 10);
    this.random = randomGaussian(0, 3);
  }

  bubblesize(px, py) {
    let d = dist(0, 0, this.x, this.y)
    this.r =  2 + d/100 + this.random;
  }

  offScreen() {
    return (this.x > w/2 + this.r || this.x < -w/2 - this.r || this.y > h/2 + this.r || this.y < -h/2 - this.r)
  }

  colour() {
    var r, g, b;
    let d = dist(0, 0, this.x, this.y)

    r = Math.round(119 + this.dc - (d/2));
    g = Math.round(217 + this.dc - (d/2));
    b = Math.round(255 + this.dc - (d/2));

    if (r < 0) {r = 0}
    if (g < 0) {g = 0}
    if (b < 30) {b = 30}

    this.red = r;
    this.green = g;
    this.blue = b;
  }

  move() {
    this.x = this.x + this.dx;
    this.y = this.y + this.dy;
  }

  show() {
    stroke(this.red, this.green, this.blue);
    fill('rgba(' + this.red + ',' + this.green + ',' + this.blue + ',0.7)');
    ellipse(this.x, this.y, (this.r * 2) + random(0,2), (this.r * 2) + random(0,2));
  }
}
