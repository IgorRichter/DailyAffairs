var N=document.querySelector(".sidebar__button"),p=document.querySelector(".sidebar"),w=document.querySelector(".dropdown-menu"),H=document.querySelector(".dropdown-menu__item--arrow"),O=document.querySelector(".dropdown-menu__submenu"),P=document.querySelector(".sidebar__user-button");N.addEventListener("click",()=>{p.classList.toggle("sidebar--open"),document.body.style.overflow=p.classList.contains("sidebar--open")?"hidden":"auto"});P.addEventListener("click",()=>{w.classList.toggle("dropdown-menu--open")});H.addEventListener("click",()=>{O.classList.toggle("dropdown-menu__submenu--open")});document.addEventListener("click",e=>{!p.contains(e.target)&&!N.contains(e.target)&&(p.classList.remove("sidebar--open"),document.body.style.overflow=p.classList.contains("sidebar--open")?"hidden":"auto"),!w.contains(e.target)&&!P.contains(e.target)&&w.classList.remove("dropdown-menu--open")});var K=e=>e.key==="Escape",g=e=>t=>{K(t)&&(t.preventDefault(),e())};var z=document.querySelectorAll(".editor"),M=document.getElementById("dateInput"),i=document.querySelector(".calendar"),C=document.getElementById("priorityInput"),v=document.querySelector(".task-editor__priority-label"),f=document.querySelector(".popup-priority"),V=document.querySelectorAll(".popup-priority__item"),k=document.getElementById("projectInput"),b=document.querySelector(".popup-project"),W=document.querySelectorAll(".popup-project__item");z.forEach(e=>{e.addEventListener("input",()=>{e.style.height="auto",e.style.height=e.scrollHeight+"px"})});function A(e,t,n){return function(o){o.stopPropagation(),e.classList.contains("task-editor__popup--open")?n():t()}}C.addEventListener("click",A(f,$,m));k.addEventListener("click",A(b,G,h));V.forEach(function(e){e.addEventListener("click",function(){let t=e.textContent.trim();switch(C.value=t,v.classList.remove("task-editor__priority-label--priority1","task-editor__priority-label--priority2","task-editor__priority-label--priority3"),t){case"\u0421\u0440\u043E\u0447\u043D\u043E":v.classList.add("task-editor__priority-label--priority1");break;case"\u0412\u0430\u0436\u043D\u043E":v.classList.add("task-editor__priority-label--priority2");break;case"\u0412\u0442\u043E\u0440\u043E\u0441\u0442\u0435\u043F\u0435\u043D\u043D\u043E":v.classList.add("task-editor__priority-label--priority3");break;default:break}m()})});W.forEach(function(e){e.addEventListener("click",function(){let t=e.textContent.trim();k.value=t,h()})});M.addEventListener("click",()=>{i.style.display==="block"?y():J()});i.addEventListener("click",function(e){if(e.target.classList.contains("dateNumber")){let t=e.target.textContent.trim(),n=i.querySelector(".calendar-month-label").textContent.trim();M.value=`${t} ${n}`,y()}});var I=g(m),Y=g(h),B=g(y);function T(){y(),m(),h()}function j(e,t){T(),e.classList.add("task-editor__popup--open"),document.addEventListener("keydown",t)}function F(e,t){e.classList.remove("task-editor__popup--open"),document.removeEventListener("keydown",t)}function $(){j(f,I)}function m(){F(f,I)}function G(){j(b,Y)}function h(){F(b,Y)}function J(){T(),i.style.display="block",document.addEventListener("keydown",B)}function y(){i.style.display="none",document.removeEventListener("keydown",B)}document.addEventListener("click",function(e){!f.contains(e.target)&&e.target!==C&&m(),!b.contains(e.target)&&e.target!==k&&h(),!i.contains(e.target)&&e.target!==M&&y()});var X=new Q;function Q(){let e=new Date,t={rendered:!1,localDate:new Date,prevMonthLastDate:null,calWeekDays:["\u041F\u043D","\u0412\u0442","\u0421\u0440","\u0427\u0442","\u041F\u0442","\u0421\u0431","\u0412\u0441"],calMonthName:["\u042F\u043D\u0432\u0430\u0440\u044C","\u0424\u0435\u0440\u0432\u0430\u043B\u044C","\u041C\u0430\u0440\u0442","\u0410\u043F\u0440\u0435\u043B\u044C","\u041C\u0430\u0439","\u0418\u044E\u043D\u044C","\u0418\u044E\u043B\u044C","\u0410\u0432\u0433\u0443\u0441\u0442","\u0421\u0435\u043D\u0442\u044F\u0431\u0440\u044C","\u041E\u043A\u0442\u044F\u0431\u0440\u044C","\u041D\u043E\u044F\u0431\u0440\u044C","\u0414\u0435\u043A\u0430\u0431\u0440\u044C"],daysInMonth:function(n,o){return new Date(o,n,0).getDate()},firstDay:function(){return new Date(e.getFullYear(),e.getMonth(),1)},lastDay:function(){return new Date(e.getFullYear(),e.getMonth()+1,0)},firstDayNumber:function(){let n=t.firstDay().getDay();return n===0?7:n},lastDayNumber:function(){return t.lastDay().getDay()+1},getPreviousMonthLastDate:function(){return new Date(e.getFullYear(),e.getMonth(),0).getDate()},navigateToPreviousMonth:function(){e.setMonth(e.getMonth()-1),t.attachEventsOnNextPrev()},navigateToNextMonth:function(){e.setMonth(e.getMonth()+1),t.attachEventsOnNextPrev()},navigateToCurrentMonth:function(){let n=t.localDate.getMonth(),o=t.localDate.getFullYear();e.setMonth(n),e.setYear(o),t.attachEventsOnNextPrev()},displayYear:function(){let n=document.querySelector(".calendar .calendar-year-label");n.innerHTML=e.getFullYear()},displayMonth:function(){let n=document.querySelector(".calendar .calendar-month-label");n.innerHTML=t.calMonthName[e.getMonth()]},plotSelectors:function(){let n=document.querySelector(".calendar"),o=document.createElement("div");o.classList.add("calendar-inner");let a=document.createElement("div");a.classList.add("calendar-controls");let r=document.createElement("div");r.classList.add("calendar-prev");let u=document.createElement("a");u.setAttribute("href","#");let d=document.createElementNS("http://www.w3.org/2000/svg","svg");d.setAttribute("xmlns","http://www.w3.org/2000/svg"),d.setAttribute("width","128"),d.setAttribute("height","128"),d.setAttribute("viewBox","0 0 128 128");let c=document.createElementNS("http://www.w3.org/2000/svg","path");c.setAttribute("fill","#666"),c.setAttribute("d","M88.2 3.8L35.8 56.23 28 64l7.8 7.78 52.4 52.4 9.78-7.76L45.58 64l52.4-52.4z"),d.appendChild(c),u.appendChild(d),r.appendChild(u);let l=document.createElement("div");l.classList.add("calendar-year-month");let S=document.createElement("div");S.classList.add("calendar-month-label");let x=document.createElement("div");x.textContent="-";let _=document.createElement("div");_.classList.add("calendar-year-label"),l.appendChild(S),l.appendChild(x),l.appendChild(_);let L=document.createElement("div");L.classList.add("calendar-next");let E=document.createElement("a");E.setAttribute("href","#");let s=document.createElementNS("http://www.w3.org/2000/svg","svg");s.setAttribute("xmlns","http://www.w3.org/2000/svg"),s.setAttribute("width","128"),s.setAttribute("height","128"),s.setAttribute("viewBox","0 0 128 128");let D=document.createElementNS("http://www.w3.org/2000/svg","path");D.setAttribute("fill","#666"),D.setAttribute("d","M38.8 124.2l52.4-52.42L99 64l-7.77-7.78-52.4-52.4-9.8 7.77L81.44 64 29 116.42z"),s.appendChild(D),E.appendChild(s),L.appendChild(E),a.appendChild(r),a.appendChild(l),a.appendChild(L);let q=document.createElement("div");q.classList.add("calendar-body"),o.appendChild(a),o.appendChild(q),n.appendChild(o)},plotDayNames:function(){let n=document.querySelector(".calendar .calendar-body");t.calWeekDays.forEach(o=>{let a=document.createElement("div");a.textContent=o,n.appendChild(a)})},plotDates:function(){let n=document.querySelector(".calendar .calendar-body");t.rendered||(t.plotSelectors(),t.rendered=!0),n.innerHTML="",t.plotDayNames(),t.displayMonth(),t.displayYear();let o=1,a=0;t.prevMonthLastDate=t.getPreviousMonthLastDate();let r=[],u=t.daysInMonth(e.getMonth()+1,e.getFullYear());for(let d=1;d<u;d++)if(d<t.firstDayNumber()){a+=1;let c=document.createElement("div");c.classList.add("prev-dates"),n.appendChild(c),r.push(t.prevMonthLastDate--)}else{let c=document.createElement("div");c.classList.add("number-item"),c.setAttribute("data-num",o);let l=document.createElement("a");l.classList.add("dateNumber"),l.href="#",l.textContent=o++,c.appendChild(l),n.appendChild(c)}for(let d=0;d<a+1;d++){let c=document.createElement("div");c.classList.add("number-item"),c.setAttribute("data-num",o);let l=document.createElement("a");l.classList.add("dateNumber"),l.href="#",l.textContent=o++,c.appendChild(l),n.appendChild(c)}t.highlightToday(),t.plotPrevMonthDates(r),t.plotNextMonthDates()},attachEvents:function(){let n=document.querySelector(".calendar .calendar-prev a"),o=document.querySelector(".calendar .calendar-next a"),a=document.querySelectorAll(".calendar .dateNumber");n.addEventListener("click",t.navigateToPreviousMonth),o.addEventListener("click",t.navigateToNextMonth);for(var r=0;r<a.length;r++)a[r].addEventListener("click",t.selectDate,!1)},highlightToday:function(){let n=t.localDate.getMonth()+1,o=e.getMonth()+1,a=t.localDate.getFullYear(),r=e.getFullYear();a===r&&n===o&&document.querySelectorAll(".number-item")&&document.querySelectorAll(".number-item")[e.getDate()-1].classList.add("calendar-today")},plotPrevMonthDates:function(n){n.reverse();for(let o=0;o<n.length;o++)document.querySelectorAll(".prev-dates")&&(document.querySelectorAll(".prev-dates")[o].textContent=n[o])},plotNextMonthDates:function(){let n=document.querySelector(".calendar-body").childElementCount;if(n>42){let o=49-n;t.loopThroughNextDays(o)}if(n>35&&n<=42){let o=42-n;t.loopThroughNextDays(42-n)}},loopThroughNextDays:function(n){let o=document.querySelector(".calendar-body");if(n>0)for(let a=1;a<=n;a++){let r=document.createElement("div");r.classList.add("next-dates"),r.textContent=a,o.appendChild(r)}},attachEventsOnNextPrev:function(){t.plotDates(),t.attachEvents()},init:function(){t.rendered||(t.plotSelectors(),t.rendered=!0),t.plotDates(),t.attachEvents()}};t.init()}
