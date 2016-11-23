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
  
    const sayGoodBye = client.createStep({
    satisfied() {
      return false;
    },

    prompt() {
      client.addResponse('goodbye/final')
      client.done()
    }
  })

    /**** BEGIN PAYSLIP ****/
    
    const collectEmployeeNumber = client.createStep({
    satisfied() {
    return Boolean(client.getConversationState().employee_number)
    },
    exportInfo()
    {
      const employeenumber = firstOfEntityRole(client.getMessageParts(),'employee_number');
      
      if(employeenumber)
      {
       client.updateConversationState({
           employee_number:employeenumber
    })   
      }
    },
    prompt() {
      client.addResponse('prompt/employee_number')
      client.done()
    }
  })

    const collectPayslipWeek = client.createStep({
    satisfied() {
    return Boolean(client.getConversationState().payslip_week)
    },
    exportInfo()
    {
      const payslipweek = firstOfEntityRole(client.getMessageParts(),'payslip_week');
      
      if(payslipweek)
      {
       client.updateConversationState({
           payslip_week:payslipweek
    })   
      }
    },
    prompt() {
      client.addResponse('prompt/payslip_week')
      client.done()
    }
  })
    /**** END PAYSLIP ****/

  client.runFlow({
    classifications: {
      // map inbound message classifications to names of streams
        'greeting':'hi',
        'request/payslip':'payslip'
    },
    autoResponses: {
      // configure responses to be automatically sent as predicted by the machine learning model
    },
    streams: {
        payslip:[collectEmployeeNumber,collectPayslipWeek]
        main: 'hi',
        hi: [sayHello],
        end: [sayGoodBye],
    },
  })
}
