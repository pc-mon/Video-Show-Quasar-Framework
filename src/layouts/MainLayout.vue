<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title>{{$t('App')}}</q-toolbar-title>

        <div>
          {{$t('betaVersion')}}
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered content-class="bg-grey-1">
      <q-list>
        <EssentialLink v-for="link in essentialLinks.menu" :key="link.title" v-bind="link" />
        <q-btn-toggle 
      flat
      v-model='locale'
      @input="setLocale"
      color="blue-3"
      toggle-color="blue"
      :options="[{ label: 'عربي', value: 'ar-sa'},
                 { label: 'English', value: 'en-us'}]" />
        <q-btn v-if="essentialLinks.auth" class="full-width" @click="logout" color="red">{{$t('logout')}}</q-btn>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from "components/EssentialLink";
import { mapState } from "vuex";

export default {
  name: 'MainLayout',

  components: {
    EssentialLink
  },

  data() {
    return {
      leftDrawerOpen: false,
      locale: this.$q.lang.isoName
      // essentialLinks: this.$store.getters['auth/essentialLinks']
    };
  },
  methods: {
    setLocale (locale) {
      // set the Vue-i18n locale 
      this.$i18n.locale = locale
      // load the Quasar language pack dynamically
      import(`quasar/lang/${locale}`).then(({ default: messages }) => {
        this.$q.lang.set(messages)
      })
    },
    logout(){
      this.$store.commit('auth/logout')
      this.$router.push({ name: 'home' })
    }
  },
  computed: {
    essentialLinks(){
      return this.$store.getters['auth/essentialLinks']
    }
  },
};
</script>
