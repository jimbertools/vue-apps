
export default {
  getRoom (name) {
    // this.emit("getRoom", name)
  },
  getRooms () {
    // this.emit("getRooms")
  },
  createRoom (name) {
    // this.emit("createRoom", name)
  },
  joinRoom (name) {
    this.emit('joinRoom', name)
  },
  leaveRoom (name) {
    this.emit('leaveRoom', name)
  },
  msg (message) {
    this.emit('msg', message)
  },
  getUser (name) {
    // this.emit("getUser", name)
  },
  createUser (name) {
    // this.emit("createUser", name)
  },
  emit (type, message) {
    // console.log(JSON.stringify(vm))
    // if (vm) {
    //   vm.$socket.emit(type, message)
    // } else {
    //   setTimeout(() => {
    //     console.log(`WAIT TO EMIT`)
    //     this.emit(type, message)
    //   }, 100)
    // }
  }
}
