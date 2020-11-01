export const GET_ALL_ADDRESSES = 'ADDRESSES/GET_ALL'
export const GET_ALL_ADDRESSES_SUCCESS = 'ADDRESSES/GET_ALL_SUCCESS'
export const GET_ALL_ADDRESSES_FAILURE = 'ADDRESSES/GET_ALL_FAILURE'
export const GET_SEARCH_ADDRESSES = 'ADDRESSES/GET_SEARCH'
export const GET_SEARCH_ADDRESSES_SUCCESS = 'ADDRESSES/GET_SEARCH_SUCCESS'
export const GET_SEARCH_ADDRESSES_FAILURE = 'ADDRESSES/GET_SEARCH_FAILURE'

export const fetchAddresses = () => {
  return {
    type: GET_ALL_ADDRESSES,
  }
}

export const searchAddresses = (formValues) => {
  return {
    type: GET_SEARCH_ADDRESSES,
  }
}
