import { uploadDataLink } from './constants.js';

function EscapeKeyHandler(newMessage) {
  newMessage.remove();
  document.removeEventListener('keydown', EscapeKeyHandler);
}

function sendData(form, callBackfunc, openImgUpload) {
  const successTemplate = document.querySelector('#success').content;
  const errorTemplate = document.querySelector('#error').content;
  const errorMessage = errorTemplate.querySelector('.error');
  const successMessage = successTemplate.querySelector('.success');
  fetch(uploadDataLink,
    {
      method: 'POST',
      body: new FormData(form)
    }).then((response) => {
    if (response.ok) {
      const newMessage = successMessage.cloneNode(true);
      const successButton = newMessage.querySelector('.success__button');
      successButton.addEventListener('click', () => newMessage.remove());
      const successEscapeKeyHandler = EscapeKeyHandler.bind(null, newMessage);
      document.addEventListener('keydown', successEscapeKeyHandler);
      document.body.appendChild(newMessage);
    } else {
      const newMessage = errorMessage.cloneNode(true);
      const errorButton = newMessage.querySelector('.error__button');
      errorButton.addEventListener('click', () => {
        newMessage.remove();
        openImgUpload();
      });
      const errorEscapeKeyHandler = EscapeKeyHandler.bind(null, newMessage);
      document.addEventListener('keydown', errorEscapeKeyHandler);
      document.body.appendChild(newMessage);
    }
    callBackfunc(response.ok);
  });
}
export {sendData};
