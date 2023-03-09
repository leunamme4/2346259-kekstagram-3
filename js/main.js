const str = 'Im the best';

function lengthCheck (stringChecked, maxLenghth) {
  return stringChecked.length < maxLenghth;
}

console.log(lengthCheck(str, 4));

function getRandomInt(min, max) {

  let minInt = Math.trunc(min);
  let maxInt = Math.trunc(max);

  //если нет подходящих числел в диапозоне
  if(minInt == maxInt || minInt < 0 || maxInt < 0){
      return -1;
  }

  if(minInt < maxInt){
  return Math.floor(Math.random() * (maxInt - minInt + 1)) + minInt;
}

  if(minInt > maxInt){
    const agent = minInt;
    minInt = maxInt;
    maxInt = agent;
    return Math.floor(Math.random() * (maxInt - minInt + 1)) + minInt;
  }
}

console.log(getRandomInt(10, 9));


