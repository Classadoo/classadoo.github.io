namedElementSteps = [	
	{
		section: 'What are the "things" that make up a webpage?',
		text: 'But now we have a new question: If the "things" we\'re arranging aren\'t really furniture, what are they?'
	},
	{
		text: "In the software world we call these \"things\", elements.",
		action: function() {
			$(".example-name").html("element");
			setTimeout(function() { flashOverlays(2) }, 500);
		}
	},
	{
		text: "And to make sure we can choose the right element when reorganizing a page, like we did above, we give each element a name, like 'banner', or 'links'.",
		action: function() {
			$(".example-name").each(function(i, el) {
				$(el).html($(el).parent().parent().attr("example-id"));
			})
			setTimeout(function() { flashOverlays(2) }, 500);
		}	
	},
	{	
		task: "Try changing the layout or background of each element again, using their new names.<br>Examples: <c>banner <d>top, right, bottom, or left</d> <d>distance</d></c> or <c>links background <d>primary color</d></c>.",
		interaction: function(cmd) {			
			var args = cmd.split(" ")
			var id = args[0];
			var command = args[1];			
			var arg = args[2]			
			
			
			actionTaken = false;
			var el = $("[example-id=" + id + "]")
			if (el.length) {
				console.log("in here");
				if (command === "background") {
					if (validColors.indexOf(arg) > -1) {
						el.css(command, arg); 								
						el.find(".example-overlay").css("background", "rgba(80,80,80,.6)");
						actionTaken = true;
					} 
				} else if (validDirections.indexOf(command) > -1) {
					el.css({top: "", right: "", left: "", bottom: ""});
					el.css(command, arg); 														
					actionTaken = true;
				} 										
			} 
			
			if (!actionTaken) {
				echo(term, "Oops, not quite... try something like <c>banner left 100</c> or <c>links background red</c>. You can use any primary color as a background.");
				return false
			} else {
				var overlay = el.find(".example-overlay");
				overlay.addClass("flashing");
				flash(overlay, 2, function () { overlay.remove() });

				var exampleOverlays = $(".example-overlay:not(.flashing)");				
				var numberRemainingElementsToMove = exampleOverlays.length
				var remainingNames = exampleOverlays.map(function(i, el) { return $(el).parent().attr("example-id") } ).toArray()
				if (numberRemainingElementsToMove){
					// still some elements left to move
					echo(term, "Good! Now change the other " + numberRemainingElementsToMove + " elements as well. Their names are " + remainingNames.join(", ") );
					return false
				} else {
					// all elements have been moved, go to the next step
					echo(term, "Nice job! You can now officially put \"web designer\" on your resum&egrave;.")
					return true
				}
			}
					
		},
		help: "To complete this step make at least one change to every element that has a name. You can change their background or push the elements around."
	},	
	{
		task: " ",
		text: "So now we can answer our second question:"
	},
	{
		questionComplete: true,
		text: "<e>Everything on a webpage is an element, with names. We can use these names to change the way elements look.<e>",
		action: logComplete(3)
	}
]