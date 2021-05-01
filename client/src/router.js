import Vue from 'vue'
import router from 'vue-router'
import Vuex from 'vuex'


import Home from './components/Home'
import SearchList from './components/SearchList'
import HotelInfo from './components/HotelInfo'
import Profile from './components/Profile'


Vue.use(router)
Vue.use(Vuex)

export default new router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        keepAlive: true,
        title: 'home'
      }
    },
    {
      path: '/search',
      name: 'SearchList',
      component: SearchList,
      meta: {
        keepAlive: true,
        title: 'SearchList'
      }
    },
    {
      path: '/hotelinfo',
      name: 'HotelInfo',
      component: HotelInfo,
      meta: {
        keepAlive: true,
        title: 'HotelInfo'
      }
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile,
      meta: {
        keepAlive: true,
        title: 'Profile'
      }
    }
    
]

})