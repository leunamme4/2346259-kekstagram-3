function lengthCheck (stringChecked, maxLenghth) {
  return stringChecked.length < maxLenghth;
}

function getRandomInt(min, max) {
  let minInt = Math.trunc(min);
  let maxInt = Math.trunc(max);
  //если нет подходящих числел в диапозоне
  if(minInt === maxInt || minInt < 0 || maxInt < 0){
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

function generatePosts () {
  const photos = [];
  for(let i = 1; i < 26; i++) {
    photos.push(
      {
        id: i,
        url: `photos/${i}.jpg`,
        description: `nice photo number ${i}`,
        likes: getRandomInt(15, 200),
        comments: getRandomInt(0, 200)
      }
    );
  }
  return photos;
}

export {generatePosts, getRandomInt, lengthCheck};
