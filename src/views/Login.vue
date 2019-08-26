<template>
  <div class="login">
    <div class="container">
      <div class="row">
        <div class="col-sm"></div>
        <div class="col-sm">
          <h1>Login</h1>
          <table>
            <tr>
              <td>username</td>
              <td>
                <b-form-input v-model="user" placeholder="username"></b-form-input>
              </td>
            </tr>
            <tr>
              <td>Password</td>
              <td>
                <b-form-input type="password" v-model="pass" placeholder="password"></b-form-input>
              </td>
            </tr>
          </table>
          <h5 class="error">{{ message }}</h5>
          <b-button @click="submitUser" class="login">Login</b-button>
          <b-button @click="registerUser" class="login">Sign up</b-button>
        </div>
        <div class="col-sm"></div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "login",
  data() {
    return {
      user: "",
      pass: "",
      message: ""
    };
  },
  methods: {
    submitUser() {
      let username = this.user;
      let password = this.pass;
      axios
        .post("https://hangman-webapp.herokuapp.com/api/login/check", {
          username,
          password
        })
        .then(results => {
          let response = results.data;
          let auth = response.auth;
          let token = response.token;
          if (auth) {
            localStorage["token"] = token;
            localStorage["user"] = username;
            this.$router.push({ name: "Play" });
          }
        });
    },
    registerUser() {
      this.$router.push({ name: "register" });
      axios.get();
    }
  }
};
</script>

<style scoped>
.login {
  margin: 5px;
}
.error {
  color: crimson;
}
</style>