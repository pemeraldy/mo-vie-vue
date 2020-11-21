<template>
  <div>
    <v-card class="mx-auto mt-4 app" max-width="500">
      <v-toolbar color="primary" dark class="d-flex justify-space-between">
        <v-toolbar-title style="margin-right:74px" class="">
          <v-dialog v-model="dialog" persistent max-width="350">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark v-bind="attrs" v-on="on">
                Create Collection
              </v-btn>
            </template>
            <v-card>
              <v-card-title class="headline">
                New Movies Collection
              </v-card-title>
              <v-container>
                <v-text-field
                  v-model="collectionName"
                  label="Collection Name"
                  hint="Drama, Action, Horror, ..."
                ></v-text-field>
              </v-container>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="green darken-1" text @click="dialog = false">
                  Cancel
                </v-btn>
                <v-btn
                  :loading="btnLoading"
                  color="green darken-1"
                  text
                  @click="createCollection"
                >
                  Create
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar-title>
      </v-toolbar>

      <v-list v-if="movieCollection">
        <v-list-item-group color="primary">
          <v-list-item
            v-for="collection in movieCollection"
            :key="collection.id"
          >
            <v-list-item-content>
              <v-list-item
                :to="{ name: 'collections', params: { id: collection.id } }"
              >
                {{ collection.name }}</v-list-item
              >
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-card>
  </div>
</template>
<script>
export default {
  name: "CollectionList",
  data() {
    return {
      dialog: false,
      btnLoading: false,
      collectionName: "",
    };
  },

  methods: {
    async createCollection() {
      this.btnLoading = true;
      try {
        await this.$store.dispatch("addToCollection", this.collectionName);
        this.dialog = false;
        this.btnLoading = false;
        this.collectionName = "";
      } catch (error) {
        console.log(error);
      }
    },
    async getCollection(collectionId) {
      console.log(collectionId);
    },
  },
  computed: {
    movieCollection() {
      return this.$store.getters["getUserMovieCollections"];
    },
  },
  async mounted() {
    const { id } = this.$store.getters["getUser"];
    await this.$store.dispatch("getMovieCollections", id);
  },
};
</script>
