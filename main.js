music="";
music2="";
leftWristX="";
leftWristY="";
rightWristX="";
rightWristY="";
score_leftWrist="";
score_rightWrist="";
function preload(){
    music=loadSound("music.mp3");
    music2=loadSound("music2.mp3");
}

function modelLoaded(){
    console.log("PoseNet Is Initialized");
}

function setup(){
    canvas=createCanvas(500,400);
    canvas.center();

    video=createCapture(VIDEO);
    video.hide();

    poseNet=ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotresults);  
}

function draw(){
    image(video,0,0,500,400);

    if(score_leftWrist>0.2){
        music.play();
        music2.stop();
        stroke("red");
        fill("red");
        circle(leftWristX,leftWristY,20);
        document.getElementById("song_name").innerHTML= "Song 1"
    }
    if(score_rightWrist>0.2){
        music2.play();
        music.stop();
        stroke("red");
        fill("red");
        circle(rightWristX,rightWristY,20);
        document.getElementById("song_name").innerHTML= "Song 2"
    }
}

function gotresults(results){
    if(results.length>0){
        console.log(results);
        leftWristX=results[0].pose.leftWrist.x;
        leftWristY=results[0].pose.leftWrist.y;
        console.log("Left Wrist X = "+leftWristX+" Left Wrist Y = "+leftWristY);
        rightWristX=results[0].pose.rightWrist.x;
        rightWristY=results[0].pose.rightWrist.y;
        console.log("Right Wrist X = "+rightWristX+" Right Wrist Y = "+rightWristY);
        score_leftWrist=results[0].pose.keypoints[9].score;
        console.log("Score Of Left Wrist = "+score_leftWrist);
        score_rightWrist=results[0].pose.keypoints[10].score;
        console.log("Score Of Right Wrist = "+score_rightWrist);
    }
}