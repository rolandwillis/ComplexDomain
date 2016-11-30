'use strict'

const firstOfEntityRole = function(message, entity, role) {
  role = role || 'generic';

  const slots = message.slots
  const entityValues = message.slots[entity]
  const valsForRole = entityValues ? entityValues.values_by_role[role] : null

  return valsForRole ? valsForRole[0] : null
}

exports.handle = (client) => {
    const applicationEnvironment = client.getCurrentApplicationEnvironment()
console.log(applicationEnvironment)
    var users = client.getUsers()
     var keys = Object.keys( users );
     var user =   users[keys[0]];
     
    // client.resetUser(user.id);

  // Create steps
  const getRequestItem = client.createStep({
    satisfied() {
     
      return Boolean(client.getConversationState().itemtype)
    },
    extractInfo()
    {
        
        const itemtype = firstOfEntityRole(client.getMessagePart(),'item_type')
 		let baseClassification = client.getMessagePart().classification.base_type.value
		console.log("message classification received is :" + baseClassification)
        if(itemtype)
        {
         client.updateConversationState({
             itemtype:itemtype
        })
         console.log("item type is " + itemtype.value);
        }

		// Collect any extra info
        const jobrole = firstOfEntityRole(client.getMessagePart(),'jobrole')
        if(jobrole)
        {
         client.updateConversationState({
             jobrole:jobrole
         })   
        }
 		
        const location = firstOfEntityRole(client.getMessagePart(),'location')
        if(location)
        {
         client.updateConversationState({
             location:location
         })   
        }
        
        		// Collect any extra info
        const employeenumber = firstOfEntityRole(client.getMessagePart(),'employee_number')
        if(employeenumber)
        {
         client.updateConversationState({
             employeenumber:employeenumber
         })   
        }
 		
        const payslipweek= firstOfEntityRole(client.getMessagePart(),'payslip_week')
        if(payslipweek)
        {
         client.updateConversationState({
             payslipweek:payslipweek
         })   
        }

    },
      next() {
	
		  
    const itemtype = client.getConversationState().itemtype
    if(itemtype){
        console.log("the item type is defined as " + itemtype.value);
    switch(itemtype.value)
    {
        case "jobs":
        case "role":
        case "roles":
        case "job":
            return "jobsearch";
		case "payslips":
        case "payslip":
            return "payslip";
		default: 
        return "unknown";
    }
    }
  },
    prompt() {
     if( client.getConversationState().itemtype)
     {
         return 'init.proceed'
     }
      client.addResponse('prompt/open',{first_name:user.first_name?user.first_name:user.first_name})

      client.done()
    }
  })
  
    const sayGoodBye = client.createStep({
    satisfied() {
      return false;
    },

    prompt() {
      client.addResponse('goodbye/final',{first_name:user.first_name})
      	  // Clear down data to allow for new item requests
            client.resetConversationState()
           // client.resetUser()
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
        let baseClassification = client.getMessagePart().classification.base_type.value
         let subClassification = client.getMessagePart().classification.sub_type.value
        console.log("i have determined the classification as :" + baseClassification + "/" + subClassification);
        console.log("Users : " + client.getUsers().length);
        if(subClassification!="delay")
       client.addResponse('prompt/employee_number',{first_name:user.first_name})
       else
       {
           client.addTextResponse("Sure no problem" + ". Let me know when you are ready")
       }
       client.expect('payslip', ['provide/employee_number'])
       client.expect('end', ['greeting','decline'])
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
      
      let baseClassification = client.getMessagePart().classification.base_type.value
      console.log("base classification is :" + baseClassification);
      client.addResponse('prompt/payslip_week',{first_name:user.first_name})
      client.expect('payslip', ['provide/payslip_week'])
  	  client.expect('end', ['greeting','decline'])
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
            payslip_week:client.getConversationState().payslip_week.value,
            first_name:user.first_name
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
        
      client.addResponse('prompt/job_location',{first_name:user.first_name})
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
        
      client.addResponse('prompt/job_role',{first_name:user.first_name})
      client.done()
    }
})

const getJobSearchResults = client.createStep({
satisfied() {
    return  Boolean(client.getConversationState().jobresults_sent)
    },
    prompt() {
        let jobrole = client.getConversationState().jobrole
    	let location = client.getConversationState().location
    	let jobcount = Math.floor(Math.random() * (20 - 1) + 1);
      client.addResponse('supply/jobsearch_results',{location:location.value,jobrole:jobrole.value,first_name:user.first_name,jobcount:jobcount})
	  client.updateConversationState({jobresults_sent:true})
      client.done()
    }
})
    /**** END JOB SEARCH ****/
    
    
    /**** BEGIN CANDIDATE SEARCH ****/ 
    
    const collectRoleName = client.createStep({
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
    
    
    /**** END CANDIDATE SEARCH ****/

const unknownItem = client.createStep({
satisfied() {
    return false
    },
    prompt() {

	  // Clear down data to allow for new item requests
 
      client.addResponse('unknown')
      client.resetConversationState()
      client.done()
    }
})

const dealWithRudeness = client.createStep({
satisfied() {
    return false
    },
    prompt() {
      client.addResponse('unknown')
      client.done()
    }
})

const getUserFirstName = client.createStep({
	
	satisfied(){
            console.log("in getUserFirstName - is first_name found = " + Boolean(user.first_name != "undefined" &&  user.first_name!=""))
		return Boolean((user.first_name != "undefined" &&  user.first_name!="") || client.getConversationState().first_name);
	},
	extractInfo(){
		   const first_name = firstOfEntityRole(client.getMessagePart(),'first_name')
               
		   if(first_name)
		   {
                        console.log("Received First Name of %s",first_name.value)
                        client.updateUser(user.id,"first_name",first_name.value);
                        console.log("Updated user and now first name is %s : ",user.first_name)
                        client.updateConversationState({
                            
                            first_name:first_name.value
                        })
                   }
                   else
                   {
                       console.log("No name found in response")
                   }
	   
		
	},
        next()
        {
            return "processRequestItem";
        },
	prompt(){
           
               if(user.first_name == "undefined" ||  user.first_name=="")
		client.addResponse("prompt/first_name");
               else
               {
                   console.log('calling init.proceed')
                   return 'init.proceed'
               }
                   
                client.done();
                    
		//client.expect("processRequestItem",["provide/first_name"])
		
	}
	
})

  client.runFlow({
    classifications: {
       // map inbound message classifications to names of streams
        'greeting':'processRequestItem',
        'request/item':'processRequestItem',
       // 'provide/first_name':'processRequestItem'
       // 'provide/job_role':'jobsearch',
       // 'provide/job_location':'jobsearch', 
       // 'provide/employee_number':'payslip',
       // 'provide/payslip_week':'payslip',
       // 'aggressive/rude':'unknown'
        'goodbye':'end'

    },
    autoResponses: {
      // configure responses to be automatically sent as predicted by the machine learning model
    },
    streams: {
        payslip:[collectEmployeeNumber,collectPayslipWeek,getPayslip],
        jobsearch:[collectCity,collectJobType,getJobSearchResults],
        unknown:[unknownItem],
        main: 'processRequestItem',
        processRequestItem: [getUserFirstName,getRequestItem],
        end: [sayGoodBye],
    },
  })
}
