<template>
  <!-- <v-sheet min-height="100%"> -->
  <v-container>
    <v-layout v-if="!moviesInGallery">
      <div>
        <v-skeleton-loader
          class="mx-auto"
          max-width="300"
          type="card"
        ></v-skeleton-loader>
        <h2>No Result found</h2>
      </div>
    </v-layout>
    <v-layout v-else row>
      <v-flex v-for="n in moviesInGallery" :key="n.imdbID" md3>
        <v-card
          :loading="!n.Poster"
          :to="{ name: 'movie', params: { id: n.imdbID } }"
          class="mx-2 my-2 "
          max-width="374"
          max-height="484"
        >
          <template slot="progress">
            <v-progress-linear
              color="deep-purple"
              height="10"
              indeterminate
            ></v-progress-linear>
          </template>

          <v-img height="250" :src="n.Poster"></v-img>

          <v-card-title
            d-inline-block
            class="d-inline-block text-truncate"
            style="max-width: 380px;"
            @click="addToCollection(n)"
            >{{ n.Title }}</v-card-title
          >

          <v-card-text>
            <div class="my-4 font-weight-medium">
              Year: <span>{{ n.Year }}</span>
            </div>
          </v-card-text>

          <v-card-actions v-if="movieCollections.length > 0">
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
                <v-list-item
                  v-for="collection in movieCollections"
                  :key="collection.id"
                  @click="addToCollection(collection, n)"
                >
                  <v-btn>{{ collection.name }}</v-btn>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-card-actions>
          <v-card-actions v-else>
            <v-dialog v-model="dialog" persistent max-width="350">
              <template v-slot:activator="{ on, attrs }">
                <div class="font-weight-normal grey--text">
                  Add to your favourite collections
                </div>

                <v-btn
                  class="ml-4"
                  color="primary"
                  dark
                  v-bind="attrs"
                  v-on="on"
                >
                  Add
                </v-btn>
              </template>
              <v-card>
                <v-card-title class="headline">
                  New Movies Collection
                </v-card-title>
                <v-container>
                  <v-alert type="info"
                    >Create an account to create collections of movies</v-alert
                  >
                </v-container>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="green darken-1" text to="/sign-up">
                    Sign up
                  </v-btn>
                  <v-btn color="green darken-1" text @click="dialog = false">
                    Cancel
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
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
      loading: false,
      dialog: false,
      closeOnClick: false,
    };
  },
  computed: {
    moviesInGallery() {
      return this.$store.getters["getSuggestionGallery"];
    },
    movieCollections() {
      return this.$store.getters["getUserMovieCollections"];
    },
  },
  methods: {
    async addToCollection(movieCollection, movie) {
      const movieColl = await firebaseServices.movieListCollection
        .doc(movieCollection.id)
        .get();
      // console.log("movie-col:", movieColl.data().movies);
      let movieRef = await firebaseServices.movieListCollection.doc(
        movieCollection.id
      );
      await movieRef
        .set({
          userId: firebaseServices.auth.currentUser.uid,
          name: movieColl.data().name,
          movies: [...movieColl.data().movies, movie],
        })
        .then(function() {
          console.log("Movie successfully added!");
        })
        .catch(function(error) {
          // The document probably doesn't exist.
          console.error("Error updating document: ", error);
        });
    },
    createCollection() {
      console.log("signup to add to create collections");
    },
  },
  async mounted() {
    this.loading = true;
    console.log(this.movieCollections.length);
    await this.$store.dispatch("fetchSuggestionMovieGallery");
  },
};
</script>
