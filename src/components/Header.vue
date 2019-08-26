<template>
  <header class="header">
    <div>
      <b-navbar type="dark" variant="dark">
        <b-navbar-brand href="#">
          <img src="../assets/hangman-game.svg" class="d-inline-block align-top" alt="logo" />
        </b-navbar-brand>
        <b-navbar-nav>
          <b-nav-item>
            <router-link to="/Play">Play</router-link>
          </b-nav-item>
          <b-nav-item>
            <router-link to="/leader">Leaderboard</router-link>
          </b-nav-item>
          <b-nav-item>
            <router-link to="/new/word">Add new word</router-link>
          </b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown text="Other" right>
            <b-dropdown-item><router-link to="/profile">Profile</router-link></b-dropdown-item>
            <b-dropdown-divider></b-dropdown-divider>
            <b-dropdown-item>
              <a class="dropdown" @click="logout" href="#">Logout</a>
            </b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-navbar>
    </div>
  </header>
</template>

<script>
export default {
  methods: {
    logout() {
      localStorage.clear();
      this.$router.push({ name: "login" });
    }
  }
};
</script>

<style scoped>
.header a {
  text-decoration: none;
  color: white;
}
.dropdown a {
  color: black;
}
span {
  color: white;
}
img {
  width: 50px;
  height: 50px;
}
</style>