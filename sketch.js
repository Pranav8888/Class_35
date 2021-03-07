var ball;
var ball2;

var database, position, position2;

function setup(){
    database = firebase.database();
    console.log(database);

    createCanvas(500,500);
    ball = createSprite(300,250,10,10);
    ball.shapeColor = "red";

    ball2 = createSprite(200,250,10,10);
    ball2.shapeColor = "blue";

    var ballPos = database.ref('ball/position');
    ballPos.on("value", readPosition, showError);

    var ball2Pos = database.ref('ball2/position');
    ball2Pos.on("value", readPosition2);

}


function draw(){
    background("white");
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

    if(keyDown('a')){
        writePosition2(-1,0);
    }
    else if(keyDown('d')){
        writePosition2(1,0);
    }
    else if(keyDown('w')){
        writePosition2(0,-1);
    }
    else if(keyDown('s')){
        writePosition2(0,+1);
    }
    drawSprites();
}

function readPosition(data) {
    position = data.val();
    console.log(position.x, position.y);
    ball.x = position.x;
    ball.y = position.y;
}

function readPosition2(data) {
    position2 = data.val();
    console.log(position2.x, position2.y);
    ball2.x = position2.x;
    ball2.y = position2.y;
}

function showError() {
    console.log("error in writing to the database");
}

function writePosition(x,y){
    database.ref('ball/position').set({
        x: position.x + x,
        y: position.y + y
    });
}
function writePosition2(x,y){
    database.ref('ball2/position').set({
        x: position2.x + x,
        y: position2.y + y
    });
}
