import React, {Component} from 'react'

import axios from 'axios'

export default class ListItem extends Component {
    constructor(props) {
        super(props)
        //We use edit here to decide what to render in our render method below
        //editValue is given an initial value of props.shoppingItem.item which is each item's item property. Notice that props come from constructor(props) where props is the passed in props given to this component by it's parent, List.js
        this.state = {
            edit: false,
            editValue: props.shoppingItem.item
        }
    }
    //This functions sole job is to flip the value of edit on state. This will cause a rerender and our conditional rendering will take place based on this value on state.
    changeEdit = () => {
        this.setState({
            edit: !this.state.edit
        })
    }

    handleChange = (e) => {
        this.setState({
            editValue: e.target.value
        })
    }

    updateItem = () => {
        let obj = {
            editValue: this.state.editValue
        }

        axios.put(`/api/list/${this.props.shoppingItem.id}`, obj).then(response => {
            //Remember those two functions we passed down from our parent List? The reason they are being passed and not other functions is because they handling setting state. As our list lives in List.js and not in ListItem, but this axios.put is getting back a response that contains our updated list, how is it expected to update the dom? the solution is passing a function bound in the parent to the child and invoking this.props.updateList(newList) so that function can update the new list and cause our dom to rerender with the new value of this.state.list
            this.props.updateList(response.data)
            //we then set state here back to false (because it was true) which cause our render to return the true part of the ternary down below. 
            this.setState({
                edit: !this.state.edit
            })
        })
    }
    render() {
        let {shoppingItem} = this.props;
        return (
            //This is conditional rendering. It is a ternary statement in javascript. You tell it the value to hinge on, then a question mark followed by what to render if the preceding statement was true. Then you put a : followed by what to return if that statement was false. As the changeEdit method is fired it causes the value being changed to flip thus rendering one of these two divs
            !this.state.edit 
            ?
            <div>
                <p>{shoppingItem.item}</p>
                {/* Delete item method defined on the parent handles setting state after a delete axios request is made. Because the response from the server is the updated list, we need to update state in the place where list actually lives..List.js. Children cannot directly update a parents state. They must call a function bound to the parent that will handle updating it's state. That being said, we can pass arguments to that function to make it be dynamic and reusable like so... this.props.deleteItem(shoppingItem.id) */}
                <button onClick={() => this.props.deleteItem(shoppingItem.id)}>Delete</button>
                <button onClick={this.changeEdit}>Edit</button>
            </div>
            :
            <div>
                <input value={this.state.editValue} onChange={this.handleChange}></input>
                <button onClick={() => this.props.deleteItem(shoppingItem.id)}>Delete</button>
                <button onClick={() => this.updateItem()}>Submit Edit!</button>
                <button onClick={this.changeEdit}>Cancel</button>
            </div>
        )
    }
}