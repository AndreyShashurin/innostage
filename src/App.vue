<template>
  <v-app>
    <v-container class="lighten-5">
      <v-row class="mb-12" no-gutters>
        <v-col md="3" class="btn-flex">
          <v-btn
            color="red lighten-2"
            dark
            @click.stop="openDialog()"
          >
            Добавить категорию
          </v-btn>
          <v-dialog
            v-model="dialog"
            width="500"
          >
            <v-card>
              <v-card-text>
                <v-text-field 
                    v-model="category"
                ></v-text-field>
              </v-card-text>
              <v-card-actions>
                  <v-btn
                    color="primary"
                    text
                    @click="addCat()"
                  >
                    Сохранить
                  </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-col>
        <v-col md="8" class="ml-md-auto">
          <v-text-field
            label="Найти"
            v-model="search"
            hide-details="auto"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row class="mb-6" no-gutters>
        <v-col md="3">
          <Cat v-on:toggleCat="toggleCat($event)" :category="categoryEmit" v-on:deleteCat="deleteCat($event)"></Cat>
        </v-col>
        <v-col md="8" class="ml-md-auto">
          <v-card>      
            <draggable
            :list="filteredResources"
            @change="checkMove"
            @start="dragging = true"
            @end="dragging = false"
          >
            <div class="border" v-for="(item, i) in filteredResources" :key="i"> 
              <v-container class="v-container" v-if="activeCat === item.category">
                <v-container class="v-container" @click="update(i, item)">
                  <v-col md="3" >{{ item.name }}</v-col>
                  <v-col md="3">{{ item.count }}</v-col>
                  <v-col md="3">{{ item.type }}</v-col>
                </v-container>
                <v-col md="3"><v-icon elevation="2" icon @click="deleteTovar(i)">mdi-minus</v-icon></v-col>
              </v-container>
            </div>
            </draggable>
            <div> 
              <v-container class="newTovar v-container">
                <v-col md="3"><v-text-field v-model="name"></v-text-field></v-col>
                <v-col md="3"><v-text-field v-model="count"></v-text-field></v-col>
                <v-col md="3"><v-text-field v-model="type"></v-text-field></v-col>
                <v-col md="3"><v-icon elevation="2" icon @click="addTovar(selectedTovar)">mdi-plus</v-icon></v-col>
              </v-container>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import draggable from 'vuedraggable'
import Cat from '@/components/Cat.vue';
import { Tovar } from '@/types'
import { mapGetters } from 'vuex';

export default Vue.extend({
  name: 'App',
  components: {
    Cat,
    draggable
  },
  data() {
    return {
      dialog: false,
      isUpdate: false,
      dragging: false,
      selectedTovar: 0,
      activeCat: 0,
      category: "",
      categoryEmit: "",
      name: "",
      search: "",
      count: "",
      type: ""
    }
  },
  computed: {
    ...mapGetters({
      tovars: 'tovarsFiltered'
    }),
    filteredResources(): Tovar {
      if(this.search){
        return this.tovars.filter((el: { name: string }) => {
          return el.name.toLowerCase().includes(this.search.toLowerCase());
        })
      } else{
        return this.tovars
      }
    }
  },
  mounted() {
    if(localStorage.getItem('tovars')) {
      this.$store.dispatch('getTovars');
    }
  },
  methods: {
    toggleCat(i: number): void {
      this.activeCat = i;
    },
    addTovar(i?: number): void {
      if(this.isUpdate) {
        const data = [this.name, this.count, this.type, i];
        this.$store.commit('updateTovars', data);
        this.isUpdate = false;
      } else {
        const data = [this.name, this.count, this.type, this.activeCat];
        this.$store.commit('pushTovar', data);
      }
      this.saveTovar();
      this.cleaFieldTovar();
    },
    cleaFieldTovar(): void {
      this.name = '';
      this.count = '';
      this.type = '';
    },
    update(i: number, data: Tovar): void {
      this.name = data.name;
      this.count = data.count;
      this.type = data.type;
      this.isUpdate = true;
      this.selectedTovar = i;
    },
    deleteTovar(i: number): void{
      this.$store.commit('deleteTovar', i);
      this.saveTovar();
    },
    saveTovar(): void  {
      this.$store.dispatch('saveTovar');
    },
    addCat() {
      if(!this.category) return;
      this.categoryEmit  = this.category;
      this.dialog = !this.dialog;
    },
    openDialog(): void  {
      this.dialog = !this.dialog;
    },
    checkMove(): void {
      this.saveTovar();
    },
    deleteCat(i: number): void  {
      this.$store.commit('deleteCat', i);
      this.saveTovar();
    }
  }
});
</script>
<style scoped>
.v-container {
  display:flex;
  padding: 0px 10px;
  cursor: pointer;
  align-items: center
}
.v-container:not(.newTovar):hover {
  background: #f3f1f1;
}
.border {
  border-bottom: solid 1px #efe8e8;
}
.btn-flex {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
