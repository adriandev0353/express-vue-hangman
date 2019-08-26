<template>
  <div class="new">
    <h1>Add new word here..</h1>
  </div>
</template>

<script>
import axios from "axios";

export default {
  beforeMount(){
    let token = localStorage['token'];
    axios
    .post('https://hangman-webapp.herokuapp.com/api/token/check', token)
    .then((results)=>{
      let response = results.data;
      let message = response.message;
      let success = response.success;

      if (!success){
        this.$router.push({ name: "login" });
      };

    });
  },
}
</script>
