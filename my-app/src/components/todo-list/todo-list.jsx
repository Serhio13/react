import React from "react";
import TodoItem from "../todo-item/todo-item";

export default class TodoList extends React.Component {
  static defaultProps = {
    todoList: [],
    handlerImportant: () => {},
    handlerDone: () => {},
    handlerDelete: () => {}
  };

  render() {
    const { todoList, handlerImportant, handlerDone, handlerDelete } = this.props;

    return (
      <div>
        {todoList.map((el) => (
          <TodoItem
            key={el.id}
            item={el}
            handlerImportant={handlerImportant(el.id)}
            handlerDone={handlerDone(el.id)}
            handlerDelete={handlerDelete(el.id)}
          />
        ))}
      </div>
    );
  }
}
