<template>
  <the-header></the-header>
  <router-view v-slot="slotProps">
    <transition name="route" mode="out-in">
      <component :is="slotProps.Component"></component>
    </transition>
  </router-view>
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

.route-enter-from {
  opacity: 0;
  transform: translateY(-30px);
}

.route-enter-to,
.route-leave-from {
  opacity: 1;
  transform: translateY(0);
}

.route-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.route-enter-active {
  transition: all .3s ease-out;
}

.route-leave-active {
  transition: all .3s ease-in;
}
</style>
