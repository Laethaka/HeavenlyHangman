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
        if (userGuess === this.trueVal && !this.isRevealed) {//REVEALING LETTER
            this.isRevealed = true;
            this.displayVal();
        };
    };
};

// var firstLetter = new Letter('x');
// console.log(firstLetter)
// firstLetter.checkVal('e');

// console.log(firstLetter)

module.exports = Letter;