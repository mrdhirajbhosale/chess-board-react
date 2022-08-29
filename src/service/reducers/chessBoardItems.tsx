import { ICell, IPiece } from "../../svg/Piece"

type IKingChecks = {
  [key: string]: ICell[]
}

type IReduxState = {
  pieces: (IPiece | undefined)[][];
  deathPieces: IPiece[];
  kingCell: IKingCell;
  kingChecks: IKingChecks;
}

export type IKingCell = {
  [key: string]: ICell
}

type IChessBoardData = {
  previous: IReduxState[],
  current?: IReduxState,
  next: IReduxState[]
}

const chessBoardData: IChessBoardData = { previous: [], next: [] };

export default function chessBoardItems(state = chessBoardData, action: any) {
  switch (action.type) {
    case 'ADD_TO_LIST':
      if (state.current !== undefined) {
        return {
          previous: [...state.previous, state.current],
          current: action.data,
          next: []
        };
      }
      return {
        previous: [...state.previous],
        current: action.data,
        next: []
      };
    case 'PREVIOUS':
      if (state.previous.length > 0) {
        return {
          previous: state.previous.splice(0, state.previous.length - 1),
          current: state.previous[state.previous.length - 1],
          next: [state.current, ...state.next]
        };
      }
      return state;
    case 'NEXT':
      if (state.next.length > 0) {
        return {
          previous: [...state.previous, state.current],
          current: state.next[0],
          next: state.next.splice(1, state.next.length)
        };
      }
      return state;
    case 'INITIAL_LIST':
      return {
        previous: [],
        current: action.data,
        next: []
      };
    default:
      return state;
  }
}