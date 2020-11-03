<template>
  <v-sheet min-height="100%" class="pa-3">
    <div class="row">
      <v-col sm12 md12>
        <v-card class="mx-auto">
          <v-card-text>
            <p class="display-1 text--primary">
              Collection Title
            </p>

            <div class="text--primary">
              Description of collection
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </div>
    <v-layout row>
      <v-flex v-for="n in 5" :key="n" md3>
        <v-card :loading="loading" class="mx-2 my-2 " max-width="374">
          <template slot="progress">
            <v-progress-linear
              color="deep-purple"
              height="10"
              indeterminate
            ></v-progress-linear>
          </template>

          <v-img height="250" src=""></v-img>

          <v-card-title>{{ n }}</v-card-title>

          <v-card-text>
            <div class="my-4 subtitle-1">
              <span>{{ n }}</span>
            </div>
          </v-card-text>

          <v-divider class="mx-4"></v-divider>
        </v-card>
      </v-flex>
    </v-layout>
  </v-sheet>
</template>
<script>
export default {
  name: "CollectionMovieGallery",
  data() {
    return {
      loading: true,
    };
  },
};
</script>
