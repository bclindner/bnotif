const fetch = require('node-fetch')

async function send (msg, config, options = {}) {
  let responses = []
  let parsedOptions = {}
  if (!Object.keys(options).length && 'options' in config) {
    options = config.options
  }
  if (options !== {}) {
    parsedOptions = {
      'attachments': options.attachments
    }
  }
  for (let botKey of config.botKeys) {
    responses.push(
      fetch('https://api.groupme.com/v3/bots/post', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...parsedOptions,
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
