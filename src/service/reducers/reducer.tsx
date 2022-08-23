import { IState } from "../../components/ChessBoard"

//import { ADD_TO_CART } from '../constants'


const initialState: IState = {
    pieces: Array.from({ length: 8 }, (__, j) => Array.from({ length: 8 }, (_, i) => undefined)),
    selected: { row: -1, column: -1, piece: undefined },
    deathPieces: [],
    turn: 'white',
    posibleMoves: [],
    kingChecks: {},
    kingCell: { white: { row: 0, column: 0 }, black: { row: 0, column: 0 } },
    afterCheckMoves: [],
    timer: {white: 0, black: 0},
    timerStart: true
  }

const chessBoardData: IState[] = [initialState];

export default function chessBoardItems(state = chessBoardData, action: any) {
    switch (action.type) {
        case 'ADD_TO_LIST':
            return [
                ...state, action.data
            ];
        default:
            return state
    }


}