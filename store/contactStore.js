import contactService from '../services/contactService.js'

export default ({
  state: {
    contacts: []
  },
  actions: {
    getContacts: (context) => {
      contactService.getContacts().then((response) => {
        context.commit('setContacts', response.data.contacts)
      }).catch((error) => {
        console.error(error)
      })
    },
    deleteContact: (context, contactId) => {
      contactService.deleteContact(contactId).then((response) => {
        context.dispatch('getContacts')
      }).catch((error) => {
        console.error(error)
      })
    },
    createContact: (context, contact) => {
      contactService.updateOrCreate(contact).then((response) => {
        context.dispatch('getContacts')
      }).catch((error) => {
        console.error(error)
      })
    }
  },
  mutations: {
    setContacts: (state, contact) => {
      state.contacts = contact
    }
  },
  getters: {
    contacts: (state) => state.contacts
  }
})
