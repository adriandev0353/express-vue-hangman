<template>
  <div class="Profile">
    <b-container>
      <b-row>
        <b-col style="margin-top:50px">
          <h1>{{ user }}</h1>
          <h2>
            Points:
            <span class="points">{{ points }}</span>
          </h2>
          <h2>Ranking: {{ ranking }}</h2>
          <hr />
          <h5>filter:</h5>
          <b-form-select v-model="selected" class="mb-3" @change="onChange($event)">
            <option :value="null">Game history</option>
            <option value="won">Words won</option>
            <option value="lost">Words lost</option>
          </b-form-select>
        </b-col>
        <b-col cols="7">
          <b-table info :items="items" :fields="fields" :tbody-tr-class="rowClass"></b-table>
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
        this.items = list;
        axios
          .get("https://hangman-webapp.herokuapp.com/api/all/users")
          .then(res => {
            let response = res.data;
            let users = response.words;

            for (let i = 0; i < users.length; i++) {
              if (users[i].username === localStorage["user"]) {
                this.ranking = i + 1;
              }
            }
          });
      });
  },
  data() {
    return {
      user: localStorage["user"],
      fields: ["Total_points", "Word", "Result", "Points"],
      items: [],
      totalPoints: 0,
      points: 0,
      ranking: 0,
      selected: null
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
        });
    }
  }
};
</script>

<style scoped>
.points {
  color: goldenrod;
}
</style>