import { IState } from "../../components/ChessBoard"

//import { ADD_TO_CART } from '../constants'


const chessBoardData: IState[] = [];

export default function chessBoardItems(state = chessBoardData, action: any) {
    switch (action.type) {
        case 'ADD_TO_LIST':
            return [
                ...state, action.data
            ];
        default:
            return state;
    }
}