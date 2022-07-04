import { useState } from "react"
import { Button, Form, Modal } from "react-bootstrap"

type TState = {
    name: string,
    born: string,
    gender: string,
    died: string,
    books: string[] | [],
    titles: string[] | [],
}
const initState: TState = {
    name: '',
    born: '',
    gender: '',
    died: '',
    books: [''],
    titles: ['']
}

const FormComponent = () => {
    const [state, setState] = useState<TState>(initState)
    const [modalIsVisible, setModalIsVisible] = useState<boolean>(false)

    const handleModal = (type: boolean) => () => {
        setModalIsVisible(type)
    }
    return (
        <div className="form">
            <Form onSubmit={(e: any) => {
                e.preventDefault()
                console.log(state);
                                 
            }}>
                <span>Name</span>
                <input 
                    type="text" 
                    placeholder="name" 
                    value={state.name}
                    name={'name'} 
                    onChange={(e) => {
                        setState({...state, name: e.target.value})
                    }}
                />
                <span>Born</span>
                <input 
                    type="date" 
                    placeholder="born" 
                    value={state.born}
                    name={'born'} 
                    onChange={(e) => {
                        setState({...state, born: e.target.value})
                    }}
                />
                <span>Gender</span>
                <input 
                    type="text"
                    placeholder="gender"
                    value={state.gender}
                    name={'gender'}
                    onChange={(e)=> {
                        setState({...state, gender: e.target.value})
                    }}
                />
                <span>Died</span>
                <input 
                    type="date"
                    placeholder="died"
                    value={state.died}
                    name={'died'}
                    onChange={(e)=> {
                        setState({...state, died: e.target.value})
                    }}
                />
                <span>Books</span>
                {state.books.map((el, i) => (
                    <div key={i}>
                        <input 
                            type="text" 
                            placeholder="book" 
                            value={state.books[i]}
                            name={'books'+i} 
                            onChange={(e) => {
                                const booksFromState = state.books;
                                booksFromState[i] = e.target.value;
                                setState({...state, books: booksFromState})
                            }}
                        />
                    </div>
                ))}
                <Button onClick={(e: any) => {
                    const booksS: string[] = state.books;
                    booksS.push('')
                    setState({...state, books: booksS})
                }}>add book</Button>
                <span>Titles</span>
                {state.titles.map((el, i) => (
                    <div key={i}>
                        <input
                            type="text"
                            placeholder="title"
                            value={state.titles[i]}
                            name={'titles'+i}
                            onChange={(e)=> {
                            state.titles[i] = e.target.value;
                            setState({...state, titles: state.titles})}}
                        />
                    </div>
                ))}
                <Button 
                onClick={(e: any)=> {
                    const titlesS: any[] = state.titles;
                    titlesS.push('')
                    setState({...state, titles: titlesS})
                    }}>add title</Button>

                <Button type={'submit'} onClick={handleModal(true)} className="btn btn-success">submit</Button>
            </Form>

            <Modal show={modalIsVisible} onHide={handleModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{state.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <span className="prop">Name:</span>{state.name}
                    <span className="prop">Gender:</span>{state.gender}
                    <span className="prop">Born:</span>{state.born}
                    <span className="prop">Died:</span>{state.died}
                    <span className="prop">Books:</span>{state.books.join(', ')}
                    <span className="prop">Titles:</span>{state.titles.join(', ')}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleModal(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

        </div>
    )
}
export default FormComponent