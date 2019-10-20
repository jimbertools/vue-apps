//import Axios from 'axios'
import config from '../../config/config.mjs'
export default ({
  getUserData (doubleName) {
    return Axios.get(`${config.botBackend}/api/users/${doubleName}`)
  }
})
