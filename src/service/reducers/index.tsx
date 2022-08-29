import {combineReducers} from 'redux'
import chessBoardItems from './chessBoardItems'
import chessboardPredict from './chessboardPredict'

export default combineReducers({
  chessBoardItems,
  chessboardPredict
})