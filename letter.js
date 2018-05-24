var Letter = function(trueVal) {
    this.trueVal = trueVal;
    this.isRevealed = false;
    this.displayVal = function() {
        if (!this.isRevealed) {//LETTER HAS NOT BEEN GUESSED
            return '-';
        } else {//LETTER HAS BEEN GUESSED
            return this.trueVal;
        };
    };
    this.checkVal = function(userGuess) {
        if (userGuess === this.trueVal && !this.isRevealed || userGuess.toUpperCase() === this.trueVal && !this.isRevealed) {//REVEALING LETTER
            this.isRevealed = true;
            this.displayVal();
            return 'HIT'
            // console.log(userGuess)
        };
    };
};

// var firstLetter = new Letter('X');
// console.log(firstLetter)
// firstLetter.checkVal('x');

// console.log(firstLetter)

module.exports = Letter;