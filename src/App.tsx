import React from 'react';
import ChessBoard from './container/ChessBoardContainer';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import rootReducer from './service/reducers/index'

const store=createStore(rootReducer)

class App extends React.Component {

  render() {
    return (
      <Provider store={store}>
        <ChessBoard />
      </Provider>
    );
  }
}

export default App;
