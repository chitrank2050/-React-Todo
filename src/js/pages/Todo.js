import React from "react";
import {findDOMNode} from "react-dom";
import Todo from "../components/Todo";
import * as TodoActions from "../actions/TodoActions.js";
import TodoStore from "../stores/Todostore";

export default class Settings extends React.Component {
  constructor(){
    super();
    this.getTodos=this.getTodos.bind(this);
    this.state={
      todos: [],
      myvalue:"",
      on:"",
      done:0
    };
 
  }
  componentWillMount(){
    this.getTodos();//directly hydrating store with todos.
  }
  getTodos()
  {
   var _this = this; //context saved to another variable to use this in anonymous function as callback
   TodoStore.getAll(function(todos){
      _this.setState({ todos: todos });
   });
  }
  postTodos(){
    TodoActions.postTodos(this.state);
    this.getTodos();
  }
 onchange(e)
 {  const newText=e.target.value;
   this.setState({myvalue:newText});
 }
 dateChange(e)
 {  const date=e.target.value;
   this.setState({on:date});
 }
 rangeChange(e)
 { const range=e.target.value;
   this.setState({done:range});
  }
  render() {
    const {todos}=this.state;
    const style={
      marginTop:"50px"
    }
    const TodoComponents=todos.map((todo)=>{
      return <Todo key={todo.id} {...todo}/>;
    });
    return (
      <div class="row">
        <div class="col-md-6">
        <h2><span>Create New Todo</span></h2>
        <form>
          <div class="col-md-12">
            <div class="form-group row">
              <label for="text" class="col-md-2">Todo:</label>
              <div class="col-md-10">
                <input class="text form-control" type="text" name="text" onChange={this.onchange.bind(this)}></input>
              </div>
            </div>
            <div class="form-group row">
              <label for="date" class="col-md-2">On:</label>
              <div class="col-md-10">
                <input type="date" class="date form-control col-md-10" name="date" onChange={this.dateChange.bind(this)}/>
              </div>
            </div>
            <div class="form-group row">
                <label for="status" class="col-md-2">Status:</label>
                <div class="col-md-10">
                  <select class=" status form-control col-md-10" name="status" onChange={this.rangeChange.bind(this)}>
                    <option value="0">Still thinking when to start?</option>
                    <option value="1">Just Started!</option>
                    <option value="2">Midway Reached</option>
                    <option value="3">About to finish!</option>
                    <option value="4">Yipee! Finished</option>
                  </select>
                </div>
            </div>
            <div class="form-group row">
              <div class="col-md-offset-2 col-md-8">
                  <button class="btn btn-primary btn-block" type="button" onClick={this.postTodos.bind(this)} style={style}>Post</button>
              </div>
              <div class="col-md-2"></div>
            </div>
        </div>
          </form>
         </div>
         <div class="todos col-md-6 col-xs-6">
         <h2><span>Current Todos</span></h2>
         {TodoComponents}
         </div>
      </div>
    )
  }
}
