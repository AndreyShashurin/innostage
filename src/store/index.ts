import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    tovars: new Array<any>(),
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
    },
    updateTovars(state, tovar) {
      const i = tovar[3];
      state.tovars[i].name = tovar[0];
      state.tovars[i].count = tovar[1];
      state.tovars[i].type = tovar[2];
    },
    saveTovars(state, tovar) {
      state.tovars.push({
        "name": tovar[0],
        "count": tovar[1],
        "type": tovar[2],
        "category": tovar[3]
      })
    },
    deleteTovar: (state, i) => {
      state.tovars.splice(i,1);
    },
    deleteCat: (state, i) => {
      state.tovars = state.tovars.filter(el => el.category !== i)
      state.categories.splice(i,1);
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
