const calendarControl = new CalendarControl();

function CalendarControl() {
  const calendar = new Date();
  const calendarControl = {
    rendered: false,
    localDate: new Date(),
    prevMonthLastDate: null,
    calWeekDays: ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"],
    calMonthName: [
      "Январь",
      "Ферваль",
      "Март",
      "Апрель",
      "Май",
      "Июнь",
      "Июль",
      "Август",
      "Сентябрь",
      "Октябрь",
      "Ноябрь",
      "Декабрь"
    ],
    daysInMonth: function (month, year) {
      return new Date(year, month, 0).getDate();
    },
    firstDay: function () {
      return new Date(calendar.getFullYear(), calendar.getMonth(), 1);
    },
    lastDay: function () {
      return new Date(calendar.getFullYear(), calendar.getMonth() + 1, 0);
    },
    firstDayNumber: function () {
    let firstDay = calendarControl.firstDay().getDay();
    return (firstDay === 0 ? 7 : firstDay);
  },
    lastDayNumber: function () {
      return calendarControl.lastDay().getDay() + 1;
    },
    getPreviousMonthLastDate: function () {
      let lastDate = new Date(
        calendar.getFullYear(),
        calendar.getMonth(),
        0
      ).getDate();
      return lastDate;
    },
    navigateToPreviousMonth: function () {
      calendar.setMonth(calendar.getMonth() - 1);
      calendarControl.attachEventsOnNextPrev();
    },
    navigateToNextMonth: function () {
      calendar.setMonth(calendar.getMonth() + 1);
      calendarControl.attachEventsOnNextPrev();
    },
    navigateToCurrentMonth: function () {
      let currentMonth = calendarControl.localDate.getMonth();
      let currentYear = calendarControl.localDate.getFullYear();
      calendar.setMonth(currentMonth);
      calendar.setYear(currentYear);
      calendarControl.attachEventsOnNextPrev();
    },
    displayYear: function () {
      let yearLabel = document.querySelector(".calendar .calendar-year-label");
      yearLabel.innerHTML = calendar.getFullYear();
    },
    displayMonth: function () {
      let monthLabel = document.querySelector(
        ".calendar .calendar-month-label"
      );
      monthLabel.innerHTML = calendarControl.calMonthName[calendar.getMonth()];
    },
    plotSelectors: function () {
      const calendar = document.querySelector(".calendar");
      const calendarInner = document.createElement("div");
      calendarInner.classList.add("calendar-inner");

      const calendarControls = document.createElement("div");
      calendarControls.classList.add("calendar-controls");

      const calendarPrev = document.createElement("div");
      calendarPrev.classList.add("calendar-prev");
      const prevLink = document.createElement("a");
      prevLink.setAttribute("href", "#");
      const prevSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      prevSvg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
      prevSvg.setAttribute("width", "128");
      prevSvg.setAttribute("height", "128");
      prevSvg.setAttribute("viewBox", "0 0 128 128");
      const prevPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
      prevPath.setAttribute("fill", "#666");
      prevPath.setAttribute("d", "M88.2 3.8L35.8 56.23 28 64l7.8 7.78 52.4 52.4 9.78-7.76L45.58 64l52.4-52.4z");
      prevSvg.appendChild(prevPath);
      prevLink.appendChild(prevSvg);
      calendarPrev.appendChild(prevLink);

      const calendarYearMonth = document.createElement("div");
      calendarYearMonth.classList.add("calendar-year-month");
      const calendarMonthLabel = document.createElement("div");
      calendarMonthLabel.classList.add("calendar-month-label");
      const monthDash = document.createElement("div");
      monthDash.textContent = "-";
      const calendarYearLabel = document.createElement("div");
      calendarYearLabel.classList.add("calendar-year-label");
      calendarYearMonth.appendChild(calendarMonthLabel);
      calendarYearMonth.appendChild(monthDash);
      calendarYearMonth.appendChild(calendarYearLabel);

      const calendarNext = document.createElement("div");
      calendarNext.classList.add("calendar-next");
      const nextLink = document.createElement("a");
      nextLink.setAttribute("href", "#");
      const nextSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      nextSvg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
      nextSvg.setAttribute("width", "128");
      nextSvg.setAttribute("height", "128");
      nextSvg.setAttribute("viewBox", "0 0 128 128");
      const nextPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
      nextPath.setAttribute("fill", "#666");
      nextPath.setAttribute("d", "M38.8 124.2l52.4-52.42L99 64l-7.77-7.78-52.4-52.4-9.8 7.77L81.44 64 29 116.42z");
      nextSvg.appendChild(nextPath);
      nextLink.appendChild(nextSvg);
      calendarNext.appendChild(nextLink);

      calendarControls.appendChild(calendarPrev);
      calendarControls.appendChild(calendarYearMonth);
      calendarControls.appendChild(calendarNext);

      const calendarBody = document.createElement("div");
      calendarBody.classList.add("calendar-body");

      calendarInner.appendChild(calendarControls);
      calendarInner.appendChild(calendarBody);

      calendar.appendChild(calendarInner);
    },
    plotDayNames: function () {
      const calendarBody = document.querySelector(".calendar .calendar-body");
      calendarControl.calWeekDays.forEach(day => {
        const dayElement = document.createElement("div");
        dayElement.textContent = day;
        calendarBody.appendChild(dayElement);
      });
    },
    plotDates: function () {
      const calendarBody = document.querySelector(".calendar .calendar-body");
      if (!calendarControl.rendered) {
        calendarControl.plotSelectors();
        calendarControl.rendered = true;
      }
      calendarBody.innerHTML = ""; 
    
      calendarControl.plotDayNames();
      calendarControl.displayMonth();
      calendarControl.displayYear();
    
      let count = 1;
      let prevDateCount = 0;
      calendarControl.prevMonthLastDate = calendarControl.getPreviousMonthLastDate();
      let prevMonthDatesArray = [];
      let calendarDays = calendarControl.daysInMonth(calendar.getMonth() + 1, calendar.getFullYear());
    
      for (let i = 1; i < calendarDays; i++) {
        if (i < calendarControl.firstDayNumber()) {
          prevDateCount += 1;
          const prevDateElement = document.createElement("div");
          prevDateElement.classList.add("prev-dates");
          calendarBody.appendChild(prevDateElement);
          prevMonthDatesArray.push(calendarControl.prevMonthLastDate--);
        } else {
          const numberItemElement = document.createElement("div");
          numberItemElement.classList.add("number-item");
          numberItemElement.setAttribute("data-num", count);
          const linkElement = document.createElement("a");
          linkElement.classList.add("dateNumber");
          linkElement.href = "#";
          linkElement.textContent = count++;
          numberItemElement.appendChild(linkElement);
          calendarBody.appendChild(numberItemElement);
        }
      }
    
      for (let j = 0; j < prevDateCount + 1; j++) {
        const numberItemElement = document.createElement("div");
        numberItemElement.classList.add("number-item");
        numberItemElement.setAttribute("data-num", count);
        const linkElement = document.createElement("a");
        linkElement.classList.add("dateNumber");
        linkElement.href = "#";
        linkElement.textContent = count++;
        numberItemElement.appendChild(linkElement);
        calendarBody.appendChild(numberItemElement);
      }
    
      calendarControl.highlightToday();
      calendarControl.plotPrevMonthDates(prevMonthDatesArray);
      calendarControl.plotNextMonthDates();
    },
    attachEvents: function () {
      let prevBtn = document.querySelector(".calendar .calendar-prev a");
      let nextBtn = document.querySelector(".calendar .calendar-next a");
      let dateNumber = document.querySelectorAll(".calendar .dateNumber");
      prevBtn.addEventListener(
        "click",
        calendarControl.navigateToPreviousMonth
      );
      nextBtn.addEventListener("click", calendarControl.navigateToNextMonth);
      for (var i = 0; i < dateNumber.length; i++) {
          dateNumber[i].addEventListener(
            "click",
            calendarControl.selectDate,
            false
          );
      }
    },
    highlightToday: function () {
      let currentMonth = calendarControl.localDate.getMonth() + 1;
      let changedMonth = calendar.getMonth() + 1;
      let currentYear = calendarControl.localDate.getFullYear();
      let changedYear = calendar.getFullYear();
      if (
        currentYear === changedYear &&
        currentMonth === changedMonth &&
        document.querySelectorAll(".number-item")
      ) {
        document
          .querySelectorAll(".number-item")
          [calendar.getDate() - 1].classList.add("calendar-today");
      }
    },
    plotPrevMonthDates: function(dates){
      dates.reverse();
      for(let i=0;i<dates.length;i++) {
          if(document.querySelectorAll(".prev-dates")) {
              document.querySelectorAll(".prev-dates")[i].textContent = dates[i];
          }
      }
    },
    plotNextMonthDates: function(){
     let childElemCount = document.querySelector('.calendar-body').childElementCount;

     if(childElemCount > 42 ) {
         let diff = 49 - childElemCount;
         calendarControl.loopThroughNextDays(diff);
     }

     if(childElemCount > 35 && childElemCount <= 42 ) {
      let diff = 42 - childElemCount;
      calendarControl.loopThroughNextDays(42 - childElemCount);
     }

    },
    loopThroughNextDays: function(count) {
      const calendarBody = document.querySelector('.calendar-body');
      if (count > 0) {
        for (let i = 1; i <= count; i++) {
          const nextDateElement = document.createElement("div");
          nextDateElement.classList.add("next-dates");
          nextDateElement.textContent = i;
          calendarBody.appendChild(nextDateElement);
        }
      }
    },
    
    attachEventsOnNextPrev: function () {
      calendarControl.plotDates();
      calendarControl.attachEvents();
    },
    init: function () {
      if (!calendarControl.rendered) {
        calendarControl.plotSelectors();
        calendarControl.rendered = true;
      }
      calendarControl.plotDates();
      calendarControl.attachEvents();
    }
  };
  calendarControl.init();
}


