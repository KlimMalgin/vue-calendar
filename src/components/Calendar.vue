<template>
  <div class="calendar">
    <div class="calendar-header">
      <div class="title">{{ displayYear }} - {{ displayMonth }}</div>
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
  data() {
    const today = this._getToday();
    return {
      message: "Hello World",
      displayYear: today.getFullYear(),
      displayMonth: today.getMonth(),
      selectedDate: this._formatDateISO(today),
    };
  },
  computed: {
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

<style scoped></style>
