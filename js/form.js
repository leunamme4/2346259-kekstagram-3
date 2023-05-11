const imageUpload = document.querySelector('.img-upload__overlay');
const fileInput = document.querySelector('.img-upload__input');
const closeImageUploadButton = document.querySelector('.img-upload__cancel');

function checkForm() {
  const form = document.querySelector('.img-upload__form');

  const pristine = new Pristine({
    classTo: 'form__item',
    errorClass: 'form__item--invalid',
    successClass: 'form__item--valid',
    errorTextParent: 'form__item',
    errorTextTag: 'span',
    errorTextClass: 'form__error'
  });
  function validateComment (value) {
    return value.length >= 20 && value.length <= 140;
  }

  pristine.addValidator(
    form.querySelector('.text__description'),
    validateComment,
    'От 20 до 140 символов'
  );
}

function escapeKeyHandler(ev) {
  if (ev.key === 'Escape') {
    closeImageUpload();
  }
}

function closeImageUpload() {
  imageUpload.classList.add('hidden');
  document.removeEventListener('keydown', escapeKeyHandler);
}

function openImageUpload() {
  imageUpload.classList.remove('hidden');
  document.addEventListener('keydown', escapeKeyHandler);
}

fileInput.addEventListener('change', openImageUpload);
closeImageUploadButton.addEventListener('click', closeImageUpload);

export {checkForm, closeImageUpload};
