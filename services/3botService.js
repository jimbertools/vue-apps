//import Axios from 'axios'
import config from '../../config/index.js'
export default ({
  getUserData (doubleName) {
    return Axios.get(`${config.botBackend}/api/users/${doubleName}`)
  }
})
