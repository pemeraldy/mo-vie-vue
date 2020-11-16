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
                <v-list-item
                  v-for="collection in moviecollections"
                  :key="collection.id"
                  @click="addToCollection(collection, n)"
                >
                  <v-btn>{{ collection.name }}</v-btn>
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
      loading: false,
      closeOnClick: false,
    };
  },
  computed: {
    moviesInGallery() {
      return this.$store.getters["getSuggestionGallery"];
    },
    moviecollections() {
      return this.$store.getters["getUserMovieCollections"];
    },
  },
  methods: {
    async addToCollection(movieCollection, movie) {
      console.log(movie);
      // console.log(firebaseServices.auth.currentUser.uid);

      const movieColl = await firebaseServices.movieListCollection
        .doc(movieCollection.id)
        .get();
      console.log("movie-col:", movieColl.data().movies);
      let movieRef = await firebaseServices.movieListCollection.doc(
        movieCollection.id
      );
      console.log(movieRef);
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
  },
  async mounted() {
    this.loading = true;
    await this.$store.dispatch("fetchSuggestionMovieGallery", "trolls");
    // await this.$store.dispatch("fetc");
    // this.loading = false;

    // console.log("CURENT USER", firebaseServices.auth.currentUser.uid);

    // console.log(this.moviesInGallery);
  },
};
</script>
