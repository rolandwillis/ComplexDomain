'use strict'

exports.handle = (client) => {
  // Create steps
  const sayHello = client.createStep({
    satisfied() {
      return Boolean(client.getConversationState().openPromptSent)
    },

    prompt() {
      client.addResponse('prompt/open')
     
      client.updateConversationState({
        openPromptSent: true
      })

      client.done()
    }
  })

  const goodbye = client.createStep({
    satisfied() {
      return false
    },

    prompt() {
      client.addResponse('goodbye/final')
      client.done()
    }
  })

  client.runFlow({
    classifications: {
      // map inbound message classifications to names of streams
        'greeting':'hi'
    },
    autoResponses: {
      // configure responses to be automatically sent as predicted by the machine learning model
    },
    streams: {
      main: 'hi',
      hi: [sayHello],
      end: [goodbye],
    },
  })
}
