<template>
  <q-page class="row">
    <div class="col">
      <q-input v-model="newVideo.url" :placeholder="$t('apps.videos.url')" type="url" />
      <q-input v-model="newVideo.title" :placeholder="$t('apps.videos.title')" />
      <q-input v-model="newVideo.desc" :placeholder="$t('apps.videos.desc')" type="textarea" />
      <q-btn @click="saveNewVideo">{{$t('save')}}</q-btn>
    </div>
    <div class="col q-pa-sm">
      <q-list bordered>
        <q-item :key="videoKey" v-for="(video,videoKey) in videos">
          <q-item-section>
            <h6>{{video.title}}</h6>
            <cite>{{video.desc}}</cite>
            <q-video
                :src="'https://www.youtube.com/embed/' + video.url"
              />
          </q-item-section>
          <q-item-section side>
            <q-btn @click="deleteVideo(videoKey)" color="red">
              <q-icon name="remove" />
            </q-btn>
          </q-item-section>
        </q-item>
      </q-list>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'Video',
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
  },
  methods: {
    saveNewVideo(){
      this.$axios.post(this.$wepurl + 'video',{...this.newVideo}).then(r =>{
        this.videos.push({...this.newVideo})
        this.$q.notify({
          'message': 'Video Saved!'
        })
        this.newVideo = {
          'url':'',
          'title':'',
          'desc':''
        }
      }).catch(function(){
        this.$q.notify({
          'message': 'Try Later Plase!'
        })
      })
    },
    deleteVideo(key){
      this.$axios.delete(this.$wepurl + 'video/' + this.videos[key].id).then(r =>{
        this.videos.splice(key,1)
        this.$q.notify({
          'message': 'Deleted!'
        })
      })
    }
  }
}
</script>
