const button = document.querySelector('.button-date');
const titleSpan = button.querySelector('.button-date__title');
const leftArrow = button.querySelector('.button-date__arrow--left');
const rightArrow = button.querySelector('.button-date__arrow--right');
const tasksWrapper = document.querySelector('.dashboard .list-with-tasks__wrapper');

let currentDate = new Date();
updateTitle();
updateTasksVisibility();

rightArrow.addEventListener('click', function () {
    if (!rightArrow.classList.contains('button-date__arrow--disabled')) {
        currentDate.setDate(currentDate.getDate() + 1);
        updateTitle();
        updateTasksVisibility();
    }
});

leftArrow.addEventListener('click', function () {
    if (!leftArrow.classList.contains('button-date__arrow--disabled')) {
        currentDate.setDate(currentDate.getDate() - 1);
        updateTitle();
        updateTasksVisibility();
    }
});

function updateTitle() {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    if (isSameDay(currentDate, today)) {
        titleSpan.textContent = "Сегодня";
    } else if (isSameDay(currentDate, tomorrow)) {
        titleSpan.textContent = "Завтра";
    } else {
        titleSpan.textContent = formatDate(currentDate);
    }
    
    updateArrows();
}

function updateArrows() {
    const today = new Date();
    const disabledClass = 'button-date__arrow--disabled';
    leftArrow.classList.toggle(disabledClass, isSameDay(currentDate, today));
    rightArrow.classList.toggle(disabledClass, isLastDay(currentDate, today));
}

function updateTasksVisibility() {
  const tasks = tasksWrapper.querySelectorAll('.task');
  const taskDateRegex = /(\d+)\s+(\S+)/;

  tasks.forEach(task => {
      const taskDateText = task.querySelector('.task__data').textContent;

      if (taskDateText.trim() === "Без срока") {
          task.classList.add('task--hidden');
          return;
      }

      if (task.classList.contains('task--completed')) {
        task.classList.add('task--hidden');
        return;
    }
      
      const [, day, month] = taskDateText.match(taskDateRegex);
      const taskDate = new Date(currentDate.getFullYear(), getMonthIndex(month), parseInt(day));

      if (isSameDay(currentDate, taskDate)) {
          task.classList.remove('task--hidden');
      } else {
          task.classList.add('task--hidden');
      }
  });
}

function formatDate(date) {
    const options = { weekday: 'long', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('ru-RU', options);
}

function isSameDay(date1, date2) {
    return date1.getFullYear() === date2.getFullYear() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getDate() === date2.getDate();
}

function isLastDay(date, today) {
    const lastAvailableDay = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7);
    return date >= lastAvailableDay;
}

function getMonthIndex(monthName) {
    const months = ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июнь', 'Июль', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'];
    return months.indexOf(monthName);
}

export { updateTasksVisibility, getMonthIndex };
