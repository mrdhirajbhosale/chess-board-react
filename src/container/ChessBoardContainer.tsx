import ChessBoard, { IState } from '../pages/ChessBoard';
import { connect } from 'react-redux';
import { addToList, initialList, previousState, nextState, updatePredict } from '../service/actions/actions';
import { IPredictReduxState } from '../service/reducers/chessboardPredict';

const mapStateToProps = (state: IState) => ({
  data: state
})
const mapDispatchToProps = (dispatch: (arg0: any) => any) => ({
  addToListHandler: (data: IState) => dispatch(addToList(data)),
  initialListHandler: (data: IState) => dispatch(initialList(data)),
  previousStateHandler: () => dispatch(previousState()),
  nextStateHandler: () => dispatch(nextState()),
  updatePredictHandler: (data: IPredictReduxState) => {dispatch(updatePredict(data))}
})
export default connect(mapStateToProps, mapDispatchToProps)(ChessBoard)