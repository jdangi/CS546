const todoItems = require("./todo");
const connection = require("./mongoConnection");

let firstTaskId = "";
let secondTaskId = "";
let createdTask1 = todoItems.createTask("Ponder Dinosaurs", 
                                    "Has Anyone Really Been Far Even as Decided to Use Even Go Want to do Look More Like?");

createdTask1.then((newTask) => {
    console.log(newTask);
    firstTaskId = newTask._id;
    // return connection();
    return todoItems;
}).then((todoItems)=>{
    let createdTask2 = todoItems.createTask("Play Pokemon with Twitch TV", 
                                        "Should we revive Helix?");
    return createdTask2;
}).then((newTask)=>{
    console.log(newTask);
    secondTaskId = newTask._id;

}).then(() => {
    console.log();
    console.log();
    console.log('---------------------------get tasks---------------------------')

    let getAll = todoItems.getAllTask();
    return getAll;
}).then((tasks) => {
    console.log(tasks);
    return todoItems;
}).then((todoItems)=>{

    console.log();
    console.log();
    console.log('---------------------------remove first task---------------------------')

    let removeTask = todoItems.removeTask(firstTaskId);
    let tryToGetTask = removeTask.then(() => {
        return todoItems.getTask(firstTaskId);
    });
// });  
}).then(()=>{
    console.log();
    console.log();
    console.log("---------------------------get tasks---------------------------")

    let getAll = todoItems.getAllTask();
    return getAll;
}).then((tasks) => {
    console.log(tasks);
    return todoItems;
}).then((todoItems)=>{
    return todoItems.getTask(secondTaskId);
}).then((task) => {    

    console.log();
    console.log();
    console.log('---------------------------complete task---------------------------')
    
    return todoItems.completeTask(task._id);    
}).then((task) => {
    console.log(task);
    return this;
}).then(()=>{
    return todoItems.getTask(secondTaskId);
}).then((task) => {
    console.log(task);
    return connection();
}).then((db)=>{
    return db.close();
});

