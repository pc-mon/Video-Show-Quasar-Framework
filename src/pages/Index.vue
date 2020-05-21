<template>
  <q-page class="row items-center justify-evenly">
    <q-list bordered>
        <q-item :key="videoKey" v-for="(video,videoKey) in videos">
          <q-item-section>
            <h6>{{video.title}}</h6>
            <!-- <cite>{{video.desc}}</cite> -->
            <q-video
                :src="'https://www.youtube.com/embed/' + video.url"
              />
          </q-item-section>
        </q-item>
      </q-list>
  </q-page>
</template>

<script lang="ts">

export default {
  name: 'PageIndex',
  data () {
    return {
      newVideo: {
        'url':'',
        'title':'',
        'desc':''
      },
      videos: []
    }
  },
  created () {
    this.$axios.get(this.$wepurl + 'video/').then(r => {
      this.videos = r.data
    })
  }

}
</script>
