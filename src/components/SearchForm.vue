<template>
  <v-form @submit.prevent="searchmovie" class="search-form">
    <v-text-field
      placeholder="search"
      v-model="search"
      prepend-inner-icon="mdi-magnify"
      type="text"
      clearable
    ></v-text-field>
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
      const search = await fetch(
        `http://www.omdbapi.com/?s=${this.search}&apikey=60fd5e0c`
      )
        .then((data) => data.json())
        .then((data) => data);
      const movies = await search.Search;
      this.rows = movies;
      console.log(movies);
      this.loading = false;
    },
  },
};
</script>

<style scoped>
.search-form {
  margin-top: 20px;
  width: 60%;
}
.v-input__slot {
  border: 1px solid white !important;
}
.v-input__control > .v-input__slot:before {
  border-color: transparent !important;
}
</style>
