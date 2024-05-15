var it=n=>n.key==="Escape",Y=n=>t=>{it(t)&&(t.preventDefault(),n())};function j(n,t,e,o,s){n.value.trim().length>t?(e.textContent=o,n.classList.add("has-error"),s.disabled=!0):(e.textContent="",n.classList.remove("has-error"),s.disabled=!1)}function O(n,t,e){let o=n.value.trim()!=="",s=!n.classList.contains("has-error"),r=!t.classList.contains("has-error");e.disabled=!o||!s||!r}function Z(){let n=new Date,t={rendered:!1,localDate:new Date,prevMonthLastDate:null,calWeekDays:["\u041F\u043D","\u0412\u0442","\u0421\u0440","\u0427\u0442","\u041F\u0442","\u0421\u0431","\u0412\u0441"],calMonthName:["\u042F\u043D\u0432\u0430\u0440\u044C","\u0424\u0435\u0440\u0432\u0430\u043B\u044C","\u041C\u0430\u0440\u0442","\u0410\u043F\u0440\u0435\u043B\u044C","\u041C\u0430\u0439","\u0418\u044E\u043D\u044C","\u0418\u044E\u043B\u044C","\u0410\u0432\u0433\u0443\u0441\u0442","\u0421\u0435\u043D\u0442\u044F\u0431\u0440\u044C","\u041E\u043A\u0442\u044F\u0431\u0440\u044C","\u041D\u043E\u044F\u0431\u0440\u044C","\u0414\u0435\u043A\u0430\u0431\u0440\u044C"],daysInMonth:function(e,o){return new Date(o,e,0).getDate()},firstDay:function(){return new Date(n.getFullYear(),n.getMonth(),1)},lastDay:function(){return new Date(n.getFullYear(),n.getMonth()+1,0)},firstDayNumber:function(){let e=t.firstDay().getDay();return e===0?7:e},lastDayNumber:function(){return t.lastDay().getDay()+1},getPreviousMonthLastDate:function(){return new Date(n.getFullYear(),n.getMonth(),0).getDate()},navigateToPreviousMonth:function(){n.setMonth(n.getMonth()-1),t.attachEventsOnNextPrev()},navigateToNextMonth:function(){n.setMonth(n.getMonth()+1),t.attachEventsOnNextPrev()},navigateToCurrentMonth:function(){let e=t.localDate.getMonth(),o=t.localDate.getFullYear();n.setMonth(e),n.setYear(o),t.attachEventsOnNextPrev()},displayYear:function(){let e=document.querySelector(".calendar .calendar-year-label");e.innerHTML=n.getFullYear()},displayMonth:function(){let e=document.querySelector(".calendar .calendar-month-label");e.innerHTML=t.calMonthName[n.getMonth()]},plotSelectors:function(){let e=document.querySelector(".calendar"),o=document.createElement("div");o.classList.add("calendar-inner");let s=document.createElement("div");s.classList.add("calendar-controls");let r=document.createElement("div");r.classList.add("calendar-prev");let m=document.createElement("a");m.setAttribute("href","#");let l=document.createElementNS("http://www.w3.org/2000/svg","svg");l.setAttribute("xmlns","http://www.w3.org/2000/svg"),l.setAttribute("width","128"),l.setAttribute("height","128"),l.setAttribute("viewBox","0 0 128 128");let c=document.createElementNS("http://www.w3.org/2000/svg","path");c.setAttribute("fill","#666"),c.setAttribute("d","M88.2 3.8L35.8 56.23 28 64l7.8 7.78 52.4 52.4 9.78-7.76L45.58 64l52.4-52.4z"),l.appendChild(c),m.appendChild(l),r.appendChild(m);let a=document.createElement("div");a.classList.add("calendar-year-month");let h=document.createElement("div");h.classList.add("calendar-month-label");let k=document.createElement("div");k.textContent="-";let I=document.createElement("div");I.classList.add("calendar-year-label"),a.appendChild(h),a.appendChild(k),a.appendChild(I);let d=document.createElement("div");d.classList.add("calendar-next");let y=document.createElement("a");y.setAttribute("href","#");let p=document.createElementNS("http://www.w3.org/2000/svg","svg");p.setAttribute("xmlns","http://www.w3.org/2000/svg"),p.setAttribute("width","128"),p.setAttribute("height","128"),p.setAttribute("viewBox","0 0 128 128");let E=document.createElementNS("http://www.w3.org/2000/svg","path");E.setAttribute("fill","#666"),E.setAttribute("d","M38.8 124.2l52.4-52.42L99 64l-7.77-7.78-52.4-52.4-9.8 7.77L81.44 64 29 116.42z"),p.appendChild(E),y.appendChild(p),d.appendChild(y),s.appendChild(r),s.appendChild(a),s.appendChild(d);let x=document.createElement("div");x.classList.add("calendar-body"),o.appendChild(s),o.appendChild(x),e.appendChild(o)},plotDayNames:function(){let e=document.querySelector(".calendar .calendar-body");t.calWeekDays.forEach(o=>{let s=document.createElement("div");s.textContent=o,e.appendChild(s)})},plotDates:function(){let e=document.querySelector(".calendar .calendar-body");t.rendered||(t.plotSelectors(),t.rendered=!0),e.innerHTML="",t.plotDayNames(),t.displayMonth(),t.displayYear();let o=1,s=0;t.prevMonthLastDate=t.getPreviousMonthLastDate();let r=[],m=t.daysInMonth(n.getMonth()+1,n.getFullYear());for(let l=1;l<m;l++)if(l<t.firstDayNumber()){s+=1;let c=document.createElement("div");c.classList.add("prev-dates"),e.appendChild(c),r.push(t.prevMonthLastDate--)}else{let c=document.createElement("div");c.classList.add("number-item"),c.setAttribute("data-num",o);let a=document.createElement("a");a.classList.add("dateNumber"),a.href="#",a.textContent=o++,c.appendChild(a),e.appendChild(c)}for(let l=0;l<s+1;l++){let c=document.createElement("div");c.classList.add("number-item"),c.setAttribute("data-num",o);let a=document.createElement("a");a.classList.add("dateNumber"),a.href="#",a.textContent=o++,c.appendChild(a),e.appendChild(c)}t.highlightToday(),t.plotPrevMonthDates(r),t.plotNextMonthDates()},attachEvents:function(){let e=document.querySelector(".calendar .calendar-prev a"),o=document.querySelector(".calendar .calendar-next a"),s=document.querySelectorAll(".calendar .dateNumber");e.addEventListener("click",t.navigateToPreviousMonth),o.addEventListener("click",t.navigateToNextMonth);for(var r=0;r<s.length;r++)s[r].addEventListener("click",t.selectDate,!1)},highlightToday:function(){let e=t.localDate.getMonth()+1,o=n.getMonth()+1,s=t.localDate.getFullYear(),r=n.getFullYear();s===r&&e===o&&document.querySelectorAll(".number-item")&&document.querySelectorAll(".number-item")[n.getDate()-1].classList.add("calendar-today")},plotPrevMonthDates:function(e){e.reverse();for(let o=0;o<e.length;o++)document.querySelectorAll(".prev-dates")&&(document.querySelectorAll(".prev-dates")[o].textContent=e[o])},plotNextMonthDates:function(){let e=document.querySelector(".calendar-body").childElementCount;if(e>42){let o=49-e;t.loopThroughNextDays(o)}if(e>35&&e<=42){let o=42-e;t.loopThroughNextDays(42-e)}},loopThroughNextDays:function(e){let o=document.querySelector(".calendar-body");if(e>0)for(let s=1;s<=e;s++){let r=document.createElement("div");r.classList.add("next-dates"),r.textContent=s,o.appendChild(r)}},attachEventsOnNextPrev:function(){t.plotDates(),t.attachEvents()},init:function(){t.rendered||(t.plotSelectors(),t.rendered=!0),t.plotDates(),t.attachEvents()}};t.init()}function tt(){document.querySelectorAll(".editor").forEach(t=>{t.addEventListener("input",()=>{t.style.height="auto",t.style.height=t.scrollHeight+"px"})})}function et(n){let t=document.getElementById("dateInput"),e=document.querySelector(".calendar"),o=document.getElementById("priorityInput"),s=document.querySelector(".popup-priority"),r=document.querySelectorAll(".popup-priority__item"),m=document.querySelector(".task-editor__priority-label"),l=document.getElementById("projectInput"),c=document.querySelector(".popup-project"),a=document.querySelector(".popup-project__list"),h=document.querySelector(".popup-project_btn-reset"),k=document.querySelector(".popup-project__list-empty"),I=new Z;function d(i,u,f){return function(_){_.stopPropagation(),i.classList.contains("task-editor__popup--open")?f():u()}}if(o.addEventListener("click",d(s,v,g)),!l.closest(".list-in-project"))l.addEventListener("click",d(c,w,D));else{let i=document.querySelector(".projects-task").dataset.project;l.value=i}h.addEventListener("click",()=>{l.value="";let u=document.querySelector(".task-editor").dataset.taskId,f=document.querySelector(`.task[data-id="${u}"]`);f&&delete f.dataset.project,D()}),r.forEach(function(i){i.addEventListener("click",function(){let u=i.textContent.trim();switch(o.value=u,m.classList.remove("task-editor__priority-label--priority1","task-editor__priority-label--priority2","task-editor__priority-label--priority3"),u){case"\u0421\u0440\u043E\u0447\u043D\u043E":m.classList.add("task-editor__priority-label--priority1");break;case"\u0412\u0430\u0436\u043D\u043E":m.classList.add("task-editor__priority-label--priority2");break;case"\u0412\u0442\u043E\u0440\u043E\u0441\u0442\u0435\u043F\u0435\u043D\u043D\u043E":m.classList.add("task-editor__priority-label--priority3");break;default:break}g()})}),t.value=n,t.addEventListener("click",()=>{e.style.display==="block"?b():F()}),e.addEventListener("click",function(i){if(i.target.classList.contains("dateNumber")){let u=i.target.textContent.trim(),f=e.querySelector(".calendar-month-label").textContent.trim();t.value=`${u} ${f}`,b()}});let y=Y(g),p=Y(D),E=Y(b);function x(){b(),g(),D()}function M(i,u){x(),i.classList.add("task-editor__popup--open"),document.addEventListener("keydown",u)}function T(i,u){i.classList.remove("task-editor__popup--open"),document.removeEventListener("keydown",u)}function v(){M(s,y)}function g(){T(s,y)}function w(){M(c,p),S()}function D(){T(c,p)}function F(){x(),e.style.display="block",document.addEventListener("keydown",E)}function b(){e.style.display="none",document.removeEventListener("keydown",E)}function S(){let u=document.querySelector(".projects__list-wrapper").querySelectorAll(".project__title");a.innerHTML="",u.forEach(f=>{let _=document.createElement("li");_.classList.add("popup-project__item");let $=document.createElement("span");$.textContent=f.textContent.trim(),_.appendChild($),a.appendChild(_),_.addEventListener("click",function(){let C=_.textContent.trim();l.value=C,D()})}),q()}function q(){document.querySelectorAll(".popup-project__list li").length===0?k.style.display="block":k.style.display="none"}document.addEventListener("click",function(i){!s.contains(i.target)&&i.target!==o&&g(),!c.contains(i.target)&&i.target!==l&&D(),!e.contains(i.target)&&i.target!==t&&b()})}var gt=document.querySelector(".sidebar"),St=document.querySelectorAll(".new-item"),W=100,J=500,A={TITLE:"\u0414\u043B\u0438\u043D\u0430 \u0437\u0430\u0433\u043E\u043B\u043E\u0432\u043A\u0430 \u043D\u0435 \u0434\u043E\u043B\u0436\u043D\u0430 \u043F\u0440\u0435\u0432\u044B\u0448\u0430\u0442\u044C 100 \u0441\u0438\u043C\u0432\u043E\u043B\u043E\u0432.",DISC:"\u0414\u043B\u0438\u043D\u0430 \u043E\u043F\u0438\u0441\u0430\u043D\u0438\u044F \u043D\u0435 \u0434\u043E\u043B\u0436\u043D\u0430 \u043F\u0440\u0435\u0432\u044B\u0448\u0430\u0442\u044C 500 \u0441\u0438\u043C\u0432\u043E\u043B\u043E\u0432."};var X=document.querySelector(".button-date"),V=X.querySelector(".button-date__title"),U=X.querySelector(".button-date__arrow--left"),G=X.querySelector(".button-date__arrow--right"),lt=document.querySelector(".dashboard .list-with-tasks__wrapper"),L=new Date;K();N();G.addEventListener("click",function(){G.classList.contains("button-date__arrow--disabled")||(L.setDate(L.getDate()+1),K(),N())});U.addEventListener("click",function(){U.classList.contains("button-date__arrow--disabled")||(L.setDate(L.getDate()-1),K(),N())});function K(){let n=new Date,t=new Date(n);t.setDate(t.getDate()+1),H(L,n)?V.textContent="\u0421\u0435\u0433\u043E\u0434\u043D\u044F":H(L,t)?V.textContent="\u0417\u0430\u0432\u0442\u0440\u0430":V.textContent=ut(L),dt()}function dt(){let n=new Date,t="button-date__arrow--disabled";U.classList.toggle(t,H(L,n)),G.classList.toggle(t,pt(L,n))}function N(){let n=lt.querySelectorAll(".task"),t=/(\d+)\s+(\S+)/;n.forEach(e=>{let o=e.querySelector(".task__data").textContent;if(o.trim()==="\u0411\u0435\u0437 \u0441\u0440\u043E\u043A\u0430"){e.classList.add("task--hidden");return}if(e.classList.contains("task--completed")){e.classList.add("task--hidden");return}let[,s,r]=o.match(t),m=new Date(L.getFullYear(),z(r),parseInt(s));H(L,m)?e.classList.remove("task--hidden"):e.classList.add("task--hidden")})}function ut(n){let t={weekday:"long",month:"long",day:"numeric"};return n.toLocaleDateString("ru-RU",t)}function H(n,t){return n.getFullYear()===t.getFullYear()&&n.getMonth()===t.getMonth()&&n.getDate()===t.getDate()}function pt(n,t){let e=new Date(t.getFullYear(),t.getMonth(),t.getDate()+7);return n>=e}function z(n){return["\u042F\u043D\u0432","\u0424\u0435\u0432","\u041C\u0430\u0440","\u0410\u043F\u0440","\u041C\u0430\u0439","\u0418\u044E\u043D","\u0418\u044E\u043B","\u0410\u0432\u0433","\u0421\u0435\u043D","\u041E\u043A\u0442","\u041D\u043E\u044F","\u0414\u0435\u043A"].indexOf(n)}var nt=document.querySelectorAll(".tasks__header-button"),ot=document.querySelector(".tasks .list-with-tasks__wrapper");nt.forEach(n=>{n.addEventListener("click",function(){nt.forEach(t=>t.classList.remove("tasks__header-button--active")),n.classList.add("tasks__header-button--active"),R(n.textContent.trim())})});function R(n){ot.querySelectorAll(".task").forEach(e=>{n==="\u0417\u0430\u0432\u0435\u0440\u0448\u0435\u043D\u043D\u044B\u0435"?e.classList.contains("task--completed")?e.classList.remove("task--hidden"):e.classList.add("task--hidden"):n==="\u0410\u043A\u0442\u0438\u0432\u043D\u044B\u0435"?e.classList.contains("task--completed")||e.classList.contains("task--expired")?e.classList.add("task--hidden"):e.classList.remove("task--hidden"):n==="\u041F\u0440\u043E\u0441\u0440\u043E\u0447\u0435\u043D\u043D\u044B\u0435"&&(e.classList.contains("task--expired")?e.classList.remove("task--hidden"):e.classList.add("task--hidden"))})}function mt(n){localStorage.setItem("expiredTasks",JSON.stringify(n))}function st(){let n=ot.querySelectorAll(".task"),t=new Date;t.setHours(0,0,0,0);let e=[];n.forEach(o=>{let s=o.dataset.id,r=o.querySelector(".task__data").textContent.trim();if(r==="\u0411\u0435\u0437 \u0441\u0440\u043E\u043A\u0430"){o.classList.add("task--hidden");return}let[,m,l]=r.match(/(\d+)\s+(\S+)/);if(new Date(t.getFullYear(),z(l),parseInt(m)).getTime()<t.getTime()){o.classList.add("task--expired");let a=o.querySelector(".task__info-wrapper");if(!a.querySelector(".task__info-expired")){let k=document.createElement("span");k.classList.add("task__info-expired"),k.textContent="\u0417\u0430\u0434\u0430\u0447\u0430 \u043F\u0440\u043E\u0441\u0440\u043E\u0447\u0435\u043D\u0430",a.insertBefore(k,a.firstChild)}let h=document.querySelector(".tasks__header-button--active");h&&h.textContent!=="\u041F\u0440\u043E\u0441\u0440\u043E\u0447\u0435\u043D\u043D\u044B\u0435"&&o.classList.add("task--hidden"),e.push(s)}else{o.classList.remove("task--expired");let a=o.querySelector(".task__info-expired");a&&a.remove()}}),mt(e)}function Q(n,t){localStorage.setItem(n,JSON.stringify(t))}function P(n){let t=localStorage.getItem(n);return t?JSON.parse(t):[]}function rt(n,t,e=null){document.querySelectorAll(n).forEach(s=>{s.addEventListener("click",()=>{let r=s.closest(t);if(r)if(e){let m=r.dataset.id;document.querySelectorAll(`${t}[${e}="${m}"]`).forEach(c=>{c.remove()}),at(m,!0)}else r.remove(),at(r.dataset.id,!1)})})}function at(n,t){let o=(t?P("tasks"):P("projects")).filter(s=>s.id!==n);t?Q("tasks",o):Q("projects",o)}function yt(n,t,e,o,s,r){let l=P("tasks").map(c=>c.id===n?{...c,title:t,description:e,date:o,priority:s,project:r}:c);localStorage.setItem("tasks",JSON.stringify(l))}function ft(n,t,e){let s=P("projects").map(r=>r.id===n?{...r,title:t,description:e}:r);localStorage.setItem("projects",JSON.stringify(s))}function ct(n,t,e,o,s,r){let m=document.querySelectorAll(n),l=document.querySelector(e);m.forEach(c=>{c.addEventListener("click",()=>{let a=c.closest(t);if(a.classList.add(`${t.slice(1)}--edit`),a){let h=a.dataset.id,k=a.querySelector(o).textContent.trim(),I=a.querySelector(s).textContent.trim(),d=l.content.cloneNode(!0).querySelector(".task-editor"),y=d.querySelector('[name="title_task"]'),p=d.querySelector('[name="discription_task"]'),E=d.querySelector('[name="data_task"]'),x=d.querySelector('[name="priority_task"]'),M=d.querySelector('[name="project_task"]'),T=d.querySelector(".task-editor__priority-label"),v=d.querySelector(".task-editor__submit-btn"),g=document.createElement("span"),w=document.createElement("span");y.value=k,p.value=I,g.classList.add("task-editor__error"),w.classList.add("task-editor__error"),y.parentNode.appendChild(g),p.parentNode.appendChild(w),y.addEventListener("input",()=>{j(y,W,g,A.TITLE,v),O(y,p,v)}),p.addEventListener("input",()=>{j(p,J,w,A.DISC,v),O(y,p,v)}),O(y,p,v),v.querySelector("use").setAttribute("href","icons/stack.svg#checkmark"),v.addEventListener("click",()=>{if(j(y,W,g,A.TITLE,v),j(p,J,w,A.DISC,v),y.classList.contains("has-error")||p.classList.contains("has-error"))return;let S=y.value.trim(),q=p.value.trim();if(a.querySelector(o).textContent=S,a.querySelector(s).textContent=q,r){let u=E.value.trim(),f=x.value.trim(),_=M.value.trim();document.querySelectorAll(`.task[data-id="${h}"]`).forEach(C=>{C.querySelector(".task__title").textContent=S,C.querySelector(".task__discription").textContent=q,C.querySelector(".task__data").textContent=u,C.querySelector(".task__project").textContent=_,C.dataset.project=_;let B=C.querySelector(".task__circle");B.classList.remove("task__circle--priority1","task__circle--priority2","task__circle--priority3"),f==="\u0421\u0440\u043E\u0447\u043D\u043E"?B.classList.add("task__circle--priority1"):f==="\u0412\u0430\u0436\u043D\u043E"?B.classList.add("task__circle--priority2"):f==="\u0412\u0442\u043E\u0440\u043E\u0441\u0442\u0435\u043F\u0435\u043D\u043D\u043E"&&B.classList.add("task__circle--priority3")}),yt(h,S,q,u,f,_)}else{let u=y.value.trim(),f=p.value.trim();ft(h,u,f)}d.classList.add("task-editor--hidden"),d.addEventListener("transitionend",function u(){a.classList.remove(`${t.slice(1)}--edit`),d.remove(),d.removeEventListener("transitionend",u)},{once:!0}),N(),st();let i=document.querySelector(".tasks__header-button--active");if(i){let u=i.textContent.trim();R(u)}});let F=a.closest(".list, .projects__list").querySelector(".manager-item");F.innerHTML="",F.appendChild(d),d.classList.add("task-editor--visible");let b=d.querySelector(".task-editor__close-btn");if(b&&b.addEventListener("click",()=>{d.classList.add("task-editor--hidden"),d.addEventListener("transitionend",function S(){a.classList.remove(`${t.slice(1)}--edit`),d.remove(),d.removeEventListener("transitionend",S)},{once:!0})}),r){let S=a.querySelector(".task__data").textContent.trim(),q=a.querySelector(".task__project").textContent.trim(),i=a.querySelector(".task__circle").classList.contains("task__circle--priority1")?"\u0421\u0440\u043E\u0447\u043D\u043E":a.querySelector(".task__circle").classList.contains("task__circle--priority2")?"\u0412\u0430\u0436\u043D\u043E":a.querySelector(".task__circle").classList.contains("task__circle--priority3")?"\u0412\u0442\u043E\u0440\u043E\u0441\u0442\u0435\u043F\u0435\u043D\u043D\u043E":"";E.value=S,M.value=q,x.value=i,i==="\u0421\u0440\u043E\u0447\u043D\u043E"?T.classList.add("task-editor__priority-label--priority1"):i==="\u0412\u0430\u0436\u043D\u043E"?T.classList.add("task-editor__priority-label--priority2"):i==="\u0412\u0442\u043E\u0440\u043E\u0441\u0442\u0435\u043F\u0435\u043D\u043D\u043E"&&T.classList.add("task-editor__priority-label--priority3"),et(S)}tt()}})})}function At(){rt(".button-delete-task",".task","data-id")}function Nt(){rt(".button-delete-project",".project")}function Pt(){ct(".button-edit-task",".task","#task-editor",".task__title",".task__discription",!0)}function Ft(){ct(".button-edit-project",".project","#project-editor",".project__title",".project__discription",!1)}export{Nt as deleteProject,At as deleteTask,Ft as editProject,Pt as editTask};
