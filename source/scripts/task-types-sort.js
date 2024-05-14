import { getMonthIndex } from './data-sort.js';

const taskButtons = document.querySelectorAll('.tasks__header-button');
const tasksWrapper = document.querySelector('.tasks .list-with-tasks__wrapper');

taskButtons.forEach(button => {
    button.addEventListener('click', function () {
        taskButtons.forEach(btn => btn.classList.remove('tasks__header-button--active'));
        button.classList.add('tasks__header-button--active');
        updateTasksList(button.textContent.trim());
    });
});


function updateTasksList(selectedButton) {
  const tasks = tasksWrapper.querySelectorAll('.task');
  tasks.forEach(task => {
      if (selectedButton === "Завершенные") {
          if (task.classList.contains('task--completed')) {
              task.classList.remove('task--hidden');
          } else {
              task.classList.add('task--hidden');
          }
      } else if (selectedButton === "Активные") {
          if (task.classList.contains('task--completed') || task.classList.contains('task--expired')) {
              task.classList.add('task--hidden');
          } else {
              task.classList.remove('task--hidden');
          }
      } else if (selectedButton === "Просроченные") {
          if (task.classList.contains('task--expired')) {
              task.classList.remove('task--hidden');
          } else {
              task.classList.add('task--hidden');
          }
      }
  });
}


function completeTask(taskElement) {
  const taskTitle = taskElement.querySelector('.task__title');
  const taskId = taskElement.dataset.id;
  
  taskElement.classList.add('task--completed');
  const strikeElement = document.createElement('s');
  strikeElement.textContent = taskTitle.textContent;
  taskTitle.textContent = '';
  taskTitle.appendChild(strikeElement);
  
  const svg = taskElement.querySelector('.task__circle svg');
  svg.querySelector('use').setAttribute('href', 'icons/stack.svg#arrow-back');

  taskElement.style.transition = 'opacity 0.3s ease';
  taskElement.style.opacity = '0';
  setTimeout(() => {
      taskElement.classList.add('task--completed', 'task--hidden');
      taskElement.style.transition = '';
      taskElement.style.opacity = '';
  }, 300);

  const otherListTasks = document.querySelectorAll('.list-with-tasks__wrapper .task[data-id="' + taskId + '"]');
  otherListTasks.forEach(otherTask => {
      otherTask.classList.add('task--completed');
      const otherTaskTitle = otherTask.querySelector('.task__title');
      if (!otherTaskTitle.querySelector('s')) {
          const otherStrikeElement = document.createElement('s');
          otherStrikeElement.textContent = otherTaskTitle.textContent;
          otherTaskTitle.textContent = '';
          otherTaskTitle.appendChild(otherStrikeElement);
      }
      const otherSvg = otherTask.querySelector('.task__circle svg');
      otherSvg.querySelector('use').setAttribute('href', 'icons/stack.svg#arrow-back');

      if (otherTask.classList.contains('task--expired')) {
        otherTask.classList.remove('task--expired');
        const otherExpiredInfo = otherTask.querySelector('.task__info-expired');
        if (otherExpiredInfo) {
            otherExpiredInfo.remove();
        }
    }
  });
}

function setupCompleteTaskButtons() {
  const buttonsComplete = document.querySelectorAll('.button-complete-task');
  buttonsComplete.forEach(button => {
      button.addEventListener('click', function (event) {
          const taskElement = event.target.closest('.task');
          if (taskElement.classList.contains('task--completed')) {
              uncompleteTask(taskElement);
          } else {
              completeTask(taskElement);
          }
      });
  });
}

function uncompleteTask(taskElement) {
  const taskTitle = taskElement.querySelector('.task__title s');
  if (taskTitle) {
      taskTitle.parentNode.textContent = taskTitle.textContent;
  }
  taskElement.classList.remove('task--completed');

  const svg = taskElement.querySelector('.task__circle svg');
  svg.querySelector('use').setAttribute('href', 'icons/stack.svg#checkmark');

  const taskId = taskElement.dataset.id;
  const otherListTasks = document.querySelectorAll('.list-with-tasks__wrapper .task[data-id="' + taskId + '"]');
  otherListTasks.forEach(otherTask => {
      const otherTaskTitle = otherTask.querySelector('.task__title s');
      if (otherTaskTitle) {
          otherTaskTitle.parentNode.textContent = otherTaskTitle.textContent;
      }
      otherTask.classList.remove('task--completed');
      const otherSvg = otherTask.querySelector('.task__circle svg');
      otherSvg.querySelector('use').setAttribute('href', 'icons/stack.svg#checkmark');
  });

  const activeButton = document.querySelector('.tasks__header-button--active');
  if (activeButton) {
    const selectedButton = activeButton.textContent.trim();
    updateTasksList(selectedButton);
  }
  updateExpiredTasks();
}

function updateExpiredTasks() {
  const tasks = tasksWrapper.querySelectorAll('.task');
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  tasks.forEach(task => {
      const taskDataText = task.querySelector('.task__data').textContent.trim();
      
      if (taskDataText === "Без срока") {
          task.classList.add('task--hidden');
          return;
      }
      
      const [, day, month] = taskDataText.match(/(\d+)\s+(\S+)/);
      const taskDate = new Date(today.getFullYear(), getMonthIndex(month), parseInt(day));

      if (taskDate.getTime() < today.getTime()) {
          task.classList.add('task--expired');
          const infoWrapper = task.querySelector('.task__info-wrapper');
          if (!infoWrapper.querySelector('.task__info-expired')) {
              const expiredInfo = document.createElement('span');
              expiredInfo.classList.add('task__info-expired');
              expiredInfo.textContent = 'Задача просрочена';
              infoWrapper.insertBefore(expiredInfo, infoWrapper.firstChild);
          }
          const activeButtonElement = document.querySelector('.tasks__header-button--active');
          if (activeButtonElement && activeButtonElement.textContent !== "Просроченные") {
              task.classList.add('task--hidden');
          }
      } else {
          task.classList.remove('task--expired');
          const expiredInfo = task.querySelector('.task__info-expired');
          if (expiredInfo) {
              expiredInfo.remove();
          }
      }
  });
}


export { updateExpiredTasks, updateTasksList, setupCompleteTaskButtons}