<template>
  <v-row style="height: 100vh" class="my-auto" align="center" justify="center">
    <v-col cols="12" sm="8" md="4">
      <v-card class="elevation-12">
        <v-toolbar color="primary" dark flat>
          <v-toolbar-title>Login </v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-card-text>
          <v-form @submit.prevent="login" ref="form">
            <v-text-field
              label="Email"
              name="email"
              v-model="email"
              :rules="emailRules"
              prepend-icon="mdi-account"
              type="text"
            ></v-text-field>

            <v-text-field
              label="Password"
              v-model="password"
              :rules="passwordRules"
              name="password"
              prepend-icon="mdi-lock"
              type="password"
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn text to="/sign-up">Sign Up </v-btn>
          <v-spacer></v-spacer>
          <v-btn :loading="loading" @click="login" color="primary">Login</v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      loading: false,
      passwordRules: [
        (v) => !!v || "password is required",
        (v) =>
          (v && v.length >= 6) || "Password must not be less than 6 characters",
      ],
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      ],
      email: "",
      password: "",
    };
  },
  methods: {
    validate() {
      this.$refs.form.validate();
    },
    reset() {
      this.$refs.form.reset();
    },
    async login() {
      this.loading = true;
      try {
        await this.$store.dispatch("login", {
          email: this.email,
          password: this.password,
        });
        this.reset();
        this.loading = false;
        this.$router.push("/home");
      } catch (error) {
        this.loading = false;
        console.log(error);
      }
    },
  },
};
</script>
