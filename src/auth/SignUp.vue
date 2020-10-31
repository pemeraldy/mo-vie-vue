<template>
<v-row
  style="height: 100vh"
          class="my-auto"
            align="center"
            justify="center"
          >
            <v-col
              cols="12"
              sm="8"
              md="4"
            >
              <v-card class="elevation-12">
                <v-toolbar
                  color="primary"
                  dark
                  flat
                >
                  <v-toolbar-title>Sign Up</v-toolbar-title>
                  <v-spacer></v-spacer>
                </v-toolbar>
                <v-card-text>
                  <v-form>
                    <v-text-field
                      label="Email"
                      name="email"
                      prepend-icon="mdi-account"
                      type="email"
                    ></v-text-field>
  
                    <v-text-field
                      id="password"
                      label="Password"
                      name="password"
                      prepend-icon="mdi-lock"
                      type="password"
                    ></v-text-field>
                  </v-form>
                </v-card-text>
                <v-card-actions>
                  <v-btn text to="/login">Login</v-btn>
                  <v-spacer></v-spacer>
                  <v-btn color="primary">Sign Up</v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
</template>

<script>
  export default {
    name: 'SignUp',
  }
</script>
