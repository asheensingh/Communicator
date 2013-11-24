document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady(){
    document.addEventListener("backbutton", function(e){
       if($('#birthday_table').css('display') == 'none'){
       	$("#birthday_table").show();
       	$("#message_div").hide();
       }
       else{
       	window.location.replace("home.html");
       }
    }, false);
}


$(document).ready(function(){
	var click_start;
	var selected_tr;

	var db = new dbModel();
	db.display_AllMessages('birthday',show_all_messages);

    function show_all_messages(trans,result){
    	var size = result.rows.length;
    	$('#birthday_table > tbody').html("");

    	if(size == 0){
    		$("#no_messages").fadeIn("slow","swing");
    	}
    	else{    
    		$("#no_messages").hide();				
			for(var i=0; i<size;i++){
				var id = decodeURI(result.rows.item(i).id);
				var sub = decodeURI(result.rows.item(i).subject);
				var read = decodeURI(result.rows.item(i).read);
				var date = decodeURI(result.rows.item(i).date);
				sub = sub +'<br>'+date;			
				if(read == 0){
					sub = '<strong>'+sub+'</strong>';
				}
				$('#birthday_table > tbody:last').append('<tr id="'+id+'"><td>'+sub+'</td></tr>');								 
			}
    	}		
    }
	
	function show_message(trans, result){
		$("#delete_option").hide();
		var id = decodeURI(result.rows.item(0).id);		
		db.updateRead(id);
		var sub = decodeURI(result.rows.item(0).subject);
		var mess = decodeURI(result.rows.item(0).message);
		var image = decodeURI(result.rows.item(0).image);
		var rsvp = decodeURI(result.rows.item(0).rsvp);
		var type = decodeURI(result.rows.item(0).type);
		var read = decodeURI(result.rows.item(0).read);
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
	selected_tr	 = $(this);	
	var d = new Date();
	click_start = d.getTime();
});


$("#birthday_table").delegate('tr','touchend' ,function(){ 

	var d = new Date();
	var click_stop = d.getTime();
	var time = click_stop - click_start;
	if(time >= 1000){
		longPressHandler();
	}
	else{
		shortPressHandler();
	}

});

function longPressHandler(){
	$('.danger').removeClass('danger');
	$("#delete_option").hide();
	selected_tr.addClass("danger");	
	$("#delete_option").fadeIn('slow','swing');
}

function shortPressHandler(){
	if ( $('#delete_option').css('display') != 'none'){	
			$('.danger').removeClass('danger');
			$("#delete_option").hide();
	} 
	else{	
		var id = selected_tr.attr('id');
		db.display_OneMessage(id, 'birthday',show_message);
	}    
}


$("#delete_one").click(function(){
	$('.danger').removeClass('danger');
	$("#delete_option").hide();
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
		$('.danger').removeClass('danger');
		$("#delete_option").hide();
		db.deleteAll('birthday',delete_handler);
		db.display_AllMessages('birthday',show_all_messages);
	}
}

function delete_handler(){
	$("#notification").show(10000000);		
}
	
});