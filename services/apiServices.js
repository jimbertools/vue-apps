import config from '../../config/index.js'

export default ({
  getApps() {
    return Axios.post(`${config.jsApiUrl}apps/get`)
  },
  installApp(appname) {
    return Axios.post(`${config.jsApiUrl}apps/update`, {
      args: {
        name: appname,
        installed: true
      }
    })
  },
  uninstallApp(appname) {
    return Axios.post(`${config.jsApiUrl}apps/update`, {
      args: {
        name: appname,
        installed: false
      }
    })
  },
  getPublickey(name) {
    return Axios.get(`${config.botBackend}/api/users/${name}`)
  },
  getDoubleNameFrom3bot() {
    return "mdw95" // TODO when register is finished.
  }
})