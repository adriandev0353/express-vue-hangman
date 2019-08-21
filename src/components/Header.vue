<template>
  <header class="header">
    <div>
      <b-navbar type="primary" variant="primary">
        <b-navbar-brand href="#">
      <img src="../assets/hangman-game.svg" class="d-inline-block align-top" alt="logo">
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
          <b-nav-item>
            <router-link to="/logout">Logout</router-link>
          </b-nav-item>
        </b-navbar-nav>
      </b-navbar>
    </div>
  </header>
</template>

<style scoped>
.header a {
  text-decoration: none;
  color: white;
}
a:hover {
  color: #ccc;
}
img {
  width: 50px;
  height: 50px;
}
</style>