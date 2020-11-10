<template>
  <v-row style="height: 100vh" class="my-auto" align="center" justify="center">
    <v-col cols="12" sm="8" md="4">
      <v-card class="elevation-12">
        <v-toolbar color="primary" dark flat>
          <v-toolbar-title>Sign Up</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-card-text>
          <v-form ref="form" @submit.prevent="signUp">
            <v-text-field
              label="Email"
              name="email"
              :rules="emailRules"
              v-model="email"
              prepend-icon="mdi-mail"
              type="email"
            ></v-text-field>

            <v-text-field
              label="username"
              name="username"
              v-model="username"
              :rules="usernameRules"
              prepend-icon="mdi-account"
              type="text"
            ></v-text-field>

            <v-text-field
              id="password"
              label="Password"
              name="password"
              v-model="password"
              :rules="passwordRules"
              prepend-icon="mdi-lock"
              type="password"
            ></v-text-field>
            <v-card-actions>
              <v-btn text to="/login">Login</v-btn>
              <v-spacer></v-spacer>
              <v-btn :loading="loading" @click="signUp" color="primary"
                >Sign Up</v-btn
              >
            </v-card-actions>
          </v-form>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "SignUp",
  data() {
    return {
      usernameRules: [
        (v) => !!v || "Name is required",
        (v) => (v && v.length <= 10) || "Name must be less than 10 characters",
      ],
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      ],
      passwordRules: [
        (v) => !!v || "passoword is required",
        (v) =>
          (v && v.length >= 6) || "password must not be less than 6 characters",
      ],
      email: "",
      username: "",
      password: "",
      loading: false,
    };
  },
  methods: {
    validate() {
      this.$refs.form.validate();
    },
    reset() {
      this.$refs.form.reset();
    },
    async signUp() {
      this.loading = true;
      console.log(this.email, this.password);
      this.validate();
      try {
        await this.$store.dispatch("signup", {
          email: this.email,
          username: this.username,
          password: this.password,
        });
        this.loading = false;
        this.$router.push("/login");
      } catch (error) {
        console.log("SINGUP ERR", error);
        this.loading = false;
      }
    },
  },
};
</script>
