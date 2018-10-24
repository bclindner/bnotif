const fetch = require('node-fetch')

async function send (msg, config) {
  let responses = []
  for (let channel of config.channels) {
    responses.push(
      fetch('https://discordapp.com/api/channels/' + channel + '/messages', {
        method: 'POST',
        headers: {
          'Authorization': 'Bot ' + config.botToken,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          'content': msg
        })
      })
    )
  }
  return Promise.all(responses)
}

module.exports = send
