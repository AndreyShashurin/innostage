import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    tovars: [],
    categories: []
  },
  getters: {
    categoriesFiltered(state) {
      return state.categories
    },
    tovarsFiltered(state) {
      return state.tovars
    },
 },
  mutations: {
    setCat: (state, data) => {
      state.categories = data
    },
    setTovars: (state, data) => {
      state.tovars = data
    }
  },
  actions: {
    getCategories({commit}) {
      const data = JSON.parse(`${localStorage.getItem('category')}`);
      commit('setCat', data)
    },  
    saveCategories({commit}, payload) {
      const parsed = JSON.stringify(payload.categories);
      localStorage.setItem('category', parsed);
      commit('setCat', payload.categories );
    },  
    saveTovars({commit}, payload) {
      const parsed = JSON.stringify(payload.tovars);
      localStorage.setItem('tovars', parsed);
      commit('setTovars', payload.tovars)
    },
    getTovars({commit}) {
      const data = JSON.parse(`${localStorage.getItem('tovars')}`);
      localStorage.setItem('getTovars', data);
      commit('setTovars', data)
    },
    getActiveCat({commit}) {
      const data = JSON.parse(`${localStorage.getItem('activeCat')}`);
      commit('setActiveCat', data)
    },
    setActiveCat({commit}, payload) {
      localStorage.setItem('activeCat', JSON.stringify(payload));
      commit('setActiveCat', payload)
    },
  }
})
