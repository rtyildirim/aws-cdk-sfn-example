exports.handler = (event, context, callback) => { 
    // Close the support case    
    console.log("Closing case", event.Payload)
    var myCaseStatus = event.Payload.Status;    
    var myCaseID = event.Payload.Case;    
    var myMessage = event.Payload.Message + "closed.";    
    var result = {Case: myCaseID, Status : myCaseStatus, Message: myMessage};
    console.log(result)
    callback(null, result);
};