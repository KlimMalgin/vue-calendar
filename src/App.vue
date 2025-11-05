<template>
  <div>
    <h1>{{ message }}</h1>
    <Calendar :locale="lang" />
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
      lang: "ru",
    };
  },
};
</script>

<style scoped></style>
