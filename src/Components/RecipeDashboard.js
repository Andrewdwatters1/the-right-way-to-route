import React, {Component} from 'react'
import axios from 'axios';

import Recipe from './Recipe'

export default class RecipeDashboard extends Component {
    constructor() {
        super()
        this.state = {
            recipes: []
        }
    }

    componentDidMount() {
        this.getAllRecipes()
    }

    getAllRecipes = () => {
        axios.get('/api/recipes').then(response => {
            this.setState({
                recipes: response.data
            })
        })
    }

    filterRecipes = (category) => {
        //We are using a query here to pass a string to our server to filter ou the recipes we want to see
        axios.get(`/api/recipes/category?category=${category}`).then( response => {
            this.setState({
                recipes: response.data
            })
        })
    }
    render() {
        return (
            this.state.recipes.length
            ?
            <div>
                <div className="recipes-filter-container">
                    <button onClick={(e) => this.filterRecipes('Vegan')}>Vegan</button>
                    <button onClick={(e) => this.filterRecipes('Delicious')}>Delicious</button>
                    <button onClick={(e) => this.filterRecipes('Paleo')}>Paleo</button>
                    <button onClick={this.getAllRecipes}>No Filter</button>
                </div>
                {
                    this.state.recipes.map( (recipe, index) => {
                        return (
                            <Recipe key={index} recipe={recipe} />
                        )
                    })
                }
            </div>
            :
            <div>
                Loading Recipes!
            </div>
        )
    }
}