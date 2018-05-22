var Letter = require('./letter.js');

var Word = function(secretWord) {
    this.letterArr = [];
    while (this.letterArr.length < secretWord.length) {
        this.letterArr.push(new Letter('x'))
    };
    this.displayWord = function() {
        var displayStr = '';
        for (let i=0; i < this.letterArr.length; i++) {
            displayStr += this.letterArr[i].displayVal();
        };
    };
    this.checkWord = function(userGuess) {
        for (let i=0; i < this.letterArr.length; i++) {
            this.letterArr[i].checkVal();
        };
    };
};

// var myWord = new Word('phil')

module.exports = Word;