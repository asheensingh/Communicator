(function(window,$) {

	var msgModel = new messageObject(null,null,null, null, null, null, null);
	var message_type= "";
	var output_table = "";		
	var callback = null;
	
	var dbModel = function databaseModel(){					
		var db = window.openDatabase("MessageDB", "1.0", "ddbcom db", 200000);	
		db.transaction(createTable, errorHandler);
	}
	
	dbModel.prototype.saveMessage = function(sub, msg, image, rsvp, type, date){				
		msgModel.setSubject(sub);		
		msgModel.setMessage(msg);
		msgModel.setImage(image);
		msgModel.setRSVP(rsvp);
		msgModel.setType(type);			
		msgModel.setDate(date);		
		var db = window.openDatabase("MessageDB", "1.0", "ddbcom db", 200000);	
		db.transaction(insert, errorHandler);
	}
	
	dbModel.prototype.display_AllMessages = function(type, handler){		
		message_type= type;
		callback = handler;	
		var db = window.openDatabase("MessageDB", "1.0", "ddbcom db", 200000);	
		db.transaction(read_AllMessages, errorHandler);	
	}
	
	dbModel.prototype.display_OneMessage = function(id, type, handler){
		msgModel.setID(id);
		message_type = type;
		callback = handler;
		var db = window.openDatabase("MessageDB", "1.0", "ddbcom db", 200000);	
		db.transaction(read_Message, errorHandler);
	}
	
	dbModel.prototype.updateRead = function(id){
		msgModel.setID(id);
		var db = window.openDatabase("MessageDB", "1.0", "ddbcom db", 200000);	
		db.transaction(change_Read, errorHandler);
	}

	dbModel.prototype.deleteAll = function(type, handler){
		msgModel.setType(type);
		callback = handler;
		var db = window.openDatabase("MessageDB", "1.0", "ddbcom db", 200000);	
		db.transaction(delete_all, errorHandler);
	}	

	dbModel.prototype.deleteOne = function(id, handler){
		msgModel.setID(id);
		callback = handler;
		var db = window.openDatabase("MessageDB", "1.0", "ddbcom db", 200000);	
		db.transaction(delete_one, errorHandler);
	}
	
	function createTable(trans){		
		trans.executeSql('CREATE TABLE IF NOT EXISTS MESSAGES (id INTEGER PRIMARY KEY AUTOINCREMENT, subject TEXT, message TEXT, image TEXT, rsvp TEXT, type TEXT, read INTEGER DEFAULT 0, date DATETIME DEFAULT CURRENT_DATE)');
	}
	
	function errorHandler(err){
		alert("Error processing SQL: "+err.message);
	}
	
	function insert(trans){	
		var subject = msgModel.getSubject();
		var message = msgModel.getMessage();
		var image = msgModel.getImage();
		var rsvp = msgModel.getRSVP();
		var type = msgModel.getType();	
		var date = msgModel.getDate();	
		var query = 'INSERT INTO MESSAGES (subject, message, image, rsvp, type, date) VALUES ("'+subject+'", "'+message+'", "'+image+'","'+rsvp+'", "'+type+'", "'+date+'")';
		trans.executeSql(query);
	}	
	
	function read_AllMessages(trans){	
		trans.executeSql('SELECT id, subject, read, date FROM MESSAGES WHERE type="'+message_type+'" ORDER BY date DESC',[],callback,errorHandler);
	}
	
	
	function read_Message(trans){
		trans.executeSql('SELECT * FROM MESSAGES WHERE id="'+msgModel.getID()+'" AND type="'+message_type+'"',[],callback,errorHandler);
	}
	
	function change_Read(trans){		
		trans.executeSql('UPDATE MESSAGES SET read = 1 WHERE id="'+msgModel.getID()+'"',[],function(){},errorHandler);
	}
	
	function delete_all(trans){
		trans.executeSql('DELETE FROM MESSAGES WHERE type="'+msgModel.getType()+'"',[],callback,errorHandler);
	}

	function delete_one(trans){
		trans.executeSql('DELETE FROM MESSAGES WHERE id="'+msgModel.getID()+'"',[],callback,errorHandler);
	}

	window.dbModel = dbModel;

})(window,$);