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
                  <b-card
                    bg-variant="primary"
                    text-variant="white"
                    :key="index"
                    v-for="(user, index) of results"
                  >
                    <b-card-text>{{user.username}} - {{user.points}} points</b-card-text>
                    <b-button
                      @click="sendRequest(user.username)"
                      variant="outline-light"
                    >Send friend request</b-button>
                  </b-card>
                </b-card-group>
              </div>
            </b-card-text>
          </b-tab>
          <b-tab title="Friends list">
            <b-card-text>
              <h3>Friends List</h3>
              <div>
                <b-card-group columns>
                  <b-card
                    bg-variant="primary"
                    text-variant="white"
                    :key="index"
                    v-for="(user, index) of requests"
                  >
                    <b-card-text>{{user.username}} - {{user.points}} points</b-card-text>
                    <b-button
                      @click="sendRequest(user.username)"
                      variant="outline-light"
                    >Send friend request</b-button>
                  </b-card>
                </b-card-group>
              </div>
            </b-card-text>
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
  beforeCreate(){
    axios
    .get('https://hangman-webapp.herokuapp.com/api/friend/requests/for/' + localStorage['user'])
    .then((res)=>{
      const response = res.data;
      const requests = response.result;
      this.requests = requests;
      this.$forceUpdate();
    });
  },
  data() {
    return {
      search: "",
      results: [],
      requests: []
    };
  },
  methods: {
    searchUser() {
      const search = this.search;
      if (search != "") {
        axios
          .get(
            "https://hangman-webapp.herokuapp.com/api/find/user/" + this.search
          )
          .then(res => {
            const response = res.data;
            const user = response.user;
            const list = [];
            for (let x = 0; x < user.length; x++) {
              let item = {
                username: user[x].username,
                points: user[x].points
              };
              list.push(item);
            }
            this.results = list;
          });
      } else {
        axios
          .get("https://hangman-webapp.herokuapp.com/api/all/users")
          .then(res => {
            const list = [];
            const response = res.data;
            console.log(response)
            const users = response.words;
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
    },
    sendRequest(receiver) {
      axios
        .post("https://hangman-webapp.herokuapp.com/api/add/friends", {
          requester: localStorage["user"],
          receiver
        })
        .then(res => {
          const response = res.data;
          const status = response.status;
          this.results = [];
        });
    }
  }
};
</script>