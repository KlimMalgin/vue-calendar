<template>
  <div>
    <h1>{{ message }}</h1>
    <Calendar
      :initialDate="startDate"
      :locale="lang"
      @date-selected="handleDateSelected"
    />

    <div>
      <br />
      <label>Start date (YYYY-MM-DD): <input v-model="startDate" /></label>
      <br />
      <br />
      <label
        >Locale:
        <select v-model="lang">
          <option value="en">en</option>
          <option value="ru">ru</option>
        </select>
      </label>
      <br />
      <br />
      <label>Selected date: {{ selected }}</label>
    </div>
  </div>
</template>

<script>
import Calendar from "./components/Calendar/Calendar.vue";
export default {
  name: "App",
  components: {
    Calendar,
  },
  data() {
    return {
      message: "Calendar",
      lang: "ru",
      startDate: null,
      selected: null,
    };
  },
  methods: {
    handleDateSelected(date) {
      this.selected = date;
    },
  },
};
</script>

<style scoped></style>
