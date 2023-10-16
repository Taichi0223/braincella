song = "";
var leftWrist_x = 0;
var leftWrist_y = 0;
var rightWrist_x = 0;
var rightWrist_y = 0;
score_left_wrist = 0;

function preload() {
    song = loadSound("music.mp3");
}


function setup() {
    canvas = createCanvas(800, 600);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    posenet = ml5.poseNet(video, model_Loaded);
    posenet.on("pose", posenet_results)
}

function model_Loaded() {
    console.log("Posenet initilized correctly")
}

function draw() {
    image(video, 0, 0, 800, 500);

    stroke("red");
    fill("red");

    if (score_left_wrist > 0.02) {

        circle(leftWrist_x, leftWrist_y, 20);
        left_y_num = Number(leftWrist_y);
        left_y = floor(left_y_num);
        vol_num = ((left_y / 500) * 100).toFixed(2);
        document.getElementById("volume").innerHTML = "Volume:" + vol_num + "%";
        song.setVolume(vol_num / 100);
    }

    /*
    0-100 - 0.5 speed
    101-200 - 1
    201-300 - 1.5
    301 - 400 - 2
    401 - 500 - 2.5

    */


    if (rightWrist_y > 0 && rightWrist_y <= 100 ){
        circle(rightWrist_x, rightWrist_y, 20);
        document.getElementById("speed").innerHTML = "Speed: 0.5x" ;
        song.rate(0.5);
    }

    else if(rightWrist_y > 100 && rightWrist_y <= 200 ){
        circle(rightWrist_x, rightWrist_y, 20);
        document.getElementById("speed").innerHTML = "Speed: 1x" ;
        song.rate(1); 
    }

    else if (rightWrist_y > 200 && rightWrist_y <= 300 ){
        circle(rightWrist_x, rightWrist_y, 20);
        document.getElementById("speed").innerHTML = "Speed: 1.5x" ;
        song.rate(1.5);
    }

    else if (rightWrist_y > 300 && rightWrist_y <= 400 ){
        circle(rightWrist_x, rightWrist_y, 20);
        document.getElementById("speed").innerHTML = "Speed: 2x" ;
        song.rate(2);
    }

    else if (rightWrist_y > 400 && rightWrist_y <= 500 ){
        circle(rightWrist_x, rightWrist_y, 20);
        document.getElementById("speed").innerHTML = "Speed: 2.5x" ;
        song.rate(2.5);
    }
}

function posenet_results(results) {
    if (results.length > 0) {
        // console.log(results);

        score_left_wrist = results[0].pose.keypoints[9].score;
        score_right_wrist = results[0].pose.keypoints[10].score;

        //console.log(score_left_wrist);
        leftWrist_x = results[0].pose.leftWrist.x;
        leftWrist_y = results[0].pose.leftWrist.y;
        rightWrist_x = results[0].pose.rightWrist.x;
        rightWrist_y = results[0].pose.rightWrist.y;

        //console.log(leftWrist_x, leftWrist_y, rightWrist_x, rightWrist_y);
    }
}

function start_music() {
    song.play();
    song.setVolume(0.5);
    /* 
    this takes a value between 0.0 (silence) and 1.0 (full volume):
        ○ Means variableName.setVolume(0.1) - Very low
        ○ Means variableName.setVolume(0.3) - Little low
        ○ Means variableName.setVolume(0.5) - Medium
        ○ Means variableName.setVolume(0.7) - Little high
        ○ Means variableName.setVolume(0.9) - High
        ○ Means variableName.setVolume(1) - Full volume
    */
    song.rate(1);
    /*
        ○ Means variableName.rate(0.5) - Very slow
        ○ Means variableName.rate(1) - Normal
        ○ Means variableName.rate(1.5) - Little fast
        ○ Means variableName.rate(2) - Twice as fast
        ○ Means variableName.rate(2.5) - Very fast

    */
}


/*

● Add setVolume() and rate() function
● Add code for initializing posenet model
● Add code for modelLoaded() function
● Add code for executing posenet
● Add code for gotPoses() function
● Add code for fetching x and y coordinates of leftWrist and
rightWrist

*/