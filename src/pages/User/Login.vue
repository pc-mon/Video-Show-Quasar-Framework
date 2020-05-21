<template>
  <q-page>
    <q-input v-model="login.email" :label="$t('apps.login.email')" />
    <q-input v-model="login.password" :label="$t('apps.login.password')" />
    <q-btn @click="loginBtn">{{$t('apps.login.loginBtn')}}</q-btn>
  </q-page>
</template>

<script lang="ts">

export default {
  name: 'Login',
  data () {
    return {
      login: {
        'email':'',
        'password':''
      }
    }
  },
  methods: {
    loginBtn(){
      this.$axios.post(this.$wepurl + 'login',{...this.login}).then(r => {
        this.$store.commit('auth/token', 'Bearer ' + r.data.success.token)
        this.$axios.defaults.headers.common['Authorization'] = this.$store.getters['auth/token']
        this.$router.push({ name: 'home' })
      })
    }
  }
}
</script>
