const { PrivyClient } = require("@privy-io/server-auth");
const config = require("./config");

const privy = new PrivyClient(config.privyAppId, config.privySecret);

module.exports = privy;
