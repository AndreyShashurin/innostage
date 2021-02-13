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

  export default Vue.extend({
    name: 'Cat',
    props: ['category'],
    data: () => ({
      categories: new Array<any>(),
      activeCat: 0,
    }),
    watch: { 
      category(newVal: string) {
        if(newVal) {
          this.categories.push({"name":this.category});
          this.saveCats();
        }
      }
    },
  computed: {
    todosFiltered() {
      return this.$store.getters.categoriesFiltered
    },
  },
    mounted() {
      this.$store.dispatch('getCategories');
      if(localStorage.getItem('activeCat')) {
        this.activeCat = JSON.parse(`${localStorage.getItem('activeCat')}`);
        this.$emit('toggleCat', this.activeCat);
      }
    },
    methods: {
      saveCats() {
        this.$store.dispatch('savetCategories', {
          categories: this.categories
        })
      },
      deleteCat(i: number) {
       this.categories.splice(i,1);
        this.saveCats();
        this.$emit('deleteCat', i);
      },
      selectCat(i: number) {
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