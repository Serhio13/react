import { Book } from "../types/type";
import React from "react";
import IceandfireApi from "../services/iceandfire";
import { Button, ButtonGroup, ListGroup } from "react-bootstrap";
import "../index.css"

//тип для пропсов любой
type TProps = any;
//тип для состояния
type TState = {
  books: [] | Book[];
  isLoading: boolean;
  isError: boolean;
  page: number;
  pageSize: number;
}
export default class Books extends React.Component<TProps, TState> {
  state = {
    books: [],
    isLoading: false,
    isError: false,
    page: 1,
    pageSize: 5
  };

  getBooks = () => {
    console.log("запрос..")
    const { page, pageSize } = this.state;
    this.setState({ isLoading: true })
    IceandfireApi.getBooks(page, pageSize)
      //всё ок выводим результат, загрузка завершена
      .then((res: Book[]) => { this.setState({ books: res, isLoading: false }) })
      //не ок выводим ошибку загрузка завершена
      .catch((err: any) => { this.setState({ isError: true, isLoading: false }) })
  }

  //вызываем getBooks после первого рендера
  componentDidMount() {
    this.getBooks();
  }

  handlerPage = (type: "left" | "right") => {
    if (type === "left" && this.state.page > 1) {
      this.setState({ ...this.state, page: this.state.page - 1 });
    } else
      this.setState({ ...this.state, page: this.state.page + 1 });
    this.getBooks();
  };

  componentDidUpdate() {
    console.log("componentDidUpdate");
    if (this.state.books.length == 0 && this.state.isLoading == false) {
      this.setState({ ...this.state, page: 1 })
      this.getBooks();
    }
  }

  render() {
    console.log(this.state.page);
    const { books, isLoading, isError } = this.state;
    return (
      <div className="books">
        <ListGroup>
          {isError && "Error"}
          {isLoading && "Loading"}
          {books &&
            !isError &&
            !isLoading &&
            books.map((el: Book) => (
              <ListGroup.Item as="li" key={el.isbn}>
                <span className="title">{el.name} </span> <span className="prop">{`Country: ${el.country}`}</span>
              </ListGroup.Item>
            ))}
        </ListGroup>
        {books && !isError &&
          <ButtonGroup className="books-nav" aria-label="Basic example">
            <Button
              variant="secondary"
              disabled={this.state.page === 1}
              onClick={(_e: any) => this.handlerPage("left")}>
              left
            </Button>
            <Button
              variant="secondary"
              // disabled={this.state.books.length < this.state.pageSize}
              onClick={(_e: any) => this.handlerPage("right")}>
              right
            </Button>
          </ButtonGroup>
        }
      </div>
    )
  }
}