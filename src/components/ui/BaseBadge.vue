<template>
  <span class="badge" :class="type">
    {{ text }}
  </span>
</template>

<script>
export default {
  name: "BaseBadge",
  props: [
      'type',
      'title'
  ],
  computed: {
    text() {
      return this.title.toUpperCase();
    }
  }
}
</script>

<style scoped>
.badge {
  background-color: #ccc;
  color: #252525;
  border-radius: 30px;
  padding: 0.5rem 1.5rem;
  display: inline-block;
  margin: 1rem .5rem 1rem 0;
}

.frontend {
  background-color: #d75e0d;
  color: white;
}

.backend {
  background-color: #a55b2a;
  color: white;
}

.career {
  background-color: #725039;
  color: white;
}
</style>