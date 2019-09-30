<template>
  <div class="play">
    <b-container>
      <h1 style=margin:20px>Choose a gamemode:</h1>
      <b-row>
        <b-card-group deck>
          <b-card bg-variant="primary" text-variant="white" title='Classic'>
            <b-card-text>Play the classic game of hangman where you choose how big of a word you want and guess the letters until you either win or run out of guesses!</b-card-text>
            <router-link to="/classic">
              <b-button id='playClassic' variant="dark">Play now</b-button>
            </router-link>
          </b-card>

          <b-card bg-variant="danger" text-variant="white" title="Multiplayer">
            <b-badge variant="warning">Beta!</b-badge>
            <b-card-text>Play a head to head game with 1 victor. You will recieve a random word of random length and face off against your opponent. Winner gets 10pts! And the loser loses 10 pts..</b-card-text>
            <router-link to="/multiplayer">
              <b-button id='playMultiplayer' variant="dark">Play now</b-button>
            </router-link>
          </b-card>
        </b-card-group>
      </b-row>
    </b-container>
  </div>
</template> 

<script>
export default {
  name: "play"
};
</script>