<template>
  <div class="leaderboard">
    <b-container>
      <b-row>
        <b-col></b-col>
        <b-col cols='7'><h1>The Hangman Leaderboards</h1></b-col>
        <b-col></b-col>
      </b-row>
      <b-row>
        <b-col></b-col>
        <b-col cols='7'><b-table info :items="items" :fields="fields"></b-table></b-col>
        <b-col></b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import axios from "axios";

export default {
  beforeCreate() {
    axios
      .get("https://hangman-webapp.herokuapp.com/api/all/users")
      .then(res => {
        let list = [];
        let response = res.data;
        let users = response.words;
        for (let x = 0; x < users.length; x++) {
          let item = {
            Ranking: x + 1,
            Username: users[x].username,
            Points: users[x].points
          };
          list.push(item);
        }
        this.items = list;
      });
  },
  data() {
    return {
      fields: ["Ranking", "Username", "Points"],
      items: []
    };
  }
};
</script>
