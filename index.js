var Word = require('./word.js');
var Inquirer = require('inquirer');
var fileSys = require('fs');
var streak = 0;
var username;

var wordArr = ['Adriel', 'Arariel', 'Barachiel', 'Baraqiel', 'Cassiel', 'Eleleth', 'Eremiel', 'Hadraniel', 'Haniel', 'Hofniel', 'Imamiah', 'Jegudiel', 'Jerahmeel', 'Jophiel', 'Maalik', 'Pahaliah', 'Puriel', 'Qaphsiel', 'Sahaquiel', 'Selaphiel', 'Temeluchus', 'Vasiariah', 'Zachariel', 'Zephon']

function gameStart() {
    //INITIALIZING GAME VARS
    var secretWord = wordArr[Math.floor(Math.random()*wordArr.length)];
    // console.log(secretWord);
    var displayWord = new Word(secretWord);

    var guessesLeft = 10;
    var guessedArr = [];
    
    //PROMPTING FOR USERNAME AND WAITING
    if (!username) {
        Inquirer.prompt([
            {
            type: 'input',
            message: 'Please enter a username',
            name: 'name'
            }
        ]).then(function(response){
            username = response.name;
            console.log(`\nNew angel's name: ${displayWord.updateDisplay()}\n`);
            gameRound();
        })
    } else {
        console.log(`\nNew angel's name: ${displayWord.updateDisplay()}\n`);
        gameRound();
    }

    function gameRound() {
        function validateUserGuess(input){ //CREDIT: JULIEN
            if(!(/^[a-zA-Z]/.test(input)) || guessedArr.includes(input) || guessedArr.includes(input.toLowerCase()) || input.length>1){
                return "Please guess a single, new letter!"
            } else {
                return true
            }
        }; 

        Inquirer.prompt([
            {
                type: 'input',
                message: 'Guess a letter',
                name: 'userGuess',
                validate: validateUserGuess
            }
        ]).then(function(response) {
            var modifiedGuess = response.userGuess.toLowerCase();
            guessedArr.push(modifiedGuess);
            if (displayWord.checkWord(modifiedGuess)==='HIT'){ //GUESS HIT
                console.log('Correct!')
                
                if (displayWord.updateDisplay()===secretWord) { //GAME WIN
                    streak++;
                    console.log(`\n
                        Congratulations ${username}!
                        The angel's name was indeed ${secretWord}.
                        Your win streak is now: ${streak}
                    `)
                    gameOver();
                } else { //GAME CONTINUES
                    console.log(`
                        Current angel's name: ${displayWord.updateDisplay()}
                        Letters guessed: ${guessedArr}
                    `)
                    gameRound();
                }
            } else { //GUESS MISSED
                guessesLeft--;
                if (guessesLeft===0) { //GAME LOSS
                    console.log(`\n
                        Incorrect! Game over, ${username}, game over.
                        The angel's name was ${secretWord}.
                    `);
                    if (streak>2) {
                        console.log(`
                            Your win streak of ${streak} will be forever entered into the halls of glory.
                        `)
                        fileSys.appendFile('highscores.txt', `${username} has won eternal life with a streak of ${streak}.`, function(err) {
                            if (err) {console.log(err)}
                        })
                    } else {
                        console.log(`
                            Your win streak of ${streak} was found unworthy. Pray for your sins.
                        `)
                    }
                    streak = 0;
                    gameOver();
                } else { //GAME CONTINUES
                    console.log(`Incorrect! Misses left: ${guessesLeft}\n
                        Current angel's name: ${displayWord.updateDisplay()}
                        Letters guessed: ${guessedArr}
                    `)
                    gameRound();
                };
            };
        });
    };
};

function gameOver() {
    Inquirer.prompt([
        {
            type: 'list',
            message: 'What would you like to do now?',
            choices: ['Play Again', `View Score History (abandon win streak of ${streak})`],
            name: 'gameChoice',
        }
    ]).then (function(response) {
        if (response.gameChoice === 'Play Again') {
            gameStart();
        } else {
            fileSys.readFile('highscores.txt','utf8',function(err, data) {
                if (err) {
                    console.log('sorry, high scores not currently available!')
                } else {
                    console.log('\nTHE HALLS OF GLORY:::')
                    var scoresArr = data.split('.');
                    scoresArr.forEach(function(ele) {
                        console.log(ele);
                    });
                };
            });
        };
    });
};

console.log('\nWelcome to Heavenly Hangman: like Hellish Hangman, but boring and DRY!')
Inquirer.prompt([
    // {
    //     type: 'input',
    //     message: 'Please enter a username',
    //     name: 'name'
    // },
    {
        type: 'list',
        message: 'What would you like to do?',
        choices: ['Play Heavenly Hangman', 'View Score History', 'Play Hellish Hangman Instead'],
        name: 'gameChoice',
    }
]).then (function(response) {
    // username = response.name;
    if (response.gameChoice === 'Play Heavenly Hangman') {
        gameStart();
    } else if (response.gameChoice === 'Play Hellish Hangman Instead') {
        console.log('Good choice. Ctrl+click here: http://laethaka.github.io/HellishHangman')
    } else {
        fileSys.readFile('highscores.txt','utf8',function(err, data) {
            if (err) {
                console.log('sorry, high scores not currently available!')
            } else {
                console.log('\nTHE HALLS OF GLORY:::')
                var scoresArr = data.split('.');
                scoresArr.forEach(function(ele) {
                    console.log(ele);
                })
            }
        })
    }
})
