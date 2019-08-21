const LIFE_SPAN = 600; // how long do files live
const POP_SIZE = 500; // How many flies do we want
const REWARD_MULT = 10; // What is the reward for finding food
const PUNISH_DIV = 3; // What is the punishment for hitting something
const MUTATION_RATE = 0.1; // What is the rate at which flies mutate

let count = 0;

function setup() {
    console.log("Hello World!");

    createCanvas(640, 480);

    population = new Population(LIFE_SPAN, POP_SIZE, REWARD_MULT, PUNISH_DIV)
}

function draw() {
    background(0, 0, 0);
    population.run(count);
    count++;

    if(count == LIFE_SPAN){
        count = 0;
    }
}