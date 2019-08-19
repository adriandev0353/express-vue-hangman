<template>
  <header class="header">
    <div>
      <b-navbar type="dark" variant="dark">
        <b-navbar-nav>
          <b-nav-item>
            <router-link to="/">Play</router-link>
          </b-nav-item>
          <b-nav-item>
            <router-link to="/about">Leaderboard</router-link>
          </b-nav-item>
          <b-nav-item>
            <router-link to="/new/word">Add new word</router-link>
          </b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav class='ml-auto'>
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
  color: grey;
}
</style>