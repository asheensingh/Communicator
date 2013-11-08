$(function(){	
	
	var db = new dbModel();	
	//db.saveMessage("message 3");
	
	var loginBrowser = new loginModel();
			
	$("#login").click(function(){						
		loginBrowser.startLogin();		       
	});
});