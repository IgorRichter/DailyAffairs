import { onDocumentKeydown } from './utils.js';
import { CalendarControl } from './calendar.js';

function attachEventToTextarea() {
  const textareas = document.querySelectorAll('.editor');

  textareas.forEach(textarea => {
    textarea.addEventListener('input', () => {
        textarea.style.height = 'auto';
        textarea.style.height = textarea.scrollHeight + 'px';
    });
});
}

function attachEventToPriorityInput() {
  const textareas = document.querySelectorAll('.editor');
  const dateInput = document.getElementById("dateInput");
  const calendar = document.querySelector(".calendar");
  const priorityInput = document.getElementById('priorityInput');
  const priorityLabel = document.querySelector('.task-editor__priority-label');
  const popupPriority = document.querySelector('.popup-priority');
  const priorityItems = document.querySelectorAll('.popup-priority__item');
  const projectInput = document.getElementById('projectInput');
  const popupProject = document.querySelector('.popup-project');
  const popupProjectList = document.querySelector('.popup-project__list');
  const emptyMessage = document.querySelector('.popup-project__list-empty');
  const calendarControl = new CalendarControl();
  
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
  
  const today = new Date();
  const day = today.getDate();
  const monthNames = ["января", "февраля", "марта", "апреля", "мая", "июня",
                        "июля", "августа", "сентября", "октября", "ноября", "декабря"];
  const monthIndex = today.getMonth();
  const month = monthNames[monthIndex];
  dateInput.value = `${day} ${month}`;

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
    addProjectItems();
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

  function addProjectItems() {
    const projectListWrapper = document.querySelector('.projects__list-wrapper');
    const projects = projectListWrapper.querySelectorAll('.project__title');

    popupProjectList.innerHTML = '';

    projects.forEach(project => {
        const projectItem = document.createElement('li');
        projectItem.classList.add('popup-project__item');

        // Создание span для текста и добавление его в элемент li
        const span = document.createElement('span');
        span.textContent = project.textContent.trim();
        projectItem.appendChild(span);

        // Добавление элемента li в список
        popupProjectList.appendChild(projectItem);

        projectItem.addEventListener('click', function() {
            const projectValue = projectItem.textContent.trim();
            projectInput.value = projectValue;
            projectPopupClose();
        });
    });

    checkProjectList();
}

function checkProjectList() {
    const projectListItems = document.querySelectorAll('.popup-project__list li');

    if (projectListItems.length === 0) {
        emptyMessage.style.display = 'block';
    } else {
        emptyMessage.style.display = 'none';
    }
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
}

export { attachEventToPriorityInput, attachEventToTextarea };