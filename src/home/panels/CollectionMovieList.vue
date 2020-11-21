<template>
  <v-sheet min-height="100%">
    <h2>Collection Movie List</h2>
    <v-list>
      <v-list-item-group color="primary">
        <v-list-item v-for="movie in collectionMovies" :key="movie.imdbID">
          <v-list-item-content>
            <v-list-item-title> {{ movie.Title }} </v-list-item-title>
            <v-list-item-subtitle> {{ movie.Year }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-sheet>
</template>
<script>
import fb from "../../firebase";
export default {
  name: "CollectionMovieList",
  props: [],
  data() {
    return {
      collectionName: "",
      collectionMovies: [],
    };
  },
  async mounted() {
    // console.log(this.$route.params);
    const { id } = this.$route.params;
    const movref = await fb.movieListCollection.doc(id).get();
    const collection = await movref.data();
    const { movies, name } = collection;
    this.collectionName = name;
    this.collectionMovies = movies;
    console.log(name);

    // movref
    //   .doc(id)
    //   .get()
    //   .then((doc) => {
    //     console.log(doc.data());
    //   });
  },
};
</script>
