require('dotenv').config()

module.exports = {
    port : process.env.PORT || 3000,
    uri : process.env.URI || "",
}