const fetch = require('node-fetch')

async function send (msg, config) {
  let responses = []
  for (let userKey of config.userKeys) {
    responses.push(
      fetch('https://api.pushover.net/1/messages.json', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          'token': config.appKey,
          'user': userKey,
          'message': msg
        })
      })
        .then(resp => resp.json())
        .then(data => {
          if (data.errors) {
            throw new Error('Error sending Pushover notification. Response from server: ' + data.errors)
          }
          return data
        })
    )
  }
  return Promise.all(responses)
}

module.exports = send
