<template>
  <div id='q-app'>
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  created () {
    this.$axios.defaults.headers.common['Content-Type'] = 'application/json'
    if (localStorage.hasOwnProperty('MLBBMToken')){
      this.$axios.defaults.headers.common['Authorization'] = localStorage.getItem('MLBBMToken')
      this.$axios
      .post(this.$wepurl + 'details')
      .then(r => {
        this.$store.commit('auth/token', localStorage.getItem('MLBBMToken'))
      })
      .catch(r => {
        console.log('Unauthenticated')
        this.$store.commit('auth/logout')
      });
    }
    else{
      console.log('No Storge')
      this.$store.commit('auth/logout')
    }
    
  }
};
</script>
