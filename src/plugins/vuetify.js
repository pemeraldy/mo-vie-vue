import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import colors from 'vuetify/lib/util/colors'

Vue.use(Vuetify)

export default new Vuetify({
  icon: 'md',
  
  theme: {
    dark: true,
    themes: {
      light: {
        primary: colors.red.darken4, // #E53935
        secondary: colors.red.lighten4, // #FFCDD2
        accent: colors.indigo.base, // #3F51B5
      },
      dark: {
        primary: colors.red.darken1, // #E53935
        secondary: colors.red.lighten1, // #FFCDD2
        accent: colors.indigo.base, // #3F51B5
      },      
    },
  },
})
