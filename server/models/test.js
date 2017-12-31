function getRanks(scores){
    // var sorted = scores.slice().sort().reverse();
    // console.log("sort then reverse = "+JSON.stringify(sorted));
    var hash = {};
    for(var i=0; i < scores.length ; i++){
        hash[scores[i]] = "";
    }
    console.log("transform to uniq "+JSON.stringify(hash));
    var sorted = [];
    for(value in hash){
        sorted.push(value);
    }
    console.log("push hash to array "+JSON.stringify(sorted));
    sorted.sort().reverse();
    console.log("array sorted "+JSON.stringify(sorted));
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