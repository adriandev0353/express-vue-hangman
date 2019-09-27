<template>
  <header class="header">
    <div>
      <b-navbar toggleable="sm" type="light" variant="light">
        <b-navbar-brand href="/#/Play">
          <img src="../assets/hangman-game.svg" class="d-inline-block align-top" alt="logo" />
        </b-navbar-brand>
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
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
            <b-nav-text v-if="user.length > 0">
              <span style="color:goldenrod">{{points}}</span> Points
            </b-nav-text>

            <b-nav-item-dropdown text="Other" right>
              <b-dropdown-item to="/profile">{{user}}</b-dropdown-item>
              <b-dropdown-item to="/friends">Friends</b-dropdown-item>
              <b-dropdown-item v-if="user === 'admin'" to="/admin">Admin Page</b-dropdown-item>
              <b-dropdown-divider></b-dropdown-divider>
              <b-dropdown-item @click="logout">Logout</b-dropdown-item>
            </b-nav-item-dropdown>
          </b-navbar-nav>
        </b-collapse>
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
      user: "",
      points: 0
    };
  },
  async mounted() {
    const token = localStorage['token'];
    if (localStorage["user"]) {
      this.user = localStorage["user"];
      // Listen for the 'clicked-event' and its payload.
      EventBus.$on("userData", async (name) => {
        this.user = name;
        const config = {
          method: "get",
          url:
            "https://hangman-webapp.herokuapp.com/api/find/user/" +
            localStorage["user"],
          headers: { auth: token }
        };
        const res = await axios(config);
            const response = res.data;
            const user = response.user;
            this.points = user[0].points;
            this.$forceUpdate();
      });

      const res = await axios(config);
          const response = res.data;
          const user = response.user;
          this.points = user[0].points;
          this.$forceUpdate();
    }
  },
  methods: {
    logout() {
      localStorage.clear();
      this.user = "";
      this.points = 0;
      this.$router.push({ name: "login" });
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
  color: black;
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