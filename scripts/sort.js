function c(t){let r=t.trim().split(" "),e=parseInt(r[0]),o=_(r[1]),s=new Date().getFullYear();return new Date(s,o,e)}function _(t){return{\u042F\u043D\u0432\u0430\u0440\u044C:0,\u0424\u0435\u0432\u0440\u0430\u043B\u044C:1,\u041C\u0430\u0440\u0442:2,\u0410\u043F\u0440\u0435\u043B\u044C:3,\u041C\u0430\u0439:4,\u0418\u044E\u043D\u044C:5,\u0418\u044E\u043B\u044C:6,\u0410\u0432\u0433\u0443\u0441\u0442:7,\u0421\u0435\u043D\u0442\u044F\u0431\u0440\u044C:8,\u041E\u043A\u0442\u044F\u0431\u0440\u044C:9,\u041D\u043E\u044F\u0431\u0440\u044C:10,\u0414\u0435\u043A\u0430\u0431\u0440\u044C:11}[t]}var l=document.querySelector(".dashboard__select-control"),i=document.querySelector(".dashboard .list-with-tasks__wrapper"),a=document.querySelector(".tasks .list-with-tasks__wrapper");l.addEventListener("change",function(){let t=l.value;t==="priority"?y(i):t==="name"?p(i):f(i)});var d=document.querySelector(".tasks__select-control");d.addEventListener("change",function(){let t=d.value;t==="priority"?y(a):t==="name"?p(a):t==="date"?h(a):f(a)});function y(t){let r=Array.from(t.querySelectorAll("li"));r.sort((e,o)=>{let s=u(e.querySelector(".task__circle")),n=u(o.querySelector(".task__circle"));return s-n}),r.forEach(e=>t.appendChild(e))}function p(t){let r=Array.from(t.querySelectorAll("li"));r.sort((e,o)=>{let s=e.querySelector(".task__title").textContent.toLowerCase(),n=o.querySelector(".task__title").textContent.toLowerCase();return s.localeCompare(n)}),r.forEach(e=>t.appendChild(e))}function f(t){let r=Array.from(t.querySelectorAll("li"));r.sort((e,o)=>{let s=parseInt(e.dataset.order),n=parseInt(o.dataset.order);return s-n}),r.forEach(e=>t.appendChild(e))}function h(t){let r=Array.from(t.querySelectorAll("li"));r.sort((e,o)=>{let s=c(e.querySelector(".task__data").textContent),n=c(o.querySelector(".task__data").textContent);return s-n}),r.forEach(e=>t.appendChild(e))}function u(t){let r={"task__circle--priority1":1,"task__circle--priority2":2,"task__circle--priority3":3,task__circle:4},e=Array.from(t.classList).find(o=>o.startsWith("task__circle--priority"));return e?r[e]:r.task__circle}
