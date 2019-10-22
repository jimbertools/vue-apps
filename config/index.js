import localConfig from './config.local.js'
import stagingConfig from './config.staging.js'
import prodConfig from './config.prod.js'

var config
// TODO: find a way to check if is production/staging/dev
// if (process.env.NODE_ENV === 'production') {
//   config = prodConfig
// } else if (process.env.NODE_ENV === 'staging') {
//   config = stagingConfig
// } else {
  config = localConfig
// }

export default ({
  ...config,
  salutations: ['Mr', 'Miss', 'Mme'],
  description: ['Work', 'Home', 'Mobile'],
  appId: `${window.location.host}`,
  redirect_url: '/login',
  scope: ''
})
