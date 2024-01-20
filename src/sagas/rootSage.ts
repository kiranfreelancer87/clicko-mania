import { all } from 'redux-saga/effects';
import gameSaga from "./gameSage";
export default function* rootSaga() {
    yield all([gameSaga()]);
}
