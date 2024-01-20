import { GameState, GameActionTypes } from './types';

const initialState: GameState = {
    gamesPlayed: 0,
    gamesWon: 0,
    gamesLost: 0,
    score: 0,
    gameHistory: [],
};

const gameStateReducer = (state = initialState, action: any): GameState => {
    switch (action.type) {
        case GameActionTypes.INCREMENT_GAMES_PLAYED:
            return { ...state, gamesPlayed: state.gamesPlayed + 1 };

        case GameActionTypes.INCREMENT_GAMES_WON:
            return { ...state, gamesWon: state.gamesWon + 1 };

        case GameActionTypes.INCREMENT_GAMES_LOST:
            return { ...state, gamesLost: state.gamesLost + 1 };

        case GameActionTypes.INCREMENT_SCORE:
            return { ...state, score: state.score + 1 };

        case GameActionTypes.RESET_GAME:
            return initialState;

        case GameActionTypes.RECORD_GAME_RESULT:
            return {
                ...state,
                gameHistory: [...state.gameHistory, { score: state.score, result: action.result }],
            };

        default:
            return state;
    }
};

export default gameStateReducer;
