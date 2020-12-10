<template>
  <v-sheet rounded="lg" min-height="268">
    <v-toolbar color="red accent-3" dark>
      <v-icon>mdi-animation-play</v-icon>
      <v-toolbar-title class="ml-1">Collection Movie List</v-toolbar-title>
    </v-toolbar>
    <v-list v-if="collection">
      <v-list-item-group color="primary">
        <v-list-item v-for="movie in collection.movies" :key="movie.imdbID">
          <v-list-item-content>
            <v-list-item-title> {{ movie.Title }} </v-list-item-title>
          </v-list-item-content>
          <v-list-item-icon
            icon
            @click="deleteMovie(movie)"
            dark
            color="btn red  outlined"
          >
            <v-icon color="red">mdi-delete</v-icon>
          </v-list-item-icon>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-sheet>
</template>
<script>
export default {
  name: "CollectionMovieList",
  props: [],
  data() {
    return {};
  },
  watch: {
    "$route.params.id": function(id) {
      this.$store.dispatch("getCollectionById", id);
      // console.log("route changed:", id);
    },
  },
  computed: {
    collection() {
      return this.$store.getters["getCollection"];
    },
  },
  methods: {
    deleteMovie(movie) {
      this.$store.dispatch("deleteMovieFrmCollection", {
        movie: movie,
        collectionId: this.$route.params.id,
      });
    },
  },
  async mounted() {
    const { id } = this.$route.params;
    try {
      this.$store.dispatch("getCollectionById", id);
      this.loading = false;
    } catch (error) {
      console.log(error);
      this.loading = false;
    }
  },
};
</script>
