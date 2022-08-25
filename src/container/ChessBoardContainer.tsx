import ChessBoard, { IState } from '../components/ChessBoard';
import { connect } from 'react-redux';
import { addToList, initialList, previousState, nextState } from '../service/actions/actions';

const mapStateToProps = (state: IState) => ({
  data: state
})
const mapDispatchToProps = (dispatch: (arg0: any) => any) => ({
  addToListHandler: (data: IState) => dispatch(addToList(data)),
  initialListHandler: (data: IState) => dispatch(initialList(data)),
  previousStateHandler: () => dispatch(previousState()),
  nextStateHandler: () => dispatch(nextState())

})
export default connect(mapStateToProps, mapDispatchToProps)(ChessBoard)