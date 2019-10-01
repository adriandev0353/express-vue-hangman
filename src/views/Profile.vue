<template>
  <div class="Profile">
    <b-container>
      <b-row>
        <b-col sm style="margin-top:50px">
          <h1>{{ user }}</h1>
          <h2>
            Points:
            <b-spinner v-if="loading" variant="warning" small label="Small Spinner"></b-spinner>
            <span v-else class="points">{{ points }}</span>
          </h2>
          <h2>
            Ranking:
            <b-spinner v-if="statLoading" variant="warning" small label="Small Spinner"></b-spinner>
            <span v-else>{{ ranking }}</span>
          </h2>
          <hr />
          <h5>filter:</h5>
          <b-form-select v-model="selected" class="mb-3" @change="onChange($event)">
            <option :value="null">Game history</option>
            <option value="won">Words won</option>
            <option value="lost">Words lost</option>
            <option value="challenges">Challenges</option>
          </b-form-select>
          <hr />
          <h2>
            Win Rate:
            <b-spinner v-if="loading" variant="success" label="Spinning"></b-spinner>
            <span v-if="winPercentage > 50 && !loading" class="winRate">{{ winPercentage }}%</span>
            <span v-else-if="winPercentage<=50 && !loading" class="loseRate">{{ winPercentage }}%</span>
          </h2>
        </b-col>
        <b-col sm>
          <div style="margin-top:100px" v-if="history">
            <b-spinner variant="success" label="Spinning"></b-spinner>
          </div>
          <div v-else>
            <div v-if="!challengesChosen">
              <b-table
                sticky-header
                style="margin-top:50px"
                info
                :items="items"
                :fields="fields"
                :tbody-tr-class="rowClass"
              ></b-table>
            </div>
            <div v-else>
              <b-table
                sticky-header
                style="margin-top:50px"
                info
                :items="challengesCompleted"
                :fields="challengeFields"
                :tbody-tr-class="rowClass"
              ></b-table>
            </div>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import axios from "axios";
export default {
  mounted() {
    this.loading = true;
    this.history = true;
    this.points = 0;
    this.userData(localStorage['user'])
      .then(res => {
        let response = res.data;
        let data = response.data;
        let list = [];

        for (let i = 0; i < data.length; i++) {
          let item = {
            Word: data[i].word,
            Result: data[i].complete_state,
            Pts: data[i].points
          };
          list.push(item);
        }

        let gameCount = 0;
        let winCount = 0;
        for (const item of data) {
          gameCount++;
          if (item.complete_state === "won") {
            winCount++;
          }
        }
        this.winPercentage = ((winCount / gameCount) * 100).toFixed(2);
        this.loading = false;
        this.items = list;
        this.history = false;
        this.allUsers().then(res => {
          let response = res.data;
          let users = response.words;

          for (let i = 0; i < users.length; i++) {
            if (users[i].username === localStorage["user"]) {
              this.ranking = i + 1;
              this.statLoading = false;
            }
          }
        });
      })
      .then(() => {
        this.findUser().then(res => {
          const response = res.data;
          const user = response.user;
          let userData = user[0];
          this.points = userData.points;
        });
      });
  },
  data() {
    return {
      user: localStorage["user"],
      fields: ["Word", "Result", "Pts"],
      winPercentage: 0,
      items: [],
      totalPoints: 0,
      points: 0,
      ranking: 0,
      selected: null,
      loading: true,
      statLoading: true,
      history: true,
      challengeFields: ["Challenger", "Word", "Result"],
      challengesCompleted: [],
      challengesChosen: false
    };
  },
  methods: {
    async userData(user) {
      const config = {
        method: "get",
        url: "https://hangman-webapp.herokuapp.com/api/get/user/data/" + user,
        headers: {auth: localStorage['token'], user: localStorage['user']}
      };
      return await axios(config);
    },
    async userDataChoice(user, choice) {
      const config = {
        method: "get",
        url:
          "https://hangman-webapp.herokuapp.com/api/get/user/data/user/" +
          user +
          "/choice/" +
          choice,
        headers: { auth: localStorage["token"], user: localStorage['user'] }
      };
      return await axios(config);
    },
    async completeChallenges(user) {
      const config = {
        method: "get",
        url:
          "https://hangman-webapp.herokuapp.com/api/fetch/complete/challenges/by/" +
          user,
        headers: { auth: localStorage["token"], user: localStorage['user'] }
      };
      return await axios(config);
    },
    async allUsers() {
      const config = {
        method: "get",
        url: "https://hangman-webapp.herokuapp.com/api/all/users",
        headers: { auth: localStorage["token"], user: localStorage['user'] }
      };
      return await axios(config);
    },
    async findUser() {
      const token = localStorage["token"];
      const config = {
        method: "get",
        url:
          "https://hangman-webapp.herokuapp.com/api/find/user/" +
          localStorage["user"],
        headers: { auth: token, user: localStorage['user'] }
      };
      return await axios(config);
    },
    rowClass(item, type) {
      if (!item) return;
      if (item.Result === "won") {
        return "table-success";
      } else if (item.Result === "lost") {
        return "table-danger";
      }
    },
    onChange(event) {
      this.totalPoints = 0;
      this.history = true;
      this.$forceUpdate();
      if (this.selected) {
        if (this.selected !== "challenges") {
          this.challengesChosen = false;
          this.userDataChoice(localStorage["user"], this.selected).then(res => {
            let response = res.data;
            let data = response.data;
            let list = [];

            for (let i = 0; i < data.length; i++) {
              this.totalPoints += data[i].points;
              let item = {
                Word: data[i].word,
                Result: data[i].complete_state,
                Pts: data[i].points
              };
              list.push(item);
            }
            this.items = list;
            this.$forceUpdate();
            this.history = false;
          });
        } else {
          this.challengesChosen = true;
          this.completeChallenges(localStorage["user"]).then(res => {
            const response = res.data;
            const results = response.results;
            const list = [];
            for (const i of results) {
              const item = {
                Challenger: i.challenger,
                Word: i.word,
                Result: i.status
              };
              list.push(item);
            }
            this.challengesCompleted = list;
            this.history = false;
          });
        }
      } else {
        this.userData(localStorage['user'])
          .then(res => {
            let response = res.data;
            let data = response.data;
            let list = [];

            for (let i = 0; i < data.length; i++) {
              this.totalPoints += data[i].points;
              if (this.totalPoints < 0) {
                this.totalPoints = 0;
              }
              let item = {
                Word: data[i].word,
                Result: data[i].complete_state,
                Points: data[i].points
              };
              list.push(item);
            }
            this.items = list;
            this.history = false;
          });
      }
    }
  }
};
</script>

<style scoped>
.points {
  color: goldenrod;
}
.winRate {
  color: green;
}
.loseRate {
  color: crimson;
}
html {
  overflow: scroll;
  overflow-x: hidden;
}
::-webkit-scrollbar {
  width: 10px;
  background: transparent;
}
::-webkit-scrollbar-thumb {
  background: rgb(114, 100, 100);
  border-radius: 10px;
}
::-webkit-scrollbar-thumb:hover {
  background: #353030;
}
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px grey;
  border-radius: 10px;
}
</style>