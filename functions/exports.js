const system = {
    log: require('./log.js'),
    replyError: require('./discordMessage.js').replyError,
    replySuccess: require('./discordMessage.js').replySuccess,
    matchFirends: require('./matchFirends.js'),
};

module.exports.system = system;