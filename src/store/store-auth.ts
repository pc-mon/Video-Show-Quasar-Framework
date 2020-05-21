// this.$store.getters['auth/token']
// this.$store.commit('auth/token', newValue);

const actions = {

}
const getters = {
    token: (state:any) => {
        return state.token
    },
    essentialLinks: (state:any) => {
        return state.essentialLinks
    },
}
const mutations = {
    token(state:any, newValue:any) {
        localStorage.setItem('MLBBMToken', newValue)
        state.token = newValue
        state.essentialLinks = {
            'auth': true,
            'menu': [
                {
                    title: "home",
                    caption: "Common Videos",
                    icon: "home",
                    link: { name: "home" }
                },
                {
                    title: "videos",
                    caption: "Videos",
                    icon: "video_library",
                    link: { name: "videos" }
                }
            ]
        }
    },
    logout(state: any) {
        localStorage.removeItem('MLBBMToken')
        state.token = null
        state.essentialLinks = {
            'auth': false,
            'menu': [
                {
                    title: "home",
                    caption: "Common Videos",
                    icon: "home",
                    link: { name: "home" }
                },
                {
                    title: "login",
                    caption: "Access Your Data",
                    icon: "person",
                    link: { name: "userLogin" }
                }
            ]
        }
    },
    essentialLinks(state: any, newValue: any) {
        state.essentialLinks = newValue
    }
}
const state = {
    token: '',
    essentialLinks: []
}

export default {
    namespaced: true,
    actions,
    getters,
    mutations,
    state
}