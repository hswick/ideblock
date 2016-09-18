

function voiceListener(cb) {


	if (!('webkitSpeechRecognition' in window)) {


				upgrade();


	} else {


	  var recognition = new webkitSpeechRecognition();


	  recognition.continuous = true;


	  recognition.interimResults = false;				

	  	  recognition.onstart = function() { 


	  	var final_transcript = '';


	  	console.log("Started");


	  }	

	  	  recognition.onresult = function(event) {


	  		let results = event.results;


	  	    cb(results[results.length - 1][0].transcript);	

	  	    		    //final_span.innerHTML = linebreak(final_transcript);


		    //interim_span.innerHTML = linebreak(interim_transcript);


	  }	

	  	  recognition.onerror = function(event) { console.log("Error: " + event.error); }


	  recognition.onend = function() { console.log("Ending") }	

	  	  recognition.start();


	}


}

			//Need to display microphone volume