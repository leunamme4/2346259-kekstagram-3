function checkForm(form) {
  const pristine = new Pristine(form);
  return (pristine.validate());
}

export {checkForm};
