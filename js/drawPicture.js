import { getData } from './sendData.js';

const imageTemplate = document.querySelector('#picture');
const picturesList = document.querySelector('.pictures');

function drawPhotos(photos) {
  const partPicturesList = document.createDocumentFragment();
  photos.forEach(({url, likes, comments}) => {
    const photo = imageTemplate.content.cloneNode(true);
    photo.querySelector('.picture__img').src = url;
    photo.querySelector('.picture__comments').textContent = comments;
    photo.querySelector('.picture__likes').textContent = likes;
    partPicturesList.appendChild(photo);
  });

  picturesList.append(partPicturesList);
}

getData(drawPhotos);
