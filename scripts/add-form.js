var z=o=>o.key==="Escape",N=o=>t=>{z(t)&&(t.preventDefault(),o())};function I(){let o=new Date,t={rendered:!1,localDate:new Date,prevMonthLastDate:null,calWeekDays:["\u041F\u043D","\u0412\u0442","\u0421\u0440","\u0427\u0442","\u041F\u0442","\u0421\u0431","\u0412\u0441"],calMonthName:["\u042F\u043D\u0432\u0430\u0440\u044C","\u0424\u0435\u0440\u0432\u0430\u043B\u044C","\u041C\u0430\u0440\u0442","\u0410\u043F\u0440\u0435\u043B\u044C","\u041C\u0430\u0439","\u0418\u044E\u043D\u044C","\u0418\u044E\u043B\u044C","\u0410\u0432\u0433\u0443\u0441\u0442","\u0421\u0435\u043D\u0442\u044F\u0431\u0440\u044C","\u041E\u043A\u0442\u044F\u0431\u0440\u044C","\u041D\u043E\u044F\u0431\u0440\u044C","\u0414\u0435\u043A\u0430\u0431\u0440\u044C"],daysInMonth:function(e,n){return new Date(n,e,0).getDate()},firstDay:function(){return new Date(o.getFullYear(),o.getMonth(),1)},lastDay:function(){return new Date(o.getFullYear(),o.getMonth()+1,0)},firstDayNumber:function(){let e=t.firstDay().getDay();return e===0?7:e},lastDayNumber:function(){return t.lastDay().getDay()+1},getPreviousMonthLastDate:function(){return new Date(o.getFullYear(),o.getMonth(),0).getDate()},navigateToPreviousMonth:function(){o.setMonth(o.getMonth()-1),t.attachEventsOnNextPrev()},navigateToNextMonth:function(){o.setMonth(o.getMonth()+1),t.attachEventsOnNextPrev()},navigateToCurrentMonth:function(){let e=t.localDate.getMonth(),n=t.localDate.getFullYear();o.setMonth(e),o.setYear(n),t.attachEventsOnNextPrev()},displayYear:function(){let e=document.querySelector(".calendar .calendar-year-label");e.innerHTML=o.getFullYear()},displayMonth:function(){let e=document.querySelector(".calendar .calendar-month-label");e.innerHTML=t.calMonthName[o.getMonth()]},plotSelectors:function(){let e=document.querySelector(".calendar"),n=document.createElement("div");n.classList.add("calendar-inner");let c=document.createElement("div");c.classList.add("calendar-controls");let s=document.createElement("div");s.classList.add("calendar-prev");let l=document.createElement("a");l.setAttribute("href","#");let i=document.createElementNS("http://www.w3.org/2000/svg","svg");i.setAttribute("xmlns","http://www.w3.org/2000/svg"),i.setAttribute("width","128"),i.setAttribute("height","128"),i.setAttribute("viewBox","0 0 128 128");let r=document.createElementNS("http://www.w3.org/2000/svg","path");r.setAttribute("fill","#666"),r.setAttribute("d","M88.2 3.8L35.8 56.23 28 64l7.8 7.78 52.4 52.4 9.78-7.76L45.58 64l52.4-52.4z"),i.appendChild(r),l.appendChild(i),s.appendChild(l);let a=document.createElement("div");a.classList.add("calendar-year-month");let m=document.createElement("div");m.classList.add("calendar-month-label");let _=document.createElement("div");_.textContent="-";let E=document.createElement("div");E.classList.add("calendar-year-label"),a.appendChild(m),a.appendChild(_),a.appendChild(E);let v=document.createElement("div");v.classList.add("calendar-next");let g=document.createElement("a");g.setAttribute("href","#");let h=document.createElementNS("http://www.w3.org/2000/svg","svg");h.setAttribute("xmlns","http://www.w3.org/2000/svg"),h.setAttribute("width","128"),h.setAttribute("height","128"),h.setAttribute("viewBox","0 0 128 128");let p=document.createElementNS("http://www.w3.org/2000/svg","path");p.setAttribute("fill","#666"),p.setAttribute("d","M38.8 124.2l52.4-52.42L99 64l-7.77-7.78-52.4-52.4-9.8 7.77L81.44 64 29 116.42z"),h.appendChild(p),g.appendChild(h),v.appendChild(g),c.appendChild(s),c.appendChild(a),c.appendChild(v);let f=document.createElement("div");f.classList.add("calendar-body"),n.appendChild(c),n.appendChild(f),e.appendChild(n)},plotDayNames:function(){let e=document.querySelector(".calendar .calendar-body");t.calWeekDays.forEach(n=>{let c=document.createElement("div");c.textContent=n,e.appendChild(c)})},plotDates:function(){let e=document.querySelector(".calendar .calendar-body");t.rendered||(t.plotSelectors(),t.rendered=!0),e.innerHTML="",t.plotDayNames(),t.displayMonth(),t.displayYear();let n=1,c=0;t.prevMonthLastDate=t.getPreviousMonthLastDate();let s=[],l=t.daysInMonth(o.getMonth()+1,o.getFullYear());for(let i=1;i<l;i++)if(i<t.firstDayNumber()){c+=1;let r=document.createElement("div");r.classList.add("prev-dates"),e.appendChild(r),s.push(t.prevMonthLastDate--)}else{let r=document.createElement("div");r.classList.add("number-item"),r.setAttribute("data-num",n);let a=document.createElement("a");a.classList.add("dateNumber"),a.href="#",a.textContent=n++,r.appendChild(a),e.appendChild(r)}for(let i=0;i<c+1;i++){let r=document.createElement("div");r.classList.add("number-item"),r.setAttribute("data-num",n);let a=document.createElement("a");a.classList.add("dateNumber"),a.href="#",a.textContent=n++,r.appendChild(a),e.appendChild(r)}t.highlightToday(),t.plotPrevMonthDates(s),t.plotNextMonthDates()},attachEvents:function(){let e=document.querySelector(".calendar .calendar-prev a"),n=document.querySelector(".calendar .calendar-next a"),c=document.querySelectorAll(".calendar .dateNumber");e.addEventListener("click",t.navigateToPreviousMonth),n.addEventListener("click",t.navigateToNextMonth);for(var s=0;s<c.length;s++)c[s].addEventListener("click",t.selectDate,!1)},highlightToday:function(){let e=t.localDate.getMonth()+1,n=o.getMonth()+1,c=t.localDate.getFullYear(),s=o.getFullYear();c===s&&e===n&&document.querySelectorAll(".number-item")&&document.querySelectorAll(".number-item")[o.getDate()-1].classList.add("calendar-today")},plotPrevMonthDates:function(e){e.reverse();for(let n=0;n<e.length;n++)document.querySelectorAll(".prev-dates")&&(document.querySelectorAll(".prev-dates")[n].textContent=e[n])},plotNextMonthDates:function(){let e=document.querySelector(".calendar-body").childElementCount;if(e>42){let n=49-e;t.loopThroughNextDays(n)}if(e>35&&e<=42){let n=42-e;t.loopThroughNextDays(42-e)}},loopThroughNextDays:function(e){let n=document.querySelector(".calendar-body");if(e>0)for(let c=1;c<=e;c++){let s=document.createElement("div");s.classList.add("next-dates"),s.textContent=c,n.appendChild(s)}},attachEventsOnNextPrev:function(){t.plotDates(),t.attachEvents()},init:function(){t.rendered||(t.plotSelectors(),t.rendered=!0),t.plotDates(),t.attachEvents()}};t.init()}function F(){document.querySelectorAll(".editor").forEach(t=>{t.addEventListener("input",()=>{t.style.height="auto",t.style.height=t.scrollHeight+"px"})})}function Y(){let o=document.querySelectorAll(".editor"),t=document.getElementById("dateInput"),e=document.querySelector(".calendar"),n=document.getElementById("priorityInput"),c=document.querySelector(".task-editor__priority-label"),s=document.querySelector(".popup-priority"),l=document.querySelectorAll(".popup-priority__item"),i=document.getElementById("projectInput"),r=document.querySelector(".popup-project"),a=document.querySelector(".popup-project__list"),m=document.querySelector(".popup-project__list-empty"),_=new I;function E(d,y,T){return function(S){S.stopPropagation(),d.classList.contains("task-editor__popup--open")?T():y()}}n.addEventListener("click",E(s,x,k)),i.addEventListener("click",E(r,w,C)),l.forEach(function(d){d.addEventListener("click",function(){let y=d.textContent.trim();switch(n.value=y,c.classList.remove("task-editor__priority-label--priority1","task-editor__priority-label--priority2","task-editor__priority-label--priority3"),y){case"\u0421\u0440\u043E\u0447\u043D\u043E":c.classList.add("task-editor__priority-label--priority1");break;case"\u0412\u0430\u0436\u043D\u043E":c.classList.add("task-editor__priority-label--priority2");break;case"\u0412\u0442\u043E\u0440\u043E\u0441\u0442\u0435\u043F\u0435\u043D\u043D\u043E":c.classList.add("task-editor__priority-label--priority3");break;default:break}k()})});let v=new Date,g=v.getDate(),h=["\u044F\u043D\u0432\u0430\u0440\u044F","\u0444\u0435\u0432\u0440\u0430\u043B\u044F","\u043C\u0430\u0440\u0442\u0430","\u0430\u043F\u0440\u0435\u043B\u044F","\u043C\u0430\u044F","\u0438\u044E\u043D\u044F","\u0438\u044E\u043B\u044F","\u0430\u0432\u0433\u0443\u0441\u0442\u0430","\u0441\u0435\u043D\u0442\u044F\u0431\u0440\u044F","\u043E\u043A\u0442\u044F\u0431\u0440\u044F","\u043D\u043E\u044F\u0431\u0440\u044F","\u0434\u0435\u043A\u0430\u0431\u0440\u044F"],p=v.getMonth(),f=h[p];t.value=`${g} ${f}`,t.addEventListener("click",()=>{e.style.display==="block"?M():V()}),e.addEventListener("click",function(d){if(d.target.classList.contains("dateNumber")){let y=d.target.textContent.trim(),T=e.querySelector(".calendar-month-label").textContent.trim();t.value=`${y} ${T}`,M()}});let L=N(k),u=N(C),b=N(M);function D(){M(),k(),C()}function q(d,y){D(),d.classList.add("task-editor__popup--open"),document.addEventListener("keydown",y)}function j(d,y){d.classList.remove("task-editor__popup--open"),document.removeEventListener("keydown",y)}function x(){q(s,L)}function k(){j(s,L)}function w(){q(r,u),W()}function C(){j(r,u)}function V(){D(),e.style.display="block",document.addEventListener("keydown",b)}function M(){e.style.display="none",document.removeEventListener("keydown",b)}function W(){let y=document.querySelector(".projects__list-wrapper").querySelectorAll(".project__title");a.innerHTML="",y.forEach(T=>{let S=document.createElement("li");S.classList.add("popup-project__item");let A=document.createElement("span");A.textContent=T.textContent.trim(),S.appendChild(A),a.appendChild(S),S.addEventListener("click",function(){let K=S.textContent.trim();i.value=K,C()})}),$()}function $(){document.querySelectorAll(".popup-project__list li").length===0?m.style.display="block":m.style.display="none"}document.addEventListener("click",function(d){!s.contains(d.target)&&d.target!==n&&k(),!r.contains(d.target)&&d.target!==i&&C(),!e.contains(d.target)&&d.target!==t&&M()})}var rt=document.querySelector(".sidebar"),B=document.querySelectorAll(".new-item");var H=100,O=500,P={TITLE:"\u0414\u043B\u0438\u043D\u0430 \u0437\u0430\u0433\u043E\u043B\u043E\u0432\u043A\u0430 \u043D\u0435 \u0434\u043E\u043B\u0436\u043D\u0430 \u043F\u0440\u0435\u0432\u044B\u0448\u0430\u0442\u044C 100 \u0441\u0438\u043C\u0432\u043E\u043B\u043E\u0432.",DISC:"\u0414\u043B\u0438\u043D\u0430 \u043E\u043F\u0438\u0441\u0430\u043D\u0438\u044F \u043D\u0435 \u0434\u043E\u043B\u0436\u043D\u0430 \u043F\u0440\u0435\u0432\u044B\u0448\u0430\u0442\u044C 500 \u0441\u0438\u043C\u0432\u043E\u043B\u043E\u0432."},G=document.querySelector("#task"),U=document.querySelector("#project"),X=document.querySelector("#project-editor"),J=document.querySelector("#task-editor"),Q=document.querySelectorAll(".list-with-tasks"),R=document.querySelectorAll(".projects__list");B.forEach(o=>{let t=o.querySelector(".new-item__task"),e=o.closest(".list"),n=e&&e.classList.contains("projects__list");t.addEventListener("click",()=>{let s=(n?X:J).content.cloneNode(!0),l=s.querySelector(".task-editor");if(l&&e){let r=e.querySelector(".manager-item");if(r){let g=function(p,f,L,u){p.value.trim().length>f?(L.textContent=u,p.classList.add("has-error"),_.disabled=!0):(L.textContent="",p.classList.remove("has-error"),_.disabled=!1)},h=function(){let p=a.value.trim()!=="",f=!a.classList.contains("has-error"),L=!m.classList.contains("has-error");_.disabled=!p||!f||!L};r.innerHTML="",r.appendChild(s),l.classList.add("task-editor--visible"),o.classList.add("new-item--disabled");let a=l.querySelector('[name="title_task"]'),m=l.querySelector('[name="discription_task"]'),_=l.querySelector(".task-editor__submit-btn"),E=document.createElement("span"),v=document.createElement("span");E.classList.add("task-editor__error"),v.classList.add("task-editor__error"),a.parentNode.appendChild(E),m.parentNode.appendChild(v),a.addEventListener("input",()=>{g(a,H,E,P.TITLE),h()}),m.addEventListener("input",()=>{g(m,O,v,P.DISC),h()}),h(),_.addEventListener("click",()=>{if(g(a,H,E,P.TITLE),g(m,O,v,P.DISC),a.classList.contains("has-error")||m.classList.contains("has-error"))return;let p=a.value,f=m.value;n?R.forEach(L=>{let u=U.content.cloneNode(!0),b=u.querySelector(".project__title"),D=u.querySelector(".project__discription");b.textContent=p,D.textContent=f,L.querySelector(".projects__list-wrapper").appendChild(u)}):Q.forEach(L=>{let u=G.content.cloneNode(!0),b=u.querySelector(".task__title"),D=u.querySelector(".task__discription"),q=u.querySelector(".task__data"),j=u.querySelector(".task__project"),x=u.querySelector(".task__circle"),k=l.querySelector('[name="data_task"]').value,w=l.querySelector('[name="priority_task"]').value,C=l.querySelector('[name="project_task"]').value;b.textContent=p,D.textContent=f,q.textContent=k,k||(q.textContent="\u0411\u0435\u0437 \u0441\u0440\u043E\u043A\u0430"),j.textContent=C,w==="\u0421\u0440\u043E\u0447\u043D\u043E"?x.classList.add("task__circle--priority1"):w==="\u0412\u0430\u0436\u043D\u043E"?x.classList.add("task__circle--priority2"):w==="\u0412\u0442\u043E\u0440\u043E\u0441\u0442\u0435\u043F\u0435\u043D\u043D\u043E"&&x.classList.add("task__circle--priority3"),L.querySelector(".list-with-tasks__wrapper").appendChild(u)}),l.reset(),h()}),n||Y(),F()}}let i=l.querySelector(".task-editor__close-btn");i&&i.addEventListener("click",()=>{l.classList.add("task-editor--hidden"),l.addEventListener("transitionend",function r(){l.remove(),o.classList.remove("new-item--disabled"),l.removeEventListener("transitionend",r)},{once:!0})})})});