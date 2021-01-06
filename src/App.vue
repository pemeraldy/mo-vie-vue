<template>
  <v-app dark>
    <v-app-bar app flat>
      <v-tabs class="ml-n9 px-5" color="red darken-1">
        <v-tab class="app-name" @click="drawer = !drawer" to="/home"
          >Mo-v-share</v-tab
        >
        <v-spacer></v-spacer>
        <v-switch
          v-model="$vuetify.theme.dark"
          inset
          class="mt-4"
          label="Dark Mode"
        ></v-switch>
        <v-spacer></v-spacer>
        <!-- <search-form /> -->

        <v-tab v-if="isLoggedIn" color="red accent-2" @click="signOut"
          >Logout</v-tab
        >

        <v-tab v-if="!isLoggedIn" color="red accent-2" to="/sign-up"
          >Sign Up</v-tab
        >
        <v-tab v-if="!isLoggedIn" color="red accent-2" to="/login"
          >Log In</v-tab
        >
      </v-tabs>
      <v-avatar color="white mr-2" size="32"></v-avatar>
      <v-toolbar-title v-if="user" class="font-weight-regular pt-4 mr-3">
        {{ user.username.charAt(0).toUpperCase() + user.username.slice(1) }}
      </v-toolbar-title>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-list-item>
        <v-list-item-avatar>
          <v-icon>mdi-user</v-icon>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title v-if="user">{{
            user.username.charAt(0).toUpperCase() + user.username.slice(1)
          }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense>
        <v-list-item v-for="item in items" :key="item.title" link>
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <v-container fluid>
        <v-fade-transition>
          <router-view />
        </v-fade-transition>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
// import SearchForm from "@/components/SearchForm.vue";
export default {
  name: "App",
  data() {
    return {
      drawer: true,
      items: [
        { title: "Home", icon: "mdi-view-dashboard" },
        { title: "Search", icon: "mdi-magnify" },
        { title: "Login", icon: "mdi-login" },
        { title: "Sign up", icon: "mdi-clipboard-account" },
      ],
    };
  },
  components: {
    // SearchForm,
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
      this.$store.commit("setUserMovieCollections", []);
      // this.reloadAccess.reload();
      this.$router.push("/search");
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
.app-name {
  font-family: greatvibes;
}
</style>
