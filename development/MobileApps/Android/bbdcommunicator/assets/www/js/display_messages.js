$(document).ready(function(){
	var db = new dbModel();
	db.display_AllMessages('birthday',"#birthday_table");

	$("#birthday_table").delegate('tr', 'click', function() {        
		var id = $(this).attr('id');
		db.display_OneMessage(id, 'birthday',show_message);
    });
	
	function show_message(trans, result){
		var id = result.rows.item(0).id;
		//db.updateRead(id);
		var sub = result.rows.item(0).subject;
		var mess = result.rows.item(0).message;
		var image = result.rows.item(0).image;
		var rsvp = result.rows.item(0).rsvp;
		var type = result.rows.item(0).type;
		var read = result.rows.item(0).read;
		$("#birthday_table").hide();
		$("#subject").html(sub);		
		if(mess != 'null'){			
			$("#message").html(mess);
		}		
		if(image != 'null'){		
			$("#image").attr("src",image);
		}
		$("#message_div").show();		
	}
	
});