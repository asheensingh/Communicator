$(document).ready(function(){
	var longpress;
	var selected_tr;

	var db = new dbModel();
	db.display_AllMessages('birthday',show_all_messages);

	$("#birthday_table").delegate('tr', 'click', function() {        
		var id = $(this).attr('id');		
		db.display_OneMessage(id, 'birthday',show_message);
    });

    function show_all_messages(trans,result){
    	var size = result.rows.length;
    	$('#birthday_table > tbody').html("");

    	if(size == 0){
    		$("#no_messages").fadeIn("slow","swing");
    	}
    	else{    
    		$("#no_messages").hide();				
			for(var i=0; i<size;i++){
				var id = result.rows.item(i).id;
				var sub = result.rows.item(i).subject;
				var read = result.rows.item(i).read;
				var date = result.rows.item(i).date;
				sub = sub +'<br>'+date;			
				if(read == 0){
					sub = '<strong>'+sub+'</strong>';
				}
				$('#birthday_table > tbody:last').append('<tr id="'+id+'"><td>'+sub+'</td></tr>');								 
			}
    	}		
    }
	
	function show_message(trans, result){
		var id = result.rows.item(0).id;		
		db.updateRead(id);
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

$("#birthday_table").delegate('tr','touchstart' ,function(event){ 
	$('.danger').removeClass('danger');
	$("#delete_option").hide();
	selected_tr	 = $(this);
	var id = selected_tr.attr('id');	
	longpress=true;	

	setTimeout(function() {
		if(longpress)	
		selected_tr.addClass("danger");	
		$("#delete_option").fadeIn('slow','swing');

		//$("#delete_option").css({position:"absolute", left:e.pageX,top:e.pageY});
	}, 2000);
});

$("#birthday_table").delegate('tr','touchend' ,function(){ 
longpress=false;
clearTimeout();
});

$("#delete_one").click(function(){
	db.deleteOne(selected_tr.attr('id'),delete_handler);
	db.display_AllMessages('birthday',show_all_messages);
});

$("#delete_all").click(function(){
	 navigator.notification.confirm(
            'Are you sure you want to delete all birthday messages?', // message
             onConfirm,            // callback to invoke with index of button pressed
            'Delete All Messages',           // title
            ['Cancel','OK']         // buttonLabels
        );

});

function onConfirm(buttonIndex){		
	if(buttonIndex == 2){
		db.deleteAll('birthday',delete_handler);
		db.display_AllMessages('birthday',show_all_messages);
	}
}

function delete_handler(){
	$("#notification").show(100000000,"slow","swing");		
}
	
});