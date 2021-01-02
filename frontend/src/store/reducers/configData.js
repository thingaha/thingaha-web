import {
  GET_CONFIG_DATA_DIVISIONS_SUCCESS,
  GET_CONFIG_DATA_DIVISIONS_FAILURE,
} from '../actions/configData'
import groupBy from 'lodash/groupBy'
import mapValues from 'lodash/mapValues'

let initialState = { divisionMapping: {} }

// This code is getting complex.
// TODO: we should either simplify this or have a test. :sweat-smile
let transformDivisions = (divisions) => {
  let divisionMap = groupBy(divisions, 'division_name')
  divisionMap = mapValues(divisionMap, (division) => {
    let districtMap = groupBy(division[0].districts, 'district_name')

    districtMap = mapValues(districtMap, (district) => {
      let townshipMap = district[0].townships.map(
        (township) => township.township_name
      )

      return townshipMap
    })

    return districtMap
  })

  return divisionMap
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_CONFIG_DATA_DIVISIONS_SUCCESS:
      return {
        ...state,
        divisionMapping: { ...transformDivisions(action.divisions) },
      }
    case GET_CONFIG_DATA_DIVISIONS_FAILURE:
      return {
        ...state,
        error: action.error,
      }
    default:
      return state
  }
}
