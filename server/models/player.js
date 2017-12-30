function Player(name){
    this._name = name;
    this._scores = [];

    this.setScore = function(index, value){
        if(index<this._scores.length){
            _scores[index] = value;
        }else{
            console.log("cannot access to index >= to array length");
        }
    }

    this.addScore = function(score){
        if(!(score===parseInt(score,10))){
            score = 0
        }
        this._scores.push(score);
    }

    this.getTotalScore = function(){
        var count = 0;
        for (var i=this._scores.length; i--;) {
            count+=this._scores[i];
        }
        return count;
    }
}

module.exports = Player;