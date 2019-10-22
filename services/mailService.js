//import Axios from 'axios'
import config from '../../config/index.js'
//import moment from 'moment'
// import { resolve } from 'url'
// import { reject } from 'q'
const headers = { headers: { 'Content-Type': 'application/json' } }
export default ({
  getMails () {
    return Axios.post(`${config.jsApiUrl}mail/list`)
  },
  sendMail (mail) {
    mail.date = moment(moment.utc()).format('MM/DD/YYYY HH:mm')
    mail.attachments = []
    mail.headers = ''
    mail = JSON.stringify(mail)
    return Axios.post(`${config.jsApiUrl}mail/send`, {
      args: {
        mail
      }
    }, headers)
  },
  deleteMail (id) {
    return Axios.post(`${config.jsApiUrl}mail/delete`, {
      args: {
        mail_id: id
      }
    }, headers)
  },
  updateFolder (id, folder) {
    return Axios.post(`${config.jsApiUrl}mail/update_folder`, {
      args: {
        mail_id: id,
        folder_name: folder
      }
    })
  },
  updatePriority (id, priority) {
    return Axios.post(`${config.jsApiUrl}mail/update_priority`, {
      args: {
        mail_id: id,
        priority: priority
      }
    })
  }
})
