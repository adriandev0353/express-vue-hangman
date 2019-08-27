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
          <h5 class="error">{{ message }}</h5>
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
      accountAvailability: false
    };
  },
  methods: {
    submitUser() {
      let message;
      if (this.pass === this.passConfirm && this.pass.length > 0) {
        axios
          .get(
            "https://hangman-webapp.herokuapp.com/api/check/user/" + this.user
          )
          .then(results => {
            let response = results.data;
            message = response.message;
            if (message === "already exists") {
              this.message = "This account already exists";
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
      }
    },
    back(){
      this.$router.push({ name:'login' });
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