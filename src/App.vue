<template>
  <v-app dark>
    <v-main>
      <v-container grey lighten-5 fluid>
        <v-app-bar dark height="80" app color="primary" flat>
          <v-app-bar-nav-icon></v-app-bar-nav-icon>
          <v-toolbar-title class="home-bar" @click="goHome"
            >Mo-v-share</v-toolbar-title
          >
          <v-spacer> </v-spacer>
          <search-form />
          <v-spacer></v-spacer>
          <p v-if="user" class="font-weight-regular pt-4 mr-3">
            {{ user.username.charAt(0).toUpperCase() + user.username.slice(1) }}
          </p>
          <v-avatar color="white mr-2" size="32"></v-avatar>
          <v-btn v-if="isLoggedIn" color="red accent-2" @click="signOut"
            >Logout</v-btn
          >
          <v-btn v-else color="red accent-2">Sign Up</v-btn>
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
  computed: {
    isLoggedIn() {
      return this.$store.getters["getUserLoggedIn"];
    },
    user() {
      return this.$store.getters["getUser"];
    },
  },
  methods: {
    signOut() {
      this.$store.dispatch("logout");
      this.$router.push("/login");
    },
    goHome() {
      this.$router.push("/home");
    },
  },
};
</script>
<style lang="css">
.home-bar {
  cursor: pointer;
}
</style>
