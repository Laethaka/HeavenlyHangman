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
        if (userGuess === this.trueVal && !isRevealed) {//REVEALING LETTER
            this.isRevealed = true;
            this.displayVal();
        };
    };
};



// module.exports = Letter;