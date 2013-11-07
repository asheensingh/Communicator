(function(window,$) {
		
	var dbModel = function databaseModel(){	
		var db = window.openDatabase("MessageDB", "1.0", "ddbcom db", 200000);	
		db.transaction(createTable, errorHandler); //don't need a success handler here
		//db.transaction(select, insertError, insertSuccess); //don't need a success handler here
		insertMsg('insert msg');
		var message = null;
	}
	
	dbModel.setMessage = function(msg){
		this.message = msg;
		alert("this is set message:"+this.message);
	}
	
	function createTable(trans){		
		trans.executeSql('CREATE TABLE IF NOT EXISTS BIRTHDAY (id unique, data)');
	}
	
	function errorHandler(err){
		alert("Error processing SQL: "+err.code);
	}
	
	
	function insertMsg(msg){
		alert('insertMSG');
		var db = window.openDatabase("MessageDB", "1.0", "ddbcom db", 200000);	
		db.transaction(insert, errorHandler, insertSuccess); //don't need a success handler here
	}	
	
	function insert(trans){		
		alert('insert: ' + this.message);
		//trans.executeSql('INSERT INTO BIRTHDAY (id, data) VALUES (1, "First row")');
	}	
	
	function insertSuccess(res){		
		alert('Inserted successfully');		
	}
	
	function readMsg(trans){	
		trans.executeSql('SELECT * FROM BIRTHDAY WHERE 1',[],displayMsg,errorHandler);
	}

	
	function displayMsg(trans, result){
		alert('select success: '+result.rows.item(0).data);
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