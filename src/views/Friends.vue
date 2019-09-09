<template>
  <div class="friends">
    <h1>Friends</h1>
    <div>
      <b-card no-body>
        <b-tabs pills card vertical>
          <b-tab title="Search" active>
            <b-card-text>
              <label>
                <h3>Search for someone:</h3>
                <b-input-group style="margin-bottom:10px; width:200px" class="mt-3">
                  <b-form-input v-model="search"></b-form-input>
                  <b-input-group-append>
                    <b-button @click="searchUser" variant="outline-dark">Search</b-button>
                  </b-input-group-append>
                </b-input-group>
              </label>
              <div>
                <b-card-group columns>
                  <b-card :key="index" v-for="(user, index) of results">
                    <b-card-text>{{user.username}} - {{user.points}} points</b-card-text>
                    <b-button variant="outline-dark">Send friend request</b-button>
                  </b-card>
                </b-card-group>
              </div>
            </b-card-text>
          </b-tab>
          <b-tab title="Friends list">
            <b-card-text>Friends list</b-card-text>
          </b-tab>
          <b-tab title="Challenges">
            <b-card-text>Challenges</b-card-text>
          </b-tab>
        </b-tabs>
      </b-card>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      search: "",
      results: []
    };
  },
  methods: {
    searchUser() {
      let user = this.search;
      if (user != "") {
        axios
          .get(
            "https://hangman-webapp.herokuapp.com/api/find/user/" + this.search
          )
          .then(res => {
            let response = res.data;
            let user = response.user;
            let item = [
              {
                username: user.username,
                points: user.points
              }
            ];
            this.results = item;
          });
      } else {
        axios
          .get("https://hangman-webapp.herokuapp.com/api/all/users")
          .then(res => {
            let list = [];
            let response = res.data;
            let users = response.words;
            for (let x = 0; x < users.length; x++) {
              let item = {
                username: users[x].username,
                points: users[x].points
              };
              list.push(item);
            }
            this.results = list;
          });
      }
    }
  }
};
</script>