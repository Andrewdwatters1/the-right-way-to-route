import React, {Component} from 'react'

import axios from 'axios'

export default class SpecificRecipe extends Component {
    constructor() {
        super()
        this.state = {
            recipe: {}
        }
    }

    componentDidMount() {
        //HashRouter gives us acces to three properties on our props. location, history and match. Match is an object that gives us access to the params passed in the url. This is where we get our id from the previous Link clicked
        axios.get(`/api/recipes/${this.props.match.params.id}`).then(response => {
            this.setState({
                recipe: response.data
            })
        })
    }

    render() {
        let {name, description, category} = this.state.recipe
        return (
            //Some more conditional rendering. this.state.recipe.name will be undefined until we get something back from our server
            this.state.recipe.name
            ?
            <div>
                Name: {name}
                Description: {description}
                Category: {category}
            </div>
            :
            <div>
                Loading recipe!
            </div>
        )   
    }
}