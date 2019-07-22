const fetch = require('node-fetch')

function send (msg, config, options = {}) {
  let responses = []
  let parsedOptions = {}
  if (!Object.keys(options).length && 'options' in config) {
    options = config.options
  }
  if (options !== {}) {
    parsedOptions = {
      'device': options.device,
      'title': options.title,
      'url': options.url,
      'url_title': options.url_title,
      'priority': options.priority,
      'sound': options.sound,
      'timestamp': options.timestamp
    }
  }
  for (let userKey of config.userKeys) {
    responses.push(
      fetch('https://api.pushover.net/1/messages.json', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...parsedOptions,
          'token': config.appKey,
          'user': userKey,
          'message': msg
        })
      })
        .then(resp => {
          if (!resp.ok) {
            resp.json().then(data => {
              throw new Error('Error sending Pushover notification. Response from server: ' + data.errors)
            })
          }
          return resp
        })
    )
  }
  return Promise.all(responses)
}

module.exports = send
