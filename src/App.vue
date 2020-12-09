<template>
  <v-app dark>
    <v-app-bar dark height="80" app flat>
      <v-tabs class="ml-n9 px-4">
        <v-tab to="/home">Mo-v-share</v-tab>
        <v-spacer></v-spacer>
        <v-switch
          v-model="$vuetify.theme.dark"
          inset
          class="mt-4"
          label="Dark Mode"
          persistent-hint
        ></v-switch>
        <v-spacer></v-spacer>
        <search-form />
        <p v-if="user" class="font-weight-regular pt-4 mr-3">
          {{ user.username.charAt(0).toUpperCase() + user.username.slice(1) }}
        </p>

        <v-btn v-if="isLoggedIn" color="red accent-2" @click="signOut"
          >Logout</v-btn
        >
        <v-sheet v-else>
          <v-tab class="mr-2" color="red accent-2" to="/sign-up">Sign Up</v-tab>
          <v-tab color="red accent-2" to="/login">Log In</v-tab>
        </v-sheet>
      </v-tabs>
      <v-avatar color="white mr-2" size="32"></v-avatar>
    </v-app-bar>
    <v-main>
      <v-container grey lighten-5 fluid>
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
