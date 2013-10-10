(function(window,$) {
		
	var dbModel = function databaseModel(){	
		var db = window.openDatabase("Testdb", "1.0", "ddbcom db", 200000);				
	}
	
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
	
})(window,$);
