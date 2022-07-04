import { Character } from "../types/type";
import { useCallback, useContext, useMemo, useState } from "react";
import { Button, ButtonGroup, ListGroup, Modal } from "react-bootstrap";
import {useCharters} from "./charters.hooks";
import CharacterModal from "./character.modal";
import AppContext from "../context/context";


const CharactersF = () => {
  const context = useContext(AppContext)
  console.log('context', context);
  
  //КАСТОМНЫЙ ХУК useCharters
  const {error, loading, characters, filter, handlerPage} = useCharters({initPage: 1, initPageSize: 5});

  //КАСТОМНЫЙ ХУК для
  // const [character, setCharacter] = useState<null | Character>(null)
  // const [loadingCharacter, setLoadingCharacter] = useState<boolean>(false)
  // const [errorCharacter, setErrorCharacter] = useState<boolean>(false)

  const [modalIsVisible, setModalIsVisible] = useState<boolean>(false)
  const [characterUrl, setCharacterUrl] = useState<string | null>(null)
  
  console.log('render loading', loading);
  
  // const list: any[] = []
  const list: any[] = useMemo(() => {
    console.log('useMemo');
    return []
  }, [characterUrl])

  console.log('list', list);
  
  const handleModalMemorized = useCallback((type: boolean) => () => {
    setModalIsVisible(type)
    if (!type) setCharacterUrl(null)
  }, [characterUrl])
  
  const handlerClickCharacter = (url: string) => {
    return async() => {
      setCharacterUrl(url)
      setModalIsVisible(true)
  }}
  
  return (
    <div className="characters">
      <ListGroup>
          {error && "Error"}
          {loading && "Loading"}
          {characters &&
            !error &&
            !loading &&
            characters.map((el: Character) => (
              <ListGroup.Item 
                  as="li" 
                  key={el.url} 
                  onClick={handlerClickCharacter(el.url)}
                >
                  <span className="title">{el.name || el.aliases}</span>
                  <span className="prop">Gender: {el.gender}</span>
              </ListGroup.Item>
            ))
        }
      </ListGroup>
        {characters && !error && (
          <ButtonGroup className="books-nav" aria-label="Basic example" >
            <Button
              variant="secondary"
              disabled={filter.page === 1}
              onClick={handlerPage("left")}
            >
              left
            </Button>
            <Button
              variant="secondary"
              onClick={handlerPage("right")}>
              right
            </Button>
          </ButtonGroup>
        )}
        <CharacterModal 
          list={list}
          characterUrl={characterUrl} 
          modalIsVisible={modalIsVisible} 
          handleModal={handleModalMemorized} />
          <Button onClick={(e: any) => {
            //@ts-ignore
            context.handler('test 2')
          }}>Handler!!</Button>
    </div>
  )
}
export default CharactersF;