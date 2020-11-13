var ball;
var database,position,ballposition;
function setup(){
    database=firebase.database();// starting the database
    createCanvas(500,500);
    ball = createSprite(250,250,10,10);
    ball.shapeColor = "red";
    ballposition=database.ref('ball/position');// taking the position of ball from database.
    ballposition.on("value",readPosition,showError);// Based on the v alue in the position either call read position or show error.
}

function draw(){
    background("white");
    if(position!==undefined){  
    if(keyDown(LEFT_ARROW)){
        writePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        writePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        writePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        writePosition(0,+1);
    }
}
    drawSprites();
}

function writePosition(x,y){
   database.ref('ball/position').set({// To write the position inthe database.
       x:position.x+x,
       y:position.y+y
   })

}
function readPosition(data){// To read the value of position from tyhe database.
   position=data.val();
   ball.x=position.x;
   ball.y=position.y;
}
function showError(){//To show the message if there is any error.
  console.log("error");
}