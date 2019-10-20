//import Axios from 'axios'
import config from '../../config/config.mjs'
const headers = { headers: { 'Content-Type': 'application/json' } }
export default ({
  getContacts () {
    return Axios.post(`${config.jsApiUrl}contacts/list`)
  },
  updateOrCreate (contact) {
    return Axios.post(`${config.jsApiUrl}contacts/put`, {
      args: {
        contact
      }
    }, headers)
  },
  deleteContact (id) {
    return Axios.post(`${config.jsApiUrl}contacts/remove`, {
      args: {
        contact_id: id
      }
    }, headers)
  }
})
