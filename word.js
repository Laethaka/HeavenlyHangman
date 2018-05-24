var Letter = require('./letter.js');

var Word = function(secretWord) {
    this.letterArr = [];
    for (let i=0; i < secretWord.length; i++) {
        this.letterArr.push(new Letter(secretWord[i]))
    };

    this.updateDisplay = function() {
        var displayStr = '';
        for (let i=0; i < this.letterArr.length; i++) {
            displayStr += this.letterArr[i].displayVal();
        };
        return displayStr;
    };

    this.checkWord = function(userGuess) {
        var userHit = false;
        for (let i=0; i < this.letterArr.length; i++) {
            if (this.letterArr[i].checkVal(userGuess)==='HIT') {
                userHit = true;
            };
        };
        if (userHit) {return 'HIT'};
    };
};

// var myWord = new Word('phil')
// console.log(myWord.updateDisplay())

module.exports = Word;