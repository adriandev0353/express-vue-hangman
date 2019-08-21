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
          <h5 class='error'>{{ message }}</h5>
          <b-button @click="submitUser" class="login">Login</b-button>
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
      message: "",
      accountStatus: false
    };
  },
  methods: {
    submitUser() {
      let username = this.user;
      let password = this.pass;
      axios
        .get("https://hangman-webapp.herokuapp.com/api/check/user/" + username)
        .then(results => {
          const response = results.data;
          const message = response.message;
          if (message === "already exists") {
            this.$router.push({ name: "Play" });
          }
          this.message = "You need to create an account";
          this.$forceUpdate();
        });
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