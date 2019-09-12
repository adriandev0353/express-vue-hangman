<template>
  <div class="friends">
    <div>
      <b-card no-body>
        <b-tabs pills card vertical>
          <b-tab title="Search" active>
            <div style="max-height:500px;overflow-y: auto;">
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
            </div>
          </b-tab>
          <b-tab title="Friends list">
            <div style="max-height:500px;overflow-y: auto;">
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
                          <b-button
                            variant="outline-light"
                            @click="assignFriendChallenge(friend)"
                          >Challenge</b-button>
                          <b-modal @show="resetModal" @ok="handleOk" v-model="modalShow" centered>
                            <template v-slot:modal-title>Challenge {{friend}}</template>
                            <label>Word:</label>
                            <b-form-input v-model="word" :state="wordState" required></b-form-input>
                            <br />
                            <label>Hint:</label>
                            <b-form-input v-model="hint" placeholder="Optional"></b-form-input>
                          </b-modal>
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
                <b-table sticky-header v-if="items.length > 1" info :items="items" :fields="fields"></b-table>
                <div v-else>
                  <h3 style="color:grey">No friends</h3>
                  <h5 style="color:grey">Find some using our search tab!</h5>
                </div>
              </b-card-text>
            </div>
          </b-tab>
          <b-tab title="Challenges">
            <div style="max-height:500px;overflow-y: auto;">
              <b-card-text>
                <h3>
                  <u>Challenges</u>
                </h3>
                <div v-if="challenges.length > 0">
                  <b-card-group columns>
                    <b-card
                      bg-variant="warning"
                      text-variant="black"
                      :key="index"
                      v-for="(challenge, index) of challenges"
                    >
                      <b-card-text style="font-weight: bold">{{challenge.challenger}}</b-card-text>
                      <b-card-text>has challenged you with a {{challenge.word.length}} letter word!</b-card-text>
                      <b-button style="margin-left: 5px" variant="outline-success">Accept</b-button>
                      <b-button style="margin-left: 5px" variant="outline-danger">Reject</b-button>
                    </b-card>
                  </b-card-group>
                </div>
                <div v-else>
                  <h4 style="color:grey">No Challenges</h4>
                </div>
                <h3>
                  <u>Challenges sent</u>
                </h3>
                <div v-if="challengesSent.length > 0">
                  <b-table
                    sticky-header
                    info
                    :items="challengesSent"
                    :fields="columns"
                    :tbody-tr-class="rowClass"
                  ></b-table>
                </div>
                <div v-else>
                  <h4 style="color:grey">No Challenges sent</h4>
                </div>
                <h3>
                  <u>Complete challenges</u>
                </h3>
                <div v-if="challengesCompleted.length>0">
                  <b-table
                    sticky-header
                    style="margin-top:50px"
                    info
                    :items="challengesCompleted"
                    :fields="challengeFields"
                    :tbody-tr-class="rowClass"
                  ></b-table>
                </div>
                <div v-else>
                  <h4 style="color:grey">No Challenges completed</h4>
                </div>
              </b-card-text>
            </div>
          </b-tab>
        </b-tabs>
      </b-card>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { log } from "util";
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
              })
              .then(() => {
                axios
                  .get(
                    "https://hangman-webapp.herokuapp.com/api/fetch/challenges/for/" +
                      localStorage["user"]
                  )
                  .then(res => {
                    const response = res.data;
                    const challenges = response.challenges;
                    this.challenges = challenges;
                  })
                  .then(() => {
                    axios
                      .get(
                        "https://hangman-webapp.herokuapp.com/api/fetch/challenges/sent/by/" +
                          localStorage["user"]
                      )
                      .then(res => {
                        const response = res.data;
                        const challenges = response.challenges;
                        const list = [];
                        for (const challenge of challenges) {
                          const item = {
                            Opponent: challenge.opponent,
                            Word: challenge.word,
                            Status: challenge.status
                          };
                          list.push(item);
                        }
                        this.challengesSent = list;
                      })
                      .then(() => {
                        axios
                          .get(
                            "https://hangman-webapp.herokuapp.com/api/fetch/complete/challenges/by/" +
                              localStorage["user"]
                          )
                          .then(res => {
                            const response = res.data;
                            const results = response.results;
                            const list = [];
                            for (const i of results) {
                              const item = {
                                Challenger: i.challenger,
                                Word: i.word,
                                Status: i.status
                              };
                              list.push(item);
                            }
                            this.challengesCompleted = list;
                          });
                      });
                  });
              });
          });
      });
  },
  data() {
    return {
      fields: ["Rank", "Username", "Points", "Ratio"],
      items: [],
      columns: ["Opponent", "Word", "Status"],
      challengesSent: [],
      challengeFields: ["Challenger", "Word", "Status"],
      challengesCompleted: [],
      search: "",
      results: [],
      requests: [],
      friendList: [],
      challenges: [],
      error: false,
      modalShow: false,
      word: "",
      hint: "",
      friend: "",
      wordState: null
    };
  },
  methods: {
    rowClass(item, type) {
      console.log(item, type);
      if (!item) return;
      if (item.Status === "won") {
        return "table-success";
      } else if (item.Status === "lost") {
        return "table-danger";
      } else if (item.Status === "pending") {
        return "table-warning";
      }
    },
    assignFriendChallenge(friend) {
      this.modalShow = !this.modalShow;
      this.friend = friend;
    },
    handleOk(bvModalEvt) {
      bvModalEvt.preventDefault();
      const word = this.word;
      if (word === "") {
        this.wordState = false;
      } else {
        axios
          .post("https://hangman-webapp.herokuapp.com/api/send/challenge", {
            challenger: localStorage["user"],
            opponent: this.friend,
            word: this.word,
            hint: this.hint
          })
          .then(res => {
            const response = res.data;
            const status = response.status;
            console.log(status);
          });
        this.modalShow = false;
      }
    },
    resetModal() {
      this.wordState = null;
      this.word = "";
      this.hint = "";
    },
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
    }
  }
};
</script>

<style scoped>
html {
    overflow: scroll;
    overflow-x: hidden;
}
::-webkit-scrollbar {
    width: 0px;
    background: transparent;
}
</style>