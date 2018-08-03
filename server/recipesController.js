let recipes = [
    {
        category: 'Vegan',
        name: 'Chili Baked Beans',
        description: 'Hello, this is my information about my recipes. How are you doing?',
        id: 1
    },
    {
        category: 'Paleo',
        name: 'Salad with Chicken',
        description: 'Hello, this is my information about my recipes. How are you doing?',
        id: 2

    },
    {
        category: 'Delicious',
        name: 'Ice Cream Cookie Dough Brownie Caramel Fudge',
        description: 'Hello, this is my information about my recipes. How are you doing?',
        id: 3

    },
]
let id = 4

module.exports = {
    getAllRecipes: (req, res) => {
        res.status(200).send(recipes)
    },
    getRecipeById: (req, res) => {
        let {id} = req.params;
        for(let i = 0; i < recipes.length; i++) {
            if(recipes[i].id === Number(id)) {
                //Necessary to put the return here to stop the function from executing and hitting the res.status(200).send('No recipe found') once we find the recipe we want
                return res.status(200).send(recipes[i])
            }
        }
        res.status(200).send('No recipe found')

    },
    getRecipesByCategory: (req, res) => {
        //Remember the three places we grab data in our backend. req.body, req.query and req.params
        //req.params comes from the parameters defined on our route in index.js
        //req.query comes from the options key value query pairs passed from axios on the frontend
        //req.body comes from the data obj passed from axios as the second parameter
        let {category} = req.query

        //Usual way we've been looping
        // let itemsByCategory = []
        // for(let i = 0; i < recipes.length; i++) {
        //     if(recipes[i].category === category) {
        //         itemsByCategory.push(recipes[i])
        //     }
        // }

        //Other way of doing this using methods 
        let itemsByCategory = recipes.filter(element => element.category === category)

        res.status(200).send(itemsByCategory)
    }
}