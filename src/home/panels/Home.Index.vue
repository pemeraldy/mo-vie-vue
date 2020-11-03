<template>
  <div>
    <v-container grey lighten-5>
      <v-row>
        <v-col cols="12" sm="2">
          <v-fade-transition>
            <router-view name="left" />
          </v-fade-transition>
        </v-col>

        <v-col cols="12" sm="8">
          <router-view />
        </v-col>

        <v-col cols="12" sm="2">
          <router-view name="right" />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "HomeContainer",
};
</script>
