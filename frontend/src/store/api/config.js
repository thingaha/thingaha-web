const configs = {
  draft: {
    apiBaseUrl: 'http://localhost:9000',
  },
  development: {
    apiBaseUrl: 'http://localhost:5000/api/v1',
  },
}

let config = {}
if (process.env.REACT_APP_USE_DEV_API == 'true') {
  config = configs.development // set backend domain
} else {
  config = configs.draft // set backend domain
}

export default config
