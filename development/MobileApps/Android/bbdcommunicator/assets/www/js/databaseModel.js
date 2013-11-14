(function(window,$) {

	var msgModel = new messageObject(null,null,null, null, null, null, null);
	var message_type= "";
	var output_table = "";		
	var callback = null;
	
	var dbModel = function databaseModel(){					
		var db = window.openDatabase("MessageDB", "1.0", "ddbcom db", 200000);	
		db.transaction(createTable, errorHandler);
	}
	
	dbModel.prototype.saveMessage = function(sub, msg, image, rsvp, type){				
		msgModel.setSubject(sub);		
		msgModel.setMessage(msg);
		msgModel.setImage(image);
		msgModel.setRSVP(rsvp);
		msgModel.setType(type);		
		var db = window.openDatabase("MessageDB", "1.0", "ddbcom db", 200000);	
		db.transaction(insert, errorHandler);
	}
	
	dbModel.prototype.display_AllMessages = function(type, table){		
		message_type= type;
		output_table = table;		
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
	
	function createTable(trans){		
		trans.executeSql('CREATE TABLE IF NOT EXISTS MESSAGES (id INTEGER PRIMARY KEY AUTOINCREMENT, subject TEXT, message TEXT, image TEXT, rsvp TEXT, type TEXT, read INTEGER DEFAULT 0)');
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
		var query = 'INSERT INTO MESSAGES (subject, message, image, rsvp, type) VALUES ("'+subject+'", "'+message+'", "'+image+'","'+rsvp+'", "'+type+'")';
		trans.executeSql(query);
	}	
	
	function read_AllMessages(trans){	
		trans.executeSql('SELECT id, subject, read FROM MESSAGES WHERE type="'+message_type+'"',[],display_Message,errorHandler);
	}
	
	function display_Message(trans, result){		
		var size = result.rows.length;			
		for(var i=0; i<size;i++){
			var id = result.rows.item(i).id;
			var sub = result.rows.item(i).subject;
			var read = result.rows.item(i).read;			
			if(read == 0){
				sub = '<strong>'+sub+'</strong>';
			}
			$(output_table+' > tbody:last').append('<tr id="'+id+'"><td>'+sub+'</td></tr>');								 
		}		
	}
	
	function read_Message(trans){
		trans.executeSql('SELECT * FROM MESSAGES WHERE id="'+msgModel.getID()+'" AND type="'+message_type+'"',[],callback,errorHandler);
	}
	
	function change_Read(trans){
		trans.executeSql('UPDATE MESSAGES SET read = 1 WHERE id="'+msgModel.getID()+'"',errorHandler);
	}
	
	window.dbModel = dbModel;

})(window,$);