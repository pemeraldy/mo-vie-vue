<template>
  <v-app dark>
    <v-main>
      <v-container grey lighten-5 fluid>
        <v-app-bar app color="primary" flat>
          <v-avatar
            :color="$vuetify.breakpoint.smAndDown ? 'white' : 'transparent'"
            size="32"
          ></v-avatar>

          <v-avatar
            class="hidden-sm-and-down"
            color="grey darken-1 shrink"
            size="32"
          ></v-avatar>
        </v-app-bar>
        <v-fade-transition>
          <router-view />
        </v-fade-transition>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",
};
</script>
