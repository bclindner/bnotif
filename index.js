const discord = require('./lib/discord.js')
const groupme = require('./lib/groupme.js')
const pushover = require('./lib/pushover.js')

function send (msg, config, options = {}) {
  let responses = []
  if (config.discord) {
    if ('discord' in options) {
      responses.concat(discord(msg, config.discord, options.discord))
    } else {
      responses.concat(discord(msg, config.discord))
    }
  }
  if (config.groupme) {
    if ('groupme' in options) {
      responses.concat(groupme(msg, config.groupme, options.groupme))
    } else {
      responses.concat(groupme(msg, config.groupme))
    }
  }
  if (config.pushover) {
    if ('pushover' in options) {
      responses.concat(pushover(msg, config.pushover, options.pushover))
    } else {
      responses.concat(pushover(msg, config.pushover))
    }
  }
  return Promise.all(responses)
}

module.exports = {
  send: send,
  discord: discord,
  groupme: groupme,
  pushover: pushover
}
