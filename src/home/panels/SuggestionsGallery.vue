<template>
  <!-- <v-sheet min-height="100%"> -->
  <v-container>
    <v-layout row>
      <v-flex v-for="n in rows" :key="n.imdbID" md3>
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
  async mounted() {
    this.loading = true;
    const search = await fetch(
      `http://www.omdbapi.com/?s=avengers&apikey=60fd5e0c`
    )
      .then((data) => data.json())
      .then((data) => data);
    const movies = await search.Search;
    this.rows = movies;
    console.log(movies);
    this.loading = false;
  },
};
</script>
