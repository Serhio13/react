
import { FC, useState } from "react"
import AppContext from "./context"

const MyProvider: FC<{children: any}> = ({children}) => {
    const [state, setState] = useState({
        value: 'test'
    })
    const handler = (val: string) => {
        setState({...state, value: val})
    }
    return (
        <AppContext.Provider value={{value: state.value, handler}}>{children}</AppContext.Provider>
    )
}
export default MyProvider;