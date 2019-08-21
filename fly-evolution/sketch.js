const LIFE_SPAN = 1000; // how long do files live
const POP_SIZE = 500; // How many flies do we want
const REWARD_MULT = 10; // What is the reward for finding food
const PUNISH_DIV = 3; // What is the punishment for hitting something
const MUTATION_RATE = 0.1; // What is the rate at which flies mutate

let count = 0;
let generation = 0;
let averageFit = 0;
let successRate = 0;

function setup() {
    console.log("Hello World!");

    createCanvas(640, 480);

    population = new Population(LIFE_SPAN, POP_SIZE, REWARD_MULT, PUNISH_DIV)
}

function draw() {
    background(0, 0, 0);

    textSize(22);
    fill(255, 255, 255)
    text("Generation: " + generation, 5, 20);
    text("Average Fitness: " + averageFit, 5, 40)
    text("Success Rate: " + successRate + "%", 5, 60)

    population.run(count);
    count++;

    if(count == LIFE_SPAN){
        population.evaluate();

        averageFit = population.findAverageFitness();
        successRate = population.successRate;

        let newFlies = population.generateNewPopulation(MUTATION_RATE);

        population = new Population(LIFE_SPAN, POP_SIZE, REWARD_MULT, PUNISH_DIV, newFlies);

        count = 0;
        generation++;
    }
}