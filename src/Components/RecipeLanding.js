import React, {Component} from 'react'
import Nav from './Nav'
import {Link, Switch, Route} from 'react-router-dom'
import RecipeDashboard from './RecipeDashboard'
import SpecificRecipe from './SpecificRecipe'

export default class RecipeLanding extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                <Switch>
                    <Route path="/recipes/:id" component={SpecificRecipe} />
                    <Route component={RecipeDashboard} />
                </Switch>
            </div>
        )
    }
}