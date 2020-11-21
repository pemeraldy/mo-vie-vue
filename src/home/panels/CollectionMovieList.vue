<template>
  <v-sheet min-height="100%">
    <h2>Collection Movie List</h2>
    <v-list v-if="collection">
      <v-list-item-group color="primary">
        <v-list-item v-for="movie in collection.movies" :key="movie.imdbID">
          <v-list-item-content>
            <v-list-item-title> {{ movie.Title }} </v-list-item-title>
            <v-list-item-subtitle> {{ movie.Year }}</v-list-item-subtitle>
            <v-btn @click="deleteMovie(movie)" dark color="btn red  outlined"
              >Delete</v-btn
            >
          </v-list-item-content>
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
