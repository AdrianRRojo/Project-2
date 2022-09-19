const fs = require('fs')
require('dotenv').config()

module.exports = {
  development: {
    // add the key/values pairs from your config.json here
    "database": "yourstat",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  production: {
    use_env_variable: 'DATABASE_URI'
  }
}