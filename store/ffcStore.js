import apiServices from '../services/apiServices.js'

export default ({
  state: {
    currentRoom: {
      name: null,
      users: []
    }
    // userName: null
  },
  actions: {
    setCurrentRoom: (context, room) => {
      if (room != null) {
        // socketService.emit('joinRoom', { room, user: "alex" })
        apiServices.getRoom(room).then(response => {
          context.commit('setCurrentRoom', {
            name: room,
            ...response.data
          })
        })
      } else {
        context.commit('setCurrentRoom', room)
      }
    },
    setRooms: (context, rooms) => {
      context.commit('setRooms', rooms)
    },
    // setUserName: (context, userName) => {
    //   console.log('Called setUserName')
    //   context.commit('setUserName', userName)
    // },
    sendMessage: (context, message) => {
      context.commit('sendMessage', message)
    },
    clearCurrentRoom: (context) => {
      console.log('hi clearCurrentRoom')
      context.commit('clearCurrentRoom')
    },
    SOCKET_userJoined: (context, data) => {
      context.commit('addUserToCurrentRoom', data.user)
    },
    SOCKET_userLeft: (context, user) => {
      context.commit('removeUserFromCurrentRoom', user)
    }
  },
  mutations: {
    setCurrentRoom (state, room) {
      if (room == null) {
        state.currentRoom = {
          name: null,
          users: []
        }
        return
      }
      state.currentRoom = room
    },
    setRooms (state, rooms) {
      state.rooms = rooms
    },
    addUserToCurrentRoom (state, user) {
      if (state.currentRoom != null) {
        state.currentRoom.users.push(user)
      }
    },
    removeUserFromCurrentRoom (state, user) {
      if (state.currentRoom != null) {
        console.log('Removing user from current room', JSON.stringify(state.currentRoom), user)
        state.currentRoom.users.splice(state.currentRoom.users.indexOf(user), 1)
        delete state.currentRoom.users.indexOf(user)

        console.log('Done removing user from current room', JSON.stringify(state.currentRoom))
      }
    },
    // setUserName (state, userName) {
    //   state.userName = userName
    // },
    clearCurrentRoom (state) {
      console.log('hi clearCurrentRoom2')
      // state.userName = null
      state.currentRoom.name = null
      state.currentRoom.users = []
      this.$socket.emit('leaveRoom', { room: this.currentRoom.name, user: this.account })
    }
  },
  getters: {
    currentRoom: state => state.currentRoom,
    rooms: state => state.rooms,
    currentPeers: state => state.currentPeers, // Doesn't exist?
    // userName: state => state.userName,
    messages: state => state.messages
  }
})
