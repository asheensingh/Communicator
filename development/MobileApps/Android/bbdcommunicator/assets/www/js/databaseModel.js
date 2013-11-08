(function(window,$) {
		
	var message;	
	
	var dbModel = function databaseModel(){	
		var db = window.openDatabase("MessageDB", "1.0", "ddbcom db", 200000);	
		db.transaction(createTable, errorHandler); //don't need a success handler here
		//db.transaction(select, insertError, insertSuccess); //don't need a success handler here				
	}
	
	dbModel.prototype.saveMessage = function(msg){				
		insertMessage(msg);
	}
	
	dbModel.prototype.getBirthdayMsg(){
		
	}
	
	function createTable(trans){		
		trans.executeSql('CREATE TABLE IF NOT EXISTS BIRTHDAY (id INTEGER PRIMARY KEY AUTOINCREMENT, data TEXT)');
	}
	
	function errorHandler(err){
		alert("Error processing SQL: "+err.message);
	}
	
	
	function insertMessage(msg){
		message = msg;
		//alert(this.message);
		var db = window.openDatabase("MessageDB", "1.0", "ddbcom db", 200000);	
		db.transaction(insert, errorHandler, insertSuccess);
	}	
	
	function insert(trans){				
		var query = 'INSERT INTO BIRTHDAY (data) VALUES ("'+message+'")';
		trans.executeSql(query);
	}	
	
	function insertSuccess(res){				
		var db = window.openDatabase("MessageDB", "1.0", "ddbcom db", 200000);	
		db.transaction(readMsg, errorHandler, displayMsg);
	}
	
	function readMsg(trans){	
		trans.executeSql('SELECT * FROM BIRTHDAY',[],displayMsg,errorHandler);
	}

	
	function displayMsg(trans, result){
		var size = result.rows.length;		
		var out = "Messages:\n";
		for(var i=0;i<size;i++){
			out += result.rows.item(i).data;
			out+="\n";
			//alert(result.rows.item(i).data );
		}
		alert(out);			
	}
	
	
	window.dbModel = dbModel;

})(window,$);

/*
dbModel.prototype.insertMessage = function(msg){
		var model = this;
		db = window.openDatabase("Testdb", "1.0", "ddbcom db", 200000);
		db.transaction(populateDB, errorCB, successCB);
		model.db = db;
	}
	
	dbModel.prototype.check = function(msg){
		alert("check")
		var model = this;
		db = window.openDatabase("Testdb", "1.0", "ddbcom db", 200000);
		db.transaction(checkResults, errorC, querySuccess);
		model.db = db;
	}
	
	function populateDB(trans){		
        trans.executeSql('CREATE TABLE IF NOT EXISTS DEMO (id unique, data)');
        trans.executeSql('INSERT INTO DEMO (id, data) VALUES (1, "First row")');
        trans.executeSql('INSERT INTO DEMO (id, data) VALUES (2, "Second row")');
	}
	
	// Transaction error callback
    //
    function errorCB(err) {
        alert("Error processing insert SQL: "+err.message);
    }
	
	function errorC(err) {
        alert("Error reading: "+err.message);
    }

    // Transaction success callback
    //
    function successCB(trans) {
        alert("success insert!");		
    }
	
	function checkResults(trans){
		trans.executeSql('SELECT * FROM DEMO', [], querySuccess, errorCB);		
	}
	
	function querySuccess(trans, results) {
        alert("Returned rows = " + results.rows.length);
        // this will be true since it was a select statement and so rowsAffected was 0
        if (!results.rowsAffected) {
            alert('No rows affected!');
            return false;
        }
        // for an insert statement, this property will return the ID of the last inserted row
        alert("Last inserted row ID = " + results.insertId);
    }
	
	window.dbModel = dbModel;
	
	*/