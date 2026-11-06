const fields = (form) => Array.from(form.querySelectorAll('.popup__input'));

const validateInput = (input) => {
  input.setCustomValidity('');
  if (input.value && input.value.trim().length === 0) {
    input.setCustomValidity('Введите текст.');
  } else if (input.type === 'url' && input.value && !/^https?:\/\//i.test(input.value)) {
    input.setCustomValidity('Введите ссылку, начинающуюся с http:// или https://.');
  } else if (input.minLength > 0 && input.value && input.value.trim().length < input.minLength) {
    input.setCustomValidity(`Введите не менее ${input.minLength} символов.`);
  }
};

export const updateSubmitButton = (form) => {
  fields(form).forEach(validateInput);
  form.querySelector('[type="submit"]').disabled =
    form.dataset.submitting === 'true' || fields(form).some((input) => !input.validity.valid);
};

export const clearValidation = (form) => {
  form.querySelector('.popup__error').textContent = '';
  fields(form).forEach((input) => {
    input.setCustomValidity('');
    input.classList.remove('popup__input_type_error');
    input.setAttribute('aria-invalid', 'false');
    form.querySelector(`#${input.id}-error`).textContent = '';
  });
  updateSubmitButton(form);
};

export const enableValidation = () => {
  document.querySelectorAll('.popup__form').forEach((form) => {
    fields(form).forEach((input) => {
      input.setAttribute('aria-describedby', `${input.id}-error`);
      input.addEventListener('input', () => {
        validateInput(input);
        input.classList.toggle('popup__input_type_error', !input.validity.valid);
        input.setAttribute('aria-invalid', String(!input.validity.valid));
        form.querySelector(`#${input.id}-error`).textContent = input.validationMessage;
        form.querySelector('.popup__error').textContent = '';
        updateSubmitButton(form);
      });
    });
    updateSubmitButton(form);
  });
};
