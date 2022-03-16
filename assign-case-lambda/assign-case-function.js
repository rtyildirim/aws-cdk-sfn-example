exports.handler = (event, context, callback) => {    
    // Assign the support case and update the status message    
    console.log("Assigning case for ", event.Payload)
    var myCaseID = event.Payload.Case;    
    var myMessage = event.Payload.Message + "assigned...";    
    var result = {Case: myCaseID, Message: myMessage};
    callback(null, result);        
};