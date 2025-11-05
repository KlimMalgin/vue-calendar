<template>
  <div class="calendar">
    <div class="calendar-header">
      <button class="nav" @click="prevMonth">‹</button>
      <div class="title">{{ monthNames[displayMonth] }} {{ displayYear }}</div>
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
import CalendarComponent from "./Calendar.js";
import "./styles.css";

export default CalendarComponent;
</script>
