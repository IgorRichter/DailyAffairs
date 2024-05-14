import { newItems } from './const.js';

function navigateToProjectTasks(event) {
  const projectSection = document.querySelector('.projects');
  const projectTaskSection = document.querySelector('.projects-task');
  const headerTitle = document.querySelector('.app-header__title');
  const projectTitle = event.target.closest('.project').querySelector('.project__title').textContent;
  const projectTasks = document.querySelectorAll('.list-with-tasks__wrapper .task');
  updateTaskListByProject();
  
  const selectedProjectTasks = document.querySelectorAll(`.list-with-tasks__wrapper .task[data-project="${projectTitle}"]`);
  selectedProjectTasks.forEach(task => {
    task.classList.remove('task--hidden');
  });

  projectTasks.forEach(task => {
    if (task.classList.contains('task--expired') || task.classList.contains('task--completed')) {
        task.classList.add('task--hidden');
    }
  });

  projectSection.style.display = 'none';
  projectTaskSection.style.display = 'block';

  projectTaskSection.dataset.project = projectTitle;

  let existingText =  "Проекты / " + projectTitle.slice(0, 20) + (projectTitle.length > 17 ? '...' : '');

  headerTitle.textContent = existingText;

  const backButton = document.querySelector('.button-back');
  backButton.classList.remove('tasks__header-button--active');
}


function navigateBackToProjects() {
  const projectSection = document.querySelector('.projects');
  const projectTaskSection = document.querySelector('.projects-task');
  const headerTitle = document.querySelector('.app-header__title');
  const projectTitles = document.querySelectorAll('.project__title');
  const managerItems = document.querySelectorAll('.manager-item');
  
  managerItems.forEach(managerItem => {
    managerItem.innerHTML = '';
  });

  newItems.forEach(newItem => {
    newItem.classList.remove('new-item--disabled');
  })

  projectTaskSection.style.display = 'none';
  projectSection.style.display = 'block';

  let existingText = headerTitle.textContent;

  projectTitles.forEach((projectTitle, index) => {
    const projectName = projectTitle.textContent;
    const truncatedProjectName = projectName.slice(0, 20) + (projectName.length > 17 ? '...' : '');
    if (index === 0) {
      existingText = existingText.replace("/ " + projectName, "");
      existingText = existingText.replace("/ " + truncatedProjectName, "");
    } else if (existingText.includes(" / " + projectName)) {
      existingText = existingText.replace(" / " + projectName, "");
      existingText = existingText.replace(" / " + truncatedProjectName, "");
    }
  });

  headerTitle.textContent = existingText;
}

function updateTaskListByProject() {
  const projectTitle = event.target.closest('.project').querySelector('.project__title').textContent;
  const projectTasks = document.querySelectorAll('.list-with-tasks__wrapper .task');
  
  projectTasks.forEach(task => {
    task.classList.add('task--hidden');
  });
  
  const selectedProjectTasks = document.querySelectorAll(`.list-with-tasks__wrapper .task[data-project="${projectTitle}"]`);
  selectedProjectTasks.forEach(task => {
    task.classList.remove('task--hidden');
  });
}

export { navigateToProjectTasks, navigateBackToProjects, updateTaskListByProject };