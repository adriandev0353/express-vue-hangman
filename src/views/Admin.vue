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
                  <b-form-input></b-form-input>
                  <b-input-group-append>
                    <b-button variant="outline-dark">Search</b-button>
                  </b-input-group-append>
                </b-input-group>
              </label>
              <b-table dark striped :items="items" :fields="fields">
                <template v-for="(field, index) in fields" :slot="field.key" slot-scope="data">
                  <div :key="index" v-if="field.colType === 'button'">
                    <b-button variant="danger">Remove</b-button>
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
export default {
  data() {
    return {
      fields: [
        { key: "ID", label: "ID", colType: "id" },
        { key: "Username", label: "Username", colType: "user" },
        { key: "Points", label: "Points", colType: "points" },
        { key: "Remove", label: "", colType: "button" }
      ],
      items: [
        { ID: 1, Username: "dyllanhope", Points: 26 },
        { ID: 2, Username: "chrisgreen", Points: 6 },
        { ID: 3, Username: "markjones", Points: 20 }
      ]
    };
  }
};
</script>