<template>
  <v-form @submit.prevent="searchMovie" class="search-form">
    <v-text-field
      placeholder="Search movies"
      v-model="search"
      prepend-inner-icon="mdi-magnify"
      type="text"
      outlined
      single-line
      densed
      clearable
    ></v-text-field>
    <!-- <v-text-field label="Outlined" single-line outlined></v-text-field> -->
  </v-form>
</template>

<script>
export default {
  data() {
    return {
      search: "",
    };
  },
  watch: {
    "$route.query": {
      handler(query) {
        this.searchMovie(query);
      },
    },
  },
  methods: {
    async searchMovie(query) {
      query = this.search;
      if (!query) return;
      console.log(query);
      this.$router.push({ name: "search", query: { t: this.search } });
      await this.$store.dispatch("fetchSuggestionMovieGallery", query);
    },
  },
};
</script>

<style scoped>
.search-form {
  margin-top: 20px;
  width: 40%;
}
.v-input__slot {
  border: 1px solid white !important;
}
.v-input__control > .v-input__slot:before {
  border-color: transparent !important;
}
</style>
