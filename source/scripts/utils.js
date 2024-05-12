// События

const isEscapeKey = (evt) => evt.key === 'Escape';

const onDocumentKeydown = (callback) => (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    callback();
  }
};

// Генерация

function generateUniqueId() {
  return Math.random().toString(36).substr(2, 9);
}

const generateUniqueOrder = (function() {
  let currentNumber = 0;
  return function() {
      currentNumber++;
      return currentNumber;
  };
})();

const getTodayDate = () => {
  const today = new Date();
  const day = today.getDate();
  const monthNames = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
                      "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];
  const monthIndex = today.getMonth();
  const month = monthNames[monthIndex];
  return `${day} ${month}`;
};

// Валидация

function validateInput(inputElement, maxLength, errorElement, errorMessage, submitButton) {
  const inputValue = inputElement.value.trim();

  if (inputValue.length > maxLength) {
      errorElement.textContent = errorMessage;
      inputElement.classList.add('has-error');
      submitButton.disabled = true;
  } else {
      errorElement.textContent = '';
      inputElement.classList.remove('has-error');
      submitButton.disabled = false;
  }
}

function updateSubmitButtonAvailability(titleField, descriptionField, submitButton) {
  const isTitleFieldFilled = titleField.value.trim() !== '';
  const isTitleFieldValid = !titleField.classList.contains('has-error');
  const isDescriptionFieldValid = !descriptionField.classList.contains('has-error');
  submitButton.disabled = !isTitleFieldFilled || !isTitleFieldValid || !isDescriptionFieldValid;
}

// Дата 

function parseDate(dateString) {
  const dateParts = dateString.trim().split(' ');
  const day = parseInt(dateParts[0]);
  const month = parseMonth(dateParts[1]);
  const currentYear = new Date().getFullYear();
  return new Date(currentYear, month, day);
}

function parseMonth(monthString) {
  const months = {
      'Январь': 0,
      'Февраль': 1,
      'Март': 2,
      'Апрель': 3,
      'Май': 4,
      'Июнь': 5,
      'Июль': 6,
      'Август': 7,
      'Сентябрь': 8,
      'Октябрь': 9,
      'Ноябрь': 10,
      'Декабрь': 11
  };
  return months[monthString];
}

export { isEscapeKey, onDocumentKeydown, generateUniqueId, getTodayDate, validateInput, updateSubmitButtonAvailability, generateUniqueOrder, parseDate };