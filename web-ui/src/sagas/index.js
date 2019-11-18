import {takeEvery, call, put} from 'redux-saga/effects';
import { all } from 'redux-saga/effects';
import { SET_USER, FETCH_USER, RECEIVE_USER, REQEUST_USER } from './../reducers/user';
import { SET_WORKSHEETS, FETCH_WORKSHEETS, RECEIVE_WORKSHEETS, REQUEST_WORKSHEETS} from './../reducers/worksheet';
import { SET_ANALYSIS, FETCH_ANALYSIS, RECEIVE_ANALYSIS, REQEUST_ANALYSIS } from './../reducers/analysis';
import { user, worksheet, analysis } from './../api';

function* fetchUserAsync(action) {
    console.log('fetchAsync ~~~~~ call');
    yield put({type: REQEUST_USER});
    const userinfo = yield call(user.fetchUser);
    yield put({type: RECEIVE_USER, userinfo});
};

function* takeAddUser() {
    console.log('takeAddUser ~~~~~~ call');
    yield takeEvery(SET_USER, function* (action) {
        yield call(user.setUser, {user: action.user});
        yield fetchUserAsync();
    });
};

function* takeFetchUser() {
    console.log('takeFetchUser ~~~~~~ call');
    yield takeEvery(FETCH_USER, fetchUserAsync);
};

function* fetchWorksheetsAsync(action) {
    console.log('fetchAsync ~~~~~ call');
    yield put({type: REQUEST_WORKSHEETS});
    const worksheets = yield call(worksheet.fetchWorksheets);
    yield put({type: RECEIVE_WORKSHEETS, worksheets});
};

function* takeAddWorksheets() {
    console.log('takeAddWorksheets ~~~~~~ call');
    yield takeEvery(SET_WORKSHEETS, function* (action) {
        yield call(worksheet.setWorksheet, {worksheets: action.worksheets});
        yield fetchWorksheetsAsync();
    });
};

function* takeFetchWorksheets() {
    console.log('takeFetchWorksheets ~~~~~~ call');
    yield takeEvery(FETCH_WORKSHEETS, fetchWorksheetsAsync);
};

function* fetchAnalysisAsync(action) {
    console.log('fetchAsync ~~~~~ call');
    yield put({type: REQEUST_ANALYSIS});
    const analys = yield call(analysis.fetchAnalysis);
    console.log(analys)
    yield put({type: RECEIVE_ANALYSIS, analys});
};

function* takeAddAnalysis() {
    console.log('takeAddWorksheets ~~~~~~ call');
    yield takeEvery(SET_ANALYSIS, function* (action) {
        yield call(analysis.setAnalysis, {analysis: action.analysis});
        yield fetchAnalysisAsync();
    });
};

function* takeFetchAnalysis() {
    console.log('takeFetchWorksheets ~~~~~~ call');
    yield takeEvery(FETCH_ANALYSIS, fetchAnalysisAsync);
};

export default function* rootSaga() {
    yield all([
        takeAddUser(),
        takeFetchUser(),
        takeAddWorksheets(),
        takeFetchWorksheets(),
        takeAddAnalysis(),
        takeFetchAnalysis()
    ]);
};