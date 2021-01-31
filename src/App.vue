<template>
  <the-header></the-header>
  <router-view></router-view>
</template>

<script>
import TheHeader from "@/components/layout/TheHeader";

export default {
  name: 'App',
  components: {
    TheHeader
  }
}
</script>

<style>
#app {
  font-family: 'Quicksand', sans-serif;
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
}
</style>
