import { IState } from "../../components/ChessBoard"
import { clone } from "../../utils";

//import { ADD_TO_CART } from '../constants'


const chessBoardData: IState[] = [];

export default function chessBoardItems(state = chessBoardData, action: any) {
  switch (action.type) {
    case 'ADD_TO_LIST':
      return clone([
        ...state, action.data
      ]);
    case 'INITIAL_LIST':
      return clone([action.data]);
    default:
      return clone(state);
  }
}