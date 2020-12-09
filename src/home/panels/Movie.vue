<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-sheet v-if="movie">
          <v-card class="elevation-12">
            <v-toolbar color="primary" dark flat>{{ movie.Title }} </v-toolbar>
            <v-img height="250" :src="movie.Poster"></v-img>

            <v-card-title>{{ movie.Title }}</v-card-title>

            <v-card-text>
              <v-row align="center" class="mx-0">
                <v-rating
                  :value="4.5"
                  color="amber"
                  dense
                  half-increments
                  readonly
                  size="14"
                ></v-rating>

                <div class="grey--text ml-4">
                  {{ movie.Ratings[0].Value }}
                </div>
              </v-row>

              <div class="my-2 subtitle-4">
                Plot
              </div>

              <div>
                {{ movie.Plot }}
              </div>
            </v-card-text>

            <!-- <v-divider class="mx-4"></v-divider> -->

            <v-card-title>Add to collections</v-card-title>
            <v-card-actions>
              <v-btn color="deep-purple lighten-2" text>
                Add
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-sheet>
        <v-sheet v-else>
          <v-skeleton-loader
            class="mx-auto"
            max-width="300"
            type="card"
          ></v-skeleton-loader>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      movie: null,
    };
  },
  async mounted() {
    const id = this.$route.params.id;
    try {
      const movie = await this.$store.dispatch("getMovieById", id);
      this.movie = movie;
      console.log("From Movie Comp", this.movie);
    } catch (error) {
      console.log(error);
    }
  },
};
</script>

<style></style>
