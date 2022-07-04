import { Character } from "../types/type";
import React from "react";
import IceandfireApi, { getData } from "../services/iceandfire";
import { Button, ButtonGroup, ListGroup, Modal } from "react-bootstrap";



//тип для пропсов любой
type TProps = any;
//тип для состояния
type TState = {
  characters: [] | Character[];
  isLoading: boolean;
  isError: boolean;
  page: number;
  pageSize: number;
  charter: null | Character;
  show: boolean;
}

export default class Characters extends React.Component<TProps, TState>{
  state: TState = {
    characters: [],
    isLoading: false,
    isError: false,
    page: 1,
    pageSize: 5,
    charter: null,
    show: false
  }

  getCharcters = () => {
    console.log("запрос..")
    const { page, pageSize } = this.state;
    this.setState({ isLoading: true })
    IceandfireApi.getCharacters(page, pageSize)
      //всё ок выводим результат, загрузка завершена
      .then((res: Character[]) => { this.setState({ characters: res, isLoading: false }) })
      //не ок выводим ошибку загрузка завершена
      .catch((err: any) => { this.setState({ isError: true, isLoading: false }) })
  }

  componentDidMount() {
    this.getCharcters();
  }

  handlerPage = (type: "left" | "right") => {
    if (type === "left" && this.state.page > 1) {
      this.setState({ ...this.state, page: this.state.page - 1 });
    } else
      this.setState({ ...this.state, page: this.state.page + 1 });
    this.getCharcters();
  };

  componentDidUpdate() {
    console.log("componentDidUpdate");
    if (this.state.characters.length == 0 && !this.state.isLoading) {
      this.setState({ ...this.state, page: 1 })
      this.getCharcters();
    }
  }

  handlerClickCharacter = (url: string) => {
    IceandfireApi.getCharterInfo(url)
      .then((res: Character) => {
        this.setState({ charter: res, isLoading: false })
      })
    this.handleModal(true)
  }

  handleModal = (type: boolean) => () => {
    this.setState({ show: type })
  }


  render() {
    const { characters, charter, isLoading, isError } = this.state;
    console.log(charter)
    return (
      <div className="characters">
        <ListGroup>
          {isError && "Error"}
          {isLoading && "Loading"}
          {characters &&
            !isError &&
            !isLoading &&
            characters.map((el: Character) => (
              <>
                <ListGroup.Item 
                  as="li" 
                  key={el.url} 
                  onClick={(_e) => { this.handlerClickCharacter(el.url) }}
                >
                  <span className="title">{el.name || el.aliases}</span>
                  <span className="prop">Gender: {el.gender}</span>
                </ListGroup.Item>
              </>
            ))
          }
        </ListGroup>
        {characters && !isError && (
          <ButtonGroup className="books-nav" aria-label="Basic example" >
            <Button
              variant="secondary"
              disabled={this.state.page === 1}
              onClick={(_e: any) => this.handlerPage("left")}
            >
              left
            </Button>
            <Button
              variant="secondary"
              onClick={(_e: any) => this.handlerPage("right")}>
              right
            </Button>
          </ButtonGroup>
        )}
        <Modal show={this.state.show} onHide={this.handleModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>{charter?.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {/*<span className="title">Name:</span>{charter?.name || "undefinde"}*/}
            {charter && (
                <>
                  <span className="title">Name:</span>{charter?.name}
                </>
            )}

            {/*{charter?.name && (*/}
            {/*    <div>*/}
            {/*      <small>Name:</small>*/}
            {/*      <span>{charter?.name}</span>*/}
            {/*    </div>*/}
            {/*)}*/}

            <span className="prop">Gender:</span>{charter?.gender}
            <span className="prop">Aliases:</span>{charter?.aliases}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleModal(false)}>
              Close
            </Button>
            <Button variant="primary" onClick={this.handleModal(true)}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}
