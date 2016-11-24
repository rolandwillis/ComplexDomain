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
    extractInfo()
    {
        const itemtype = firstOfEntityRole(client.getMessagePart(),'item_type')
        if(itemtype)
        {
         client.updateConversationState({
             itemtype:itemtype
        })
         console.log("item type is " + itemtype.value);
        }
    },
      next() {
    const itemtype = client.getConversationState().itemtype
    if(itemtype){
    switch(itemtype.value)
    {
        case "job":
            return "jobsearch";
        case "payslip":
            return "payslip";
    }
    }
  },
    prompt() {
     if( client.getConversationState().itemtype)
     {
         return 'init.proceed'
     }
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
    extractInfo()
    {
      const employeenumber = firstOfEntityRole(client.getMessagePart(),'employee_number');
      
      if(employeenumber)
      {
       client.updateConversationState({
           employee_number:employeenumber
    })   
      }
    },
    prompt() {
       client.addResponse('prompt/employee_number')
       client.expect('payslip', ['provide/employee_number'])
       client.done()
    }
  })

    const collectPayslipWeek = client.createStep({
    satisfied() {
           console.log('Entering satisfied block for payslip');
    return Boolean(client.getConversationState().payslip_week)
    },
    extractInfo()
    {
      const payslipweek = firstOfEntityRole(client.getMessagePart(),'payslip_week');

      if(payslipweek)
      {
       client.updateConversationState({
           payslip_week:payslipweek
        })   
          console.log(payslipweek.value)
      }
    },
    prompt() {
      client.addResponse('prompt/payslip_week')
      client.expect('payslip', ['provide/payslip_week'])
      client.done()
    }
  })
    
    const getPayslip = client.createStep({
    satisfied() {
    return Boolean(client.getConversationState().payslip_sent)
    },
    prompt() {
        let payslip = {
            employee_number:client.getConversationState().employee_number.value,
            payslip_week:client.getConversationState().payslip_week.value
        }
      client.addResponse('supply/payslip',payslip)
      client.updateConversationState({
          payslip_sent:true
    })
      client.done()
    }
  })
    /**** END PAYSLIP ****/
    
    /**** BEGIN JOB SEARCH ****/
const collectCity = client.createStep({
 satisfied() {
    return Boolean(client.getConversationState().location)
    },
    extractInfo(){
        const location = firstOfEntityRole(client.getMessagePart(),'location')
        if(location)
        {
         client.updateConversationState({
             location:location
         })   
        }
    },
    prompt() {
        
      client.addResponse('prompt/job_location')
      client.done()
    }
})

const collectJobType = client.createStep({
satisfied() {
    return Boolean(client.getConversationState().jobrole)
    },
    extractInfo(){
        const jobrole = firstOfEntityRole(client.getMessagePart(),'jobrole')
        if(jobrole)
        {
         client.updateConversationState({
             jobrole:jobrole
         })   
        }
    },
    prompt() {
        
      client.addResponse('prompt/job_role')
      client.done()
    }
})

const getJobSearchResults = client.createStep({
    // ...
})
    /**** END JOB SEARCH ****/

  client.runFlow({
    classifications: {
      // map inbound message classifications to names of streams
        'greeting':'hi',
        //'request/payslip':'payslip',

    },
    autoResponses: {
      // configure responses to be automatically sent as predicted by the machine learning model
    },
    streams: {
        payslip:[collectEmployeeNumber,collectPayslipWeek,getPayslip],
        jobsearch:[collectCity,collectJobType,getJobSearchResults],
        main: 'hi',
        hi: [sayHello],
        end: [sayGoodBye],
    },
  })
}
