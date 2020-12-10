<template>
  <v-layout class="loader">
    <v-flex v-for="(n, index) in 10" :key="index">
      <v-sheet class="pa-3">
        <v-skeleton-loader
          class="mx-auto"
          max-width="300"
          type="card"
        ></v-skeleton-loader>
      </v-sheet>
    </v-flex>
  </v-layout>
</template>

<script>
export default {};
</script>

<style scoped>
.loader {
  position: absolute;
}
</style>
