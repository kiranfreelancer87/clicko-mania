import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from "./reducers";
import rootSaga from "./sagas/rootSage";
import GameBoard from './components/GameBoard';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);

const App: React.FC = () => {
  return (
      <Provider store={store}>
        <div className="App">
          <GameBoard />
        </div>
      </Provider>
  );
};

export default App;
