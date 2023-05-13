import { getDataLink, uploadDataLink } from './data.js';

function getData(showSuccess) {
  return fetch(getDataLink).then((response) => response.json()).then((data) => {
    showSuccess(data);
  });
}

function sendData(body, showSuccess, showError, getFinal = () => {}) {
  return fetch(uploadDataLink, {
    method: 'POST',
    body,
  }).then((response) => {
    if (response.ok) {
      showSuccess();
    } else {
      showError();
    }
  }).finally(() => getFinal());
}

export {getData, sendData};
