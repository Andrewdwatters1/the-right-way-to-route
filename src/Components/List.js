import React, {Component} from 'react'

import axios from 'axios'

//components
import ListItem from './ListItem'
import Nav from './Nav'

export default class List extends Component {
    constructor() {
        super()
        //In our app, the List component is reponsible for rendering out each item in our list from the server.
        this.state = {
            list: [],
            userInput: ''
        }
        //this is the alternate method of binding compared to es6 arrow functions
        this.addItem = this.addItem.bind(this)
    }

    handleUserInput = (e) => {
        this.setState({
            userInput: e.target.value
        })
    }

    addItem(){
        //we need to make sure we pass an object to our axios request if we want it to be available on req.body in our server
        let obj = {
            item: this.state.userInput
        }
        axios.post('/api/list', obj).then(response => {
            //we set this.state.list = response.data which is the full list after adding our new item and then set userInput back to an empty string. This allows us to reset the value in the input back to empty so the user doesn't have to do it manually
            this.setState({
            list: response.data,
            userInput: ''
        })
    })
    }

    updateList = (newList) => {
        //This function gets called from the child. It's job is to take in an updated list parameter and set this.state.list to be equal to the passed in parameter. Because we bind it, we can pass it down to a child component via props and invoke it from the child to update List's state
        this.setState({
            list: newList
        })
    }

    componentDidMount() {
        axios.get('/api/list').then( response => {
            this.setState({
                list: response.data
            })
        })
    }

    deleteItem = (id) => {
        //Delete item takes an id and then makes an axios request to delete an item on the server. The response is then used setState to the updated array of list from the server. Because the delete item button was moved to the child component we need to pass this function down to the child. The child will then invoke it on a buttonClick, passing it the list item id and when this.setState is invoked in the .then it correctly updates the parent state with the new list. 
        axios.delete(`/api/list/${id}`).then( response => {
            this.setState({
                list: response.data
            })
        })
    }

    render() {
        return (
            <div>
                {
                    this.state.list.map( (element, index) => {
                        return (
                            //Previously we were rendering out all our html in here. We realized that each individual item needed to have the ability to flip into edit mode or not. When we had each div living on List we only had one value on state that each div would refer to. So when I clicked edit on one of them, it set the other items to also be on edit. We solved this problem by creating a new component called ListItem with it's own state. This way it could keep track of whether or not it was in edit mode for itself and itself only. We created a ListItem component for each item in List's this.state.list property. we also passed down two functions. 
                            <ListItem shoppingItem={element} 
                            updateList={this.updateList}
                            deleteItem={this.deleteItem}/>
                        )
                    })
                }
                <input value={this.state.userInput} onChange={this.handleUserInput}></input>
                <button onClick={this.addItem}>Submit Item</button>
            </div>
        )
    }
}