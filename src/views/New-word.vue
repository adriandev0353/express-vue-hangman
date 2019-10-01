<template>
  <div class="new">
    <b-container>
      <b-row>
        <b-col sm='5'>
          <h4 style="margin-top:15px">
            <u>How does this work?</u>
          </h4>
          <p>On this page you can add new words to the current repository of words. These added words will be used in games that other players play. When you click submit, the word is sent in to be confirmed/verified. Once verified, you will recieve 3 points for every new word you add.</p>
        </b-col>
        <b-col sm='7'>
          <h1>Add new word here..</h1>
          <b-input-group style="margin-bottom:10px; width:200px" class="mt-3 mx-auto">
            <b-form-input v-model="word" placeholder="eg. hangman"></b-form-input>
            <b-input-group-append>
              <b-button @click="submitWord" variant="outline-dark">Submit</b-button>
            </b-input-group-append>
          </b-input-group>
          <b-alert v-if="error" show style="margin:5px" variant="danger">{{ message }}</b-alert>
          <b-alert v-else-if="success" show variant="success">{{ message }}</b-alert>
          <b-alert v-else hide variant="danger">{{ message }}</b-alert>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      word: "",
      error: false,
      success: false,
      message: ""
    };
  },
  methods: {
    async storeNewWord(word, user){
      const config = {
        method: 'post',
        url: 'https://hangman-webapp.herokuapp.com/api/store/new/word',
        headers: {auth: localStorage['token'], user: localStorage['user']},
        data: {word, user}
      }
      return await axios(config);
    },
    async checkWord(word){
      const config = {
        method: "get",
        url: "https://hangman-webapp.herokuapp.com/api/check/word/" + word,
        headers: {auth: localStorage['token'], user: localStorage['user']}
      };
      return await axios(config);
    },
    submitWord() {
      let check = "";
      this.checkWord(this.word)
        .then(res => {
          let response = res.data;
          check = response.check;
        })
        .then(() => {
          if (check === "new") {
            this.success = true;
            this.error = false;
            this.message ='Your word has been sent in to be verified';
            this.storeNewWord(this.word, localStorage['user'])
              .then(res => {
                let response = res.data;
              });
          } else {
            this.success = false;
            this.error = true;
            this.message = "This word already exists in our repository";
          }
        });
    }
  }
};
</script>
