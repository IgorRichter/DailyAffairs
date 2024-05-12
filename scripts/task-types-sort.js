var _=document.querySelector(".button-date"),k=_.querySelector(".button-date__title"),f=_.querySelector(".button-date__arrow--left"),p=_.querySelector(".button-date__arrow--right"),x=document.querySelector(".dashboard .list-with-tasks__wrapper"),r=new Date;h();m();p.addEventListener("click",function(){p.classList.contains("button-date__arrow--disabled")||(r.setDate(r.getDate()+1),h(),m())});f.addEventListener("click",function(){f.classList.contains("button-date__arrow--disabled")||(r.setDate(r.getDate()-1),h(),m())});function h(){let t=new Date,e=new Date(t);e.setDate(e.getDate()+1),u(r,t)?k.textContent="\u0421\u0435\u0433\u043E\u0434\u043D\u044F":u(r,e)?k.textContent="\u0417\u0430\u0432\u0442\u0440\u0430":k.textContent=q(r),v()}function v(){let t=new Date,e="button-date__arrow--disabled";f.classList.toggle(e,u(r,t)),p.classList.toggle(e,w(r,t))}function m(){let t=x.querySelectorAll(".task"),e=/(\d+)\s+(\S+)/;t.forEach(s=>{let a=s.querySelector(".task__data").textContent;if(a.trim()==="\u0411\u0435\u0437 \u0441\u0440\u043E\u043A\u0430"){s.classList.add("task--hidden");return}if(s.classList.contains("task--completed")){s.classList.add("task--hidden");return}let[,i,c]=a.match(e),n=new Date(r.getFullYear(),y(c),parseInt(i));u(r,n)?s.classList.remove("task--hidden"):s.classList.add("task--hidden")})}function q(t){let e={weekday:"long",month:"long",day:"numeric"};return t.toLocaleDateString("ru-RU",e)}function u(t,e){return t.getFullYear()===e.getFullYear()&&t.getMonth()===e.getMonth()&&t.getDate()===e.getDate()}function w(t,e){let s=new Date(e.getFullYear(),e.getMonth(),e.getDate()+7);return t>=s}function y(t){return["\u042F\u043D\u0432","\u0424\u0435\u0432","\u041C\u0430\u0440","\u0410\u043F\u0440","\u041C\u0430\u0439","\u0418\u044E\u043D","\u0418\u044E\u043B","\u0410\u0432\u0433","\u0421\u0435\u043D","\u041E\u043A\u0442","\u041D\u043E\u044F","\u0414\u0435\u043A"].indexOf(t)}var g=document.querySelectorAll(".tasks__header-button"),L=document.querySelector(".tasks .list-with-tasks__wrapper");g.forEach(t=>{t.addEventListener("click",function(){g.forEach(e=>e.classList.remove("tasks__header-button--active")),t.classList.add("tasks__header-button--active"),S(t.textContent.trim())})});function S(t){L.querySelectorAll(".task").forEach(s=>{t==="\u0417\u0430\u0432\u0435\u0440\u0448\u0435\u043D\u043D\u044B\u0435"?s.classList.contains("task--completed")?s.classList.remove("task--hidden"):s.classList.add("task--hidden"):t==="\u0410\u043A\u0442\u0438\u0432\u043D\u044B\u0435"?s.classList.contains("task--completed")||s.classList.contains("task--expired")?s.classList.add("task--hidden"):s.classList.remove("task--hidden"):t==="\u041F\u0440\u043E\u0441\u0440\u043E\u0447\u0435\u043D\u043D\u044B\u0435"&&(s.classList.contains("task--expired")?s.classList.remove("task--hidden"):s.classList.add("task--hidden"))})}function D(t){let e=t.querySelector(".task__title"),s=t.dataset.id;t.classList.add("task--completed");let a=document.createElement("s");a.textContent=e.textContent,e.textContent="",e.appendChild(a),t.querySelector(".task__circle svg").querySelector("use").setAttribute("href","icons/stack.svg#arrow-back"),t.style.transition="opacity 0.3s ease",t.style.opacity="0",setTimeout(()=>{t.classList.add("task--completed","task--hidden"),t.style.transition="",t.style.opacity=""},300),document.querySelectorAll('.list-with-tasks__wrapper .task[data-id="'+s+'"]').forEach(n=>{n.classList.add("task--completed");let o=n.querySelector(".task__title");if(!o.querySelector("s")){let d=document.createElement("s");d.textContent=o.textContent,o.textContent="",o.appendChild(d)}if(n.querySelector(".task__circle svg").querySelector("use").setAttribute("href","icons/stack.svg#arrow-back"),n.classList.contains("task--expired")){n.classList.remove("task--expired");let d=n.querySelector(".task__info-expired");d&&d.remove()}})}function E(){document.querySelectorAll(".button-complete-task").forEach(e=>{e.addEventListener("click",function(s){let a=s.target.closest(".task");a.classList.contains("task--completed")?b(a):D(a)})})}function b(t){let e=t.querySelector(".task__title s");e&&(e.parentNode.textContent=e.textContent),t.classList.remove("task--completed"),t.querySelector(".task__circle svg").querySelector("use").setAttribute("href","icons/stack.svg#checkmark");let a=t.dataset.id;document.querySelectorAll('.list-with-tasks__wrapper .task[data-id="'+a+'"]').forEach(n=>{let o=n.querySelector(".task__title s");o&&(o.parentNode.textContent=o.textContent),n.classList.remove("task--completed"),n.querySelector(".task__circle svg").querySelector("use").setAttribute("href","icons/stack.svg#checkmark")});let c=document.querySelector(".tasks__header-button--active").textContent.trim();S(c),C()}function C(){let t=L.querySelectorAll(".task"),e=new Date;e.setHours(0,0,0,0),t.forEach(s=>{let a=s.querySelector(".task__data").textContent.trim();if(a==="\u0411\u0435\u0437 \u0441\u0440\u043E\u043A\u0430"){s.classList.add("task--hidden");return}let[,i,c]=a.match(/(\d+)\s+(\S+)/);if(new Date(e.getFullYear(),y(c),parseInt(i)).getTime()<e.getTime()){s.classList.add("task--expired");let o=s.querySelector(".task__info-wrapper");if(!o.querySelector(".task__info-expired")){let l=document.createElement("span");l.classList.add("task__info-expired"),l.textContent="\u0417\u0430\u0434\u0430\u0447\u0430 \u043F\u0440\u043E\u0441\u0440\u043E\u0447\u0435\u043D\u0430",o.insertBefore(l,o.firstChild)}document.querySelector(".tasks__header-button--active").textContent!=="\u041F\u0440\u043E\u0441\u0440\u043E\u0447\u0435\u043D\u043D\u044B\u0435"&&s.classList.add("task--hidden")}else{s.classList.remove("task--expired");let o=s.querySelector(".task__info-expired");o&&o.remove()}})}export{E as setupCompleteTaskButtons,C as updateExpiredTasks,S as updateTasksList};
