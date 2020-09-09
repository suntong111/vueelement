import Vue from 'vue'
import Vuex from 'vuex'
import fa from "element-ui/src/locale/lang/fa";

Vue.use(Vuex)

const types = {
  SET_IS_AUTNENTIATED : 'SET_IS_AUTNENTIATED',
  SET_USER : 'SET_USER'
}

const state = {
  isAuthenticated : false,
  user : {

  }
}

const getters = {
  isAuthenticated : state=>state.isAuthenticated,
  user : state=>state.user
}

const mutations = {
  [types.SET_IS_AUTNENTIATED](state,isAuthenticated){
    if (isAuthenticated)
      state.isAuthenticated = isAuthenticated;
    else
      state.isAuthenticated = false;
  },
  [types.SET_USER](state,user){
    if (user)
      state.user = user;
    else
      state.user = {};
  }
}

const actions = {
   setAuthenticated : ({commit},isAuthenticated)=>{
     commit(types.SET_IS_AUTNENTIATED,isAuthenticated);
   },
  setUser : ({commit},user)=>{
     commit(types.SET_USER,user)
  },
  clearCurrentState:({commit})=>{
     commit(types.SET_IS_AUTNENTIATED,false)
    commit(types.SET_USER,null)
  }
}
export default new Vuex.Store({
  // state: {
  // },
  // mutations: {
  // },
  // actions: {
  // },
  // modules: {
  // }
  state,
  getters,
  mutations,
  actions
})
