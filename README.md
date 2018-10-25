# Brian's Notification Library (bnotif)

A simple, scrappy library I wrote for myself so I can easily pass arbitrary messages to myself and my friends through all my different services. Currently, [Discord](https://discord.gg), [Pushover](https://pushover.net), and [GroupMe](https://groupme.com) are the only supported services.

## Using

Usage is simple: get your keys for these services, then call `bnotif.send(msg, options)` to send a message. The options should contain an object of objects for each service you to send to, each with their own configuration.

Here's an example, with a config section for each currently supported service:

```js
const bnotif = require('bnotif')

bnotif.send('hello!', {
  'pushover': {
    'appKey': '<insert your app key here>',
    'userKeys': [
      '<insert any user keys you want here>',
      '<you can put as many keys as you want here>',
      '<as long as there is one or more it\'s fine>'
    ]
  },
  'discord': {
    'botToken': '<insert your bot token here (not your oauth bearer token)>',
    'channels': [
      '<insert channel numbers here>',
      '<remember to keep these in string form>',
      '<javascript hates leading zeros>'
    ]
  },
  'groupme': {
    'botKeys': [
      '<insert your bot keys here>',
      '<you get the point>'
    ]
  }
})
```

This returns a Promise.all which will resolve if all is well or reject if any of the notifications fail to send. **It's okay to only send to one or any combination of these services** - just add or remove the necessary part of the configuration!

If you want to call a single service, you can just call it by name (e.g. `bnotif.groupme(msg, options)`) and reduce your configuration accordingly:

```js
bnotif.pushover('this message only sends through Pushover!', {
  'appKey': '...',
  'userKeys': [
    '...'
  ]
)
```
