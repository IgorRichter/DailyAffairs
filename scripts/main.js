var t=document.querySelector(".sidebar__button"),o=document.querySelector(".sidebar"),n=document.querySelector(".dropdown-menu"),s=document.querySelector(".dropdown-menu__item--arrow"),c=document.querySelector(".dropdown-menu__submenu"),r=document.querySelector(".sidebar__user-button");t.addEventListener("click",()=>{o.classList.toggle("sidebar--open")});r.addEventListener("click",()=>{n.classList.toggle("dropdown-menu--open")});s.addEventListener("click",()=>{c.classList.toggle("dropdown-menu__submenu--open")});document.addEventListener("click",e=>{!o.contains(e.target)&&!t.contains(e.target)&&o.classList.remove("sidebar--open"),!n.contains(e.target)&&!r.contains(e.target)&&n.classList.remove("dropdown-menu--open")});