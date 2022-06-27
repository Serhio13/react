import React from "react";
import "./index.css";

export default class TodoItem extends React.Component {
  static defaultProps = {
    item: { id: 0, label: "test", important: false, done: false },
    handlerImportant: () => {},
    handlerDone: () => {},
    handlerDelete: () => {}
  };
  render() {
    const { item, handlerImportant, handlerDone, handlerDelete } = this.props;

    return (
      <div className="todo-item" onClick={handlerImportant}>
        <div className={item.done ? 'done' : ''}>{item.label}</div>
        <div className="nav">
          {item.important && <div className="red" />}
          <div className="check" onClick={handlerDone}>
            &#10003;
          </div>
          <div className="delete" onClick={handlerDelete}>
            &#128465;
          </div>  
        </div>
      </div>
    );
  }
}
