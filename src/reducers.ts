import { combineReducers } from 'redux';
import gameStateReducer from "./store/gameState/reducer";

const rootReducer = combineReducers({
    gameState: gameStateReducer,
});

export default rootReducer;
