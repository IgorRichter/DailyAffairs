import { onDocumentKeydown } from './utils.js';

const textareas = document.querySelectorAll('.editor');
const dateInput = document.getElementById("dateInput");
const calendar = document.querySelector(".calendar");
const priorityInput = document.getElementById('priorityInput');
const priorityLabel = document.querySelector('.task-editor__priority-label');
const popupPriority = document.querySelector('.popup-priority');
const priorityItems = document.querySelectorAll('.popup-priority__item');
const projectInput = document.getElementById('projectInput');
const popupProject = document.querySelector('.popup-project');
const projectItems = document.querySelectorAll('.popup-project__item');

textareas.forEach(textarea => {
    textarea.addEventListener('input', () => {
        textarea.style.height = 'auto';
        textarea.style.height = textarea.scrollHeight + 'px';
    });
});

function togglePopup(popup, openFunction, closeFunction) {
  return function(event) {
    event.stopPropagation();
    (popup.classList.contains('task-editor__popup--open')) ? closeFunction() : openFunction();
  };
}

priorityInput.addEventListener('click', togglePopup(popupPriority, priorityPopupOpen, priorityPopupClose));

projectInput.addEventListener('click', togglePopup(popupProject, projectPopupOpen, projectPopupClose));

priorityItems.forEach(function(item) {
  item.addEventListener('click', function() {
    
    const priorityValue = item.textContent.trim();

    priorityInput.value = priorityValue;

    priorityLabel.classList.remove('task-editor__priority-label--priority1', 'task-editor__priority-label--priority2', 'task-editor__priority-label--priority3');

    switch (priorityValue) {
      case 'Срочно':
      priorityLabel.classList.add('task-editor__priority-label--priority1');
        break;
      case 'Важно':
      priorityLabel.classList.add('task-editor__priority-label--priority2');
        break;
      case 'Второстепенно':
      priorityLabel.classList.add('task-editor__priority-label--priority3');
        break;
      default:
        break;
    }

    priorityPopupClose();
  });
});

projectItems.forEach(function(item) {
  item.addEventListener('click', function() {
    const projectValue = item.textContent.trim();
    projectInput.value = projectValue;
    projectPopupClose();
  });
});

dateInput.addEventListener("click", () => {
  (calendar.style.display === "block") ? calendarClose() : calendarOpen();
});

calendar.addEventListener("click", function(event) {
  if (event.target.classList.contains("dateNumber")) {
    const selectedDate = event.target.textContent.trim();
    const currentMonth = calendar.querySelector(".calendar-month-label").textContent.trim();
    dateInput.value = `${selectedDate} ${currentMonth}`;
    calendarClose()
  }
});

const closePriorityPopuprHandler = onDocumentKeydown(priorityPopupClose);
const closeProjectPopuprHandler = onDocumentKeydown(projectPopupClose);
const closeCalendarHandler = onDocumentKeydown(calendarClose);

function closeAllPopups() {
  calendarClose();
  priorityPopupClose();
  projectPopupClose();
}

function openPopup(popup, closeHandler) {
  closeAllPopups();
  popup.classList.add('task-editor__popup--open');
  document.addEventListener('keydown', closeHandler);
}

function closePopup(popup, closeHandler) {
  popup.classList.remove('task-editor__popup--open');
  document.removeEventListener('keydown', closeHandler);
}

function priorityPopupOpen() {
  openPopup(popupPriority, closePriorityPopuprHandler);
}

function priorityPopupClose() {
  closePopup(popupPriority, closePriorityPopuprHandler);
}

function projectPopupOpen() {
  openPopup(popupProject, closeProjectPopuprHandler);
}

function projectPopupClose() {
  closePopup(popupProject, closeProjectPopuprHandler);
}

function calendarOpen() {
  closeAllPopups();
  calendar.style.display = "block";
  document.addEventListener('keydown', closeCalendarHandler);
}

function calendarClose() {
  calendar.style.display = "none";
  document.removeEventListener('keydown', closeCalendarHandler);
}

document.addEventListener("click", function(event) {
  if (!popupPriority.contains(event.target) && event.target !== priorityInput) {
    priorityPopupClose();
  }
  
  if (!popupProject.contains(event.target) && event.target !== projectInput) {
    projectPopupClose();
  }
  
  if (!calendar.contains(event.target) && event.target !== dateInput) {
    calendarClose();
  }
});