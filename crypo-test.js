const crypto = require('crypto-js')

// encryption is a 2 way process - data is encrypted with a algorithm and a key


// const mySecrets = 'Im soooooo hungry' // what i want to encrypt


// const myEncryption = crypto.AES.encrypt(mySecrets, 'myKey') //encrypt the strign


// console.log(myEncryption.toString())  //log the encryption 


// const myDecrypt = crypto.AES.decrypt(myEncryption.toString(), 'myKey') //decrypt the data

// console.log(myDecrypt.toString(crypto.enc.Utf8)) //select character encoding, and log the encrypt 






// Hashing --- 1 way function
// 1. hash functions always return the same size hash
// 2. hash functions return the same value for the same value
// all passwords will be hashed in the database'

const bcrypt = require('bcrypt')

const myPassword = "This is your passsword dummy"

const hashedPassowrd = bcrypt.hashSync(myPassword,12)

console.log(hashedPassowrd)


// we can only compare strings to a hash to see if they match
console.log(bcrypt.compareSync(myPassword, hashedPassowrd))