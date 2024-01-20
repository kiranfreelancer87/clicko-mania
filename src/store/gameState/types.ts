export interface GameState {
    gamesPlayed: number;
    gamesWon: number;
    gamesLost: number;
    score: number;
    gameHistory: Array<{ score: number; result: 'win' | 'lose' }>;
}

export enum GameActionTypes {
    INCREMENT_GAMES_PLAYED = 'INCREMENT_GAMES_PLAYED',
    INCREMENT_GAMES_WON = 'INCREMENT_GAMES_WON',
    INCREMENT_GAMES_LOST = 'INCREMENT_GAMES_LOST',
    INCREMENT_SCORE = 'INCREMENT_SCORE',
    RESET_GAME = 'RESET_GAME',
    RECORD_GAME_RESULT = 'RECORD_GAME_RESULT',
}

export interface IncrementGamesPlayedAction {
    type: GameActionTypes.INCREMENT_GAMES_PLAYED;
}

export interface IncrementGamesWonAction {
    type: GameActionTypes.INCREMENT_GAMES_WON;
}

export interface IncrementGamesLostAction {
    type: GameActionTypes.INCREMENT_GAMES_LOST;
}

export interface IncrementScoreAction {
    type: GameActionTypes.INCREMENT_SCORE;
    [key: string]: any; // Add a string index signature
}

export interface ResetGameAction {
    type: GameActionTypes.RESET_GAME;
}

export interface RecordGameResultAction {
    type: GameActionTypes.RECORD_GAME_RESULT;
    [key: string]: any;
}

export interface RootState {
    gameState: GameState;
    // Add other slices of the state as needed
}

export type GameAction =
    | IncrementGamesPlayedAction
    | IncrementGamesWonAction
    | IncrementGamesLostAction
    | IncrementScoreAction
    | ResetGameAction
    | RecordGameResultAction;
