import { IState } from "../../components/ChessBoard"

export const addToList = (data: IState)=>{
    console.warn("action",data)
    return {
        type: 'ADD_TO_LIST',
        data: data
    }
}