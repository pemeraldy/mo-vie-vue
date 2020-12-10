<template>
  <v-sheet>
    <v-toolbar color="red accent-3" dark>
      <v-icon>mdi-folder</v-icon>
      <v-toolbar-title>Collections</v-toolbar-title>
      <v-spacer></v-spacer>

      <v-dialog v-model="dialog" persistent max-width="350">
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon dark v-bind="attrs" v-on="on">
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </template>
        <v-card>
          <v-alert v-if="error" color="red" type="info">{{ error }}</v-alert>
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
            <v-btn color="red darken-1" text @click="dialog = false">
              Cancel
            </v-btn>
            <v-btn
              :loading="btnLoading"
              color="grey darken-1"
              text
              @click="createCollection"
            >
              Create
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-toolbar>

    <v-list v-if="movieCollection">
      <v-list-item-group color="primary">
        <v-list-item
          v-for="collection in movieCollection"
          :key="collection.id"
          :to="{ name: 'collections', params: { id: collection.id } }"
        >
          <v-list-item-icon>
            <v-icon>mdi-play-circle</v-icon>
          </v-list-item-icon>
          <v-list-item-content
            :to="{ name: 'collections', params: { id: collection.id } }"
          >
            {{ collection.name }}</v-list-item-content
          >
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-sheet>
</template>
<script>
export default {
  name: "CollectionList",
  data() {
    return {
      dialog: false,
      btnLoading: false,
      collectionName: "",
      error: "",
    };
  },

  methods: {
    async createCollection() {
      if (this.collectionName.length < 4) {
        setTimeout(() => {
          this.error = "";
        }, 3000);
        this.error = "Collection name cannot be less than four characters";
        return;
      }
      this.btnLoading = true;
      try {
        await this.$store.dispatch("addToCollection", this.collectionName);
        this.dialog = false;
        this.btnLoading = false;
        this.collectionName = "";
      } catch (error) {
        this.error = "Cannot create collection";
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
