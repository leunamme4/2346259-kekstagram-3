const scale = document.querySelector('.scale__control--value');
const scaleDecreaseButton = document.querySelector('.scale__control--smaller');
const scaleIncreaseButton = document.querySelector('.scale__control--bigger');
const previewPicture = document.querySelector('.img-upload__preview img');

function setScale(scl) {
  scale.value=`${String(scl)}%`;
  previewPicture.style.transform=`scale(${scl/100})`;
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
scaleDecreaseButton.addEventListener('click', decreaseScale);
scaleIncreaseButton.addEventListener('click', increaseScale);

const slider = document.querySelector('.effect-level__slider');
const effectValue = document.querySelector('.effect-level__value');
noUiSlider.create(slider, {
  start:[1],
  range: {
    'min': 0,
    'max': 1
  },
  step:0.1
});
function updateSlider(min, max, step) {
  slider.noUiSlider.updateOptions({
    start: [max],
    range: {
      'min': min,
      'max': max
    },
    step:step
  });
}


const effectButtons = document.querySelectorAll('.effects__radio');
let currentEffect='none';
function addEffectHandler(button) {
  button.addEventListener('change', ()=> {
    previewPicture.classList.remove(`effects__preview--${currentEffect}`);
    previewPicture.classList.add(`effects__preview--${button.value}`);
    currentEffect=button.value;
    switch (currentEffect) {
      case 'chrome':
        effectValue.value=1;
        updateSlider(0,1,0.1);
        previewPicture.style.filter=`grayscale(${effectValue.value})`;
        break;
      case 'sepia':
        effectValue.value=1;
        updateSlider(0,1,0.1);
        previewPicture.style.filter=`sepia(${effectValue.value})`;
        break;
      case 'marvin':
        effectValue.value=100;
        updateSlider(0, 100, 1);
        previewPicture.style.filter=`invert(${effectValue.value}%)`;
        break;
      case 'phobos':
        effectValue.value=3;
        updateSlider(0,3, 0.1);
        previewPicture.style.filter=`blur(${effectValue.value}px)`;
        break;
      case 'heat':
        effectValue.value=3;
        updateSlider(1,3,0.1);
        previewPicture.style.filter=`brightness(${effectValue.value})`;
        break;
      case 'none':
        previewPicture.style.filter='';
        break;
    }
  });
}

for (let i = 0; i<effectButtons.length; i++) {
  addEffectHandler(effectButtons[i]);
}

slider.noUiSlider.on('slide', ()=> {
  effectValue.value=slider.noUiSlider.get(true);
  switch(currentEffect) {
    case 'chrome':
      previewPicture.style.filter=`grayscale(${effectValue.value})`;
      break;
    case 'sepia':
      previewPicture.style.filter=`sepia(${effectValue.value})`;
      break;
    case 'marvin':
      previewPicture.style.filter=`invert(${effectValue.value}%)`;
      break;
    case 'phobos':
      previewPicture.style.filter=`blur(${effectValue.value}px)`;
      break;
    case 'heat':
      previewPicture.style.filter=`brightness(${effectValue.value})`;
      break;
  }
});
