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
          <b-alert v-if="error" show style="margin:5px" variant="danger">{{ message }}</b-alert>
          <b-alert v-else hide variant="danger">{{ message }}</b-alert>
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
import { EventBus } from "../event-bus";

export default {
  name: "login",
  data() {
    return {
      user: "",
      pass: "",
      error: false,
      message: ""
    };
  },
  methods: {
    async submitUser() {
      let username = this.user;
      let password = this.pass;
      if (username && password) {
        const config = {
          method: "post",
          url: "https://hangman-webapp.herokuapp.com/api/login/check",
          headers: { payload: { username, password } }
        };
        const results = await axios(config);
        let response = results.data;
        let auth = response.auth;
        if (auth) {
          let token = response.token;
          localStorage["token"] = token;
          localStorage["user"] = username;
          EventBus.$emit("userData", this.user);
          this.$router.push({ name: "Play" });
        } else {
          this.error = true;
          this.message = response.message;
        }
      } else {
        this.error = true;
        this.message = "Please enter a username and a password";
      }
    },
    registerUser() {
      this.$router.push({ name: "register" });
    }
  }
};
</script>

<style scoped>
.login {
  margin: 5px;
}
</style>