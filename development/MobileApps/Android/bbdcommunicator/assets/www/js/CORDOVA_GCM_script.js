gApp = new Array();

gApp.deviceready = false;
gApp.gcmregid = '';


/*
window.onbeforeunload  =  function(e) {

    if ( gApp.gcmregid.length > 0 )
    {
      // The same routines are called for success/fail on the unregister. You can make them unique if you like
      window.plugins.GCM.unregister( GCM_Success, GCM_Fail );      // close the GCM

    }
};

document.addEventListener('deviceready', function() {
  // This is the Cordova deviceready event. Once this is called Cordova is available to be used  
  //console.log("deviceready event received");
  
  //console.log("calling GCMRegistrar.register, register our Sender ID with Google");
  
  //alert("deviceready event received");
  
  //alert("calling GCMRegistrar.register, register our Sender ID with Google");

  //gApp.DeviceReady = true;

  // Some Unique stuff here,
  // The first Parm is your Google email address that you were authorized to use GCM with
  // the Event Processing rountine (2nd parm) we pass in the String name
  // not a pointer to the routine, under the covers a JavaScript call is made so the name is used
  // to generate the function name to call. I didn't know how to call a JavaScript routine from Java
  // The last two parms are used by Cordova, they are the callback routines if the call is successful or fails
  //
  //
 // window.plugins.GCM.register("778187313745", "GCM_Event", GCM_Success, GCM_Fail );

}, false );
*/

function
GCM_Event(e)
{
  
  console.log("Received event\n"+e.event); 
  alert("Received event\n"+e.event);
  switch( e.event )
  {
  case 'registered':
    // the definition of the e variable is json return defined in GCMReceiver.java
    // In my case on registered I have EVENT and REGID defined
    gApp.gcmregid = e.regid;
    if ( gApp.gcmregid.length > 0 )
    {       
		console.log("REGID: "+e.regid);		
		alert("New REGID\n: "+e.regid);
		window.localStorage.setItem("appID", gApp.gcmregid);			
    }

    break;

  case 'message':	
	var db = new dbModel();	  
	db.saveMessage(e.subject,e.message, e.image, e.rsvp, e.type, e.date);		
    break;


  case 'error':   
	//console.log("Error\n"+e.msg);	
	alert("Error\n"+e.msg);	

    break;



  default:    
	//console.log("Unknown event");	
	alert("unknown event");
    break;
  }
}

function
GCM_Success(e)
{ 
	//console.log("Registered succ");	
	alert("Registered succ");
}

function
GCM_Fail(e)
{  
  //console.log("Registered failed");
  
  //console.log("Registered fail "+e.msg);
  
  alert("Registered failed");
  
  alert("Registered fail "+e.msg);

}

