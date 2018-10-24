const discord = require('./lib/discord.js')
const groupme = require('./lib/groupme.js')
const pushover = require('./lib/pushover.js')

async function sendMessage (msg, options) {
  let responses = []
  if (options.discord) {
    responses.concat(discord(msg, options.discord))
  }
  if (options.groupme) {
    responses.concat(groupme(msg, options.groupme))
  }
  if (options.pushover) {
    responses.concat(pushover(msg, options.pushover))
  }
  return responses
}

module.exports = {
  send: sendMessage,
  discord: discord,
  groupme: groupme,
  pushover: pushover
}
