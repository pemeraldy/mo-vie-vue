<template>
  <v-sheet min-height="100%" class="pa-3">
    <div class="row">
      <v-col sm12 md12>
        <v-card class="mx-auto">
          <v-card-text>
            <p class="display-1 text--primary">
              {{ collectionName }}
            </p>

            <div class="text--primary">
              Description of collection
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </div>
    <v-layout row>
      <v-flex v-for="movie in collectionMovies" :key="movie.ImdbID" md3>
        <v-card :loading="loading" class="mx-2 my-2 " max-width="374">
          <template slot="progress">
            <v-progress-linear
              color="deep-purple"
              height="10"
              indeterminate
            ></v-progress-linear>
          </template>

          <v-img height="250" :src="movie.Poster"></v-img>

          <v-card-title>{{ movie.Title }}</v-card-title>

          <v-card-text>
            <div class="my-4 subtitle-1">
              <span>{{ movie.Year }}</span>
            </div>
          </v-card-text>

          <v-divider class="mx-4"></v-divider>
        </v-card>
      </v-flex>
    </v-layout>
  </v-sheet>
</template>
<script>
import fb from "../../firebase";

export default {
  name: "CollectionMovieGallery",
  data() {
    return {
      loading: true,
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
  },
};
</script>
