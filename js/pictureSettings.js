import { checkForm } from './form.js';
import { sendData } from './sendData.js';

const slider = document.querySelector('.effect-level__slider');
const effectValue = document.querySelector('.effect-level__value');
const scale = document.querySelector('.scale__control--value');
const scaleMinusButton = document.querySelector('.scale__control--smaller');
const scalePlusButton = document.querySelector('.scale__control--bigger');
const preview = document.querySelector('.img-upload__preview img');
const commentField = document.querySelector('.text__description');
const effectButtons = document.querySelectorAll('.effects__radio');
const body = document.querySelector('body');
const form = document.getElementById('upload-select-image');
const closeButton = document.querySelector('.img-upload__cancel');
const submitButton = document.getElementById('upload-submit');
const imgUploadForm = document.querySelector('.img-upload__overlay');
const fileInput = document.querySelector('.img-upload__input');
const succesPattern = body.querySelector('#success').content.querySelector('.success');
const errorPattern = body.querySelector('#error').content.querySelector('.error');
let currentEffect='none';

noUiSlider.create(slider, {
  start:[1],
  range: {
    min: 0,
    max: 1
  },
  step:0.1
});
slider.classList.add('hidden');

function updateSlider(min, max, step) {
  slider.noUiSlider.updateOptions({
    start: [max],
    range: {
      min,
      max
    },
    step:step
  });
}

function setScale(scl) {
  scale.value=`${String(scl)}%`;
  preview.style.transform=`scale(${scl/100})`;
}

function decreaseScale() {
  if (parseInt(scale.value, 10) > 25) {
    setScale((parseInt(scale.value, 10)) - 25);
  }
}
function increaseScale() {
  if (parseInt(scale.value, 10) < 100) {
    setScale((parseInt(scale.value, 10)) + 25);
  }
}
scaleMinusButton.addEventListener('click', decreaseScale);
scalePlusButton.addEventListener('click', increaseScale);

function addEffectHandler(button) {
  button.addEventListener('change', ()=> {
    preview.classList.remove(`effects__preview--${currentEffect}`);
    preview.classList.add(`effects__preview--${button.value}`);
    slider.classList.remove('hidden');
    currentEffect = button.value;
    switch (currentEffect) {
      case 'none':
        slider.classList.add('hidden');
        preview.style.filter='';
        break;
      case 'chrome':
        effectValue.value=1;
        updateSlider(0,1,0.1);
        preview.style.filter=`grayscale(${effectValue.value})`;
        break;
      case 'sepia':
        effectValue.value=1;
        updateSlider(0,1,0.1);
        preview.style.filter=`sepia(${effectValue.value})`;
        break;
      case 'marvin':
        effectValue.value=100;
        updateSlider(0, 100, 1);
        preview.style.filter=`invert(${effectValue.value}%)`;
        break;
      case 'phobos':
        effectValue.value=3;
        updateSlider(0,3, 0.1);
        preview.style.filter=`blur(${effectValue.value}px)`;
        break;
      case 'heat':
        effectValue.value=3;
        updateSlider(1,3,0.1);
        preview.style.filter=`brightness(${effectValue.value})`;
        break;
    }
  });
}

for (let i = 0; i < effectButtons.length; i++) {
  addEffectHandler(effectButtons[i]);
}

slider.noUiSlider.on('slide', ()=> {
  effectValue.value=slider.noUiSlider.get(true);
  switch(currentEffect) {
    case 'chrome':
      preview.style.filter=`grayscale(${effectValue.value})`;
      break;
    case 'sepia':
      preview.style.filter=`sepia(${effectValue.value})`;
      break;
    case 'marvin':
      preview.style.filter=`invert(${effectValue.value}%)`;
      break;
    case 'phobos':
      preview.style.filter=`blur(${effectValue.value}px)`;
      break;
    case 'heat':
      preview.style.filter=`brightness(${effectValue.value})`;
      break;
  }
});


function escKeyHandler(evt) {
  if (evt.key === 'Escape') {
    form.reset();
    closeImgUpload();
  }
}

function closeImgUpload(setDefault = true) {
  imgUploadForm.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', escKeyHandler);
  if (setDefault) {
    setScale(100);
    preview.classList.remove(`effects__preview--${currentEffect}`);
    preview.classList.add('effects__preview--');
    currentEffect = 'none';
    preview.style.filter='';
    updateSlider(0, 100, 1);
    slider.classList.add('hidden');//чтобы сбрасывался при открытии без эффекта после закрытия
    commentField.value='';
    fileInput.value='';
  }
}

function openImgUpload() {
  imgUploadForm.classList.toggle('hidden');
  document.body.classList.toggle('modal-open');
  document.addEventListener('keydown', escKeyHandler);
}

fileInput.addEventListener('change', openImgUpload);
closeButton.addEventListener('click', closeImgUpload);

function getSuccessMessage() {
  closeImgUpload();
  form.reset();
  const successMessage = succesPattern.cloneNode(true);
  body.appendChild(successMessage);
  const successButton = successMessage.querySelector('.success__button');

  function closeMessage(){
    successMessage.remove();
    document.removeEventListener('keydown', handleKeyDownEvent);
  }

  function handleKeyDownEvent(evt) {
    if (evt.key === 'Escape') {
      closeMessage();
    }
  }

  successButton.addEventListener('click', () => {
    closeMessage();
  });
  successMessage.addEventListener('click', (evt) => {
    if (evt.target.matches('.success')) {
      closeMessage();
    }
  });
  document.addEventListener('keydown', handleKeyDownEvent);
}

function getErrorMessage() {
  const errorMessage = errorPattern.cloneNode(true);
  body.appendChild(errorMessage);
  const errorButton = errorMessage.querySelector('.error__button');

  function closeMessage(){
    errorMessage.remove();
    document.removeEventListener('keydown', handleKeyDownEvent);
  }

  function handleKeyDownEvent(evt) {
    if (evt.key === 'Escape') {
      closeMessage();
    }
  }

  errorButton.addEventListener('click', () => {
    closeMessage();
  });
  errorMessage.addEventListener('click', (evt) => {
    if (evt.target.matches('.error')) {
      closeMessage();
    }
  });
  document.addEventListener('keydown', handleKeyDownEvent);
}

form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  if (checkForm(form)) {
    submitButton.setAttribute('disabled', '');
    sendData(
      new FormData(evt.target),
      getSuccessMessage,
      getErrorMessage,
      () => {
        closeImgUpload();
        submitButton.removeAttribute('disabled', '');
      }
    );
  }
});


