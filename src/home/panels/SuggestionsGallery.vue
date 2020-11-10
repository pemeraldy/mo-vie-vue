<template>
  <!-- <v-sheet min-height="100%"> -->
  <v-container>
    <v-layout v-if="!moviesInGallery">
      <div>
        <h2>No Result found</h2>
      </div>
    </v-layout>
    <v-layout v-else row>
      <v-flex v-for="n in moviesInGallery" :key="n.imdbID" md3>
        <v-card :loading="!n.Poster" class="mx-2 my-2 " max-width="374">
          <template slot="progress">
            <v-progress-linear
              color="deep-purple"
              height="10"
              indeterminate
            ></v-progress-linear>
          </template>

          <v-img height="250" :src="n.Poster"></v-img>

          <v-card-title @click="addToCollection(n)">{{ n.Title }}</v-card-title>

          <v-card-text>
            <div class="my-4 subtitle-1">
              <span>{{ n.Year }}</span>
            </div>
          </v-card-text>

          <v-card-actions>
            <v-menu
              offset-y
              open-on-hover
              origin="center center"
              transition="scale-transition"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn icon color="primary" dark v-bind="attrs" v-on="on">
                  <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item v-for="(item, index) in items" :key="index">
                  <v-btn>{{ item.title }}</v-btn>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
  <!-- </v-sheet> -->
</template>
<script>
import firebaseServices from "../../firebase";
export default {
  name: "SuggestionGallery",
  data() {
    return {
      rows: 5,
      loading: false,
      closeOnClick: false,
      items: [
        { title: "Collection 1" },
        { title: "Collection 2" },
        { title: "Collection 3" },
        { title: "Collection 4" },
      ],
    };
  },
  computed: {
    moviesInGallery() {
      return this.$store.getters["getSuggestionGallery"];
    },
  },
  methods: {
    async addToCollection(movie) {
      await firebaseServices.movieListCollection
        // .doc("sugarMoves")
        .add({ ...movie, collectionName: "Drama" })
        .then(() => console.log("movie added succ."))
        .catch((error) => console.log(error));
      // console.log("Added to collection!!!", movie);
    },
  },
  async mounted() {
    this.loading = true;
    await this.$store.dispatch("fetchSuggestionMovieGallery", "trolls");
    // this.loading = false;
    console.log(this.moviesInGallery);
  },
};
</script>
