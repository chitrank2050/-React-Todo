import { EventEmitter } from "events";
import * as $ from "jquery";

import dispatcher from "../Dispatcher";
class TodoStore extends EventEmitter {
    constructor() {
        super()
        this.todos = [];

    }
    postTodos(value) {
        console.log(value.done);
        const comp = (value.done != 4) ? false : true;
        console.log(comp);
        $.ajax({
            type: 'POST',
            url: 'http://rest.learncode.academy/api/chitrank/todoexp',
            data: { text: value.myvalue, on: value.on, status: value.done, completed: comp },
            success: function(data) {
                console.log("Friend added!", data); //the new item is returned with an ID
            }
        });
    }
    deleteTodos(id) {
        $.ajax({
            type: 'DELETE',
            url: 'http://rest.learncode.academy/api/chitrank/todoexp/' + id,
            success: function() {
                //no data...just a success (200) status code
                console.log('Friend Deleted Successfully!');
            }
        });
    }
    getAll(callback) { //call this on componentWillMount() (required)
        $.ajax({
            type: 'GET',
            url: 'http://rest.learncode.academy/api/chitrank/todoexp',
            success: function(data) {
                this.todos = data; //store gets hydrated with todos
                if (typeof callback == "function") {
                    callback(data) //giving data to callback
                }
                window.todos = this.todos; //not necessary other than for checking in console
            }.bind(this),
            error: function() {
                alert('error GET connecting to REST');
            }.bind(this)
        });
        return this.todos; //not the proper palce to retutn
    }
    handleActions(action) {
        switch (action.type) {
            case "POST_TODO":
                {
                    this.postTodos(action.text);
                }
            case "DELETE_TODO":
                {
                    this.deleteTodos(action.id);
                }
        }


    }
}
const todoStore = new TodoStore;
dispatcher.register(todoStore.handleActions.bind(todoStore));
window.dispatcher = dispatcher;
export default todoStore;
