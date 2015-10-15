
$( document ).ready(function() {
  
	$("#submit").click(function(){
		
		var json = $("#jsonHolder").val();
		if(json.charAt(0) == "{"){
			json = "["+json;
		}

		if(json.charAt(json.length-1) == "}"){
			json = json + "]";
		}

		$.ajax({
   			url: constants.baseurl + "/json?search=" + $("#searchKey").val(),
   			type: 'POST',
   			data: json,
   			contentType: "application/json",
    		success: function(result) {
        		$("#resultHolder").val(JSON.stringify(result));
   			 }
		});
	});  	
});

$.get(constants.baseurl + "/objectid",function(data){
		$("#generatedObjectId").text(data);
	}); 



