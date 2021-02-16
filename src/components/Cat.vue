<template>
  <v-list>
    <v-list-item-group>
      <v-list-item
        v-for="(item, i) in todosFiltered"
        :key="i" 
        @click="selectCat(i)"
        :class="{ active: activeCat === i }"
      >
        <div style="width: 100%; display: flex; justify-content: space-between;">
        <span>{{item.name}}</span>
        <v-icon elevation="2" icon @click="deleteCat(i)">mdi-minus</v-icon></div>
      </v-list-item>
    </v-list-item-group>
  </v-list>
</template>

<script lang="ts">
import Vue from 'vue'
import { Categories } from '@/types'
import { mapGetters } from 'vuex';
export default Vue.extend({
  name: 'Cat',
  props: ['category'],
  data() {
    return {
      activeCat: 0,
    }
  },
  watch: { 
    category(newVal: string): void {
      if(newVal) {
        this.$store.commit('pushCategory', newVal);
        this.saveCats();
      }
    }
  },
  computed: {
    ...mapGetters({
      categories: 'categoriesFiltered'
    }),
    todosFiltered(): Categories {
      return this.categories;
    }
  },
  mounted() {
    if(localStorage.getItem('category')) {
      this.$store.dispatch('getCategories');
    }
    if(localStorage.getItem('activeCat')) {
      this.activeCat = JSON.parse(`${localStorage.getItem('activeCat')}`);
      this.$emit('toggleCat', this.activeCat);
    }
  },
  methods: {
    saveCats(): void {
      this.$store.dispatch('saveCategories');
    },
    deleteCat(i: number): void {
      this.$emit('deleteCat', i);
      this.saveCats()
    },
    selectCat(i: number): void{
      this.activeCat = i;
      this.$emit('toggleCat', i);
      localStorage.setItem('activeCat', JSON.stringify(i));
    }
  }
})
</script>
<style scoped>
.active {
  background: #d0d0d0;
}
.v-icon {
  z-index: 100;
  background: white;
}
</style>