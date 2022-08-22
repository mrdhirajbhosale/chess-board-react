import React from 'react';
import ChessBoard from './components/ChessBoard';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import chessBoardApp from './reducers';

const store = createStore(chessBoardApp)
console.log('store',store);

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
