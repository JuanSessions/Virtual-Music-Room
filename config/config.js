const { env } = process;
const dot = require("dotenv")
dot.config()

const config = {
    env: process.env.NODE_ENV || "development"
}

const devConfig = {
    port: env.PORT_LOCAL,
    db: env.MONGO_LOCAL,
    jwt_key: env.S_KEY
}

const prodConfig = {
    port: env.PORT_PROD,
    db: env.MONGO_PROD,
    jwt_key: env.S_KEY
}

const currentConfig = config.env === "production" ? prodConfig : devConfig;

module.exports = Object.assign({}, config, currentConfig)
