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

  switch( e.event )
  {
  case 'registered':
    // the definition of the e variable is json return defined in GCMReceiver.java
    // In my case on registered I have EVENT and REGID defined
    gApp.gcmregid = e.regid;
    if ( gApp.gcmregid.length > 0 )
    {       
		console.log("REGID: "+e.regid);		
		window.localStorage.setItem("appID", gApp.gcmregid);	
		alert("REGID: "+e.regid);
    }

    break

  case 'message':
    // the definition of the e variable is json return defined in GCMIntentService.java
    // In my case on registered I have EVENT, MSG and MSGCNT defined

    // You will NOT receive any messages unless you build a HOST server application to send
    // Messages to you, This is just here to show you how it might work

	console.log("Received message. MSG: "+e.message);
	console.log("Received message. MSGCNT: "+e.message);

    break;


  case 'error':   
	console.log("Error\n"+e.msg);	

    break;



  default:    
	console.log("Unknown event");	
    break;
  }
}

function
GCM_Success(e)
{ 
	console.log("Registered succ");	
}

function
GCM_Fail(e)
{  
  console.log("Registered failed");
  
  console.log("Registered fail "+e.msg);

}

