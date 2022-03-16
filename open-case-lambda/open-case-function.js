exports.handler = (event, context, callback) => {
    // Create a support case using the input as the case ID, then return a confirmation message   
   console.log("Opening case for ", event.inputCaseID)
    var myCaseID = event.inputCaseID;
   var myMessage = "Case " + myCaseID + ": opened...";   
   var result = {Case: myCaseID, Message: myMessage};
   console.log(result);
   callback(null, result);    
};