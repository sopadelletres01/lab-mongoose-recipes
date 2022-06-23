const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"

(async ()=>{
  try{
    const x = await mongoose.connect(MONGODB_URI)
    console.log(`Connected to the database: "${x.connection.name}"`);
    //Limpiar BD
    await Recipe.deleteMany()

    const recipes = await Recipe.insertMany(data)
    recipes.forEach(recipe=>console.log(recipe.title))
    /* const recipesTitles = await Recipe.find({},"title")
    console.log(recipesTitles) */

    //Usamos el tercer parametro {new:true} para que devuelva el objeto actualizdo
    const doc = await Recipe.findOneAndUpdate(
      {name:"Rigatoni alla Genovese"},
      {duration:100},
      {new:true}
    )
    console.log("Recipe succesfully updated: ",doc)

    const deleted = await Recipe.deleteOne({title: "Carrot Cake"})
    console.log("Recipe succesfully deleted",deleted)

    //Cerramos conexion (por lo que parece es indiferente usar await aqui)
    await mongoose.connection.close()
    console.log("Closing DB...")
  }
  catch(error){
    console.error('Error connecting to the database', error);

  }
})()
