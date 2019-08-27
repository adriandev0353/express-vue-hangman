<template>
  <div class="Profile">
    <b-container>
      <b-row>
        <b-col></b-col>
        <b-col cols="7">
          <h1>{{ user }}</h1>
        </b-col>
        <b-col></b-col>
      </b-row>
      <b-row>
        <b-col></b-col>
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
            console.log(data[i])
          let item = {
            Total_points: this.totalPoints,
            Word: data[i].word,
            Result: data[i].complete_state,
            Points: data[i].points
          };
          list.push(item);
        }
        this.items = list;
      });
  },
  data() {
    return {
      user: localStorage["user"],
      fields: ["Total_points", "Word", "Result", "Points"],
      items: [],
      totalPoints: 0
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
    }
  }
};
</script>