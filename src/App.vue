<template>
  <div>
    <h1>{{ message }}</h1>
    <Calendar />
  </div>
</template>

<script>
import Calendar from "./components/Calendar.vue";
export default {
  name: "App",
  components: {
    Calendar,
  },
  data() {
    return {
      message: "Hello World",
    };
  },
};
</script>

<style scoped></style>
