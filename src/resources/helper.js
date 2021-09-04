const letters = ["A","B","C","D","E","F","G","H"];

function shuffle(array) {
    var currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle...
    while (currentIndex !== 0) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
}

function getResult(cards){
    if(cards[0] === cards[1]){
        return true;
    }
    return false;
}

export {
    letters,
    shuffle,
    getResult
}