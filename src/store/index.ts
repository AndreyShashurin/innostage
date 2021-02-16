import Vue from 'vue'
import Vuex from 'vuex'
import { Tovar, Categories } from '@/types'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    tovars: [] as Tovar[],
    categories: [] as Categories[]
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
    setCat(state, data) {
      state.categories = data
    },
    pushCategory(state, data) {
      state.categories.push({
        "name": data,
      })
    },
    setTovars(state, data) {
      state.tovars = data
    },
    updateTovars(state, tovar) {
      const i = tovar[3];
      state.tovars[i].name = tovar[0];
      state.tovars[i].count = tovar[1];
      state.tovars[i].type = tovar[2];
    },
    pushTovar(state, data) {
      state.tovars.push({
        "name": data[0],
        "count": data[1],
        "type": data[2],
        "category": data[3]
      })
    },
    deleteTovar(state, i) {
      state.tovars.splice(i,1);
    },
    deleteCat(state, i) {
      state.tovars = state.tovars.filter(el => el.category !== i)
      state.categories.splice(i,1);
    }
  },
  actions: {
    getCategories({commit}) {
      const data = JSON.parse(`${localStorage.getItem('category')}`);
      commit('setCat', data)
    },  
    saveCategories({state}) {
      const parsed = JSON.stringify(state.categories);
      localStorage.setItem('category', parsed);
    },  
    saveTovar({state}, ) {
      const parsed = JSON.stringify(state.tovars);
      localStorage.setItem('tovars', parsed);
    },
    getTovars({commit}) {
      const data = JSON.parse(`${localStorage.getItem('tovars')}`);
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
