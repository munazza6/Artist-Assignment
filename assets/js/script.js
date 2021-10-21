window.onload = function(){
	var search_icon = document.getElementById("search_icon_click");
	var name;
	var upcoming_event_count;
	const image = document.createElement("img");
	image.className = "artist_image";
	const name_display = document.createElement("h3");
	const fb_display = document.createElement("h3");
	const upcoming_events = document.createElement("button");
	var event_venue;
	var event_city;
	var event_country;
	var event_date;
	var ticket_status;

	//check if user has entered any name of artist to be searched
	search_icon.onclick = function (){

		if (document.getElementById("search_name").value !="") {
			document.getElementById("event_details").innerHTML = "";
			getArtists();
		}
		else{
			alert("Please enter the name of the artist");
		}
	}

	//gets json data for the name of artist entered by user
	function getArtists() {
		name = document.getElementById("search_name").value;
		document.getElementById("query_results").innerHTML = "See Results for your Search : ";

		$.getJSON("https://rest.bandsintown.com/artists/"+ name + "?app_id=abc", function(data){
			if (data.length != 0 || Object.keys(data).length != 0){
				//incase artist found for the given name
				image.src = data.image_url;
				upcoming_event_count = data.upcoming_event_count;
				document.getElementById("search_results").appendChild(image);
				document.getElementById("search_results").appendChild(name_display);
				name_display.innerHTML = "Name : " + name;
				document.getElementById("search_results").appendChild(fb_display);
				fb_display.innerHTML = 'Visit their <a href = "' + data.facebook_page_url + '"> Facebook Page </a>' ;
				document.getElementById("search_results").appendChild(upcoming_events);
				upcoming_events.innerHTML = "Check Upcoming Events";
			}
			else {
				//incase no artist found for the given name
				alert("No Artist found for this name");
			}		
		});
	}

	//checks the upcoming events for an artist
	upcoming_events.onclick = function() {
		if(upcoming_event_count > 0) {
			//incase the artist has any upcoming event
			document.getElementById("event_details").innerHTML = "<h4>There are " +upcoming_event_count + " upcoming events for this Artist.</h4>";
			$.getJSON("https://rest.bandsintown.com/artists/"+ name + "/events?app_id=abc&date=upcoming", function(data){
				data.forEach(function(data){
					event_venue =data.venue.name;
					event_city= data.venue.city;
					event_country = data.venue.country;
					event_date = data.datetime;

					const event_div = document.createElement("div");
					event_div.className = "event_div";
					event_div.classList.add("col-sm-3");
					event_div.innerHTML = "<h5> Venue: " + event_venue + "</h5> <h5> City: " + event_city + "</h5> <h5> Country : " + event_country + "</h5> <h5> Date: " + event_date + "</h5>";
					document.getElementById("event_details").appendChild(event_div);
				});
			});
		}
		else {
			//incase artist has no upcoming event
			document.getElementById("event_details").innerHTML = "<h4>No upcoming events for now. Stay tuned!</h4>";
		}
	}
}