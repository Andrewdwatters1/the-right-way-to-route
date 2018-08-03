const express = require('express')
const bodyParser = require('body-parser')
const lc = require('./listController')
const rc = require('./recipesController')


const app = express();

app.use(bodyParser.json())

//routes - list
app.get('/api/list', lc.getList)
app.post('/api/list', lc.addItem)
app.delete('/api/list/:id', lc.deleteItem)
app.put('/api/list/:id', lc.updateItem)

//routes - recipes
app.get('/api/recipes', rc.getAllRecipes)

//I put this route here so that app will match on /api/recipes/category if I pass category in the url and if not, it will then match on the id parameter for /api/recipes/:id
app.get('/api/recipes/category', rc.getRecipesByCategory)

app.get('/api/recipes/:id', rc.getRecipeById)

//Notice this route commented out below. This is because it matches the above route even though I've named a different parameter. How is node supposed to know that when i send an axios request to '/api/recipes/1' the 1 refers to an id? Maybe the category should be a number. It will match on the first one and not ever hit this below route.
// app.get('/api/recipes/:category')

app.listen(4000, () => {
    console.log('Listening on port 4000')
})