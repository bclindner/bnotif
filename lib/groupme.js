const fetch = require('node-fetch')

async function send (msg, config) {
  let responses = []
  for (let botKey of config.botKeys) {
    responses.push(
      fetch('https://api.groupme.com/v3/bots/post', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          'bot_id': botKey,
          'text': msg
        })
      })
        .then(resp => {
          if (!resp.ok) {
            resp.json().then(data => {
              throw new Error('Error sending GroupMe message. Response from server: ' + data.meta.errors)
            })
          }
          return resp
        })
    )
  }
  return Promise.all(responses)
}

module.exports = send
