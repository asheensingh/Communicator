$(function(){
	document.addEventListener("deviceready", onDeviceReady, false);

	function onDeviceReady() {
		alert("here");
		var store = new localStoreModel();
		var isRegistered = store.isRegistered();
		if(!isRegistered){			
			store.registerApp();
		}
	}
});