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
            <b-dropdown-item to="/profile">Profile</b-dropdown-item>
            <b-dropdown-item to="/friends">Friends</b-dropdown-item>
            <b-dropdown-item v-if="user === 'admin'" to="/admin">Admin Page</b-dropdown-item>
            <b-dropdown-divider></b-dropdown-divider>
            <b-dropdown-item @click="logout">Logout</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-navbar>
    </div>
  </header>
</template>

<script>
import { EventBus } from "../event-bus";
import axios from "axios";

export default {
  data() {
    return {
      user: ""
    };
  },
  mounted() {
    // Listen for the 'clicked-event' and its payload.
    EventBus.$on("userData", name => {
      this.user = name;
    });
  },
  methods: {
    logout() {
      localStorage.clear();
      this.user = "";
      this.$router.push({ name: "login" });

      axios
        .post("https://hangman-webapp.herokuapp.com/api/logout")
        .then(res => {
          console.log("logged out");
        });
    },
    setUser(value) {
      this.user = value;
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
a:hover {
  color: rgb(196, 195, 195);
}
img {
  width: 50px;
  height: 50px;
}
</style>