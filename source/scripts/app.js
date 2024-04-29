const toggleButton = document.querySelector('.sidebar__button');
const sidebar = document.querySelector('.sidebar');
const dropDownMenu = document.querySelector('.dropdown-menu');
const dropDownMenuLun = document.querySelector('.dropdown-menu__item--arrow');
const submenu = document.querySelector('.dropdown-menu__submenu');
const userButton = document.querySelector('.sidebar__user-button');

toggleButton.addEventListener('click', () => {
  sidebar.classList.toggle('sidebar--open');
});

userButton.addEventListener('click', () => {
  dropDownMenu.classList.toggle('dropdown-menu--open');
});

dropDownMenuLun.addEventListener('click', () => {
  submenu.classList.toggle('dropdown-menu__submenu--open');
});

document.addEventListener('click', (event) => {
  if (!sidebar.contains(event.target) && !toggleButton.contains(event.target)) {
    sidebar.classList.remove('sidebar--open');
  }
  
  if (!dropDownMenu.contains(event.target) && !userButton.contains(event.target)) {
    dropDownMenu.classList.remove('dropdown-menu--open');
  }
});