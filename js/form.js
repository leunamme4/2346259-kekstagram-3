

function checkForm() {
  const form = document.querySelector('.img-upload__form');

  const pristine = new Pristine(form, {
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

  form.addEventListener('submit', (evt)=> {
    if (!pristine.validate()) {
      evt.preventDefault();
    }
  });
}

export {checkForm};
