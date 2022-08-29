import { ICell, IPiece } from "../../svg/Piece"

type ISelected = {
  row: number,
  column: number,
  piece: IPiece | undefined
}

export type IPredictReduxState = {
  selected: ISelected;
  posibleMoves: ICell[];
  afterCheckMoves: ICell[][];
}

const chessBoardData: IPredictReduxState = {
  selected: { row: -1, column: -1, piece: undefined },
  posibleMoves: [],
  afterCheckMoves: []
};

type IAction = {
  type: string,
  data: IPredictReduxState
}

export default function chessboardPredict(state = chessBoardData, action: IAction) {
  switch (action.type) {
    case 'UPDATE_STATE':
      return { ...state, ...action.data};
    default:
      return state;
  }
}