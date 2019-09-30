<template>
  <div class="leaderboard">
    <b-container style='width: 100%'>
      <b-row>
        <b-col sm='4' style="margin-top:30px">
          <h3>
            <u>Most words won</u>
          </h3>
          <b-spinner v-if="statLoading" small label="Small Spinner"></b-spinner>
          <span v-else>{{topUser}} - {{mostWords}}</span>
          <hr />
          <h3>
            <u>Longest word</u>
          </h3>
          <b-spinner v-if="statLoading" small label="Small Spinner"></b-spinner>
          <span v-else>{{longestUser}} - {{longestWord}} letters</span>
        </b-col>
        <b-col sm='8' style="margin-top:30px">
          <h1>The Hangman Leaderboards</h1>
          <b-spinner v-if="loading" label="Spinning"></b-spinner>
          <b-table sticky-header v-else info :items="items" :fields="fields" :tbody-tr-class="rowClass"></b-table>
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
    this.statLoading= true;
    this.allUsers()
      .then(res => {
        let list = [];
        let response = res.data;
        let users = response.words;
        for (let x = 0; x < users.length; x++) {
          let item = {
            Rank: x + 1,
            Username: users[x].username,
            Pts: users[x].points,
            Ratio: users[x].win_rate
          };
          list.push(item);
          this.items = list;
          this.loading = false;
        }
      })
      .then(() => {
        this.linkData()
          .then(res => {
            const response = res.data;
            const items = response.items;
            let countMap = {};
            this.longestWord = (items[0].word).length;
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
            this.statLoading = false;
          });
      });
  },
  data() {
    return {
      fields: ["Rank", "Username", "Pts", "Ratio"],
      items: [],
      mostWords: 0,
      topUser: "",
      longestWord: 0,
      longestUser: "",
      loading: true,
      statLoading: true
    };
  },
  methods: {
    async linkData(){
      const config = {
        method: "get",
        url: "https://hangman-webapp.herokuapp.com/api/link/data",
        headers: {auth: localStorage['token']}
      };
      return await axios(config);
    },
    async allUsers() {
      const config = {
        method: "get",
        url: "https://hangman-webapp.herokuapp.com/api/all/users",
        headers: { auth: localStorage["token"] }
      };
      return await axios(config);
    },
    rowClass(item, type) {
      if (!item) return;
      if (item.Rank === 1) {
        return "table-warning";
      }
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
