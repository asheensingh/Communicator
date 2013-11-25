gApp = new Array();

gApp.deviceready = false;
gApp.gcmregid = '';


function
GCM_Event(e)
{
  
  console.log("Received event\n"+e.event); 

  switch( e.event )
  {
  case 'registered':
    // the definition of the e variable is json return defined in GCMReceiver.java    
    gApp.gcmregid = e.regid;
    if ( gApp.gcmregid.length > 0 )
    {       
		console.log("REGID: "+e.regid);				
		window.localStorage.setItem("appID", gApp.gcmregid);			
    }

    break;

  case 'message':	
	var db = new dbModel();	  
	db.saveMessage(e.subject,e.message, e.image, e.rsvp, e.type, e.date);		
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

