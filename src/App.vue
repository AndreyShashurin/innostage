<template>
  <v-app>
    <v-container class="lighten-5">
      <v-row class="mb-12" no-gutters>
        <v-col md="6">
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
        <v-col md="4">
          <v-card
            class="pa-2"
            outlined
            tile
          >
          <v-text-field
            label="Найти"
            v-model="search"
            hide-details="auto"
          ></v-text-field>
          </v-card>
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
              <v-container class="v-container" v-if="activeCat == item.category">
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
              <v-container class="v-container">
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
import Cat from '@/components/Cat.vue';
import draggable from 'vuedraggable'

export default Vue.extend({
  name: 'App',
  components: {
    Cat,
    draggable
  },
  data () {
    return {
      categories: new Array<any>(),
      tovars: new Array<any>(),
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
  created() {
    this.getTovar();
  },
  methods: {
    toggleCat(e: number) {
      this.activeCat = e;
    },
    addTovar(i?: any) {
      if(this.isUpdate) {
        this.tovars[i].name = this.name;
        this.tovars[i].count = this.count;
        this.tovars[i].type = this.type;
        this.isUpdate = false;
      } else {
        this.tovars.push({
          "name": this.name,
          "count": this.count,
          "type": this.type,
          "category": this.activeCat
        })
      }
      this.saveTovar();
      this.clear();
    },
    clear() {
      this.name = '';
      this.count = '';
      this.type = '';
    },
    update(i: number, data: any) {
      this.name = data.name;
      this.count = data.count;
      this.type = data.type;
      this.isUpdate = true;
      this.selectedTovar = i;
    },
    deleteTovar(i: number){
      this.tovars.splice(i,1);
      this.saveTovar()
    },
    saveTovar() {
      const parsed = JSON.stringify(this.tovars);
      localStorage.setItem('tovars', parsed);
    },
    addCat() {
      if(!this.category) return;
      this.categoryEmit  = this.category;
      this.dialog = !this.dialog;
    },
    openDialog() {
      this.dialog = !this.dialog;
    },
    getTovar() {
      if(localStorage.getItem('tovars')) {
        this.tovars = JSON.parse(`${localStorage.getItem('tovars')}`);
      }
    },
    checkMove(e: any) {
      this.saveTovar()
    },
    deleteCat(i: number) {
      this.tovars = this.tovars.filter(el => {
        return el.category !== i
      })
      this.saveTovar()
    }
  },
  computed: {
    filteredResources(): any{
      if(this.search){
        return this.tovars.filter(el => {
          return el.name.toLowerCase().includes(this.search.toLowerCase());
        })
      } else{
        return this.tovars;
      }
    }
  }
});
</script>
<style scoped>
.v-container {
  display:flex;
  padding: 0px 10px;
  align-items: center
}
.border {
  border-bottom: solid 1px #efe8e8;
}
</style>
