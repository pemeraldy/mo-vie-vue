<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="12" sm="4" md="4" lg="2">
          <v-fade-transition>
            <v-sheet rounded="lg" min-height="268">
              <router-view name="left" />
            </v-sheet>
          </v-fade-transition>
        </v-col>

        <v-col cols="12" sm="8" >
          <search-form></search-form>
          <v-sheet min-height="70vh" class="px-2" rounded="lg">
            <router-view />
          </v-sheet>
        </v-col>

        <v-col cols="12" sm="2">
          <router-view name="right" />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import SearchForm from "@/components/SearchForm";
export default {
  name: "HomeContainer",
  components: {
    SearchForm,
  },
};
</script>
