<template>
  <div class="friends">
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
              <div v-if="results.length > 0 && !error">
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
              <div v-else-if="error">
                <h3 style="color:grey">No results</h3>
              </div>
            </b-card-text>
          </b-tab>
          <b-tab title="Friends list">
            <b-card-text>
              <h3>Friend requests</h3>
              <div v-if="requests != 'none' || requests.length === 0">
                <b-card-group columns>
                  <b-card
                    bg-variant="light"
                    text-variant="black"
                    :key="index"
                    v-for="(user, index) of requests"
                  >
                    <b-card-text style="font-weight: bold">{{user.requester}}</b-card-text>
                    <b-card-text>is requesting to be your friend</b-card-text>
                    <b-button
                      @click="confirmRequest(user.requester, index)"
                      style="margin: 5px"
                      variant="outline-success"
                    >Accept</b-button>
                    <b-button
                      @click="denyRequest(user.requester, index)"
                      style="margin: 5px"
                      variant="outline-danger"
                    >Deny</b-button>
                  </b-card>
                </b-card-group>
              </div>
              <div v-else>
                <h3 style="color:grey">No requests</h3>
              </div>
              <hr />
              <h3>Friends list</h3>
              <div v-if="friendList != 'none' || friendList.length === 0">
                <div>
                  <div>
                    <b-card-group columns>
                      <b-card
                        bg-variant="info"
                        text-variant="white"
                        :key="index"
                        v-for="(friend, index) of friendList"
                      >
                        <b-card-text>{{friend}}</b-card-text>
                        <b-button variant="outline-light">Challenge</b-button>
                        <b-button
                          @click="deleteFriend(friend)"
                          style="margin-left: 5px"
                          variant="outline-danger"
                        >Remove friend</b-button>
                      </b-card>
                    </b-card-group>
                  </div>
                </div>
              </div>
              <div v-else>
                <h3 style="color:grey">No friends</h3>
                <h5 style="color:grey">Find some using our search tab!</h5>
              </div>
              <hr />
              <h3>Leaderboard</h3>
              <b-table sticky-header v-if="items.length > 0" info :items="items" :fields="fields"></b-table>
              <div v-else>
                <h3 style="color:grey">No friends</h3>
                <h5 style="color:grey">Find some using our search tab!</h5>
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
import { log } from 'util';
export default {
  beforeCreate() {
    axios
      .get(
        "https://hangman-webapp.herokuapp.com/api/friend/requests/for/" +
          localStorage["user"]
      )
      .then(res => {
        const response = res.data;
        const requests = response.result;
        this.requests = requests;
        this.$forceUpdate();
      })
      .then(() => {
        console.log("retreiving friend data for", localStorage["user"]);
        axios
          .get(
            "https://hangman-webapp.herokuapp.com/api/friend/list/" +
              localStorage["user"]
          )
          .then(res => {
            const response = res.data;
            const list = response.list;
            this.friendList = list;
          })
          .then(() => {
            axios
              .get("https://hangman-webapp.herokuapp.com/api/all/users")
              .then(res => {
                const list = [];
                let item = {};
                const response = res.data;
                const users = response.words;
                for (let x = 0; x < users.length; x++) {
                  if (users[x].username === localStorage["user"]) {
                    item = {
                      Rank: x + 1,
                      Username: users[x].username,
                      Points: users[x].points,
                      Ratio: users[x].win_rate
                    };
                    list.push(item);
                  } else {
                    for (const friend of this.friendList) {
                      if (users[x].username === friend) {
                        item = {
                          Rank: x + 1,
                          Username: users[x].username,
                          Points: users[x].points,
                          Ratio: users[x].win_rate
                        };
                        list.push(item);
                      }
                    }
                  }
                }
                this.items = list;
              });
          });
      });
  },
  data() {
    return {
      fields: ["Rank", "Username", "Points", "Ratio"],
      items: [],
      search: "",
      results: [],
      requests: [],
      friendList: [],
      error: false
    };
  },
  methods: {
    searchUser() {
      this.error = false;
      const search = this.search;
      if (search != "") {
        axios
          .get(
            "https://hangman-webapp.herokuapp.com/api/find/user/" + this.search
          )
          .then(res => {
            let found = false;
            const list = [];
            const response = res.data;
            const user = response.user;
            for (let x = 0; x < user.length; x++) {
              if (user[x].username === localStorage["user"]) {
                found = true;
              } else {
                for (const friend of this.friendList) {
                  if (user[x].username === friend) {
                    found = true;
                  }
                }
              }
              if (!found) {
                let item = {
                  username: user[x].username,
                  points: user[x].points
                };
                list.push(item);
              } else {
                found = false;
              }
            }
            if (list.length === 0) {
              this.error = true;
            }
            this.results = list;
          });
      } else {
        axios
          .get("https://hangman-webapp.herokuapp.com/api/all/users")
          .then(res => {
            let found = false;
            const list = [];
            const response = res.data;
            const user = response.words;
            for (let x = 0; x < user.length; x++) {
              if (user[x].username === localStorage["user"]) {
                found = true;
              } else {
                for (const friend of this.friendList) {
                  if (user[x].username === friend) {
                    found = true;
                  }
                }
              }
              if (!found) {
                let item = {
                  username: user[x].username,
                  points: user[x].points
                };
                list.push(item);
              } else {
                found = false;
              }
            }
            if (list.length === 0) {
              this.error = true;
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
    },
    confirmRequest(requester, index) {
      axios
        .post(
          "https://hangman-webapp.herokuapp.com/api/confirm/friend/request",
          {
            requester,
            receiver: localStorage["user"]
          }
        )
        .then(res => {
          this.requests.splice(index, 1);
        })
        .then(() => {
          axios
            .get(
              "https://hangman-webapp.herokuapp.com/api/friend/list/" +
                localStorage["user"]
            )
            .then(res => {
              const response = res.data;
              const list = response.list;
              this.friendList = list;
            });
        });
    },
    denyRequest(requester, index) {
      axios
        .post("https://hangman-webapp.herokuapp.com/api/deny/friend/request", {
          requester,
          receiver: localStorage["user"]
        })
        .then(res => {
          this.requests.splice(index, 1);
        });
    },
    deleteFriend(friend) {
      axios
        .post("https://hangman-webapp.herokuapp.com/api/remove/friend", {
          user: localStorage["user"],
          friend
        })
        .then(res => {
          axios
            .get(
              "https://hangman-webapp.herokuapp.com/api/friend/list/" +
                localStorage["user"]
            )
            .then(res => {
              const response = res.data;
              const list = response.list;
              this.friendList = list;
            });
        });
    }
  }
};
</script>