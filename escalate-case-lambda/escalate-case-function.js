exports.handler = (event, context, callback) => {    
    // Escalate the support case 
    console.log("Escalating case ", event.Payload)
    var myCaseID = event.Payload.Case;    
    var myCaseStatus = event.Payload.Status;    
    var myMessage = event.Message + "escalating.";    
    var result = {Case: myCaseID, Status : myCaseStatus, Message: myMessage};
    console.log(result)
    callback(null, result);
};