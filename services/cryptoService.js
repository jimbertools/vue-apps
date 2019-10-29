//import { nacl.util.encodeBase64, nacl.util.decodeBase64, encodeUTF8 } from 'tweetnacl-util'
// nacl.util.encodeBase64, nacl.util.decodeBase64, encodeUTF8

//import window.sodium from 'libwindow.sodium-wrappers'
// const bip39 = require('bip39')

export default ({
  sign (message, privateKey) {
    return new Promise(async (resolve, reject) => {
      privateKey = nacl.util.decodeBase64(privateKey)
      var enc = window.sodium.crypto_sign(message, privateKey)
      resolve(nacl.util.encodeBase64(enc))
    })
  },
  validateSignature (signature, publicKey) {
    return new Promise(async (resolve, reject) => {
      await window.sodium.ready
      publicKey = nacl.util.decodeBase64(publicKey)
      signature = nacl.util.decodeBase64(signature)
      var unsigned = window.sodium.crypto_sign_open(signature, publicKey)
      resolve(encodeUTF8(unsigned))
    })
  },
  decrypt (message, nonce, privateKey, publicKey) {
    return new Promise(async (resolve, reject) => {
      await window.sodium.ready
      message = nacl.util.decodeBase64(message)
      privateKey = nacl.util.decodeBase64(privateKey)
      publicKey = window.sodium.crypto_sign_ed25519_pk_to_curve25519(nacl.util.decodeBase64(publicKey))
      nonce = nacl.util.decodeBase64(nonce)
      var decrypted = window.sodium.crypto_box_open_easy(message, nonce, publicKey, privateKey)
      decrypted = encodeUTF8(decrypted)
      resolve(decrypted)
    })
  },
  encrypt (message, privateKey, publicKey) {
    return new Promise(async (resolve, reject) => {
      message = new TextEncoder().encode(message)
      privateKey = window.sodium.crypto_sign_ed25519_sk_to_curve25519(nacl.util.decodeBase64(privateKey))
      publicKey = window.sodium.crypto_sign_ed25519_pk_to_curve25519(nacl.util.decodeBase64(publicKey))

      var nonce = window.sodium.randombytes_buf(window.sodium.crypto_secretbox_NONCEBYTES)
      var encrypted = window.sodium.crypto_box_easy(message, nonce, publicKey, privateKey)
      resolve({
        encrypted: nacl.util.encodeBase64(encrypted),
        nonce: nacl.util.encodeBase64(nonce)
      })
    })
  },
  generateKeys (phrase) {
    return new Promise(async (resolve, reject) => {
      await window.sodium.ready
      if (!phrase) {
        var seed = window.sodium.randombytes_buf(window.sodium.crypto_box_SEEDBYTES / 2)
        phrase = bip39.entropyToMnemonic(seed)
      }
      var ken = new TextEncoder().encode(bip39.mnemonicToEntropy(phrase))
      var keys = window.sodium.crypto_box_seed_keypair(ken)
      resolve({
        privateKey: nacl.util.encodeBase64(keys.privateKey),
        publicKey: nacl.util.encodeBase64(keys.publicKey)
      })
    })
  },
  getEdPkInCurve (publicKey) {
    return nacl.util.encodeBase64(window.sodium.crypto_sign_ed25519_pk_to_curve25519(nacl.util.decodeBase64(publicKey)))
  }
})
