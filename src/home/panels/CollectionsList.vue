<template>
  <v-card class="mx-auto mt-4 app" max-width="500">
    <v-toolbar color="primary" dark>
      <v-toolbar-title class="">
        Collections
        <v-btn class="ml-10" color="white" elevation="5" outlined>Add</v-btn>
      </v-toolbar-title>
    </v-toolbar>

    <v-list>
      <v-list-item-group color="primary">
        <v-list-item v-for="i in items" :key="i">
          <v-list-item-content>
            <v-list-item-title>Collection {{ i }}</v-list-item-title>
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
    return {
      items: 6,
    };
  },
};
</script>
