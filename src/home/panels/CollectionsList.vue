<template>
  <v-card class="mx-auto mt-4 app" max-width="500">
    <v-toolbar color="primary" dark class="d-flex justify-space-between">
      <v-toolbar-title style="margin-right:74px" class="">
        Collections
      </v-toolbar-title>
      <v-btn color="white ml-5" elevation="5" outlined>Add</v-btn>
    </v-toolbar>

    <v-list>
      <v-list-item-group color="primary">
        <v-list-item v-for="i in 7" :key="i">
          <v-list-item-content>
            <v-list-item :to="{ name: 'collections', params: { id: i } }"
              >Collection {{ i }}</v-list-item
            >
            <v-list-item-subtitle
              >Description going for collection {{ i }}</v-list-item-subtitle
            >
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-card>
</template>
<script>
export default {
  name: "CollectionList",
  data() {
    return {};
  },
};
</script>
