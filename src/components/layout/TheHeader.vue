<template>
  <header>
    <nav>
      <h1 class="logo-header">
        <img
            alt="logo"
            src="https://img.icons8.com/clouds/70/000000/training.png"
        />
        <router-link to="/">
          Find a Coach
        </router-link>
      </h1>
      <ul>
        <li>
          <router-link to="/coaches">All Coaches</router-link>
        </li>
        <li v-if="isLoggedIn">
          <router-link to="/requests">Requests</router-link>
        </li>
        <li v-else>
          <router-link to="/auth">Login</router-link>
        </li>
        <li v-if="isLoggedIn">
          <base-button @click="logout">Logout</base-button>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  name: "TheHeader",
  computed: {
    isLoggedIn() {
      return this.$store.getters['auth/isAuth'];
    },
  },
  methods: {
    logout() {
      this.$store.dispatch('auth/logout');
    }
  }
}
</script>

<style scoped>
  .logo-header {
    display: flex;
    align-items: center;
  }
  header {
    width: 100%;
    height: 5rem;
    background-color: #b7953f;
    display: flex;
    justify-content: center;
    align-items: center;
    text-shadow: 0 1px 1px rgba(0, 0, 0, .6);
  }

  header a {
    text-decoration: none;
    color: #e7dbe0;
    display: inline-block;
    padding: 0.75rem 1.5rem;
    border: 1px solid transparent;
    font-weight: bold;
  }

  a:active,
  a:hover,
  a.router-link-active {
    border: 2px solid #e7dbe0;
    border-radius: 20px;
  }

  h1 {
    margin: 0;
  }

  h1 a {
    color: white;
    margin: 0;
    text-shadow: 0 1px 1px rgba(0, 0, 0, .6);
  }

  h1 a:hover,
  h1 a:active,
  h1 a.router-link-active {
    border-color: transparent;
  }

  header nav {
    width: 90%;
    margin: auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  header ul {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  li {
    margin: 0 0.5rem;
  }

</style>