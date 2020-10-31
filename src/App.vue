<template>
  <v-app dark>
    <v-main>
      <v-container grey lighten-5 fluid>
        <v-app-bar app color="primary" flat>
          <v-app-bar-nav-icon></v-app-bar-nav-icon>
          <v-toolbar-title>Mo-v-share</v-toolbar-title>
          <v-spacer> </v-spacer>
          <search-form />
          <v-spacer></v-spacer>
          <v-avatar color="white" size="32"></v-avatar>

          <v-btn icon>
            <v-icon>mdi-export</v-icon>
          </v-btn>
        </v-app-bar>
        <v-fade-transition>
          <router-view />
        </v-fade-transition>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import SearchForm from "@/components/SearchForm.vue";
export default {
  name: "App",
  components: {
    SearchForm,
  },
};
</script>
