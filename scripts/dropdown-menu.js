var t=document.querySelector(".sidebar__button"),e=document.querySelector(".sidebar"),n=document.querySelector(".dropdown-menu"),d=document.querySelector(".dropdown-menu__item--arrow"),r=document.querySelector(".dropdown-menu__submenu"),s=document.querySelector(".sidebar__user-button");t.addEventListener("click",()=>{e.classList.toggle("sidebar--open"),document.body.style.overflow=e.classList.contains("sidebar--open")?"hidden":"auto"});s.addEventListener("click",()=>{n.classList.toggle("dropdown-menu--open")});d.addEventListener("click",()=>{r.classList.toggle("dropdown-menu__submenu--open")});document.addEventListener("click",o=>{!e.contains(o.target)&&!t.contains(o.target)&&(e.classList.remove("sidebar--open"),document.body.style.overflow=e.classList.contains("sidebar--open")?"hidden":"auto"),!n.contains(o.target)&&!s.contains(o.target)&&n.classList.remove("dropdown-menu--open")});
