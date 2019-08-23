let ground;
let selection;
let cacti = [];

const DINO_COUNT = 50;

let spawnCactusFrame;

let score = 0;
let highScore = 0;

let dinos = [];

function setup() {
    tf.setBackend('cpu');
    createCanvas(640, 480);

    ground = new Ground();

    spawnCactusFrame = int(random(40, 100));

    cacti.push(new Cactus());


    selection = new Selection();

    firstGeneration();
}

function draw() {
    background(255);

    score += 1;

    if(score > highScore) {
        highScore = score
    }

    push();
    fill(0);
    textSize(30);
    text("Score: " + score, width - 640, 30);
    text("HI: " + highScore, width - 640, 60 )
    pop();

    ground.show();

    if(frameCount == spawnCactusFrame){
        cacti.push(new Cactus());
        spawnCactusFrame += int(random(40, 100));
    }

    for(let i = 0; i < cacti.length; i++){

        if(cacti[i].pos.x < -cacti[i].width){
            cacti.shift();
        }

        cacti[i].update();
        cacti[i].show();
    }

    let allDead = true;

    for(let i = 0; i < dinos.length; i++){

        if(dinos[i].playerControlled){
            if(keyIsDown(DOWN_ARROW)){
                dinos[i].duck();
            } else {
                dinos[i].unDuck();
            }

            if(keyIsDown(UP_ARROW)){
                dinos[i].jump();
            }
        }
    if (dinos[i].isAlive) {
        allDead = false;
        dinos[i].update(getClosetCactus(dinos[i]), score);
        dinos[i].show();
        }
    }
    if(score == 2000){
        nextGeneration();
    }

    if(allDead){
        nextGeneration();
    }
}

function getClosetCactus(dino) {

    let closestIndex = 0;

    while (cacti[closestIndex].pos.x + cacti[closestIndex].fullWidth/2 < dino.pos.x - dino.width/2) {
        closestIndex++
    }

    return cacti[closestIndex];
}

function firstGeneration() {
    dinos = [];
    for (let i = 0; i < DINO_COUNT; i++){
        dinos.push(new Dino(false, new NeuralNetwork(2, 8, 3)));
    }
    dinos.push(new Dino(true));
}

function nextGeneration() {
    dinos = selection.createNewGeneration(DINO_COUNT, dinos, 1.0);
    dinos.push(new Dino(true));

    spawnCactusFrame = frameCount + int(random(40, 100));
    cacti = [];
    cacti.push(new Cactus());

    score = 0;

}