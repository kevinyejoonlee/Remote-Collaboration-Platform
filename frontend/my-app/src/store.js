import { createStore } from 'redux';
import rootReducer from './reducers'; // Assuming you have a rootReducer

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() // For Redux DevTools extension
);

export default store;
