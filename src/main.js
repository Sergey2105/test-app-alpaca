import "./styles/root.scss";
import "./styles/main.scss";
import "./styles/normalize.scss";

const buttonToggle = document.getElementById("theme-toggle");

buttonToggle.addEventListener("click", () => {
  if (document.body.classList.contains("theme-dark")) {
    document.body.classList.remove("theme-dark");
    document.body.classList.add("theme-light");
  } else {
    document.body.classList.remove("theme-light");
    document.body.classList.add("theme-dark");
  }
});

const calendar = document.getElementById("calendar");

const totalDaysCount = 30;
const totalDaysNextCount = 5;

let startDate = null;
let endDate = null;

const resetCalendar = () => {
  startDate = null;
  endDate = null;

  document.querySelectorAll(".calendar__date").forEach((day) => {
    day.classList.remove("calendar__date_current");
    day.classList.remove("calendar__date_range-btn");
    const currentWrapper = day.parentElement;
    if (currentWrapper) {
      currentWrapper.classList.remove("calendar__date_range");
      currentWrapper.classList.remove("calendar__date_start");
      currentWrapper.classList.remove("calendar__date_end");

      currentWrapper.classList.remove("calendar__date_range_start");
      currentWrapper.classList.remove("calendar__date_range_end");
    }
  });
};

const changeDate = (day, btn, wrapper) => {
  if (!startDate) {
    resetCalendar();
    startDate = day;
    btn.classList.add("calendar__date_current");
  } else if (!endDate) {
    if (day === startDate) {
      resetCalendar();
    } else if (day < startDate) {
      resetCalendar();
      startDate = day;
      btn.classList.add("calendar__date_current");
    } else {
      endDate = day;
      btn.classList.add("calendar__date_current");
      wrapper.classList.add("calendar__date_end");
      const startBtn = document.querySelector(
        `.calendar__date[data-day="${startDate}"]`
      );
      const startWrapper = startBtn?.parentElement;
      if (startWrapper) {
        startWrapper.classList.add("calendar__date_start");
      }
      document.querySelectorAll(".calendar__date").forEach((date) => {
        const currentDay = parseInt(date.dataset.day, 10);
        if (currentDay > startDate && currentDay < endDate) {
          const currentWrapper = date.parentElement;
          date.classList.add("calendar__date_range-btn");
          currentWrapper.classList.add("calendar__date_range");
        }
      });

      const rangeButtons = [
        ...document.querySelectorAll(
          ".calendar__date_current, .calendar__date_range-btn"
        ),
      ];

      const first = rangeButtons[0];
      const firstDay = parseInt(first?.dataset.day, 10);

      if (
        first?.classList.contains("calendar__date_current") &&
        (firstDay - 1) % 7 === 0
      ) {
        rangeButtons.shift();
      }

      const last = rangeButtons[rangeButtons.length - 1];
      const lastDay = parseInt(last?.dataset.day, 10);
      if (
        last?.classList.contains("calendar__date_current") &&
        lastDay % 7 === 0
      ) {
        rangeButtons.pop();
      }

      rangeButtons.forEach((btn) => {
        const day = parseInt(btn.dataset.day, 10);
        const wrapper = btn.parentElement;

        const isLeftEdge = (day - 1) % 7 === 0;
        const isRightEdge = day % 7 === 0;

        if (isLeftEdge) wrapper.classList.add("calendar__date_range_start");
        if (isRightEdge) wrapper.classList.add("calendar__date_range_end");
      });
    }
  } else {
    resetCalendar();
    startDate = day;
    endDate = null;
    btn.classList.add("calendar__date_current");
  }
};

const renderCalendar = () => {
  calendar.innerHTML = "";
  for (let i = 1; i <= totalDaysCount; i++) {
    const wrapper = document.createElement("div");
    wrapper.className = "calendar__item";

    const btn = document.createElement("button");
    btn.className = "calendar__date calendar__date_active";
    btn.textContent = i;
    btn.dataset.day = i;
    btn.addEventListener("click", () => changeDate(i, btn, wrapper));

    wrapper.appendChild(btn);
    calendar.appendChild(wrapper);
  }

  for (let i = 1; i <= totalDaysNextCount; i++) {
    const wrapper = document.createElement("div");
    wrapper.className = "calendar__item";

    const btn = document.createElement("button");
    btn.className = "calendar__date calendar__date_inactive";
    btn.textContent = i;
    btn.dataset.day = totalDaysCount + i;
    btn.addEventListener("click", () =>
      changeDate(totalDaysCount + i, btn, wrapper)
    );

    wrapper.appendChild(btn);
    calendar.appendChild(wrapper);
  }
};

renderCalendar();
