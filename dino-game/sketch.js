let ground;
let cacti = [];

let spawnCactusFrame;

let score = 0;
let highScore = 0;

let dinos = [];

function setup() {
    tf.setBackend('cpu');
    createCanvas(640, 480);

    ground = new Ground();

    cacti.push(new Cactus());
    spawnCactusFrame = 40;

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
        dinos[i].update(getClosetCactus(dinos[i]));
        dinos[i].show();
        }
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
    dinos.push(new Dino(false, new NeuralNetwork(2, 4, 3)));
}

function nextGeneration() {
    dinos = [];
    dinos.push(new Dino(false, new NeuralNetwork(2, 4, 3)));

    spawnCactusFrame = frameCount + 40;
    cacti = [];
    cacti.push(new Cactus());

    score = 0;

}