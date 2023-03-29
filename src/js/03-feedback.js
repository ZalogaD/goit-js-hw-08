import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';
let formData = {};

const refs = {
  form: document.querySelector('.feedback-form'),
};

refs.form.addEventListener('submit', onFormSubmit);
refs.form.addEventListener('input', throttle(onTextareaInput, 500));

populateTextarea();

function onFormSubmit(e) {
  e.preventDefault();
  const inputs = refs.form.querySelectorAll('input[type="text"], textarea');
  let isFormValid = true;

  inputs.forEach(input => {
    if (!input.value.trim()) {
      isFormValid = false;
    }
  });

  if (isFormValid) {
    localStorage.removeItem(STORAGE_KEY);
    e.currentTarget.reset();
    console.log(formData);
    formData = {};
  } else {
    alert('Please fill in all fields before submitting the form');
  }
}

function onTextareaInput(e) {
  formData[e.target.name] = e.target.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function populateTextarea() {
  const savedFormData = localStorage.getItem(STORAGE_KEY);

  if (savedFormData) {
    formData = JSON.parse(savedFormData);

    Object.entries(formData).forEach(([name, value]) => {
      refs.form.elements[name].value = value;
    });
  }
}