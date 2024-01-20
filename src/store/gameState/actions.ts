import { GameActionTypes, IncrementGamesPlayedAction, IncrementGamesWonAction, IncrementGamesLostAction, IncrementScoreAction, ResetGameAction, RecordGameResultAction } from './types';

export const incrementGamesPlayed = (): IncrementGamesPlayedAction => ({
    type: GameActionTypes.INCREMENT_GAMES_PLAYED,
});

export const incrementGamesWon = (): IncrementGamesWonAction => ({
    type: GameActionTypes.INCREMENT_GAMES_WON,
});

export const incrementGamesLost = (): IncrementGamesLostAction => ({
    type: GameActionTypes.INCREMENT_GAMES_LOST,
});

export const incrementScore = (): IncrementScoreAction => ({
    type: GameActionTypes.INCREMENT_SCORE,
} as IncrementScoreAction);

export const resetGame = (): ResetGameAction => ({
    type: GameActionTypes.RESET_GAME,
});


export const recordGameResult = (result: 'win' | 'lose'): RecordGameResultAction => ({
    type: GameActionTypes.RECORD_GAME_RESULT,
    result,
});
