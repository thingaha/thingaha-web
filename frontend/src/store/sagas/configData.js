import { call, put } from 'redux-saga/effects'
import {
  GET_CONFIG_DATA_DIVISIONS_SUCCESS,
  GET_CONFIG_DATA_DIVISIONS_FAILURE,
} from '../actions/configData'
import { fetchMyanamrDivisions } from '../api/configData'
import defaultErrorHandler from './defaultErrorHandler'

export function* fetchMyanamrDivisionDataSaga(action) {
  try {
    const json = yield call(fetchMyanamrDivisions)
    yield put({
      type: GET_CONFIG_DATA_DIVISIONS_SUCCESS,
      divisions: json.data.divisions,
    })
  } catch (error) {
    yield defaultErrorHandler(error, GET_CONFIG_DATA_DIVISIONS_FAILURE)
  }
}
