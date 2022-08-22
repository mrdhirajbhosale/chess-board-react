import { IState } from '../components/ChessBoard';

const initialState: IState[] = [
  {
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
  },
]

const chessBoard = (state=initialState, action: any) => {
  switch (action.type) {
    case 'ADD_MOVE':
      return [
        ...state, 
        action.data
      ]
    case 'PRE':
      return state
    case 'NEXT':
      return state
    default:
      return state
  }
}

export default chessBoard;