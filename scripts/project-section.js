var b=document.querySelector(".sidebar"),y=document.querySelectorAll(".new-item");var f=document.querySelector(".button-date"),p=f.querySelector(".button-date__title"),k=f.querySelector(".button-date__arrow--left"),m=f.querySelector(".button-date__arrow--right"),g=document.querySelector(".dashboard .list-with-tasks__wrapper"),a=new Date;h();_();m.addEventListener("click",function(){m.classList.contains("button-date__arrow--disabled")||(a.setDate(a.getDate()+1),h(),_())});k.addEventListener("click",function(){k.classList.contains("button-date__arrow--disabled")||(a.setDate(a.getDate()-1),h(),_())});function h(){let t=new Date,e=new Date(t);e.setDate(e.getDate()+1),d(a,t)?p.textContent="\u0421\u0435\u0433\u043E\u0434\u043D\u044F":d(a,e)?p.textContent="\u0417\u0430\u0432\u0442\u0440\u0430":p.textContent=L(a),T()}function T(){let t=new Date,e="button-date__arrow--disabled";k.classList.toggle(e,d(a,t)),m.classList.toggle(e,q(a,t))}function _(){let t=g.querySelectorAll(".task"),e=/(\d+)\s+(\S+)/;t.forEach(s=>{let c=s.querySelector(".task__data").textContent;if(c.trim()==="\u0411\u0435\u0437 \u0441\u0440\u043E\u043A\u0430"){s.classList.add("task--hidden");return}if(s.classList.contains("task--completed")){s.classList.add("task--hidden");return}let[,i,o]=c.match(e),n=new Date(a.getFullYear(),S(o),parseInt(i));d(a,n)?s.classList.remove("task--hidden"):s.classList.add("task--hidden")})}function L(t){let e={weekday:"long",month:"long",day:"numeric"};return t.toLocaleDateString("ru-RU",e)}function d(t,e){return t.getFullYear()===e.getFullYear()&&t.getMonth()===e.getMonth()&&t.getDate()===e.getDate()}function q(t,e){let s=new Date(e.getFullYear(),e.getMonth(),e.getDate()+7);return t>=s}function S(t){return["\u042F\u043D\u0432","\u0424\u0435\u0432","\u041C\u0430\u0440","\u0410\u043F\u0440","\u041C\u0430\u0439","\u0418\u044E\u043D","\u0418\u044E\u043B","\u0410\u0432\u0433","\u0421\u0435\u043D","\u041E\u043A\u0442","\u041D\u043E\u044F","\u0414\u0435\u043A"].indexOf(t)}var x=document.querySelectorAll(".tasks__header-button"),v=document.querySelector(".tasks .list-with-tasks__wrapper");x.forEach(t=>{t.addEventListener("click",function(){x.forEach(e=>e.classList.remove("tasks__header-button--active")),t.classList.add("tasks__header-button--active"),w(t.textContent.trim())})});function w(t){v.querySelectorAll(".task").forEach(s=>{t==="\u0417\u0430\u0432\u0435\u0440\u0448\u0435\u043D\u043D\u044B\u0435"?s.classList.contains("task--completed")?s.classList.remove("task--hidden"):s.classList.add("task--hidden"):t==="\u0410\u043A\u0442\u0438\u0432\u043D\u044B\u0435"?s.classList.contains("task--completed")||s.classList.contains("task--expired")?s.classList.add("task--hidden"):s.classList.remove("task--hidden"):t==="\u041F\u0440\u043E\u0441\u0440\u043E\u0447\u0435\u043D\u043D\u044B\u0435"&&(s.classList.contains("task--expired")?s.classList.remove("task--hidden"):s.classList.add("task--hidden"))})}function M(t){let e=document.querySelector(".projects"),s=document.querySelector(".projects-task"),c=document.querySelector(".app-header__title"),i=t.target.closest(".project").querySelector(".project__title").textContent,o=document.querySelectorAll(".list-with-tasks__wrapper .task");C(),document.querySelectorAll(`.list-with-tasks__wrapper .task[data-project="${i}"]`).forEach(r=>{r.classList.remove("task--hidden")}),o.forEach(r=>{(r.classList.contains("task--expired")||r.classList.contains("task--completed"))&&r.classList.add("task--hidden")}),e.style.display="none",s.style.display="block",s.dataset.project=i;let u="\u041F\u0440\u043E\u0435\u043A\u0442\u044B / "+i.slice(0,20)+(i.length>17?"...":"");c.textContent=u,document.querySelector(".button-back").classList.remove("tasks__header-button--active")}function P(){let t=document.querySelector(".projects"),e=document.querySelector(".projects-task"),s=document.querySelector(".app-header__title"),c=document.querySelectorAll(".project__title");document.querySelectorAll(".manager-item").forEach(n=>{n.innerHTML=""}),y.forEach(n=>{n.classList.remove("new-item--disabled")}),e.style.display="none",t.style.display="block";let o=s.textContent;c.forEach((n,u)=>{let l=n.textContent,r=l.slice(0,20)+(l.length>17?"...":"");u===0?(o=o.replace("/ "+l,""),o=o.replace("/ "+r,"")):o.includes(" / "+l)&&(o=o.replace(" / "+l,""),o=o.replace(" / "+r,""))}),s.textContent=o}function C(){let t=event.target.closest(".project").querySelector(".project__title").textContent;document.querySelectorAll(".list-with-tasks__wrapper .task").forEach(c=>{c.classList.add("task--hidden")}),document.querySelectorAll(`.list-with-tasks__wrapper .task[data-project="${t}"]`).forEach(c=>{c.classList.remove("task--hidden")})}export{P as navigateBackToProjects,M as navigateToProjectTasks,C as updateTaskListByProject};
