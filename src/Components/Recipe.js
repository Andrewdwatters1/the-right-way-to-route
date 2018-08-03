import React from 'react'

import {Link} from 'react-router-dom'

export default function Recipe(props) {
    return (
            <div>
                Category: {props.recipe.category}
                Name: {props.recipe.name}
                Description: {props.recipe.description}
                <Link to={`/recipes/${props.recipe.id}`}><button>View Recipe Details</button></Link>
            </div>
    )
}