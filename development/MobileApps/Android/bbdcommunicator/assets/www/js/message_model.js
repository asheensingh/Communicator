(function(window,$) {			
	var messageObject = function messageModel(id, sub, mes, im, rs, ty, re){	
		this.id = id;
		this.subject = sub;
		this.message = mes;
		this.image = im;
		this.rsvp = rs;
		this.type = ty;
		this.read = re;
	}	
	messageObject.prototype.getID = function(){		
		return this.id;
	}
		
	messageObject.prototype.getSubject = function(){		
		return this.subject;
	}
	
	messageObject.prototype.getMessage = function(){		
		return this.message;
	}
	
	messageObject.prototype.getImage = function(){		
		return this.image;
	}
	
	messageObject.prototype.getRSVP = function(){		
		return this.rsvp;
	}
	
	messageObject.prototype.getType = function(){		
		return this.type;
	}
	
	messageObject.prototype.getRead = function(){		
		return this.read;
	}
	
	messageObject.prototype.setID = function(id){		
		this.id = id;
	}
	
	messageObject.prototype.setSubject = function(sub){		
		this.subject = sub;
	}
	
	
	messageObject.prototype.setMessage = function(mes){		
		this.message = mes;
	}
	
	messageObject.prototype.setImage = function(im){		
		this.image = im;
	}
	
	messageObject.prototype.setRSVP = function(rs){		
		this.rsvp = rs;
	}
	
	messageObject.prototype.setType = function(ty){		
		this.type = ty;
	}
	
	messageObject.prototype.setRead = function(re){		
		this.read = re;
	}
	
	window.messageObject = messageObject;

})(window,$);