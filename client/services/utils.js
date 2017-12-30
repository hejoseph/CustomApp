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

    return {
      sumArray: sumArray,
      initDefaultArray,initDefaultArray
    };
});

