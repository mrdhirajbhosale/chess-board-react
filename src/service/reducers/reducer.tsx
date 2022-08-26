import { IState } from "../../components/ChessBoard"

//import { ADD_TO_CART } from '../constants'

type IChessBoardData = {
  previous: IState[],
  current?: IState,
  next: IState[]
}

const chessBoardData: IChessBoardData = { previous: [], next: [] };

export default function chessBoardItems(state = chessBoardData, action: any) {
  // console.log('STATE', state);
  switch (action.type) {
    case 'ADD_TO_LIST':
      if (state.current !== undefined) {
        // console.log('ADD_TO_LIST IF', {
        //   previous: [...state.previous, state.current],
        //   current: action.data,
        //   next: []
        // });
        return {
          previous: [...state.previous, state.current],
          current: action.data,
          next: []
        };
      }
      // console.log('ADD_TO_LIST', {
      //   previous: [...state.previous],
      //   current: action.data,
      //   next: []
      // })
      return {
        previous: [...state.previous],
        current: action.data,
        next: []
      };
    case 'PREVIOUS':
      if (state.previous.length > 0) {
        //console.log('PREVIOUS IF', {
        //   previous: state.previous.splice(0, state.previous.length - 1),
        //   current: state.previous[state.previous.length - 1],
        //   next: [state.current, ...state.next]
        // });
        return {
          previous: state.previous.splice(0, state.previous.length - 1),
          current: state.previous[state.previous.length - 1],
          next: [state.current, ...state.next]
        };
      }
      // console.log('PREVIOUS', state)
      return state;
    case 'NEXT':
      if (state.next.length > 0) {
        //console.log('NEXT IF', {
        //   previous: [state.current, ...state.previous],
        //   current: state.next[0],
        //   next: state.next.splice(1, state.next.length)
        // });
        return {
          previous: [...state.previous, state.current],
          current: state.next[0],
          next: state.next.splice(1, state.next.length)
        };
      }
      // console.log('NEXT', state);
      return state;
    case 'INITIAL_LIST':
      // console.log('INITIAL_LIST', {
      //   previous: [],
      //   current: action.data,
      //   next: []
      // });
      return {
        previous: [],
        current: action.data,
        next: []
      };
    default:
      // console.log('default', state);
      return state;
  }
}