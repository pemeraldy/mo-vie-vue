<template>
  <v-form @submit.prevent="searchmovie" class="search-form">
    <v-text-field
      placeholder="search"
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
  methods: {
    async searchmovie() {
      await this.$store.dispatch("fetchSuggestionMovieGallery", this.search);
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
