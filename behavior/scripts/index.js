'use strict'

const firstOfEntityRole = function(message, entity, role) {
  role = role || 'generic';

  const slots = message.slots
  const entityValues = message.slots[entity]
  const valsForRole = entityValues ? entityValues.values_by_role[role] : null

  return valsForRole ? valsForRole[0] : null
}

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

    const confirmStream = client.createStep({
    satisfied() {
      return Boolean(client.getConversationState().specificPromptSent)
    },
    extractInfo()
    {
     const itemtype = firstOfEntityRole(client.getMessagePart(), 'item_type');
     
     if(itemtype)
     {
        client.updateConversationState({
        item_type: item_type
      })

     }
     
    },
    prompt() {
      
      
      client.addResponse('prompt/specific',{item_type:client.getConversationState().item_type.value});
     
      client.updateConversationState({
        specificPromptSent: true
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
      play:[confirmStream]
      end: [goodbye],
    },
  })
}
