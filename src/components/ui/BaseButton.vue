<template>
  <button v-if="!link" :class="mode">
    <slot></slot>
  </button>
  <router-link v-else :to="to" :class="mode">
    <slot></slot>
  </router-link>
</template>

<script>
export default {
  name: "BaseButton",
  props: {
    link: {
      type: Boolean,
      required: false,
      default: false
    },
    to: {
      type: String,
      required: false,
      default: '/'
    },
    mode: {
      type: String,
      required: false,
      default: null
    }
  }
}
</script>

<style scoped>
  button,
  a {
    text-decoration: none;
    padding: 0.75rem 1.5rem;
    font: inherit;
    background-color: #2f6f71;
    border: 1px solid #2f6f71;
    color: white;
    cursor: pointer;
    border-radius: 5px;
    margin-right: 0.5rem;
    display: inline-block;
    font-weight: bold;
  }

  a:hover,
  a:active,
  button:hover,
  button:active {
    background-color: #2f6f71;
    border-color: #2f6f71;
  }

  .flat {
    background-color: transparent;
    color: #2f6f71;
    border: none;
  }

  .outline {
    background-color: transparent;
    border-color: #2f6f71;
    color: #2f6f71;
  }

  .flat:hover,
  .flat:active,
  .outline:hover,
  .outline:active {
    background-color: #dff5e8;
  }
</style>