export default {
  useDraftServer: process.env.REACT_APP_USE_DRAFT_API === 'true',
  draftServerUrl: process.env.REACT_APP_DRAFT_SERVER_URL,
  apiServerUrl: process.env.REACT_APP_API_SERVER_URL,
}
