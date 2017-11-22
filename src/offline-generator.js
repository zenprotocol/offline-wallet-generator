const bip39 = require('bip39')
const bitcoin = require('bitcoinjs-lib')
const base58 = require('bs58check')
const QRious = require('qrious')

const secretPhraseElement = document.getElementById('secret-phrase')
const publicKeyElement = document.getElementById('public-key')

const secretPhrase = bip39.generateMnemonic(256)
const seed = bip39.mnemonicToSeed(secretPhrase)
const node = bitcoin.HDNode.fromSeedBuffer(seed)
const publicKey = node.derivePath("m/44'/258'/0'/0/0").keyPair.getPublicKeyBuffer()
const publicKeyWithPrefix = new Buffer(34)
publicKeyWithPrefix.writeUInt8(168, 0)
Buffer.from(publicKey).copy(publicKeyWithPrefix, 1)

const encoded = base58.encode(publicKeyWithPrefix)

secretPhraseElement.innerText = secretPhrase
publicKeyElement.innerText = encoded

const qr = new QRious({
    element: document.getElementById('qr'),
    value: encoded,
    size:150
})





