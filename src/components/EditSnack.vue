<template>
    <div v-if="snack" class="edit-snack container">
        <h2>Edit {{this.$route.params.snack_slug}} recipe</h2>
        <form @submit.prevent="editSnack">
            <div class="field title">
                <label for="title">Snack Title</label>
                <input type="text" name="title" v-model="snack.title">
            </div>
            <div v-for="(ing, index) in snack.ingredients" :key="index" class="field">
                <label for="ingredient">Ingredient Added:</label>
                <input type="text" name="ingredient" v-model="snack.ingredients[index]">
                <i class="material-icons delete" @click="deleteIng(ing)">delete</i>
            </div>
            <div class="field edit-ingredient">
                <label for="edit-ingredient">Add an ingredient(Press tab to include item): </label>
                <input type="text" name="edit-ingredient" @keydown.tab.prevent="addIng" v-model="another">
            </div>
            <div class="field center-align">
                <p v-if="feedback" class="red-text">{{feedback}}</p>
                <button class="btn pink">Update Snack</button>
            </div>
        </form>
    </div>
</template>

<script> 
import db from '@/firebase/init'
import slugify from 'slugify'
export default {
    name: "EditSnack",
    data(){
        return {
            snack: null,
            another: null,
            feedback: null
        }
    },
    methods:{
        editSnack(){
            if(this.snack.title){
                this.feedback = null
                //create a slug
                this.snack.slug = slugify(this.snack.title,  {
                    replacement: '-',
                    remove: /[$*_+~.()'"!\-:@]/g,
                    lower: true
                })
                db.collection("snacks").doc(this.snack.id).update({
                    title: this.snack.title,
                    ingredients: this.snack.ingredients,
                    slug: this.snack.slug
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
                this.snack.ingredients.push(this.another)
                this.another= null
                this.feedback = null        
            }else{
                this.feedback = "You must enter an Ingredient"
            }
        },
        deleteIng(ing){
            this.snack.ingredients = this.snack.ingredients.filter(ingredients =>{
                return ingredients !== ing
            })
        }
    },
    created(){
        let ref = db.collection("snacks").where('slug','==',this.$route.params.snack_slug)
        ref.get().then(snapshot => {
            snapshot.forEach(doc =>{
                this.snack = doc.data()
                this.snack.id = doc.id
            })
        })
    }
}
</script>

<style>
.edit-snack{
     margin-top: 60px;
     padding: 20px;
     max-width: 500px;
 }

 .edit-snack h2{
     font-size: 2em;
     margin: 20px auto;
 }

 .edit-snack .field{
     margin: 20px auto;
     position: relative;
 }

 .edit-snack .delete{
     position: absolute;
     right: 0;
     bottom: 16px;
     color: #aaa;
     font-size: 1.4em;
     cursor: pointer;
 }
</style>
