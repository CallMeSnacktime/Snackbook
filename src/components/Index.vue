<template>
  <div class="index container">
    <div class="card" v-for="snack in snacks" :key="snack.id">
      <div class="card-content">
        <i class="material-icons delete" @click="deleteSnack(snack.id)">delete</i>
        <h2 class="indigo-text">{{snack.title}}</h2>
        <ul class="ingredients">
          <li v-for="(ing, index) in snack.ingredients" :key="index">
            <span class="ing">{{ing}}</span>
          </li>
        </ul>
      </div>
      <span class="btn-floating btn-large halfway-fab pink">
        <router-link :to="{name: 'EditSnack', params: {snack_slug: snack.slug}}">
          <i class="material-icons edit">edit</i>
        </router-link>
      </span>
    </div>
  </div>
</template>

<script>
import db from '@/firebase/init.js'

export default {
  name: 'Index',
  data () {
    return{
      snacks: []
    }
  },
  methods: {
    deleteSnack(id){
    db.collection("snacks").doc(id).delete()
    .then(()=>{
      this.snacks = this.snacks.filter(snack => {
        return snack.id != id
      })
    })
  }        
  },
  
  created(){
    //get database data
    db.collection("snacks").get()
    .then(snapshot =>{
      snapshot.forEach(doc => {
        let snack = doc.data()
        snack.id = doc.id
        this.snacks.push(snack)
      })
    })
  }
}
</script>

<style>
.index {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 30px;
  margin: 30px;
}

.index h2{
  font-size: 1.8em;
  text-align: center;
  margin-top: 0px;
} 

.index .ingredients{
  margin: 30px auto;
}

.index .ingredients li{
  display: inline-block;
  background-color: #aaa;
  border-radius: 10px;
  padding: 5px;
  margin: 5px;
}

.index .delete{
  position: absolute;
  top: 4px;
  right: 4px;
  cursor: pointer;
  color: #aaa;
  font-size: 1.4em;
}


</style>
