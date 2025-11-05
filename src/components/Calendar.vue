<template>
  <div class="calendar">
    <div class="calendar-header">
      <button class="nav" @click="prevMonth">‹</button>
      <div class="title">{{ displayYear }} - {{ displayMonth }}</div>
      <button class="nav" @click="nextMonth">›</button>
    </div>

    <div class="weekdays">
      <div v-for="(d, idx) in weekdayNames" :key="idx" class="weekday">
        {{ d }}
      </div>
    </div>

    <div class="days">
      <div
        v-for="(cell, idx) in monthGrid"
        :key="idx"
        class="day-cell"
        :class="{
          'other-month': !cell.inCurrentMonth,
          today: cell.isToday,
          selected: isSelected(cell.date),
        }"
        @click="selectDate(cell)"
      >
        <span class="day-number">{{ cell.day }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Calendar",
  props: {
    locale: {
      type: String,
      default: "en",
    },
  },
  data() {
    const today = this._getToday();
    return {
      message: "Hello World",
      displayYear: today.getFullYear(),
      displayMonth: today.getMonth(),
      selectedDate: this._formatDateISO(today),

      locales: {
        en: {
          months: [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ],
          weekdays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        },
        ru: {
          months: [
            "Январь",
            "Февраль",
            "Март",
            "Апрель",
            "Май",
            "Июнь",
            "Июль",
            "Август",
            "Сентябрь",
            "Октябрь",
            "Ноябрь",
            "Декабрь",
          ],
          weekdays: ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"],
        },
      },
    };
  },
  computed: {
    localeObj() {
      return this.locales[this.locale] || this.locales.en;
    },
    monthNames() {
      return this.localeObj.months;
    },
    weekdayNames() {
      return this.localeObj.weekdays;
    },
    monthGrid() {
      const year = this.displayYear;
      const month = this.displayMonth;
      const firstOfMonth = new Date(year, month, 1);
      const firstDayWeekIdx = this._localWeekdayIndex(firstOfMonth.getDay());
      const startDate = new Date(year, month, 1 - firstDayWeekIdx);

      const cells = [];
      for (let i = 0; i < 42; i++) {
        console.log(
          i,
          startDate.getDate() + i,
          startDate.getMonth(),
          startDate.getFullYear()
        );
        const d = new Date(
          startDate.getFullYear(),
          startDate.getMonth(),
          startDate.getDate() + i
        );
        const inCurrentMonth = d.getMonth() === month;

        cells.push({
          date: d,
          inCurrentMonth,
          day: d.getDate(),
          isToday: this._isSameDay(d, this._getToday()),
        });
      }
      return cells;
    },
  },
  methods: {
    // ------

    prevMonth() {
      if (this.displayMonth === 0) {
        this.displayMonth = 11;
        this.displayYear -= 1;
      } else {
        this.displayMonth -= 1;
      }
    },
    nextMonth() {
      if (this.displayMonth === 11) {
        this.displayMonth = 0;
        this.displayYear += 1;
      } else {
        this.displayMonth += 1;
      }
    },
    // ------
    selectDate(cell) {
      const d = cell.date;
      if (!cell.inCurrentMonth) {
        this.displayYear = d.getFullYear();
        this.displayMonth = d.getMonth();
      }
      this.selectedDate = this._formatDateISO(d);
      this.$emit("date-selected", this.selectedDate);
      this.$emit("input", this.selectedDate);
    },
    isSelected(date) {
      return this._formatDateISO(date) === this.selectedDate;
    },

    // ------
    _formatDateISO(d) {
      const yyyy = d.getFullYear();
      const mm = (d.getMonth() + 1).toString().padStart(2, "0");
      const dd = d.getDate().toString().padStart(2, "0");
      return `${yyyy}-${mm}-${dd}`;
    },

    _getToday() {
      const now = new Date();
      return new Date(now.getFullYear(), now.getMonth(), now.getDate());
    },
    _isSameDay(a, b) {
      return (
        a.getFullYear() === b.getFullYear() &&
        a.getMonth() === b.getMonth() &&
        a.getDate() === b.getDate()
      );
    },

    _localWeekdayIndex(jsWeekday) {
      const first =
        this.weekdayNames && this.weekdayNames[0]
          ? this.weekdayNames[0].toLowerCase()
          : "sun";
      const startsMonday = ["пн", "mon", "m", "mo"].some(
        (x) => first.indexOf(x) === 0
      );
      if (startsMonday) {
        return jsWeekday === 0 ? 6 : jsWeekday - 1;
      }
      return jsWeekday;
    },
  },
};
</script>

<style scoped>
.calendar {
  width: 320px;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 8px;
  font-family: Arial, Helvetica, sans-serif;
}
.calendar-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
}
.title {
  font-weight: 600;
}
.nav {
  background: none;
  border: 0;
  font-size: 20px;
  cursor: pointer;
}
.weekdays {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  text-align: center;
  font-size: 12px;
  color: #666;
  margin-bottom: 6px;
}
.weekday {
  padding: 4px 0;
}
.days {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-auto-rows: 40px;
  gap: 4px;
}
.day-cell {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 6px;
  border-radius: 6px;
  cursor: pointer;
}
.day-cell.other-month {
  opacity: 0.45;
}
.day-cell.today {
  box-shadow: inset 0 0 0 2px #1976d2;
}
.day-cell.selected {
  background: #1976d2;
  color: #fff;
}
.day-number {
  font-size: 14px;
}
</style>
