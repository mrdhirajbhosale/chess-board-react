import { IState } from "../../components/ChessBoard"
import { IPredictReduxState } from "../reducers/chessboardPredict"

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

export const updatePredict = (data: IPredictReduxState) => {
  return {
    type: 'UPDATE_STATE',
    data: data
  }
}
