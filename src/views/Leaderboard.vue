<template>
  <div class="leaderboard">
    <b-container>
      <b-row>
        <b-col style="margin-top:30px">
          <h3>
            <u>Most words won</u>
          </h3>
          {{topUser}} - {{mostWords}}
          <hr />
          <h3>
            <u>Longest word</u>
          </h3>
          {{longestUser}} - {{longestWord}}
        </b-col>
        <b-col style="margin-top:30px" cols="6">
          <h1>The Hangman Leaderboards</h1>
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
          this.items = list;
        }
      })
      .then(() => {
        axios
          .get("https://hangman-webapp.herokuapp.com/api/link/data")
          .then(res => {
            const response = res.data;
            const items = response.items;
            console.log(items);
            let countMap = {};
            this.longestWord = items[0].word;
            this.longestUser = items[0].username;
            for (const item of items) {
              if (item.complete_state === "won") {
                if (countMap[item.username] === undefined) {
                  countMap[item.username] = 1;
                } else {
                  countMap[item.username]++;
                }
              }
            }
            let tempTopUser = "";
            let tempTopCount = 0;
            for (const count in countMap) {
              if (countMap[count] > tempTopCount) {
                tempTopUser = count;
                tempTopCount = countMap[count];
              }
            }
            this.topUser = tempTopUser;
            this.mostWords = tempTopCount;
          });
      });
  },
  data() {
    return {
      fields: ["Ranking", "Username", "Points"],
      items: [],
      mostWords: 0,
      topUser: "",
      longestWord: "",
      longestUser: ""
    };
  },
  methods: {
    rowClass(item, type) {
      if (!item) return;
      if (item.Ranking === 1) {
        return "table-warning";
      }
    }
  }
};
</script>
