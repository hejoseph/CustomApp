angular.module('factories')
.factory('Utils', function ($rootScope) {
    var sumArray = function(array){
        var count = 0;
        for (var i=array.length; i--;) {
            count+=array[i];
        }
        return count;
    }

    var initDefaultArray = function(size, value){
        var array = new Array(size);
        for(var i=0; i < size; i++){
            array[i] = value;
        }
        return array;
    }

    var sortNumber = function(a,b){
        return a - b;
    }

    var getRanks = function(scores){
        // var sorted = scores.slice().sort().reverse();
        // console.log("sort then reverse = "+JSON.stringify(sorted));
        var hash = {};
        for(var i=0; i < scores.length ; i++){
            hash[scores[i]] = "";
        }
        console.log("transform to uniq "+JSON.stringify(hash));
        var sorted = [];
        for(value in hash){
            sorted.push(parseInt(value,10));
        }
        console.log("push hash to array "+JSON.stringify(sorted));
        sorted.sort(sortNumber).reverse();
        console.log("array sorted and reverse"+JSON.stringify(sorted));
        var hash = {};
        for(var i = 0; i<sorted.length;i++){
            hash[sorted[i]] = i+1;
        }
        console.log("push array to hash with order "+JSON.stringify(hash));
        var result = [];
        for(var i = 0; i<scores.length;i++){
            result.push(hash[scores[i]]);
        }
        return result;
    }

    return {
      sumArray: sumArray,
      initDefaultArray,initDefaultArray,
      getRanks: getRanks
    };
});



function sortNumber(a,b) {
    return a - b;
}

Element.prototype.remove = function() {
    this.parentElement.removeChild(this);
}
NodeList.prototype.remove = HTMLCollection.prototype.remove = function() {
    for(var i = this.length - 1; i >= 0; i--) {
        if(this[i] && this[i].parentElement) {
            this[i].parentElement.removeChild(this[i]);
        }
    }
}