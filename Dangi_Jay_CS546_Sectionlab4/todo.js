const mongoCollections = require("./mongoCollections");
const uuid = require('uuid/v4');
const uuid_parse = require('uuid-parse')
const todo = mongoCollections.todo;

let exportedMethods = {
   
    getAllTask() {
        return todo().then((todoCollection) => {
            return todoCollection.find().toArray();
        });
    },
    getTask(id) {
        if (!id) 
            return Promise.reject("You must provide an id to search for");
        
        return todo().then((todoCollection) => {
            return todoCollection.findOne({_id: id});
        });
    },
    createTask(title, description) {
        if (!title) 
            return Promise.reject("You must provide a title for your task");
        
        if (!description) 
            return Promise.reject("You must provide a description for your task");
        
        return todo().then((todoCollection) => {
            const buffer = new Array(32);
            uuid(null, buffer, 16);
            let newTodo = {
                _id : uuid_parse.unparse(buffer,16),
                title: title,
                description: description,
                completed: false,
                completedAt: null
            };

            return todoCollection
                .insertOne(newTodo)
                .then((newInsertInformation) => {
                    return newInsertInformation.insertedId;
                })
                .then((newId) => {
                    return this.getTask(newId);
                });
        });
    },
    removeTask(id) {
        if (!id) 
            return Promise.reject("You must provide an id to search for");
        
        return todo().then((todoCollection) => {
            return todoCollection
                .removeOne({_id: id})
                .then((deletionInfo) => {
                    if (deletionInfo.deletedCount === 0) {
                        throw(`Could not delete task with id of ${id}`)
                    }
                });
        });
    },
    completeTask(id) {
        if (!id) 
            return Promise.reject("You must provide an id to search for");
        return todo().then((todoCollection) => {
            var date = new Date();
            var current_hour = date.getHours();
            let updatedTask = {

                completed: true,
                completedAt: date
            };

            return todoCollection.updateOne({
                _id: id
            },{$set: {completed: true,
                completedAt: date}}).then(() => {
                return this.getTask(id);
            });
        });
    }
}

module.exports = exportedMethods;