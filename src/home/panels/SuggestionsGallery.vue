<template>
  <!-- <v-sheet min-height="100%"> -->
  <v-container>
    <v-layout row>
      <v-flex v-for="n in moviesInGallery" :key="n.imdbID" md3>
        <v-card :loading="loading" class="mx-2 my-2 " max-width="374">
          <template slot="progress">
            <v-progress-linear
              color="deep-purple"
              height="10"
              indeterminate
            ></v-progress-linear>
          </template>

          <v-img height="250" :src="n.Poster"></v-img>

          <v-card-title>{{ n.Title }}</v-card-title>

          <v-card-text>
            <div class="my-4 subtitle-1">
              <span>{{ n.Year }}</span>
            </div>
          </v-card-text>

          <v-divider class="mx-4"></v-divider>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
  <!-- </v-sheet> -->
</template>
<script>
export default {
  name: "SuggestionGallery",
  data() {
    return {
      rows: 5,
      loading: false,
    };
  },
  computed: {
    moviesInGallery() {
      return this.$store.getters["getSuggestionGallery"];
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
