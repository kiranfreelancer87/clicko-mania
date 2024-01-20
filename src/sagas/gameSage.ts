import { all, put, takeEvery, select } from 'redux-saga/effects';
import {incrementGamesLost, incrementGamesWon, recordGameResult, resetGame} from "../store/gameState/actions";
import {GameActionTypes} from "../store/gameState/types";

function* handleGameWon() {
    yield put(incrementGamesWon());
}

function* handleGameLost() {
    yield put(incrementGamesLost());
}

function* watchScoreIncrement() {
    yield takeEvery(GameActionTypes.INCREMENT_SCORE, function* (action): Generator<any, void, any> {
        const state = yield select();
        const currentScore = state.gameState.score;

        // Check if the current score meets the win/lose conditions
        if (currentScore >= 10) {
            yield handleGameWon();
            yield put(recordGameResult('win'));
            yield put(resetGame());
        } else if (currentScore <= -10) {
            yield handleGameLost();
            yield put(recordGameResult('lose'));
            yield put(resetGame());
        }
    });
}

export default function* gameSaga() {
    yield all([watchScoreIncrement()]);
    // Add more watchers if needed
}
