var S=document.querySelector(".button-date"),h=S.querySelector(".button-date__title"),_=S.querySelector(".button-date__arrow--left"),y=S.querySelector(".button-date__arrow--right"),E=document.querySelector(".dashboard .list-with-tasks__wrapper"),r=new Date;g();x();y.addEventListener("click",function(){y.classList.contains("button-date__arrow--disabled")||(r.setDate(r.getDate()+1),g(),x())});_.addEventListener("click",function(){_.classList.contains("button-date__arrow--disabled")||(r.setDate(r.getDate()-1),g(),x())});function g(){let t=new Date,e=new Date(t);e.setDate(e.getDate()+1),k(r,t)?h.textContent="\u0421\u0435\u0433\u043E\u0434\u043D\u044F":k(r,e)?h.textContent="\u0417\u0430\u0432\u0442\u0440\u0430":h.textContent=N(r),I()}function I(){let t=new Date,e="button-date__arrow--disabled";_.classList.toggle(e,k(r,t)),y.classList.toggle(e,F(r,t))}function x(){let t=E.querySelectorAll(".task"),e=/(\d+)\s+(\S+)/;t.forEach(s=>{let o=s.querySelector(".task__data").textContent;if(o.trim()==="\u0411\u0435\u0437 \u0441\u0440\u043E\u043A\u0430"){s.classList.add("task--hidden");return}if(s.classList.contains("task--completed")){s.classList.add("task--hidden");return}let[,n,c]=o.match(e),i=new Date(r.getFullYear(),L(c),parseInt(n));k(r,i)?s.classList.remove("task--hidden"):s.classList.add("task--hidden")})}function N(t){let e={weekday:"long",month:"long",day:"numeric"};return t.toLocaleDateString("ru-RU",e)}function k(t,e){return t.getFullYear()===e.getFullYear()&&t.getMonth()===e.getMonth()&&t.getDate()===e.getDate()}function F(t,e){let s=new Date(e.getFullYear(),e.getMonth(),e.getDate()+7);return t>=s}function L(t){return["\u042F\u043D\u0432","\u0424\u0435\u0432","\u041C\u0430\u0440","\u0410\u043F\u0440","\u041C\u0430\u0439","\u0418\u044E\u043D","\u0418\u044E\u043B","\u0410\u0432\u0433","\u0421\u0435\u043D","\u041E\u043A\u0442","\u041D\u043E\u044F","\u0414\u0435\u043A"].indexOf(t)}var q=document.querySelectorAll(".tasks__header-button"),C=document.querySelector(".tasks .list-with-tasks__wrapper");q.forEach(t=>{t.addEventListener("click",function(){q.forEach(e=>e.classList.remove("tasks__header-button--active")),t.classList.add("tasks__header-button--active"),w(t.textContent.trim())})});function w(t){C.querySelectorAll(".task").forEach(s=>{t==="\u0417\u0430\u0432\u0435\u0440\u0448\u0435\u043D\u043D\u044B\u0435"?s.classList.contains("task--completed")?s.classList.remove("task--hidden"):s.classList.add("task--hidden"):t==="\u0410\u043A\u0442\u0438\u0432\u043D\u044B\u0435"?s.classList.contains("task--completed")||s.classList.contains("task--expired")?s.classList.add("task--hidden"):s.classList.remove("task--hidden"):t==="\u041F\u0440\u043E\u0441\u0440\u043E\u0447\u0435\u043D\u043D\u044B\u0435"&&(s.classList.contains("task--expired")?s.classList.remove("task--hidden"):s.classList.add("task--hidden"))})}function M(t){document.querySelectorAll(`.task[data-id="${t}"]`).forEach(s=>{b(s)})}function J(){f().forEach(e=>{M(e)})}function D(t){localStorage.setItem("completedTasks",JSON.stringify(t))}function f(){let t=localStorage.getItem("completedTasks");return t?JSON.parse(t):[]}function b(t){let e=t.querySelector(".task__title"),s=t.dataset.id;t.classList.add("task--completed");let o=document.createElement("s");o.textContent=e.textContent,e.textContent="",e.appendChild(o),t.querySelector(".task__circle svg").querySelector("use").setAttribute("href","icons/stack.svg#arrow-back");let c=f(),i=T();i=i.filter(a=>a!==s),v(i),c.includes(s)||(c.push(s),D(c)),t.style.transition="opacity 0.3s ease",t.style.opacity="0",setTimeout(()=>{t.classList.add("task--completed","task--hidden"),t.style.transition="",t.style.opacity=""},300),document.querySelectorAll('.list-with-tasks__wrapper .task[data-id="'+s+'"]').forEach(a=>{a.classList.add("task--completed");let l=a.querySelector(".task__title");if(!l.querySelector("s")){let u=document.createElement("s");u.textContent=l.textContent,l.textContent="",l.appendChild(u)}if(a.querySelector(".task__circle svg").querySelector("use").setAttribute("href","icons/stack.svg#arrow-back"),a.classList.contains("task--expired")){a.classList.remove("task--expired");let u=a.querySelector(".task__info-expired");u&&u.remove()}})}function W(){document.querySelectorAll(".button-complete-task").forEach(e=>{e.addEventListener("click",function(s){let o=s.target.closest(".task");o.classList.contains("task--completed")?O(o):b(o)})})}function O(t){let e=t.querySelector(".task__title s");e&&(e.parentNode.textContent=e.textContent),t.classList.remove("task--completed"),t.querySelector(".task__circle svg").querySelector("use").setAttribute("href","icons/stack.svg#checkmark");let o=t.dataset.id,n=f();n=n.filter(a=>a!==o),D(n);let c=T();c=c.filter(a=>a!==o),v(c),document.querySelectorAll('.list-with-tasks__wrapper .task[data-id="'+o+'"]').forEach(a=>{let l=a.querySelector(".task__title s");l&&(l.parentNode.textContent=l.textContent),a.classList.remove("task--completed"),a.querySelector(".task__circle svg").querySelector("use").setAttribute("href","icons/stack.svg#checkmark")});let p=document.querySelector(".tasks__header-button--active");if(p){let a=p.textContent.trim();w(a)}A()}function R(){let t=T();document.querySelectorAll(".task").forEach(s=>{let o=s.dataset.id;t.includes(o)&&A()})}function v(t){localStorage.setItem("expiredTasks",JSON.stringify(t))}function T(){let t=localStorage.getItem("expiredTasks");return t?JSON.parse(t):[]}function A(){let t=C.querySelectorAll(".task"),e=new Date;e.setHours(0,0,0,0);let s=[],o=f();t.forEach(n=>{let c=n.dataset.id,i=n.querySelector(".task__data").textContent.trim();if(i==="\u0411\u0435\u0437 \u0441\u0440\u043E\u043A\u0430"){n.classList.add("task--hidden");return}let[,p,a]=i.match(/(\d+)\s+(\S+)/);if(new Date(e.getFullYear(),L(a),parseInt(p)).getTime()<e.getTime()&&!o.includes(c)){n.classList.add("task--expired");let d=n.querySelector(".task__info-wrapper");if(!d.querySelector(".task__info-expired")){let m=document.createElement("span");m.classList.add("task__info-expired"),m.textContent="\u0417\u0430\u0434\u0430\u0447\u0430 \u043F\u0440\u043E\u0441\u0440\u043E\u0447\u0435\u043D\u0430",d.insertBefore(m,d.firstChild)}let u=document.querySelector(".tasks__header-button--active");u&&u.textContent!=="\u041F\u0440\u043E\u0441\u0440\u043E\u0447\u0435\u043D\u043D\u044B\u0435"&&n.classList.add("task--hidden"),s.push(c)}else{n.classList.remove("task--expired");let d=n.querySelector(".task__info-expired");d&&d.remove()}}),v(s)}export{J as applyCompletedTaskClass,R as applyExpiredTaskClass,W as setupCompleteTaskButtons,A as updateExpiredTasks,w as updateTasksList};
