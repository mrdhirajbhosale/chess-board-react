import { IState } from "../../components/ChessBoard"

export const initialList = (data: IState) => {
  return {
    type: 'INITIAL_LIST',
    data: data
  }
}

export const addToList = (data: IState) => {
  return {
    type: 'ADD_TO_LIST',
    data: data
  }
}

export const previousState = () => {
  return {
    type: 'PREVIOUS'
  }
}

export const nextState = () => {
  return {
    type: 'NEXT'
  }
}