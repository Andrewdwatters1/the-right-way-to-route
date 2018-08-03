const list = require('./list')

let id = 4;

module.exports = {
    getList: (req, res) => {
        res.status(200).send(list)
    },
    addItem: (req, res) => {
        const {item} = req.body
        let obj = {
            item: item,
            id: id
        }
        list.push(obj)
        id++
        res.status(200).send(list)
    },
    deleteItem: (req, res) => {
        let {id} = req.params;
        for(let i = 0; i < list.length; i++) {
            if(list[i].id === Number(id)) {
                list.splice(i, 1)
            }
        }
        res.status(200).send(list)
    },
    updateItem: (req, res) => {
        let {id} = req.params 
        let {editValue} = req.body 
        for(let i = 0; i < list.length; i++) {
            if(list[i].id === Number(id)) {
                list[i].item = editValue
            }
        }
        res.status(200).send(list)
    }
}