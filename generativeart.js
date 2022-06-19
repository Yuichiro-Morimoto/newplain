function setup() {
  createCanvas(1080, 720);
}

function getSize(){
canvas.width = wrapper.offsetWidth;
canvas.height =  wrapper.offsetHeight;
}

function draw() {
  if (mouseIsPressed) {
    fill(0);
  } else {
    fill(255);
  }
  ellipse(mouseX, mouseY, 80, 80);
}
