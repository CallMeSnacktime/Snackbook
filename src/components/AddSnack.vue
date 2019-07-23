<template>
    <div class="add-snack container">
        <h2 class="center-align indigo-text">Add Snack Recipe</h2>
        <form @submit.prevent="addSnack">
            <div class="field title">
                <label for="title">Snack Title</label>
                <input type="text" name="title" v-model="title">
            </div>
            <div v-for="(ing, index) in ingredients" :key="index" class="field">
                <label for="ingredient">Ingredient Added:</label>
                <input type="text" name="ingredient" v-model="ingredients[index]">
                <i class="material-icons delete" @click="deleteIng(ing)">delete</i>
            </div>
            <div class="field add-ingredient">
                <label for="add-ingredient">Add an ingredient(Press tab to include item): </label>
                <input type="text" name="add-ingredient" @keydown.tab.prevent="addIng" v-model="another">
            </div>
            <div class="field center-align">
                <p v-if="feedback" class="red-text">{{feedback}}</p>
                <button class="btn pink">Add Snack</button>
            </div>
        </form>
    </div>
    
</template>

<script>
import db from '@/firebase/init'
import slugify from 'slugify'
export default {
    name: "AddSnack",
    data(){
        return{
            title: null,
            another: null,
            ingredients: [],
            feedback: null,
            slug: null
        }
    },
    methods:{
        addSnack(){
            if(this.title){
                this.feedback = null
                //create a slug
                this.slug = slugify(this.title,  {
                    replacement: '-',
                    remove: /[$*_+~.()'"!\-:@]/g,
                    lower: true
                })
                db.collection("snacks").add({
                    title: this.title,
                    ingredients: this.ingredients,
                    slug: this.slug
                }).then(() =>{
                    this.$router.push({name: "Index"})
                }).catch(err =>{
                    console.log(err)
                })
                
            }else{
                this.feedback = "You must enter a snack title"
            }
        },
        addIng(){
            if(this.another){
                this.ingredients.push(this.another)
                this.another= null
                this.feedback = null        
            }else{
                this.feedback = "You must enter an Ingredient"
            }
        },
        deleteIng(ing){
            this.ingredients = this.ingredients.filter(ingredients =>{
                return ingredients !== ing
            })
        }
    }
}
</script>

 <style>
 .add-snack{
     margin-top: 60px;
     padding: 20px;
     max-width: 500px;
 }

 .add-snack h2{
     font-size: 2em;
     margin: 20px auto;
 }

 .add-snack .field{
     margin: 20px auto;
     position: relative;
 }

 .add-snack .delete{
     position: absolute;
     right: 0;
     bottom: 16px;
     color: #aaa;
     font-size: 1.4em;
     cursor: pointer;
 }
 </style>
 