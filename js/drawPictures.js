import { photos } from './data.js';

const pictureTemplate = document.querySelector('#picture').content;

const fragment = new DocumentFragment();

photos.forEach((photo) => {
  const template = pictureTemplate.cloneNode(true);
  const picture = template.querySelector('.picture__img');
  const likes = template.querySelector('.picture__likes');
  const comments = template.querySelector('.picture__comments');
  picture.src = photo.url;
  likes.textContent = photo.likes;
  comments.textContent = photo.comments;
  fragment.appendChild(template);
});

const block = document.querySelector('.pictures');
block.append(fragment);

