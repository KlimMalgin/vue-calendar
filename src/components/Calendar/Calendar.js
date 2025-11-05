export default {
  name: "Calendar",
  props: {
    initialDate: {
      type: String,
      default: null,
    },
    locale: {
      type: String,
      default: "en",
    },
  },
  data() {
    const today = this._parseDateString(this.initialDate) || this._getToday();
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
    _parseDateString(str) {
      if (!str) return null;
      const m = /^\s*(\d{4})-(\d{1,2})-(\d{1,2})\s*$/.exec(str);
      if (!m) return null;
      const y = parseInt(m[1], 10);
      const mo = parseInt(m[2], 10) - 1;
      const d = parseInt(m[3], 10);
      const date = new Date(y, mo, d);
      if (
        date.getFullYear() !== y ||
        date.getMonth() !== mo ||
        date.getDate() !== d
      )
        return null;
      return date;
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
  watch: {
    initialDate(newVal) {
      const d = this._parseDateString(newVal) || this._getToday();
      this.displayYear = d.getFullYear();
      this.displayMonth = d.getMonth();
      this.selectedDate = this._formatDateISO(d);
      this.$emit("date-selected", this.selectedDate);
    },
  },
};
