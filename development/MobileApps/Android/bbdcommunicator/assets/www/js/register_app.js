$(function(){
	document.addEventListener("deviceready", onDeviceReady, false);

	function onDeviceReady() {		
		var store = new localStoreModel();
		var isRegistered = store.isRegistered();
		if(!isRegistered){			
			store.registerApp();
		}
	}
});