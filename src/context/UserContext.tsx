"use client"
import { createContext, useReducer } from "react"

type StateType = {
    username: string,
    img: string,
    _id: string,
    email: string,
    city: string,
    country: string,
    mobile: number
}

type ActionType = {
    type: "CHANGE USER",
    payload: StateType
}

const initialState = {
    username: "",
    img: "",
    _id: "",
    email: "",
    city: "",
    country: "",
    mobile: 0
}

export const UserContext = createContext<{
    state: StateType,
    dispatch: React.Dispatch<ActionType>
}>({
    state: initialState,
    dispatch: ()=>{}
})

export const UserContextProvider = ({children} : {children: React.ReactNode})=>{
    const [state, dispatch] = useReducer(reducer, initialState)

    return (
        <UserContext.Provider value={{state, dispatch}}>
            {children}
        </UserContext.Provider>
    )

}

const reducer=(state:StateType, action: ActionType)=>{
    switch (action.type) {
        case "CHANGE USER":
            return {
                ...action.payload,
            };
    
        default:
            return state;
    }

}

