import React from "react";

export default class SearchTodo extends React.Component {
  render() {
    const { value, handlerChange } = this.props;
    return (
      <div>
        <input placeholder="search" value={value} onChange={handlerChange} />
      </div>
    );
  }
}