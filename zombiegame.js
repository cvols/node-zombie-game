var inquirer = require("inquirer");

// var for user health
var userHealth = 100;

// vars for zombie health
// each different zombie health is used for different rounds
// zombie health is the global health
// numbered zombie healths are used depding on what round you are on and it over writes the zombie health when zombie dies
var zombieHealth = 0;
var zombieHealth1 = 10;
var zombieHealth2 = 25;
var zombieHealth3 = 50;
var zombieHealth4 = 75;
var zombieHealth5 = 100;

// var to hold response.name at start of game
var name = '';

//var for random zombie number to match user guess
var randomZombieNumber = 0;

// var for random number to cause how much damage
var randomHit = 0;

// var to help with zombie health counter so we know how much help to assign to the zombie depending on round number
var counter = 0;

// var to hold answer.attack so we can use it later
var attack = '';

// var to hold the round number so we can print it to the screen and use it for when we die so you know how far you got
var roundNumber = 0;

// prompting the user to get their name and let them know the rules
inquirer
    .prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is your name?'
        },
        {
            type: 'confirm',
            name: 'gameStart',
            message: 'Rules of the game: \nSelect a random number from 1-5.  \nIf you guess correctly you attack the zombie.  \nIf not, the zombie attacks you.  \nObjective is to get to the highest level without dying. \nConfirm when ready...',
            default: true
        }
    ])
    .then(function (response) {
        // checking to see if the user accepts the challenge
        // doesn't matter because its the zombie apocolypse so you don't have much of a choice :) 
        if (response.gameStart === 'no' || 'n' || 'No' || 'NO'){
            console.log('Too bad you"re playing the game anyways! HAHAA')
        }
        // setting the response.name to var name so we can use it later
        name = response.name;
        console.log('')

        // letting the user know what round it is
        roundCounter();
        console.log('')
        
        // calling zumber counter function to start the rounds
        zombieCounter();
    });

// function to set zombie health dependent on round number
// then calling the next round to start
function zombieCounter() {
    if (counter === 0) {
        zombieHealth = zombieHealth1;
        roundOne();
    } if (counter === 1) {
        zombieHealth = zombieHealth2;
        roundTwo();
    } if (counter === 2) {
        zombieHealth = zombieHealth3;
        roundThree();
    } if (counter === 3) {
        zombieHealth = zombieHealth4;
        roundFour();
    } if (counter === 4) {
        zombieHealth = zombieHealth5;
        roundF1ive();
    }
}

// starts round one
function roundOne() {
    attackZombie();
}

// starts round two
function roundTwo() {
    attackZombie();
}

// starts round three
function roundThree() {
    attackZombie();
}

// starts round four
function roundFour() {
    attackZombie();
}

// starts round five
function roundFive() {
    attackzombie();
}

// prompting the user to select 1-5.  
// if zombie guesses same number then you attack a random number
// if zombie doesn't guess your number he attacks you a random number
function attackZombie() {
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'attack',
                message: 'Try to stay alive! Guess a number between 1 and 5. If you guess correctly you will attack the zombie!.  If not, the zombie will attack you!',
                choices: ['1', '2', '3', '4', '5'],
            }
        ])
        .then(function (answer) {
            // setting answer.attack to a variable attack so we can use it later
            attack = answer.attack;

            // calling randomizer function to set random zombie number and random hit number
            randomizer();

            // calling health check function to check user health vs zombie health
            healthCheck();
        })
}

// function to set random zombie number and random hit number
function randomizer() {
    randomZombieNumber = Math.floor((Math.random() * 5) + 1);
    randomHit = Math.floor((Math.random() * 10) + 1);
}

// function to check user health vs zombie health
// if user health and zombie health are greater than 0
// use the attack var created earlier that holds answer.attack
// if answer.attack equals random zombie number then user attacks zombie and zombie health goes down
// call win function to check if user or zombie health drops to or below 0
// if answer.attack doesn't equal random zombie number then zombie attacks user and user health goes down
// call win function to check if user or zombie health drops to or below 0
function healthCheck() {
    if (userHealth > 0 && zombieHealth > 0) {

        if (attack == randomZombieNumber) {
            console.log('\nZombie guessed ' + randomZombieNumber);
            console.log('YOU HIT THE ZOMBIE WITH ' + randomHit + 'hp');

            zombieHealth -= randomHit;

            console.log('----------------------------------------');
            console.log('\n' + name + ' ' + userHealth + 'hp');
            console.log('Zombie ' + zombieHealth + 'hp');
            console.log('')

            win();
        } else {
            console.log('\nZombie guessed ' + randomZombieNumber);
            console.log('ZOMBIE HIT YOU WITH ' + randomHit + 'hp');

            userHealth -= randomHit;

            console.log('----------------------------------------');
            console.log('\n' + name + ' ' + userHealth + 'hp');
            console.log('Zombie' + ' ' + zombieHealth + 'hp');
            console.log('')

            win();
        }
    }
}

// function checking to see if user health or zombie health is lower than 0
// if user health is equal to 0 or less then you die
// if zombie health is equal to 0 or less then zombie dies then next round and zombie is called in
// if user and zombie health are greater than 0 then attack zombie function is called again
function win() {
    if (userHealth <= 0) {
        console.log('#################################')
        console.log(name + ' died!')
        console.log('Game Over')
        console.log('You lasted ' + roundNumber + ' rounds!!')
        console.log('#################################')
        console.log('')
    } else if (zombieHealth <= 0) {
        console.log('#################################')
        console.log('Zombie died!')
        console.log('End ROUND ' + roundNumber)
        console.log('#################################')
        console.log('')
        counter++;
        roundCounter();
        zombieCounter();
    } else {
        attackZombie();
    }
}

// function to count the rounds for when you start a new round or die so you know what round you died on
function roundCounter() {
    roundNumber++;
    console.log('')
    console.log('++++++ROUND ' + roundNumber + '++++++')
    console.log('')
}
