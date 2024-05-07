import { sidebar, newItems } from './const.js';

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
