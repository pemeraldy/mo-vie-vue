<template>
  <v-sheet rounded="lg" min-height="268" class="pa-3">
    <div class="row">
      <v-col sm12 md12>
        <v-card class="mx-auto" v-if="collection">
          <v-card-title class="display-1 align-center text--primary">
            {{ collection.name }}
          </v-card-title>
        </v-card>
      </v-col>
    </div>
    <v-layout row v-if="collection.movies.length > 0">
      <!-- <gallery-loader /> -->
      <v-flex v-for="movie in collection.movies" :key="movie.ImdbID" md3>
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
    <v-layout v-else>
      <v-card class="mx-auto" width="80%">
        <v-img src="@/assets/empty-collection.png" alt="empty collection" />
      </v-card>
    </v-layout>
  </v-sheet>
</template>
<script>
// import GalleryLoader from "../../components/GalleryLoader.vue";
export default {
  name: "CollectionMovieGallery",
  components: {
    // GalleryLoader,
  },
  data() {
    return {
      id: "",
      loading: true,
    };
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
  async mounted() {
    this.loading = false;
    const { id } = this.$route.params;
    try {
      this.$store.dispatch("getCollectionById", id);
    } catch (error) {
      console.log(error);
      this.loading = false;
    }
  },
};
</script>
