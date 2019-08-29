<template>
  <div class="admin">
    <b-container>
      <h1>Admin page here..</h1>
      <b-card no-body>
        <b-tabs pills card vertical>
          <b-tab title="Users" active>
            <b-card-text>
              <label>
                Search user:
                <b-input-group style="margin-bottom:10px; width:200px" class="mt-3">
                  <b-form-input v-model="search"></b-form-input>
                  <b-input-group-append>
                    <b-button @click="searchUser" variant="outline-dark">Search</b-button>
                  </b-input-group-append>
                </b-input-group>
              </label>
              <b-table dark striped :items="items" :fields="fields">
                <template v-for="(field, index) in fields" :slot="field.key" slot-scope="data">
                  <div :key="index" v-if="field.colType === 'button'">
                    <b-button @click="deleteUser(data.item.ID)" variant="danger">Remove</b-button>
                  </div>
                  <div :key="index" v-else-if="field.colType === 'id'">
                    <h5>{{data.item.ID}}</h5>
                  </div>
                  <div :key="index" v-else-if="field.colType === 'Username'">
                    <h5>{{data.item.Username}}</h5>
                  </div>
                  <div :key="index" v-else-if="field.colType === 'Points'">
                    <h5>{{data.item.Points}}</h5>
                  </div>
                </template>
              </b-table>
            </b-card-text>
          </b-tab>
          <b-tab>
            <template slot="title">
              <span>
                New Words
                <b-badge variant="primary">4</b-badge>
              </span>
            </template>
            <h1>new words to verify here..</h1>
          </b-tab>
        </b-tabs>
      </b-card>
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
            ID: users[x].id,
            Username: users[x].username,
            Points: users[x].points
          };
          list.push(item);
          this.items = list;
        }
      });
  },
  data() {
    return {
      fields: [
        { key: "ID", label: "ID", colType: "id" },
        { key: "Username", label: "Username", colType: "user" },
        { key: "Points", label: "Points", colType: "points" },
        { key: "Remove", label: "", colType: "button" }
      ],
      items: [],
      search: ""
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
            let item = {
              ID: user.id,
              Username: user.username,
              Points: user.points
            };
            this.items = [item];
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
                ID: users[x].id,
                Username: users[x].username,
                Points: users[x].points
              };
              list.push(item);
              this.items = list;
            }
          });
      }
    },
    deleteUser(id) {
      let list= [];
      axios
        .post("https://hangman-webapp.herokuapp.com/api/delete/user", id)
        .then(res => {
          let response = res.data;
          let users = response.users;
          console.log(users);
          for (let x = 0; x < users.length; x++) {
            let item = {
              ID: users[x].id,
              Username: users[x].username,
              Points: users[x].points
            };
            list.push(item);
            this.items = list;
          }
        });
    }
  }
};
</script>