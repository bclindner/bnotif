const fetch = require('node-fetch')

async function send (msg, config, options = {}) {
  let responses = []
  let parsedOptions = {}
  if (!Object.keys(options).length && 'options' in config) {
    options = config.options
  }
  if (options !== {}) {
    parsedOptions = {
      tts: options.tts,
      embed: options.embed
    }
    if ('webhooks' in config) {
      parsedOptions.embeds = [options.embed]
    }
  }
  if ('channels' in config) {
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
            ...parsedOptions,
            'content': msg
          })
        })
          .then(resp => {
            if (!resp.ok) {
              resp.json().then(data => {
                throw new Error('Error sending Discord bot message. Response from server: ' + data.message)
              })
            }
            return resp
          })
      )
    }
  }
  if ('webhooks' in config) {
    for (let webhook of config.webhooks) {
      responses.push(
        fetch(webhook, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            ...parsedOptions,
            'content': msg
          })
        })
          .then(resp => {
            if (!resp.ok) {
              resp.json().then(data => {
                throw new Error('Error sending Discord webhook message. Response from server: ' + data.message)
              })
            }
            return resp
          })
      )
    }
  }
  return Promise.all(responses)
}

module.exports = send
