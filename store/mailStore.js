import mailService from '../services/mailService.js'

export default ({
  state: {
    mails: [],
    boxes: [
      { name: 'Inbox' },
      { name: 'Outbox' },
      { name: 'Sent' },
      { name: 'Spam' },
      { name: 'Trash' }
    ]
  },
  actions: {
    getMails: (context) => {
      mailService.getMails().then((response) => {
        response.data.sort(function (a, b) {
          return new Date(b.date) - new Date(a.date)
        })
        context.commit('setMails', response.data)
      }).catch((error) => {
        console.error(error)
      })
    },
    sendMail: (context, mail) => {
      mailService.sendMail(mail).then((response) => {
        context.dispatch('getMails')
      }).catch((error) => {
        console.error(error)
      })
    },
    deleteMail: (context, mailId) => {
      mailService.deleteMail(mailId).then((response) => {
        context.dispatch('getMails')
      }).catch((error) => {
        console.error(error)
      })
    },
    updateFolder: (context, data) => {
      mailService.updateFolder(data.mailId, data.folder).then((response) => {
        context.dispatch('getMails')
      }).catch((error) => {
        console.error(error)
      })
    },
    updatePriority: (context, data) => {
      mailService.updatePriority(data.mailId, data.priority).then((response) => {
      }).catch((error) => {
        console.error(error)
      })
    }
  },
  mutations: {
    setMails: (state, mails) => {
      state.mails = mails
    }
  },
  getters: {
    mails: (state) => state.mails,
    boxes: (state) => state.boxes
  }
})
