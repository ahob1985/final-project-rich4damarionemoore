// Author: Damarione Moore

// Global UI Variables
let canvasDiv;
let canvas;
let textDiv;
let textP;
let buttonDiv;
let submitButton;
let resetButton;

// Global ML Variables
let doodlenet;
let img;
let isModelReady;

function setup() {
  canvasDiv = creareDiv();
  canvas = createCanvas(640, 480);
  canvas.parent(canvasDiv);
  textDiv = createDiv();
  textP = createP("Model loading, Please wait...");
  textP.parent(textDiv);
  buttonDiv = createDiv();
  submitButton = createButton("Submit");
  submitButton.parent(buttonDiv);
  submitButton.mousePressed(predictImage);
  resetButton = createButton("RESET");
  resetButton.parent(buttonDiv);
  resetbutton.mousePressed(resetCanvas);
  buttonDiv.style("display", "none");
  isModelReady = false;
  doodlenet = ml5.imgClassifier("DoodleNet", modelReady);
}

function draw() {
  if(mouseIsPressed && isModelReady) {
    strokeWeight(25);
    line(mouseX, mouseY, pmouseX, pmouseY);
  }

}
function resetCanvas() {
  backgroung(255);
  textP.html("Draw your image, then click SUbmit");
}

function modelReady() {
  isModelReady = true;
  buttonDiv.style("display" ,"block");
  textP.html("Draw your image, then click SUbmit");
}

function predictImage() {
  doodlenet.classify(canvas, gotResults);
}

function gotResults(error, results) {
  if(error) {
    console.error(error);
  } else {
    let label = results[0].label;
    let confidence = round(results[0].confidence, 2);
    textP.html("Label: " + label + " - Confidence: " + confidence);
  }
}