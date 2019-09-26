<template>
  <div class="login">
    <div class="container">
      <div class="row">
        <div class="col-sm"></div>
        <div class="col-sm">
          <h1>Register</h1>
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
            <tr>
              <td>Confirm password</td>
              <td>
                <b-form-input type="password" v-model="passConfirm" placeholder="password"></b-form-input>
              </td>
            </tr>
          </table>
          <b-alert v-if="error" show style="margin:5px" variant="danger">{{ message }}</b-alert>
          <b-alert v-else hide variant="danger">{{ message }}</b-alert>
          <b-button @click="submitUser" class="login">Sign up</b-button>
          <b-button @click="back" class="login">Back</b-button>
        </div>
        <div class="col-sm"></div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Register",
  data() {
    return {
      user: "",
      pass: "",
      passConfirm: "",
      message: "",
      error: false,
      accountAvailability: false
    };
  },
  methods: {
    submitUser() {
      let message;
      if (this.user && this.pass) {
        if (this.pass === this.passConfirm) {
          axios
            .get(
              "https://hangman-webapp.herokuapp.com/api/check/user/" + this.user
            )
            .then(results => {
              let response = results.data;
              message = response.message;
              if (message === "already exists") {
                this.error = true;
                this.message = "This username already exists";
              } else {
                this.accountAvailability = true;
              }
              this.$forceUpdate();
              if (this.accountAvailability) {
                axios
                  .post("https://hangman-webapp.herokuapp.com/api/add/user/", {
                    username: this.user,
                    password: this.pass
                  })
                  .then(results => {
                    this.$router.push({ name: "login" });
                  });
              }
            });
        } else {
          this.error = true;
          this.message = "The passwords you have entered do not match";
        }
      } else {
        this.error = true;
        this.message = "Please enter a username and a password";
      }
    },
    back() {
      this.$router.push({ name: "login" });
    }
  }
};
</script>

<style scoped>
.login {
  margin: 5px;
}
</style>