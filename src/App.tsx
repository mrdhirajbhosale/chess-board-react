import React from 'react';
import ChessBoard from './components/ChessBoard';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducer';


const reducers = (state: any, action: any) => {
  switch (action.type) {
    case "PRE":
      return {};
    case "NEXT":
      return {};
    default:
      return {};
  }
};

const store = createStore(reducers)

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
