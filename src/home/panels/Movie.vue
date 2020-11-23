<template>
  <!-- <div>Movie Component {{ $route.params.id }}</div> -->
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card class="elevation-12">
          <v-toolbar color="primary" dark flat>Movie Title </v-toolbar>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {};
  },
  mounted() {
    console.log(this.$route.params);
  },
};
</script>

<style></style>
