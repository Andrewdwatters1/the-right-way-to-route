import React from 'react'

//if a component isn't directly rendered from a route, we won't natively have access to the history, location, and match objects
//put onto props by HashRouter
//So if we want to use that info we import withRouter from react-router-dom 
//then in the export default statement we wrap the component name in withRouter
//this will tell HashRouter that we want to be able to use history, location, and/or match objects on this component
import {withRouter} from 'react-router-dom'

function Nav(props) {
    //because of withRouter I can see the pathname of the current url we are at
    //here I'm doing a check to see what our url is and rendering a different div based on which route we are currently on
    //this allows it so we don't have to render a Nav component on every single route we want to use
    //we can now render the Nav component once and it will change based on the url
    if(props.location.pathname === '/recipes') {
        return (
            <div className="nav-container">
             Recipes
            </div>
        )
    } else if (props.location.pathname === '/list') {
        return (
            <div className="nav-container">
             List
            </div>
        )
    } else {
            return (
                <div className="nav-container">
                 List and Recipe App
                </div>
            )
    }
}

export default withRouter(Nav)