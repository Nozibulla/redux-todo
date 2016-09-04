import React, { Component } from 'react';
import { connect } from 'react-redux';
import { todoAcitons } from 'modules/todos';
import request from 'superagent';
class Router extends Component {
  constructor(props) {
    super(props);
    this.state = { text: '' };
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleTodoOnChange = this.handleTodoOnChange.bind(this);
  }
  handleTodoOnChange(e) {
    this.setState({ text: e.target.value });
  }
  handleFormSubmit(e) {
    const data = {
      text: this.state.text,
      id: new Date().getTime(),
      completed: false,
      type: 'ADD_TODO'
    };
    request
      .post('http://localhost:8000/save-todo')
      .send(data)
      .end((err, res) => {
        if (err) throw err;
      });
    this.props.todoAcitons(data);
    this.setState({ text: '' });
    e.preventDefault();
  }
  handleCompletion = (todoItem) => {
    const data = {
      id: todoItem.id,
      type: 'TOGGLE_TODO'
    };
    this.props.todoAcitons(data);
  }
  handleDelete = (todoItem) => {
    const data = {
      id: todoItem.id,
      type: 'DELETE_TODO'
    };
    this.props.todoAcitons(data);
    request
      .post('http://localhost:8000/delete-todo')
      .send(data)
      .end((err, res) => {
        if (err) throw err;
      });
  }
  render() {
    const item = (todoItem, index) => {
      return (
        <li
          key={index}
          onClick={this.handleCompletion.bind(this, todoItem)}
          style={{
            textDecoration: todoItem.completed ? 'line-through' : 'none',
            cursor: 'pointer'
          }}
        >
          {todoItem.text}
          <button type="button" onClick={this.handleDelete.bind(this, todoItem)}> X</button>
        </li>
      );
    };
    return (
      <div>
        <form onSubmit={this.handleFormSubmit}>
          <input onChange={this.handleTodoOnChange} value={this.state.text} />
          <button>Add Todo</button>
        </form>
        <ul>{this.props.todos.map(item)}</ul>
      </div>);
  }
}
const mapStoreToProps = (state) => {
  return {
    todos: state.Todos
  };
};
export default connect(mapStoreToProps, { todoAcitons })(Router);
