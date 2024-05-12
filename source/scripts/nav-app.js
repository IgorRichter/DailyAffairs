import { sidebar, newItems } from './const.js';
import { updateTasksList } from './task-types-sort.js';
import { updateTasksVisibility } from './data-sort.js';

const sidebarItem = document.querySelectorAll('.nav__item a');
const sidebarLinks = document.querySelectorAll('.nav__link');
const headerTitle = document.querySelector('.app-header__title');
const managerItems = document.querySelectorAll('.manager-item');

sidebarItem.forEach(link => {
    link.addEventListener('click', event => {

      event.preventDefault();

      managerItems.forEach(managerItem => {
          managerItem.innerHTML = '';
      });

      const tasksButtons = document.querySelectorAll('.tasks__header-button');
      tasksButtons.forEach(button => {
        button.classList.remove('tasks__header-button--active');

        if (button.textContent.trim() === 'Активные') {
          button.classList.add('tasks__header-button--active');
        }

        const selectedButton = document.querySelector('.tasks__header-button--active').textContent.trim();
        updateTasksList(selectedButton);
      });

      updateTasksVisibility();

      const taskItems = document.querySelectorAll('.task');
      const projectItems = document.querySelectorAll('.project');

      taskItems.forEach(taskItem => {
        taskItem.classList.remove("task--edit");
      });

      projectItems.forEach(project => {
        project.classList.remove("project--edit");
      });

      newItems.forEach(newItem => {
          newItem.classList.remove('new-item--disabled');
      });

      sidebarLinks.forEach(link => {
          link.classList.remove('nav__link--active');
      });
      
      link.classList.add('nav__link--active');
      sidebar.classList.remove('sidebar--open');
      
      const linkText = link.textContent;
      headerTitle.textContent = linkText;

      const sectionId = link.getAttribute('data-section');
      
      const sections = document.querySelectorAll('.section');
      for (var i = 0; i < sections.length; i++) {
        sections[i].style.display = 'none';
      }

      const selectedSection = document.getElementById(sectionId);
      if (selectedSection) {
        selectedSection.style.display = 'block';
      }
    });
});
