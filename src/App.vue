<template>
  <v-app dark>
    <v-main>
      <v-container grey lighten-5 fluid>
        <v-app-bar dark height="80" app color="primary" flat>
          <v-toolbar-title class="home-bar">Mo-v-share</v-toolbar-title>
          <v-btn class="ml-2" color="red accent-2" to="/home">Home</v-btn>
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
          <div v-else>
            <v-btn class="mr-2" color="red accent-2" to="/sign-up"
              >Sign Up</v-btn
            >
            <v-btn color="red accent-2" to="/login">Log In</v-btn>
          </div>
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
      this.user.username = "";
      this.user.id = "";
      console.log(this.user.username);
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
