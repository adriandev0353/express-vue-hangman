<template>
  <div class="Profile">
    <b-container>
      <b-row>
        <b-col style="margin-top:50px">
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
          </b-form-select>
          <hr />
          <h2>
            Win Rate:
            <b-spinner v-if="loading" variant="success" label="Spinning"></b-spinner>
            <span v-if="winPercentage > 50 && !loading" class="winRate">{{ winPercentage }}%</span>
            <span v-else-if="winPercentage<=50 && !loading" class="loseRate">{{ winPercentage }}%</span>
          </h2>
        </b-col>
        <b-col cols="7">
          <div style="margin-top:100px" v-if="history">
            <b-spinner variant="success" label="Spinning"></b-spinner>
          </div>
          <b-table v-else info :items="items" :fields="fields" :tbody-tr-class="rowClass"></b-table>
        </b-col>
        <b-col></b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import axios from "axios";
export default {
  beforeCreate() {
    this.loading = true;
    this.history = true;
    this.points = 0;
    axios
      .get(
        "https://hangman-webapp.herokuapp.com/api/get/user/data/" +
          localStorage["user"]
      )
      .then(res => {
        let response = res.data;
        let data = response.data;
        let list = [];

        for (let i = 0; i < data.length; i++) {
          this.points += data[i].points;
          if (this.points < 0) {
            this.points = 0;
          }
          let item = {
            Total_points: this.points,
            Word: data[i].word,
            Result: data[i].complete_state,
            Points: data[i].points
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
        axios
          .get("https://hangman-webapp.herokuapp.com/api/all/users")
          .then(res => {
            let response = res.data;
            let users = response.words;

            for (let i = 0; i < users.length; i++) {
              if (users[i].username === localStorage["user"]) {
                this.ranking = i + 1;
                this.statLoading = false;
              }
            }
          });
      });
  },
  data() {
    return {
      user: localStorage["user"],
      fields: ["Total_points", "Word", "Result", "Points"],
      winPercentage: 0,
      items: [],
      totalPoints: 0,
      points: 0,
      ranking: 0,
      selected: null,
      loading: true,
      statLoading: true,
      history: true
    };
  },
  methods: {
    rowClass(item, type) {
      if (!item) return;
      if (item.Result === "won") {
        return "table-success";
      } else {
        return "table-danger";
      }
    },
    onChange(event) {
      this.totalPoints = 0;
      this.history = true;
      this.$forceUpdate();
      if (this.selected) {
        axios
          .get(
            "https://hangman-webapp.herokuapp.com/api/get/user/data/user/" +
              localStorage["user"] +
              "/choice/" +
              this.selected
          )
          .then(res => {
            let response = res.data;
            let data = response.data;
            let list = [];

            for (let i = 0; i < data.length; i++) {
              this.totalPoints += data[i].points;
              let item = {
                Total_points: this.totalPoints,
                Word: data[i].word,
                Result: data[i].complete_state,
                Points: data[i].points
              };
              list.push(item);
            }
            this.items = list;
            this.$forceUpdate();
            this.history = false;
          });
      } else {
        axios
          .get(
            "https://hangman-webapp.herokuapp.com/api/get/user/data/" +
              localStorage["user"]
          )
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
                Total_points: this.totalPoints,
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
</style>