img = "";
status1 = "";
resultarr = [];
alarm = "";

function setup() {
    canvas = createCanvas(380, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380,380);
    video.hide();
}
function start() {
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
}
function preload() {
    img = loadImage('background.jpg');
    alarm = new Audio('alarm.mp3');
}
function modelLoaded() {
    console.log("Model Loaded!");
    status1 = true;
    objectDetector.detect(video, gotResult);
}
function gotResult(error,results) {
    if(error) {
        console.log(error);
    }
    console.log(results);
    resultarr = results;
}
function draw() {
    image(video, 0, 0, 380, 380);
    
    if(status1 != "") {
        r = random(255);
        g = random(255);
        b = random(255);
        objectDetector.detect(video, gotResult);
        if(resultarr.length < 1) {
            alarm.play();
            document.getElementById("number_of_objects").innerHTML = "Baby Not Detected";
        } else {
            for(var i=0; i<resultarr.length; i++) {
                document.getElementById("status").innerHTML = "Status : Object Detected";
                
                
                fill(r,g,b);
                percent = floor(resultarr[i].confidence * 100);
                text(resultarr[i].label +" , "+ percent+"%", resultarr[i].x+15, resultarr[i].y+15);
                noFill();
                stroke(r,g,b);
                rect(resultarr[i].x, resultarr[i].y, resultarr[i].width, resultarr[i].height);
                if(resultarr[i].label == person) {
                    alarm.stop();
                    document.getElementById("number_of_objects").innerHTML = "Baby Detected";
                } else {
                    alarm.play();
                    document.getElementById("number_of_objects").innerHTML = "Baby Not Detected";
                }
        }

    }
    
}
    

}