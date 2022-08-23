import { IState } from "../../components/ChessBoard"


let nextItemId = 0
export const addToList = (data: IState) => {
    console.log('data', data);
  return {
    type: 'ADD_TO_LIST',
    id: nextItemId++,
    data: data
  }
}

export const initialList = (data: IState) => {
  return {
    type: 'INITIAL_LIST',
    id: nextItemId++,
    data: data
  }
}