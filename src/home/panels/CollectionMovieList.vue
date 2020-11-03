<template>
  <v-sheet min-height="100%">
    <h2>Collection Movie List</h2>
    <v-list>
      <v-list-item-group color="primary">
        <v-list-item v-for="i in 7" :key="i">
          <v-list-item-content>
            <v-list-item-title> Collection {{ i }} </v-list-item-title>
            <v-list-item-subtitle
              >Description going for collection {{ i }}</v-list-item-subtitle
            >
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-sheet>
</template>
<script>
export default {
  name: "CollectionMovieList",
};
</script>
