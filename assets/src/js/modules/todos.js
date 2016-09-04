import request from 'superagent';
// let todos = [];

const todo = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        id: action.id,
        text: action.text,
        completed: false
      };
    case 'TOGGLE_TODO':
      if (state.id !== action.id) {
        return state;
      }
      const data = {
        id: action.id,
        completed: !state.completed,
      };
      request
      .post('http://localhost:8000/edit-todo')
      .send(data)
      .end((err, res) => {
        if (err) throw err;
      });
      return Object.assign({}, state, {
        completed: !state.completed
      });
    default:
      return state;
  }
};
// let todos;
// request
//   .get('http://localhost:8000/todo-list')
//   .end((err, res) => {
//     if (err) throw err;
//     todos = res.text;
//   });
// const todos = [
// { id: 0, completed: false, text: 'Yoo' },
// { id: 1, completed: false, text: 'make Yoo' },
// { id: 2, completed: true, text: 'Yoo components' },
// { id: 3, completed: false, text: 'Mara Kha' }
// ];
const Todos = (state = [], action) => {
  // console.log(state);
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        todo(undefined, action)
      ];
    case 'TOGGLE_TODO':
      return state.map(t =>
        todo(t, action)
        );
    case 'DELETE_TODO': {
      let index = -1;
      for (let i = 0; i < state.length; i++) {
        if (state[i].id === action.id) {
          index = i;
          break;
        }
      }
      return state.slice(0, index).concat(state.slice(index + 1));
    }
    default:
      return state;
  }
};

export function todoAcitons(data) {
  return data;
}
export default Todos;
